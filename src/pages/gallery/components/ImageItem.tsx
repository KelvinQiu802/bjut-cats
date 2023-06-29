import { useEffect, useState } from 'react';
import { Image, Text, View } from '@tarojs/components';
import { previewImage } from '@tarojs/taro';
import style from './ImageItem.module.css';
import { getUserFromDB } from '../../../../utils/db';
import likeIcon from '../../../icon/like.png';
import likeFill from '../../../icon/like_fill.png';

interface Props {
  image: Image;
}

function ImageItem({ image }: Props) {
  const [userName, setUserName] = useState('');
  const [like, setLike] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await getUserFromDB(image.openId);
      setUserName(data.userName);
    })();
  }, []);

  const handleLike = () => {
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
