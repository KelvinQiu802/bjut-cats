import { Text, View } from '@tarojs/components';
import {
  useLoad,
  usePullDownRefresh,
  useShareAppMessage,
  useShareTimeline,
  getStorageSync,
  setStorageSync,
  showToast,
} from '@tarojs/taro';
import { AtFab } from 'taro-ui';
import style from './gallery.module.css';
import { loginAwait, get } from '../../../utils/await';

const API_HOST =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:7070'
    : 'https://animalwatch.codingkelvin.fun';

async function getOpenId(code: string): Promise<string> {
  const { data } = (await get(
    `${API_HOST}/api/jscode2session?js_code=${code}`
  )) as { data: { openid: string; session_key: string } };
  return data.openid;
}

async function getUserFromDB(openId: string): Promise<any> {
  const result = await get(`${API_HOST}/api/users/${openId}`);
  return result;
}

function Gallery() {
  useLoad(() => {});

  usePullDownRefresh(() => {});

  useShareAppMessage(() => {
    return {};
  });

  useShareTimeline(() => {
    return {};
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
        } else {
          // 已有该用户，则可以上传图片 (storage被清除后会出现这种情况)
          // result.data.userName
          console.log(result);
        }
      } catch (err) {
        showToast({ title: err.message });
      }
    } else {
      // 已登陆，上传图片
    }
  };

  return (
    <View className="content">
      <AtFab className={style.fab} onClick={handleFabClick}>
        <Text className="at-fab__icon at-icon at-icon-add"></Text>
      </AtFab>
    </View>
  );
}

export default Gallery;
