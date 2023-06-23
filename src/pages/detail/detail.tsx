import { useLoad } from '@tarojs/taro';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';
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
        {cat.Image ? (
          <Image className={style.img} src={cat.Image} />
        ) : (
          <Image className={style.img} src={defaultImg} />
        )}
        <Text className={style.name}>{cat.Name}</Text>
        <View className={style.info}>
          <View className={style.row}>
            <View className={style.item}>
              <Text className={style.top}>性别</Text>
              <Text className={style.bottom}>{cat.Gender}</Text>
            </View>
            <View className={style.item}>
              <Text className={style.top}>毛色</Text>
              <Text className={style.bottom}>{cat.Color}</Text>
            </View>
          </View>
          <View className={style.row}>
            <View className={style.item}>
              <Text className={style.top}>毛长</Text>
              <Text className={style.bottom}>{cat.Hair}</Text>
            </View>
            <View className={style.item}>
              <Text className={style.top}>绝育情况</Text>
              <Text className={style.bottom}>{cat.Neutered}</Text>
            </View>
          </View>
          <View className={style.row}>
            <View className={style.item}>
              <Text className={style.top}>校区</Text>
              <Text className={style.bottom}>{cat.Campus}</Text>
            </View>
            <View className={style.item} onClick={() => setShowStateMsg(true)}>
              <View className={style.topWithIcon}>
                <Text className={style.top}>状态</Text>
                <Image src={questionIcon} className={style.question} />
              </View>
              <Text className={style.bottom}>{cat.State}</Text>
            </View>
          </View>
          <View className={style.row}>
            {cat.Birthday && (
              <View className={style.item}>
                <Text className={style.top}>出生日期</Text>
                <Text className={style.bottom}>{removeDay(cat.Birthday)}</Text>
              </View>
            )}
            {cat.AdoptionDay && (
              <View className={style.item}>
                <Text className={style.top}>送养日期</Text>
                <Text className={style.bottom}>
                  {removeDay(cat.AdoptionDay)}
                </Text>
              </View>
            )}
          </View>
          <View className={style.row}>
            <View className={style.item}>
              <Text className={style.top}>描述</Text>
              <Text className={style.bottom}>{cat.Description}</Text>
            </View>
          </View>
          <View className={style.row}>
            {cat.Longitude && cat.Latitude && cat.Position && (
              <View className={style.item}>
                <Text className={style.top}>位置</Text>
                <Text className={style.bottom}>{cat.Position}</Text>
                <Map
                  longitude={cat.Longitude}
                  latitude={cat.Latitude}
                  scale={14}
                  enableSatellite
                  markers={[
                    {
                      longitude: cat.Longitude,
                      latitude: cat.Latitude,
                      iconPath: '',
                    },
                  ]}
                  className={style.map}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

export default Detail;
