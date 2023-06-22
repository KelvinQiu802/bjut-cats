import { useEffect, useMemo, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import dataString from '../../../data/dataString';
import style from './index.module.css';
import CatLink from './components/CatLink';
import StateBar from './components/StateBar';

export default function Index() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [state, setState] = useState<State>('在校');
  const allCats: Cat[] = useMemo( () => JSON.parse(dataString), [dataString])

  useLoad(() => {
    console.log('Index Page loaded.');
    setCats(JSON.parse(dataString));
  });

  useEffect(() => {
    setCats(() => {
      const filtered = allCats.filter((cat) => cat.State == state);
      return filtered;
    });
  }, [state]);

  return (
    <View className='content'>
      <StateBar state={state} setState={setState} />
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
