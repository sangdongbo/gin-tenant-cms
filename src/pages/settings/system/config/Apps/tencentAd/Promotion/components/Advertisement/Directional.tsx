import React from "react";
import { Divider } from 'antd';
import { ProFormRadio, ProFormDependency, ProFormSwitch, ProFormCheckbox, ProFormSelect } from '@ant-design/pro-components';
import { ProCard } from '@/components/BaseComponents';
import DirectionalCreate from "./DirectionalCreate";
import DirectionalSelect from "./DirectionalSelect";

const Directional = () => {

  const options = [
    {
      label: '新建定向',
      value: '1',
    },
    {
      label: '选择定向包',
      value: '2',
    },
  ];

  return (
    <ProCard title="定向">
      <ProFormRadio.Group
        name="directional_type"
        label="选择定向类型"
        radioType="button"
        initialValue="1"
        options={options}
        rules={[
          {
            required: true,
          }
        ]}
      />
      <ProFormDependency name={['directional_type']}>
        {({ directional_type }) => {
          if (directional_type == '1') return <DirectionalCreate />;
          if (directional_type == '2') return <DirectionalSelect />;
          return null;
        }}
      </ProFormDependency>

      <Divider style={{ margin: '15px 0' }} />

      <ProFormSwitch
        name="automatic_expansion"
        label="自动扩量"
        initialValue={false}
        tooltip={<>
          当能够将你的广告投放给更多合适的人群时，系统会在你所选的定向人群外，自动扩展人群 <a href="https://e.qq.com/ads/helpcenter/detail/?cid=517&pid=2002">了解更多</a>
        </>}
        fieldProps={{
          checkedChildren: '开启',
          unCheckedChildren: '关闭',
        }}
        rules={[{ required: true }]}
      />

      <ProFormDependency name={['automatic_expansion']}>
        {({ automatic_expansion }) => {
          if (automatic_expansion) {
            return (
              <>
                <ProFormCheckbox.Group
                  name="unbreakable_orientation"
                  label="不可突破定向"
                  tooltip={<>
                    如果广告对“地域”、“年龄”、“性别”范围有强制要求，可以使用不可突破定向来限制自动扩量人群的扩展范围。例如地域定向选择了上海，同时选择了地域不可突破定向，那么自动扩量将不会展示给上海地区之外的用户。
                    <a href="https://e.qq.com/ads/helpcenter/detail?cid=517&pid=2002">了解更多</a>
                  </>}
                  options={[
                    {
                      label: '地域',
                      value: 1,
                    },
                    {
                      label: '年龄',
                      value: 2,
                    },
                    {
                      label: '性别',
                      value: 3,
                    },
                    {
                      label: '学历',
                      value: 4,
                    }
                  ]}
                  rules={[{ required: true }]}
                />

                <ProFormSelect
                  width="md"
                  name="expan_seed_population"
                  label="扩量种子人群(选填)"
                  tooltip={<>
                    <div>当广告的转化数据不充分时，系统会学习你选择的人群包数据，帮助提升广告投放效果。建议你在新广告投放初期便开启本功能。</div>
                    <div>人群包质量会影响广告实际效果，建议使用：你希望获取的高转化质量人群，且人群尽可能精准。如：你希望优化游戏付费行为，则可使用游戏内高质量付费人群包。</div>
                    <a href="https://e.qq.com/ads/helpcenter/detail?cid=517&pid=1999">了解更多</a>
                  </>}
                  placeholder="请选择人群包"
                />
              </>
            );
          };

          return null;
        }}
      </ProFormDependency>
    </ProCard>
  );
};

export default Directional;
