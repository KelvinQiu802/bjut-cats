import {
  request,
  stopPullDownRefresh,
  showToast,
  useLoad,
  usePullDownRefresh,
} from '@tarojs/taro';
import { AtDivider } from 'taro-ui';
import { View } from '@tarojs/components';
import React, { useState } from 'react';
import Article from './components/article';
import style from './articles.module.css';
import { API_HOST } from '../../../utils/db';

function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useLoad(() => {
    request({
      url: `${API_HOST}/api/articles`,
      method: 'GET',
      success: (res) => {
        setArticles(res.data);
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
      url: `${API_HOST}/api/articles`,
      method: 'GET',
      success: (res) => {
        setArticles(res.data);
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

  return (
    <View className={style.content}>
      {articles.reverse().map((article) => (
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
