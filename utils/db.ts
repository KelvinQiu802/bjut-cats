import { setStorageSync, navigateTo, showToast } from '@tarojs/taro';
import { requestAwait, loginAwait } from './await';

export const API_HOST =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:7070'
    : 'https://animalwatch.codingkelvin.fun';

export async function getUserFromDB(openId: string): Promise<any> {
  const result = await requestAwait('GET', `${API_HOST}/api/users/${openId}`);
  return result;
}

export async function getOpenId(code: string): Promise<string> {
  const { data } = (await requestAwait(
    'GET',
    `${API_HOST}/api/jscode2session?js_code=${code}`
  )) as { data: { openid: string; session_key: string } };
  return data.openid;
}

export async function signUp(callback: () => {}) {
  // 没有登陆, 调用login，请求api，获得openId，
  try {
    const { code } = await loginAwait();
    const openId = await getOpenId(code);
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
      callback();
    }
  } catch (err) {
    showToast({ title: err.message, icon: 'error' });
  }
}
