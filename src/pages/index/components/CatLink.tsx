import { Image, Text, View } from '@tarojs/components';
import style from './CatLink.module.css';
import boyIcon from '../../../icon/boy.png';
import girlIcon from '../../../icon/girl.png';

interface Props {
  cat: Cat;
}

const defaultImg =
  'https://imgbed.codingkelvin.fun/uPic/placeholder345734852.jpg';

function CatLink({ cat }: Props) {
  return (
    <View className={style.row}>
      {cat.avatar ? (
        <Image src={cat.avatar} className={style.img} />
      ) : (
        <Image src={defaultImg} className={style.defaultImg} />
      )}
      <View className={style.right}>
        <Text className={style.name}>{cat.name}</Text>
        {cat.gender == '公' && <Image src={boyIcon} className={style.gender} />}
        {cat.gender == '母' && (
          <Image src={girlIcon} className={style.gender} />
        )}
      </View>
    </View>
  );
}

export default CatLink;
