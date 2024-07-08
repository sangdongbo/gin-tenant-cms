import React from "react";
import { Divider } from 'antd';
import { ProFormDependency, ProFormRadio } from "@ant-design/pro-components";
import { ProCard, ProFormCustomSelect } from '@/components/BaseComponents';

import ProFormPosition from "../ProFormPosition";

const superiorQuantitySceneOptions = [
  {
    label: '不限',
    value: '1',
  },
  {
    label: '自定义',
    fieldFormProps: {
      styleType: "group",
      valueType: "checkbox",
      fieldProps: {
        options: [
          {
            label: 'Banner',
            value: '1',
          },
          {
            label: '插屏',
            value: '2',
          },
          {
            label: '开屏',
            value: '3',
          },
          {
            label: '原生',
            value: '4',
          },
          {
            label: '激励广告',
            value: '5',
          },
        ],
      },
    },
  }
];

const superiorQuantityMediaTypeOptions = [
  {
    label: '不限',
    value: '1',
  },
  {
    label: '自定义',
    value: '2',
    disabled: true,
  }
];

const superiorQuantityCustomFixedOptions = [
  {
    label: '不限',
    value: '1',
  },
  {
    label: '自定义',
    value: '2',
    disabled: true,
  }
];

const superiorQuantityCustomShieldOptions = [
  {
    label: '不限',
    value: '1',
  },
  {
    label: '自定义',
    value: '2',
    disabled: true,
  }
];

const Position = () => {

  return (
    <ProCard title="广告版位">
      <ProFormPosition label="选择版位" name="position" />
      <Divider />
      <ProFormDependency name={['position']}>
        {({ position }) => {
          if (position == 4) {
            return (
              <>
                <ProFormCustomSelect
                  name="superior_quantity_scene"
                  label="优量汇广告展示场景"
                  initialValue="1"
                  options={superiorQuantitySceneOptions}
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                />
                <ProFormRadio.Group
                  name="superior_quantity_media_type"
                  label="优量汇媒体类型"
                  radioType="button"
                  initialValue="1"
                  tooltip="指定广告展现在特定类型的优量汇流量媒体平台上"
                  options={superiorQuantityMediaTypeOptions}
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                />
                <ProFormRadio.Group
                  name="superior_quantity_custom_fixed"
                  label="优量汇自定义定投"
                  radioType="button"
                  initialValue="1"
                  tooltip={<>
                    您可以依据历史广告的投放数据制作流量包，限定广告只播放在优量汇版位内指定的流量，且只会对优量汇流量生效<a href="https://docs.qq.com/slide/DRHpZelVmWUdBelpQ">了解更多</a>
                  </>}
                  options={superiorQuantityCustomFixedOptions}
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                />
                <ProFormRadio.Group
                  name="superior_quantity_custom_shield"
                  label="优量汇自定义屏蔽"
                  radioType="button"
                  initialValue="1"
                  tooltip={<>
                    您可以依据历史广告的投放数据制作流量包，屏蔽优量汇版位内指定的流量，且只会对优量汇流量生效<a href="https://docs.qq.com/slide/DRHpZelVmWUdBelpQ">了解更多</a>
                  </>}
                  options={superiorQuantityCustomShieldOptions}
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                />
              </>
            );
          };

          return null;
        }}
      </ProFormDependency>
    </ProCard>
  )
}

export default Position;
