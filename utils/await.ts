import { login, request } from '@tarojs/taro';

export async function loginAwait() {
  return new Promise<{ code: string; errMsg: string }>((resolve, reject) => {
    login({
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(new Error(res.errMsg));
      },
    });
  });
}

export async function get(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url: url,
      data: data,
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(new Error(res.errMsg));
      },
    });
  });
}
