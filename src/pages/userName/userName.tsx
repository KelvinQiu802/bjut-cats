import { Button, Form, Input, Text, View } from '@tarojs/components';
import { navigateBack, showToast, getStorageSync } from '@tarojs/taro';
import { isValidUserName } from '../../../utils/validation';
import { post, sleep } from '../../../utils/await';

const API_HOST =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:7070'
    : 'https://animalwatch.codingkelvin.fun';

function UserName() {
  const handleSubmit = async (e) => {
    const userName = e.detail.value.userName;
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
      <Form onSubmit={handleSubmit}>
        <Input
          type="nickname"
          className="weui-input"
          name="userName"
          placeholder="请输入昵称"
        />
        <Button formType="submit">确定</Button>
        <Text>用户名不能为空，且不多于10个字符</Text>
      </Form>
    </View>
  );
}

export default UserName;
