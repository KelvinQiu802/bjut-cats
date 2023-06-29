import { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import {
  useLoad,
  showToast,
  setClipboardData,
  previewImage,
  useShareAppMessage,
  useShareTimeline,
  getStorageSync,
  navigateTo,
} from '@tarojs/taro';
import { AtDivider, AtButton } from 'taro-ui';
import style from './about.module.css';
import { requestAwait, loginAwait } from '../../../utils/await';
import { API_HOST, getOpenId } from '../../../utils/db';

const qrCodes = [
  'https://imgbed.codingkelvin.fun/uPic/qrcodeq34asdasd72rewfefw.png',
  'https://imgbed.codingkelvin.fun/uPic/shopqrcode2342ierhwef.jpg',
];
const logo = 'https://imgbed.codingkelvin.fun/uPic/newlogo235324.png';

export default function Index() {
  const [isAdminm, setIsAdmin] = useState(false);

  useLoad(async () => {
    let openId = getStorageSync('openId');
    if (openId == '') {
      // 处理openId不在storage里的情况
      const { code } = await loginAwait();
      openId = await getOpenId(code);
    }
    // 查数据库看是否是admin，从来没注册过的openId会404
    const { data, status } = (await requestAwait(
      'GET',
      `${API_HOST}/api/users/${openId}`
    )) as any;
    if (status == 404) return;
    if (data.role == 'admin') {
      setIsAdmin(true);
    }
  });

  useShareAppMessage(() => {
    return {
      title: '月亮湖猫屋',
      path: '/pages/about/about',
    };
  });

  useShareTimeline(() => {
    return {
      title: '月亮湖猫屋-协会介绍',
      path: '/pages/about/about',
    };
  });

  useLoad(() => {
    console.log('Page loaded.');
  });

  const copyGithubLink = () => {
    setClipboardData({
      data: 'https://github.com/KelvinQiu802/bjut-cats',
      success() {
        showToast({
          title: '复制成功',
        });
      },
    });
  };

  const handleImagePreview = (index: number) => {
    previewImage({
      urls: qrCodes,
      current: qrCodes[index],
      showmenu: true,
    });
  };

  return (
    <View className="content">
      <View className={style.centerContent}>
        <View className={style.logoBox}>
          <Image className={style.logo} src={logo} mode="widthFix" />
        </View>
      </View>
      <AtDivider className={style.divider} />
      <View className={style.contentBox}>
        <Text className={style.sectionTitle}>项目介绍</Text>
        <Text className={style.paragraph}>
          <Text className="bold">月亮湖猫屋</Text>
          ,在这里我们共同观察流浪动物的生活状况，一起学习了解流浪动物相关的各种信息和其他野生动物知识，用照片与文字记录ta们的一点一滴。
        </Text>
        <Text className={style.sectionTitle}>友情链接</Text>
        <View className={style.codeBox}>
          <Image
            src={qrCodes[0]}
            mode="widthFix"
            showMenuByLongpress
            className={style.qrcode}
            onClick={() => handleImagePreview(0)}
          />
          <Image
            src={qrCodes[1]}
            mode="widthFix"
            showMenuByLongpress
            className={style.qrcode}
            onClick={() => handleImagePreview(1)}
          />
        </View>
        <Text className={style.paragraph}>
          长按上方二维码关注
          <Text className="bold">公众号</Text>和
          <Text className="bold">微店</Text>
          ，猫猫文章和周边都会在上面发布噢～
        </Text>
        <Text className={style.sectionTitle}>项目开源</Text>
        <Text className={style.paragraph}>
          本项目使用
          <Text className="bold">MIT协议</Text>在
          <Text className="bold">Github开源</Text>
          ，若有需要可随意使用。
          <Text className={style.link} onClick={copyGithubLink}>
            点击
          </Text>
          以复制仓库地址，欢迎Issue和PR。
        </Text>
      </View>
      <AtDivider fontColor="#ccc">到底啦</AtDivider>
      {isAdminm && (
        <AtButton
          onClick={() => {
            navigateTo({ url: '../imageAdmin/imageAdmin' });
          }}
        >
          审核图片
        </AtButton>
      )}
    </View>
  );
}
