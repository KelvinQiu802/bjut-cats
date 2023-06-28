import { View, Picker } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { AtButton, AtImagePicker, AtList, AtListItem } from 'taro-ui';
import { showToast } from '@tarojs/taro';
import { getGlobal } from '../../../utils/globalData';
import style from './uploadImage.module.css';

type File = {
  url: string;
};

function UploadImage() {
  const [files, setFiles] = useState<File[]>([]);
  const [pickedCampus, setPickedCampus] = useState('本部');
  const [catsNameList, setCatsNameList] = useState<string[]>([]);
  const [pickedCatName, setPickedCatName] = useState('');
  const campusList = ['本部', '通州', '中篮'];

  useEffect(() => {
    setCatsNameList(() => {
      const allCats: Cat[] = getGlobal('allCats');
      const nameList = allCats
        .filter((cat) => cat.campus == pickedCampus)
        .map((cat) => cat.name);
      nameList.unshift('不确定');
      return nameList;
    });
  }, [pickedCampus]);

  useEffect(() => {
    setPickedCatName(catsNameList[1]);
  }, [catsNameList]);

  const handleSubmit = () => {};

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
      >
        上传
      </AtButton>
    </View>
  );
}

export default UploadImage;
