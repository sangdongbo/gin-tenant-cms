import type { ProFormItemProps } from '@ant-design/pro-components';
import { InputNumber, Collapse, Space, Tooltip } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import style from './style.less';

interface PropsType extends ProFormItemProps {

}

const { Panel } = Collapse;

const CustomBudget = ({ value, onChange }: any) => {

  return (
    <>
      <InputNumber
        value={value}
        style={{ width: 328 }}
        formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        addonAfter="元/下单"
        placeholder="输入价格"
        onChange={onChange}
      />
      <div style={{ paddingTop: 10 }}>
        <Collapse
          style={{ width: 328 }}
          defaultActiveKey={['1']}
          expandIconPosition={'end'}
        >
          <Panel header="建议出价 0.93~1.81 元/点击" key="1">
            <Tooltip placement="right" title="点击可采用该出价">
              <Space style={{ width: '100%' }} direction="vertical">
                <div className={style['budget-header']}>
                  <div>出价</div>
                  <div>竞争胜出概率</div>
                </div>
                <div className={style['budget-high']} onClick={() => onChange?.(1.56)}>
                  <div>1.32 ~ 1.81</div>
                  <div>50%</div>
                </div>
                <div className={style['budget-in']} onClick={() => onChange?.(1.21)}>
                  <div>1.11 ~ 1.32</div>
                  <div>30%</div>
                </div>
                <div className={style['budget-low']} onClick={() => onChange?.(1.02)}>
                  <div>0.93 ~ 1.11</div>
                  <div>20%</div>
                </div>
              </Space>
            </Tooltip>
          </Panel>
        </Collapse>
      </div>
    </>
  )
}

const ProFormBudget = (props: PropsType) => {
  return (
    <ProForm.Item {...props}>
      <CustomBudget {...props} />
    </ProForm.Item>
  );
};

export default ProFormBudget;
