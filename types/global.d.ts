/// <reference types="@tarojs/taro" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV:
      | 'weapp'
      | 'swan'
      | 'alipay'
      | 'h5'
      | 'rn'
      | 'tt'
      | 'quickapp'
      | 'qq'
      | 'jd';
  }
}

interface Cat {
  name: string;
  campus: Campus;
  avatar: string | null;
  image: string | null;
  gender: Gender;
  color: string;
  hair: Hair;
  neutered: Neutered;
  state: State;
  description: string;
  birthday: string | null;
  adoptionDay: string | null;
  position: string | null;
  longitude: number | null;
  latitude: number | null;
  orderWeight: number | null;
}

interface Image {
  openId: string;
  imageUrl: string;
  catName: string;
  campus: Campus;
  state: ImageState;
}

interface ImageLike {
  openId: string;
  imageUrl: string;
  timee: Date;
}

interface Article {
  title: string;
  subTitle: string;
  image: string;
  link: string;
}

type Campus = '本部' | '通州' | '中篮';

type Gender = '公' | '母' | '未知';

type Hair = '长毛' | '短毛';

type Neutered = '已绝育' | '未绝育' | '未知';

type State = '在校' | '毕业' | '休学' | '喵星';

type ImageState = '待审核' | '通过' | '不通过' | '精选';
