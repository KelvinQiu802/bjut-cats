import { View } from '@tarojs/components';
import { useLoad, navigateTo } from '@tarojs/taro';
import { useEffect, useMemo, useState } from 'react';
import { AtDivider } from 'taro-ui';
import dataString from '../../../data/dataString';
import style from './result.module.css';
import CatLink from '../index/components/CatLink';

function Result() {
  // 目前搜索功能会在所有猫中搜索，不会按照校区进行搜索
  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState<Cat[]>([]);

  const cats: Cat[] = useMemo(() => JSON.parse(dataString), []);

  useLoad((option) => {
    setSearchValue(option.search);
  });

  useEffect(() => {
    setResult(
      cats.filter((cat) =>
        cat.Name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  const handleNavigate = (cat: Cat) => {
    navigateTo({
      url: `../detail/detail?model=${encodeURIComponent(JSON.stringify(cat))}`,
    });
  };

  return (
    <View className="content">
      <View className={style.catList}>
        {result.map((cat) => {
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
      <AtDivider content="没有更多猫猫啦" fontColor="#bbb" />
    </View>
  );
}

export default Result;
