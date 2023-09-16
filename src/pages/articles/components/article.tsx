import { Image, Text, View } from '@tarojs/components';
import style from './article.module.css';
import React from 'react';

function Article(props: Article) {
  return (
    <View className={style.articleCard}>
      <Image
        src={props.image}
        mode="widthFix"
        style={{ width: '100%' }}
        className={style.image}
      />
      <View className={style.text}>
        <Text className={style.title}>{props.title}</Text>
        <Text className={style.subTitle}>{props.subTitle}</Text>
      </View>
    </View>
  );
}

export default Article;
