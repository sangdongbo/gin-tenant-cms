import { Typography } from 'antd';
import { ProFormRadio } from '@ant-design/pro-components';
import AdvertisinCreativity from '../components/AdvertisinCreativity';
const { Title } = Typography;

const campaignTypeOptions = [
  {
    label: '动态创意',
    value: '1',
  },
  {
    label: '自定义创意',
    value: '2',
  },
];

const Step3 = () => {
  return (
    <div>
      <Title level={5}>
        广告创意
      </Title>
      <AdvertisinCreativity />
    </div>
  );
};

export default Step3;
