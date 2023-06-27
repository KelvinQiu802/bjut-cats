import { useEffect, useState } from 'react';
import { AtTabs, AtTabsPane, AtDivider } from 'taro-ui';
import { View } from '@tarojs/components';
import {
  useLoad,
  navigateTo,
  request,
  showToast,
  usePullDownRefresh,
  stopPullDownRefresh,
  useShareAppMessage,
  useShareTimeline,
} from '@tarojs/taro';
import style from './index.module.css';
import CatLink from './components/CatLink';
import CampusForm from './components/CampusForm';
import Search from './components/Search';
import { setGlobal } from '../../../utils/globalData';

export default function Index() {
  const [cats, setCats] = useState<Cat[]>([]);
  // 0: 在校 1:毕业 2:休学 3:喵星
  const [state, setState] = useState(0);
  const [campus, setCampus] = useState<Campus>('本部');
  const [allCats, setAllCats] = useState<Cat[]>([]);

  const API_HOST =
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:7070'
      : 'https://animalwatch.codingkelvin.fun';

  useShareAppMessage(() => {
    return {
      title: '月亮湖猫屋',
      path: '/pages/index/index',
    };
  });

  useShareTimeline(() => {
    return {
      title: '月亮湖猫屋',
      path: '/pages/index/index',
    };
  });

  useLoad(() => {
    console.log('Index Page loaded.');
    request({
      url: `${API_HOST}/api/cats`,
      method: 'GET',
      success: (res) => {
        setAllCats(res.data);
        setGlobal('allCats', res.data);
      },
      fail: (res) => {
        showToast({
          title: res.errMsg,
          icon: 'error',
        });
      },
    });
  });

  usePullDownRefresh(() => {
    request({
      url: `${API_HOST}/api/cats`,
      method: 'GET',
      success: (res) => {
        setAllCats(res.data);
        setGlobal('allCats', res.data);
      },
      fail: (res) => {
        showToast({
          title: res.errMsg,
          icon: 'error',
        });
      },
      complete: () => {
        stopPullDownRefresh();
      },
    });
  });

  useEffect(() => {
    setCats(() => {
      let filtered = allCats.filter((cat) => cat.campus == campus);
      let orderByWeight = filtered.sort((a, b) => {
        const weightA = a.orderWeight ? a.orderWeight : 0;
        const weightB = b.orderWeight ? b.orderWeight : 0;
        return weightB - weightA;
      });
      return orderByWeight;
    });
  }, [campus, allCats]);

  const handleNavigate = (cat: Cat) => {
    navigateTo({
      url: `../detail/detail?model=${encodeURIComponent(JSON.stringify(cat))}`,
    });
  };

  return (
    <View className="content">
      <View className={style.form}>
        <CampusForm campus={campus} setCampus={setCampus} />
        <Search />
      </View>
      <AtTabs
        animated={false}
        current={state}
        swipeable
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
              .filter((cat) => cat.state == '在校')
              .map((cat) => {
                return (
                  <View
                    key={cat.name}
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
              .filter((cat) => cat.state == '毕业')
              .map((cat) => {
                return (
                  <View
                    key={cat.name}
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
              .filter((cat) => cat.state == '休学')
              .map((cat) => {
                return (
                  <View
                    key={cat.name}
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
              .filter((cat) => cat.state == '喵星')
              .map((cat) => {
                return (
                  <View
                    key={cat.name}
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
