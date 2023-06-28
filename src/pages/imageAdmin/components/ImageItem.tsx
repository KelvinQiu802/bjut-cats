import { useEffect, useState } from 'react';
import { previewImage, showToast } from '@tarojs/taro';
import { AtButton, AtList, AtListItem } from 'taro-ui';
import { Image, Picker, Text, View } from '@tarojs/components';
import { requestAwait } from '../../../../utils/await';
import { getGlobal } from '../../../../utils/globalData';
import style from './ImageItem.module.css';

interface Props {
  image: Image;
  refreshImages: () => Promise<void>;
}

const API_HOST =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:7070'
    : 'https://animalwatch.codingkelvin.fun';

async function getUserFromDB(openId: string): Promise<any> {
  const result = await requestAwait('GET', `${API_HOST}/api/users/${openId}`);
  return result;
}

function ImageItem({ image, refreshImages }: Props) {
  const [user, setUser] = useState({ userName: '' });
  const [pickedCampus, setPickedCampus] = useState<Campus>(image.campus);
  const [pickedCatName, setPickedCatName] = useState(image.catName);
  const [pickedState, setPickedState] = useState<ImageState>('通过');
  const [catsNameList, setCatsNameList] = useState<string[]>([]);
  const campusList: Campus[] = ['本部', '通州', '中篮'];
  const stateList: ImageState[] = ['通过', '不通过', '精选'];

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

  const handleSubmit = async () => {
    await requestAwait('PUT', `${API_HOST}/api/images`, {
      openId: image.openId,
      imageUrl: image.imageUrl,
      state: pickedState,
      campus: pickedCampus,
      catName: pickedCatName,
    });
    refreshImages();
    showToast({ title: '成功 ' });
  };

  useEffect(() => {
    refreshCatNameList();
    (async () => {
      const { data } = await getUserFromDB(image.openId);
      setUser(data);
    })();
  }, []);

  return (
    <View className={style.box}>
      <Image
        src={image.imageUrl}
        mode="aspectFit"
        style={{ height: '100px' }}
        onClick={() => {
          previewImage({
            urls: [image.imageUrl],
            current: image.imageUrl,
            showmenu: true,
          });
        }}
      />
      <Text className={style.userName}>{`用户名: ${user.userName}`}</Text>
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
      <Picker
        mode="selector"
        range={stateList}
        onChange={(e) => {
          setPickedState(stateList[e.detail.value]);
        }}
      >
        <AtList>
          <AtListItem title="状态" extraText={pickedState} />
        </AtList>
      </Picker>
      <AtButton type="primary" onClick={handleSubmit} size="small">
        确认
      </AtButton>
    </View>
  );
}

export default ImageItem;
