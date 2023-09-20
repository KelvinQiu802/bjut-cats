import { Text, View } from '@tarojs/components';
import React from 'react';
import Article from './components/article';
import style from './articles.module.css';
import { AtDivider } from 'taro-ui';

const ARTICLES: Article[] = [
  {
    title: '小猫虽好，摸前三思',
    subTitle: '银河系BJUT星球喵星人相处指南',
    image: 'https://imgbed.codingkelvin.fun/uPic/4491695221753_.pic.jpg',
    link: 'https://mp.weixin.qq.com/s/TdFEFqk5Qm00jeZbsMyT_Q',
  },
  {
    title: '讣告-丢丢',
    subTitle: '得而复失的"家"将她推向残酷自然',
    image: 'https://imgbed.codingkelvin.fun/uPic/uN4mQ8.png',
    link: 'https://mp.weixin.qq.com/s/k1uVPjKZY90K3J2H5ajIxw',
  },
  {
    title: '我们将不会救助',
    subTitle:
      '借由本次十号楼下遗弃折耳三花幼猫事件，为避免类似事件发生，并再次明确猫屋的救助工作，月亮湖猫屋郑重发出声明',
    image: 'https://imgbed.codingkelvin.fun/uPic/4031694849929_.pic.jpg',
    link: 'https://mp.weixin.qq.com/s/NqwSluQgQVwCW_6DKzbLEA',
  },
  {
    title: '春日宴｜春季义卖活动来喽～',
    subTitle: '以春为期，以爱为缘！',
    image: 'https://imgbed.codingkelvin.fun/uPic/4021694849619_.pic.jpg',
    link: 'https://mp.weixin.qq.com/s/iWITCdSUVVHDyLCui0ttdg',
  },
];

function Articles() {
  return (
    <View className={style.content}>
      {ARTICLES.map((article) => (
        <Article
          key={article.title}
          title={article.title}
          subTitle={article.subTitle}
          image={article.image}
          link={article.link}
        />
      ))}
      <AtDivider content="没有更多文章啦" fontColor="#bbb" />
    </View>
  );
}

export default Articles;
