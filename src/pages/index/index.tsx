import { useEffect, useMemo, useState } from 'react';
import { View } from '@tarojs/components';
import { useLoad, navigateTo } from '@tarojs/taro';
import dataString from '../../../data/dataString';
import style from './index.module.css';
import CatLink from './components/CatLink';
import { AtTabs, AtTabsPane } from 'taro-ui';
import CampusForm from './components/CampusForm';
import Search from './components/Search';
import { AtDivider } from 'taro-ui';

export default function Index() {
  const [cats, setCats] = useState<Cat[]>([]);
  // 0: 在校 1:毕业 2:休学 3:喵星
  const [state, setState] = useState(0);
  const [campus, setCampus] = useState<Campus>('本部');
  const [searchWord, setSearchWord] = useState('');
  const allCats: Cat[] = useMemo(() => JSON.parse(dataString), [dataString]);

  useLoad(() => {
    console.log('Index Page loaded.');
    setCats(JSON.parse(dataString));
  });

  useEffect(() => {
    setCats(() => {
      let filtered = allCats.filter((cat) => cat.Campus == campus);
      filtered = filtered.filter((cat) =>
        cat.Name.toLowerCase().includes(searchWord.toLowerCase())
      );
      let orderByWeight = filtered.sort((a, b) => {
        const weightA = a.OrderWeight ? a.OrderWeight : 0;
        const weightB = b.OrderWeight ? b.OrderWeight : 0;
        return weightB - weightA;
      });
      return orderByWeight;
    });
  }, [campus, searchWord]);

  const handleNavigate = (cat: Cat) => {
    navigateTo({
      url: `../detail/detail?model=${encodeURIComponent(JSON.stringify(cat))}`,
    });
  };

  return (
    <View className="content">
      <View className={style.form}>
        <CampusForm campus={campus} setCampus={setCampus} />
        <Search searchWord={searchWord} setSearchWord={setSearchWord} />
      </View>
      <AtTabs
        animated={false}
        current={state}
        swipeable={true}
        tabList={[
          { title: '在校' },
          { title: '毕业' },
          { title: '休学' },
          { title: '喵星' },
        ]}
        onClick={(index) => {
          setState(index);
        }}
        className={style.stateTab}
      >
        <AtTabsPane current={state} index={0}>
          <View className={style.catList}>
            {cats
              .filter((cat) => cat.State == '在校')
              .map((cat) => {
                return (
                  <View
                    key={cat.Name}
                    onClick={() => {
                      handleNavigate(cat);
                    }}
                  >
                    <CatLink cat={cat} />
                  </View>
                );
              })}
          </View>
        </AtTabsPane>
        <AtTabsPane current={state} index={1}>
          <View className={style.catList}>
            {cats
              .filter((cat) => cat.State == '毕业')
              .map((cat) => {
                return (
                  <View
                    key={cat.Name}
                    onClick={() => {
                      handleNavigate(cat);
                    }}
                  >
                    <CatLink cat={cat} />
                  </View>
                );
              })}
          </View>
        </AtTabsPane>
        <AtTabsPane current={state} index={2}>
          <View className={style.catList}>
            {cats
              .filter((cat) => cat.State == '休学')
              .map((cat) => {
                return (
                  <View
                    key={cat.Name}
                    onClick={() => {
                      handleNavigate(cat);
                    }}
                  >
                    <CatLink cat={cat} />
                  </View>
                );
              })}
          </View>
        </AtTabsPane>
        <AtTabsPane current={state} index={3}>
          <View className={style.catList}>
            {cats
              .filter((cat) => cat.State == '喵星')
              .map((cat) => {
                return (
                  <View
                    key={cat.Name}
                    onClick={() => {
                      handleNavigate(cat);
                    }}
                  >
                    <CatLink cat={cat} />
                  </View>
                );
              })}
          </View>
        </AtTabsPane>
      </AtTabs>
      <AtDivider content="没有更多猫猫啦" fontColor="#bbb" />
    </View>
  );
}
