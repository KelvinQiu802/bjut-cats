import { useLoad, useShareAppMessage } from '@tarojs/taro';
import { AtModal } from 'taro-ui';
import { useState } from 'react';
import { Image, Map, Text, View } from '@tarojs/components';
import { removeDay } from '../../../utils/date';
import style from './detail.module.css';
import questionIcon from '../../icon/question.png';

const defaultImg =
  'https://imgbed.codingkelvin.fun/uPic/placeholder345734852.jpg';

function Detail() {
  const [cat, setCat] = useState<Cat>({} as Cat);
  const [showStateMsg, setShowStateMsg] = useState(false);

  useShareAppMessage(() => {
    return {
      title: `BJUT猫屋-${cat.name}`,
      path: `./detail?model=${encodeURIComponent(JSON.stringify(cat))}`,
    };
  });

  useLoad((options) => {
    setCat(JSON.parse(decodeURIComponent(options.model)));
  });

  return (
    <View className="content">
      <AtModal
        isOpened={showStateMsg}
        title="在校状态说明"
        confirmText="知道啦"
        onClose={() => setShowStateMsg(false)}
        onCancel={() => setShowStateMsg(false)}
        onConfirm={() => setShowStateMsg(false)}
        content={
          '• 在校: 健康生活在学校中\n• 毕业: 已经找到家啦\n• 休学: 长时间失踪\n• 喵星: 猫猫回到了自己的世界'
        }
      />

      <View className={style.box}>
        {cat.image ? (
          <Image className={style.img} src={cat.image} />
        ) : (
          <Image className={style.img} src={defaultImg} />
        )}
        <Text className={style.name}>{cat.name}</Text>
        <View className={style.info}>
          <View className={style.row}>
            <View className={style.item}>
              <Text className={style.top}>性别</Text>
              <Text className={style.bottom}>{cat.gender}</Text>
            </View>
            <View className={style.item}>
              <Text className={style.top}>毛色</Text>
              <Text className={style.bottom}>{cat.color}</Text>
            </View>
          </View>
          <View className={style.row}>
            <View className={style.item}>
              <Text className={style.top}>毛长</Text>
              <Text className={style.bottom}>{cat.hair}</Text>
            </View>
            <View className={style.item}>
              <Text className={style.top}>绝育情况</Text>
              <Text className={style.bottom}>{cat.neutered}</Text>
            </View>
          </View>
          <View className={style.row}>
            <View className={style.item}>
              <Text className={style.top}>校区</Text>
              <Text className={style.bottom}>{cat.campus}</Text>
            </View>
            <View className={style.item} onClick={() => setShowStateMsg(true)}>
              <View className={style.topWithIcon}>
                <Text className={style.top}>状态</Text>
                <Image src={questionIcon} className={style.question} />
              </View>
              <Text className={style.bottom}>{cat.state}</Text>
            </View>
          </View>
          <View className={style.row}>
            {cat.birthday && (
              <View className={style.item}>
                <Text className={style.top}>出生日期</Text>
                <Text className={style.bottom}>{removeDay(cat.birthday)}</Text>
              </View>
            )}
            {cat.adoptionDay && (
              <View className={style.item}>
                <Text className={style.top}>送养日期</Text>
                <Text className={style.bottom}>
                  {removeDay(cat.adoptionDay)}
                </Text>
              </View>
            )}
          </View>
          {cat.description && (
            <View className={style.row}>
              <View className={style.item}>
                <Text className={style.top}>描述</Text>
                <Text className={style.bottom}>{cat.description}</Text>
              </View>
            </View>
          )}
          {cat.longitude != null &&
            cat.latitude != null &&
            cat.position != null && (
              <View className={style.row}>
                <View className={style.item}>
                  <Text className={style.top}>位置</Text>
                  <Text className={style.bottom}>{cat.position}</Text>
                  <Map
                    longitude={cat.longitude}
                    latitude={cat.latitude}
                    scale={14}
                    enableSatellite
                    markers={[
                      {
                        longitude: cat.longitude,
                        latitude: cat.latitude,
                        iconPath: '',
                        id: 0,
                        width: 10,
                        height: 20,
                      },
                    ]}
                    className={style.map}
                  />
                </View>
              </View>
            )}
        </View>
      </View>
    </View>
  );
}

export default Detail;
