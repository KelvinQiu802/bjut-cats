import { View, WebView } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import React, { useState } from 'react';

export default function Article() {
  const [link, setLink] = useState('');

  useLoad((option) => {
    setLink(option.link);
  });

  return <WebView src={link} />;
}
