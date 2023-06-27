import { Button, Form, Input, Text, View } from '@tarojs/components';
import { setStorageSync, navigateBack, showToast } from '@tarojs/taro';
import { isValidUserName } from '../../../utils/validation';

function UserName() {
  const handleSubmit = (e) => {
    const userName = e.detail.value.userName;
    if (isValidUserName(userName)) {
      setStorageSync('userName', userName);
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
