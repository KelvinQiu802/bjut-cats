import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import { Image, Map, Text, View } from '@tarojs/components'
import { removeDay } from '../../../utils/date'
import style from './detail.module.css'

const defaultImg =
  'https://imgbed.codingkelvin.fun/uPic/placeholder345734852.jpg'

function Detail() {
  const [cat, setCat] = useState<Cat>({} as Cat)

  useLoad((options) => {
    setCat(JSON.parse(decodeURIComponent(options.model)))
  })

  return (
    <View className="content">
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
            <View className={style.item}>
              <Text className={style.top}>状态</Text>
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
            <View className={style.item}>
              <Text className={style.top}>位置</Text>
              {cat.Longitude && cat.Latitude && (
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
              )}
              {cat.Position && (
                <Text className={style.bottom}>{cat.Position}</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Detail
