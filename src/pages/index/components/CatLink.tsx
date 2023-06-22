import { Image, Text, View } from '@tarojs/components';
import style from './CatLink.module.css';

interface Props {
  cat: Cat;
}

const defaultImg =
  'https://imgbed.codingkelvin.fun/uPic/placeholder345734852.jpg';

function CatLink({ cat }: Props) {
  return (
    <View className={style.row}>
      {cat.Avatar ? (
        <Image src={cat.Avatar} className={style.img} />
      ) : (
        <Image src={defaultImg} className={style.defaultImg} />
      )}
      <View className={style.right}>
        <Text className={style.name}>{cat.Name}</Text>
      </View>
    </View>
  );
}

export default CatLink;
