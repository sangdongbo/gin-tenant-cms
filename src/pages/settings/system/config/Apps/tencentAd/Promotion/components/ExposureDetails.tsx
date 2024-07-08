import { Divider, Descriptions, Anchor } from 'antd';
import { StatisticCard } from '@ant-design/pro-components';
import { ProCard } from '@/components/BaseComponents';
import style from './style.less';

const { Statistic } = StatisticCard;


const ExposureDetails = () => {

  return (
    <Anchor className={style['exposure-details']}>
      <ProCard>
        <Statistic
          title="预估单日最大覆盖人群"
          value={1982312}
          layout="vertical"
          suffix="人"
          tip="基于当前选择的版位、定向预估的单日覆盖的活跃用户数"
        />
        <Statistic
          title="预估单日最大曝光量"
          value={3365052416}
          layout="vertical"
          suffix="次"
          tip="基于活跃用户数预估的单日最大曝光量，实际曝光量受预算、出价、创意及竞争环境影响"
        />
        <Divider />

        <Descriptions column={1}>
          <Descriptions.Item label="已选版位">优量汇</Descriptions.Item>
          <Descriptions.Item label="场景">未选择</Descriptions.Item>
          <Descriptions.Item label="已选定向">不限</Descriptions.Item>
        </Descriptions>
      </ProCard>
    </Anchor>
  )
};

export default ExposureDetails;
