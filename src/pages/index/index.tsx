import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import style from './index.module.css';

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  return (
    <View className='content'>
      <Text>Hello world!</Text>
    </View>
  );
}
