import { navigateTo } from '@tarojs/taro';
import { useRef } from 'react';
import { Form, Image, Input, View } from '@tarojs/components';
import style from './Search.module.css';
import searchIcon from '../../../icon/search.png';

function Search() {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <View className={style.box}>
      <Image
        src={searchIcon}
        className={style.icon}
        onClick={() => {
          inputRef.current?.focus();
        }}
      />
      <Form>
        <Input
          placeholder="搜索猫猫"
          className={style.input}
          onConfirm={(e) => {
            navigateTo({
              url: `../result/result?search=${e.detail.value}`,
            });
          }}
          ref={inputRef}
        />
      </Form>
    </View>
  );
}

export default Search;
