import { login, request } from '@tarojs/taro';

export function loginAwait() {
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

export function requestAwait(method: any, url: string, data = {}) {
  return new Promise((resolve, reject) => {
    request({
      method: method,
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

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
