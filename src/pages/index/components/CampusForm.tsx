import { Form, Image, Picker, Text, View } from '@tarojs/components';
import campusIcon from '../../../icon/campus.png';
import style from './CampusForm.module.css';

interface Props {
  campus: Campus;
  setCampus: React.Dispatch<React.SetStateAction<Campus>>;
}

const options: Campus[] = ['本部', '通州', '中篮'];

function CampusForm({ campus, setCampus }: Props) {
  return (
    <View className={style.box}>
      <Form>
        <Picker
          onChange={(e) => setCampus(options[e.detail.value])}
          range={options}
          className={style.picker}
        >
          <View className={style.inner}>
            <Image src={campusIcon} className={style.icon} />
            <Text className={style.text}>{`${campus}校区`}</Text>
          </View>
        </Picker>
      </Form>
    </View>
  );
}

export default CampusForm;
