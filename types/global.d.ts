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
  Name: string;
  Campus: Campus;
  Avatar: string | null;
  Image: string | null;
  Gender: Gender;
  Color: string;
  Hair: Hair;
  Neutered: Neutered;
  State: State;
  Description: string;
  Birthday: string | null;
  AdoptionDay: string | null;
  Position: string | null;
  Longitude: number | null;
  Latitude: number | null;
  OrderWeight: number | null;
}

declare enum Campus {
  '本部' = '本部',
  '通州' = '通州',
  '中篮' = '中篮',
}

declare enum Gender {
  '公' = '公',
  '母' = '母',
  '未知' = '未知',
}

declare enum Hair {
  '长毛',
  '短毛',
}

declare enum Neutered {
  '已绝育',
  '未绝育',
}

declare enum State {
  '在校' = '在校',
  '毕业' = '毕业',
  '休学' = '休学',
  '喵星' = '喵星',
}
