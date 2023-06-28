import { AtButton, AtForm, AtInput } from 'taro-ui';
import { useState } from 'react';
import { View } from '@tarojs/components';
import { navigateBack, showToast, getStorageSync } from '@tarojs/taro';
import { isValidUserName } from '../../../utils/validation';
import { post, sleep } from '../../../utils/await';
import style from './userName.module.css';

const API_HOST =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:7070'
    : 'https://animalwatch.codingkelvin.fun';

function UserName() {
  const [userName, setUserName] = useState('');

  const handleSubmit = async () => {
    if (isValidUserName(userName)) {
      // 从storage中读openId，将用户写入DB
      const openId = getStorageSync('openId');
      await post(`${API_HOST}/api/users`, { openId, userName });
      showToast({
        title: '创建成功',
      });
      await sleep(1000);
      navigateBack();
      return;
    }
    showToast({ title: '不符合要求', icon: 'error' });
  };

  return (
    <View className="content">
      <AtForm onSubmit={handleSubmit}>
        <AtInput
          autoFocus
          focus
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
        >
          提交
        </AtButton>
      </AtForm>
    </View>
  );
}

export default UserName;
