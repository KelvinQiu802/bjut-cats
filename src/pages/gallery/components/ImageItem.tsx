import { useEffect, useState } from 'react';
import { Image, Text, View } from '@tarojs/components';
import { getStorageSync, previewImage } from '@tarojs/taro';
import style from './ImageItem.module.css';
import { getUserFromDB, API_HOST, signUp } from '../../../../utils/db';
import { requestAwait } from '../../../../utils/await';
import likeIcon from '../../../icon/like.png';
import likeFill from '../../../icon/like_fill.png';

interface Props {
  image: Image;
  isLike: boolean;
}

function ImageItem({ image, isLike }: Props) {
  const [userName, setUserName] = useState('');
  const [like, setLike] = useState(isLike);

  useEffect(() => {
    (async () => {
      const { data } = await getUserFromDB(image.openId);
      setUserName(data.userName);
    })();
  }, []);

  const handleLike = () => {
    const openId: string = getStorageSync('openId');
    // 先登录
    if (openId == '') {
      signUp(handleLike);
      return;
    }
    // 已登陆
    requestAwait('POST', `${API_HOST}/api/likes`, {
      openId: image.openId,
      imageUrl: image.imageUrl,
    });
    setLike(true);
  };

  return (
    <View className={style.card}>
      <Image
        src={image.imageUrl}
        mode="widthFix"
        style={{
          width: '100%',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        }}
        onClick={() => {
          previewImage({
            urls: [image.imageUrl],
            showmenu: true,
            current: image.imageUrl,
          });
        }}
      />
      <View className={style.bottom}>
        <View className={style.info}>
          <Text className={style.userName}>{userName}</Text>
          <Text
            className={style.catInfo}
          >{`${image.campus}/${image.catName}`}</Text>
        </View>
        {like ? (
          <Image src={likeFill} svg className={style.icon} />
        ) : (
          <Image
            src={likeIcon}
            svg
            onClick={handleLike}
            className={style.icon}
          />
        )}
      </View>
    </View>
  );
}

export default ImageItem;
