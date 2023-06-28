import { useState } from 'react';
import { Text, View, GridView, Image } from '@tarojs/components';
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

const API_HOST =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:7070'
    : 'https://animalwatch.codingkelvin.fun';

async function getOpenId(code: string): Promise<string> {
  const { data } = (await requestAwait(
    'GET',
    `${API_HOST}/api/jscode2session?js_code=${code}`
  )) as { data: { openid: string; session_key: string } };
  return data.openid;
}

async function getUserFromDB(openId: string): Promise<any> {
  const result = await requestAwait('GET', `${API_HOST}/api/users/${openId}`);
  return result;
}

function Gallery() {
  const [images, setImages] = useState<Image[]>([]);

  async function refreshImages() {
    const { data } = (await requestAwait(
      'GET',
      `${API_HOST}/api/images/通过`
    )) as {
      data: Image[];
    };
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
    <View className="content">
      <GridView type="masonry" crossAxisGap={10}>
        {images.map((image) => (
          <Image
            key={image.imageUrl}
            src={`${image.imageUrl}`}
            style={{ height: '180px' }}
            mode="aspectFit"
          />
        ))}
      </GridView>

      <AtFab className={style.fab} onClick={handleFabClick}>
        <Text className="at-fab__icon at-icon at-icon-add"></Text>
      </AtFab>
    </View>
  );
}

export default Gallery;
