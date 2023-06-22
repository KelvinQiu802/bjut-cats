import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import dataString from '../../../data/dataString';
import { useState } from 'react';
import style from './index.module.css';
import CatLink from './components/CatLink';

export default function Index() {
  const [cats, setCats] = useState<Cat[]>([]);

  useLoad(() => {
    console.log('Index Page loaded.');
    setCats(JSON.parse(dataString));
  });

  return (
    <View className='content'>
      {cats.map((cat) => {
        return (
          <View key={cat.Name}>
            <CatLink cat={cat} />
          </View>
        );
      })}
    </View>
  );
}
