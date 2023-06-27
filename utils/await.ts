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

export function get(url: string, data = {}) {
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

export function post(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
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
