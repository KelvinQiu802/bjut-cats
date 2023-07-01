import { useState } from 'react';
import { Text, View, GridView } from '@tarojs/components';
import {
  usePullDownRefresh,
  useShareAppMessage,
  useShareTimeline,
  getStorageSync,
  navigateTo,
  useDidShow,
  stopPullDownRefresh,
} from '@tarojs/taro';
import { AtFab } from 'taro-ui';
import style from './gallery.module.css';
import { requestAwait } from '../../../utils/await';
import { API_HOST, signUp } from '../../../utils/db';
import ImageItem from './components/ImageItem';

function Gallery() {
  const [images, setImages] = useState<Image[]>([]);
  // 记录用户点赞过的图片url
  const [likes, setLikes] = useState<string[]>([]);

  async function refreshImages() {
    // 图片排列顺序再想想
    const images1 = (await requestAwait(
      'GET',
      `${API_HOST}/api/images/精选`
    )) as {
      data: Image[];
    };
    const images2 = (await requestAwait(
      'GET',
      `${API_HOST}/api/images/通过`
    )) as {
      data: Image[];
    };
    const data = images1.data.concat(images2.data);
    setImages(data);
  }

  async function refreshLike() {
    const openId: string = getStorageSync('openId');
    const { data } = (await requestAwait(
      'GET',
      `${API_HOST}/api/likes?by=openId&value=${openId}`
    )) as any;
    setLikes(data.map((like) => like.imageUrl));
  }

  useDidShow(() => {
    refreshImages();
    refreshLike();
  });

  usePullDownRefresh(async () => {
    await refreshImages();
    await refreshLike();
    stopPullDownRefresh();
  });

  useShareAppMessage(() => {
    return { title: '月亮湖猫屋-相册' };
  });

  useShareTimeline(() => {
    return { title: '月亮湖猫屋-相册' };
  });

  const handleFabClick = async () => {
    // 从localStorage读openId，来判断是否已经登陆
    let openId: string = getStorageSync('openId');
    if (openId == '') {
      // 未登录或注册
      signUp(() => {
        navigateTo({ url: '../uploadImage/uploadImage' });
      });
    } else {
      // 已登陆，上传图片
      console.log('已登陆');
      navigateTo({ url: '../uploadImage/uploadImage' });
    }
  };

  return (
    <View className={style.content}>
      <View className={style.imageList}>
        <GridView type="masonry" crossAxisGap={10} mainAxisGap={15}>
          {images.map((image) => (
            <ImageItem
              image={image}
              key={image.imageUrl}
              isLike={likes.includes(image.imageUrl)}
            />
          ))}
        </GridView>
      </View>

      <AtFab className={style.fab} onClick={handleFabClick}>
        <Text className="at-fab__icon at-icon at-icon-add"></Text>
      </AtFab>
    </View>
  );
}

export default Gallery;
