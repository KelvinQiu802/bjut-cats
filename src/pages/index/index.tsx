import { useEffect, useMemo, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { useLoad, navigateTo } from '@tarojs/taro';
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
      let orderByWeight = filtered.sort((a, b) => {
        const weightA = a.OrderWeight ? a.OrderWeight : 0;
        const weightB = b.OrderWeight ? b.OrderWeight : 0;
        return weightB - weightA;
      })
      return orderByWeight;
    });
  }, [state, campus]);

  const handleNavigate = (cat: Cat) => {
    navigateTo({url: `../detail/detail?model=${encodeURIComponent(JSON.stringify(cat))}`})
  }

  return (
    <View className='content'>
      <CampusForm campus={campus} setCampus={setCampus}/>
      <StateBar state={state} setState={setState} />
      {cats.map((cat) => {
        return (
          <View key={cat.Name} onClick={() => {handleNavigate(cat)}}>
            <CatLink cat={cat} />
          </View>
        );
      })}
    </View>
  );
}
