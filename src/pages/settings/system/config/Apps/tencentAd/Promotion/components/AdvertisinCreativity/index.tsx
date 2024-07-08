import { ProFormRadio } from '@ant-design/pro-components';
import { ProCard } from '@/components/BaseComponents';
import DynamicCreativity from './DynamicCreativity';

const campaignTypeOptions = [
  {
    label: '动态创意',
    value: '1',
  },
  {
    label: '自定义创意',
    value: '2',
    disabled: true,
  },
];


const AdvertisingCreativity = () => {
  return (
    <div style={{ paddingBottom: 12 }}>
      <ProFormRadio.Group
        name="type"
        label="是否新创建计划"
        radioType="button"
        initialValue={"1"}
        options={campaignTypeOptions}
        rules={[
          {
            required: true,
          }
        ]}
      />

      <ProCard>
        <DynamicCreativity />
      </ProCard>
    </div>
  );
};

export default AdvertisingCreativity;
