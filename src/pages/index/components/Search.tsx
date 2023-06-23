import { Form, Image, Input, View } from '@tarojs/components'
import style from './Search.module.css'
import searchIcon from '../../../icon/search.png'

interface Props {
  searchWord: string
  setSearchWord: React.Dispatch<React.SetStateAction<string>>
}

function Search({ setSearchWord, searchWord }: Props) {
  return (
    <View className={style.box}>
      <Image src={searchIcon} className={style.icon} />
      <Form>
        <Input
          placeholder="搜索猫猫"
          className={style.input}
          value={searchWord}
          cursor={searchWord.length}
          onConfirm={(e) => {
            setSearchWord(e.detail.value)
          }}
        />
      </Form>
    </View>
  )
}

export default Search
