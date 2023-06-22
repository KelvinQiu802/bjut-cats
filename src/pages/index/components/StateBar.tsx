import { View } from '@tarojs/components';
import style from './StateBar.module.css';

interface Props {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

function StateBar({ state, setState }: Props) {
  return (
    <View className={style.box}>
      <View
        onClick={() => setState('在校')}
        className={state == '在校' ? style.selected : style.item}
      >
        在校
      </View>
      <View
        onClick={() => setState('毕业')}
        className={state == '毕业' ? style.selected : style.item}
      >
        毕业
      </View>
      <View
        onClick={() => setState('休学')}
        className={state == '休学' ? style.selected : style.item}
      >
        休学
      </View>
      <View
        onClick={() => setState('喵星')}
        className={state == '喵星' ? style.selected : style.item}
      >
        喵星
      </View>
    </View>
  );
}

export default StateBar;
