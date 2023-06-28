import { AtButton, AtInput } from 'taro-ui';
import { useState } from 'react';
import { View } from '@tarojs/components';
import { navigateBack, showToast, getStorageSync } from '@tarojs/taro';
import { isValidUserName } from '../../../utils/validation';
import { requestAwait, sleep } from '../../../utils/await';
import style from './userName.module.css';

const API_HOST =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:7070'
    : 'https://animalwatch.codingkelvin.fun';

function UserName() {
  const [userName, setUserName] = useState('');

  const handleSubmit = async () => {
    console.log('CLICK');
    if (isValidUserName(userName)) {
      // 从storage中读openId，将用户写入DB
      const openId = getStorageSync('openId');
      try {
        await requestAwait('POST', `${API_HOST}/api/users`, {
          openId,
          userName,
          role: 'user',
        });
        showToast({
          title: '创建成功',
        });
      } catch (err) {
        showToast({ title: err.message, icon: 'error' });
      }
      await sleep(1000);
      navigateBack();
      return;
    }
    showToast({ title: '不符合要求', icon: 'error' });
  };

  return (
    <View className="content">
      <AtInput
        autoFocus
        name="userName"
        title="用户名:"
        type="text"
        placeholder="不超过10个字符"
        value={userName}
        onChange={(v) => setUserName(v as string)}
        className={style.input}
      />
      <AtButton
        formType="submit"
        disabled={!isValidUserName(userName)}
        type="primary"
        className={style.btn}
        onClick={handleSubmit}
      >
        提交
      </AtButton>
    </View>
  );
}

export default UserName;
