import { useState } from 'react';
import { Text, View, GridView } from '@tarojs/components';
import {
  usePullDownRefresh,
  useShareAppMessage,
  useShareTimeline,
  getStorageSync,
  setStorageSync,
  showToast,
  navigateTo,
  useDidShow,
  stopPullDownRefresh,
} from '@tarojs/taro';
import { AtFab } from 'taro-ui';
import style from './gallery.module.css';
import { loginAwait, requestAwait } from '../../../utils/await';
import { getUserFromDB, getOpenId, API_HOST } from '../../../utils/db';
import ImageItem from './components/ImageItem';

function Gallery() {
  const [images, setImages] = useState<Image[]>([]);

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

  useDidShow(() => {
    refreshImages();
  });

  usePullDownRefresh(async () => {
    await refreshImages();
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
      // 没有登陆, 调用login，请求api，获得openId，
      try {
        const { code } = await loginAwait();
        openId = await getOpenId(code);
        setStorageSync('openId', openId);
        // 查询数据库
        const result = await getUserFromDB(openId);
        if (result.statusCode == 404) {
          // 如果没有对应用户，则要求设置用户名, 添加用户到数据库，设置storage登录状态, 上传图片
          console.log('NOT FOUND');
          // UserName页面得到userName,将新用户插入到数据库
          navigateTo({ url: '../userName/userName' });
          // 创建成功后会回到这个页面，用户需要重新点击添加按钮，这样直接进入已登陆的情况
        } else {
          // 已有该用户，则可以上传图片 (storage被清除后会出现这种情况)
          console.log('未登录，但用户存在');
          navigateTo({ url: '../uploadImage/uploadImage' });
        }
      } catch (err) {
        showToast({ title: err.message, icon: 'error' });
      }
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
            <ImageItem image={image} key={image.imageUrl} />
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
