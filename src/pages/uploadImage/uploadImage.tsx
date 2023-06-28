import { View, Picker } from '@tarojs/components';
import { useEffect, useState } from 'react';
import {
  compressImage,
  getStorageSync,
  useDidShow,
  navigateBack,
} from '@tarojs/taro';
import { AtButton, AtImagePicker, AtList, AtListItem } from 'taro-ui';
import { showToast, showModal } from '@tarojs/taro';
import { getGlobal } from '../../../utils/globalData';
import { upload } from '../../../utils/qiniuUploader';
import { post } from '../../../utils/await';
import style from './uploadImage.module.css';

type File = {
  url: string;
};

const API_HOST =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:7070'
    : 'https://animalwatch.codingkelvin.fun';

const IMAGE_BED = 'https://imgbed.codingkelvin.fun/';

function UploadImage() {
  const [files, setFiles] = useState<File[]>([]);
  const [pickedCampus, setPickedCampus] = useState('本部');
  const [catsNameList, setCatsNameList] = useState<string[]>([]);
  const [pickedCatName, setPickedCatName] = useState('');
  const [loading, setLoading] = useState(false);
  const campusList = ['本部', '通州', '中篮'];

  const handleSubmit = async () => {
    // 压图
    const { tempFilePath } = await compressImage({
      src: files[0].url,
      quality: 20,
    });
    // 拿到图片url，上传qiniu
    upload({
      filePath: tempFilePath,
      options: {
        region: 'NCN',
        uptokenURL: `${API_HOST}/api/imageUploadToken`,
        shouldUseQiniuFileName: true,
      },
      before: () => {
        setLoading(true);
      },
      success: async (res) => {
        // 拿到返回的url，向数据库中添加
        const openId = getStorageSync('openId');
        await post(`${API_HOST}/api/images`, {
          openId,
          imageUrl: `${IMAGE_BED}/${res.fileURL}`,
          state: '待审核',
          campus: pickedCampus,
          catName: pickedCatName,
        });
        showModal({
          title: '上传成功',
          content: '上传成功，请等待管理员审核！',
          showCancel: false,
          confirmText: '知道了',
          success: () => {
            navigateBack();
          },
        });
      },
      fail: (err) => {
        showToast({
          title: err.message,
          icon: 'error',
        });
      },
      complete: () => {
        setLoading(false);
      },
    });
  };

  const refreshCatNameList = () => {
    setCatsNameList(() => {
      const allCats: Cat[] = getGlobal('allCats');
      const nameList = allCats
        .filter((cat) => cat.campus == pickedCampus)
        .map((cat) => cat.name);
      nameList.unshift('不确定');
      return nameList;
    });
  };

  useDidShow(() => {
    refreshCatNameList();
  });

  useEffect(() => {
    refreshCatNameList();
  }, [pickedCampus]);

  useEffect(() => {
    setPickedCatName(catsNameList[1]);
  }, [catsNameList]);

  // 先选图片，然后再, 选校区，选猫
  return (
    <View className="content">
      <AtImagePicker
        files={files}
        showAddBtn={files.length < 1}
        count={1}
        onChange={setFiles}
        className={style.picker}
        multiple={false}
        length={1}
        mode="aspectFit"
        sourceType={['album', 'camera']}
        onFail={(msg) => {
          showToast({ title: msg, icon: 'error' });
        }}
      />

      <Picker
        mode="selector"
        range={campusList}
        onChange={(e) => {
          setPickedCampus(campusList[e.detail.value]);
        }}
      >
        <AtList>
          <AtListItem title="校区" extraText={pickedCampus} />
        </AtList>
      </Picker>

      <Picker
        mode="selector"
        range={catsNameList}
        onChange={(e) => setPickedCatName(catsNameList[e.detail.value])}
      >
        <AtList>
          <AtListItem title="猫咪" extraText={pickedCatName} />
        </AtList>
      </Picker>

      <AtButton
        type="primary"
        onClick={handleSubmit}
        className={style.btn}
        disabled={files.length == 0}
        loading={loading}
      >
        上传
      </AtButton>
    </View>
  );
}

export default UploadImage;
