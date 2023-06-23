import { View, Text, Image } from '@tarojs/components'
import { useLoad, showToast, setClipboardData } from '@tarojs/taro'
import { AtDivider } from 'taro-ui'
import style from './about.module.css'
import logo from '../../icon/logo.png'
import qrcode from '../../icon/qrcode.png'
import shopcode from '../../icon/shopqrcode.jpg'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const copyGithubLink = () => {
    setClipboardData({
      data: 'https://github.com/KelvinQiu802/bjut-cats',
      success() {
        showToast({
          title: '复制成功',
        })
      },
    })
  }

  return (
    <View className="content">
      <View className={style.centerContent}>
        <Text className={style.title}>北工大小动物观赏协会</Text>
        <View className={style.logoBox}>
          <Image className={style.logo} src={logo} mode="widthFix" />
        </View>
      </View>
      <AtDivider className={style.divider} />
      <View className={style.contentBox}>
        <Text className={style.sectionTitle}>协会介绍</Text>
        <Text className={style.paragraph}>
          <Text className="bold">小动物观赏协会</Text>
          是一个致力于为校内同学们提供有关野生动物与校园流浪小动物
          <Text className="underline">TNR、保健和治疗等</Text>
          方面知识与交流平台的学生社团，在这里，我们共同观察校园内流浪动物与野生动物的生活状况，一起学习了解流浪动物相关的各种信息和其他野生动物知识，用照片与文字记录ta们的一点一滴。
        </Text>
        <Text className={style.paragraph}>
          由于
          <Text className="bold">校园常驻流浪动物以猫咪为主</Text>
          ，再加上学校里的毛孩子们都性格鲜明，身怀绝技，深受大家喜爱，“
          <Text className="italic">秃秃</Text>
          ”、“
          <Text className="italic">校霸</Text>
          ”、“
          <Text className="italic">井盖儿</Text>
          ”：一个个名字口口相传而来，一段段共同度过的故事牵起回忆。除了“观赏”之外，社团也在尽最大能力对校园内流浪猫进行
          <Text className="bold">TNR</Text>
          <Text className="underline">(Trap抓捕/Neuter绝育/Release放归)</Text>、
          <Text className="bold">救助</Text>、<Text className="bold">领养</Text>
          ，控制校园流浪猫数量，并通过科普宣传帮助同学们与校园流浪动物和谐共处,，共同营造生态友好环境美丽的工大校园。
        </Text>
        <Text className={style.sectionTitle}>找到我们</Text>
        <View className={style.codeBox}>
          <Image
            src={qrcode}
            mode="widthFix"
            showMenuByLongpress
            className={style.qrcode}
          />
          <Image
            src={shopcode}
            mode="widthFix"
            showMenuByLongpress
            className={style.qrcode}
          />
        </View>
        <Text className={style.paragraph}>
          长按上方二维码关注社团
          <Text className="bold">公众号</Text>和
          <Text className="bold">微店</Text>
          ，社团动向和猫猫周边
          <Text className="underline">义卖活动</Text>
          都会在上面发布噢～
        </Text>
        <Text className={style.sectionTitle}>项目开源</Text>
        <Text className={style.paragraph}>
          本项目使用
          <Text className="bold">MIT协议</Text>在
          <Text className="bold">Github开源</Text>
          ，若有需要可随意使用。项目中的
          <Text className="underline">
            猫咪信息、图片、文字内容归北京工业大学小动物保护协会所有
          </Text>
          ，若有使用需要，请联系协会。
          <Text className={style.link} onClick={copyGithubLink}>
            点击
          </Text>
          以复制仓库地址，欢迎Issue和PR。
        </Text>
      </View>
      <AtDivider fontColor="#ccc">到底啦</AtDivider>
    </View>
  )
}
