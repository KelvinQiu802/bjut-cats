import { useEffect, useMemo, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import dataString from '../../../data/dataString';
import style from './index.module.css';
import CatLink from './components/CatLink';
import StateBar from './components/StateBar';
import CampusForm from './components/CampusForm';

export default function Index() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [state, setState] = useState<State>('在校');
  const [campus, setCampus] = useState<Campus>('本部');
  const allCats: Cat[] = useMemo( () => JSON.parse(dataString), [dataString])

  useLoad(() => {
    console.log('Index Page loaded.');
    setCats(JSON.parse(dataString));
  });

  useEffect(() => {
    setCats(() => {
      let filtered = allCats.filter((cat) => cat.State == state);
      filtered = filtered.filter(cat => cat.Campus == campus);
      return filtered;
    });
  }, [state, campus]);


  return (
    <View className='content'>
      <CampusForm campus={campus} setCampus={setCampus}/>
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
