import { useEffect, useState } from 'react';
import { request, showToast } from '@tarojs/taro';
import { API_HOST } from '../../utils/db';
import { setGlobal } from '../../utils/globalData';

export function useCats() {
  const [cats, setCats] = useState<Cat[]>([]);

  function update() {
    request({
      method: 'GET',
      url: `${API_HOST}/api/cats`,
      success: (res) => {
        setCats(res.data);
        setGlobal('allCats', res.data);
      },
      fail: (err) => {
        showToast({
          title: err.errMsg,
          icon: 'none',
        });
      },
    });
  }

  useEffect(() => {
    update();
  }, []);

  return [cats, update];
}
