import { useEffect, useState } from "react";
import { Space, Alert, Radio, Divider } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { ProFormItemProps, ProFormDependencyProps } from '@ant-design/pro-components';
import { ProForm, ProFormDependency } from '@ant-design/pro-components';
import classnames from 'classnames';
import { useUpdateEffect } from 'ahooks';
import style from './style.less';

const icon = require('@/assets/images/brand-logo.svg');

interface ItemType {
  label?: any;
  value?: any;
  relation?: string[];// filedDependencyProps.name关联，如果relation 无值，表示所有模块全部显示。如果有值则表示那个显示。
}

interface OptionsType extends ItemType {
  iconName: string;
  tips?: any;
  childrens?: ItemType[];
}

interface PropsType extends ProFormItemProps {
  filedDependencyProps?: {
    // 其他参数请看：https://procomponents.ant.design/components/dependency
    name: string | number;
  };
  relationvalue?: any;// 需要监听的值
  options: OptionsType[];
}
/**
options = [
  {
    iconName: 'product',
    // relation: ['CAMPAIGN_TYPE_NORMAL', 'CAMPAIGN_TYPE_SEARCH'],// 没有 relation 表示所有权限全有
    label: '商品推广',
    value: 'PROMOTED_OBJECT_TYPE_ECOMMERCE',
    desc: '推广线上商品，带来更多客户和订单',
    tips: '使用小程序落地页，可选择推广目标：商品推广、品牌活动推广、销售线索收集',
  },
  {
    iconName: 'app',
    label: '应用推广',
    childrens: [
      {
        label: 'iOS应用',
        value: 'PROMOTED_OBJECT_TYPE_APP_IOS',
      },
      {
        label: 'Android应用',
        value: 'PROMOTED_OBJECT_TYPE_APP_ANDROID',
      },
      {
        label: 'Android应用(应用宝)',
        relation: ['CAMPAIGN_TYPE_NORMAL'],
        value: 'PROMOTED_OBJECT_TYPE_APP_ANDROID_MYAPP',
      }
    ],
    desc: '吸引更多用户下载、安装、转化',
    tips: '使用小程序落地页，可选择推广目标：商品推广、品牌活动推广、销售线索收集',
  },
];
*/

const CustomPromotedObject = ({ options: baseOptions, relationvalue, value, onChange }: any) => {
  const [options, setOptions] = useState(baseOptions);
  const [firstIndex, setFirstIndex] = useState<any>(null);
  const [twoIndex, setTwoIndex] = useState<any>(null);

  const handelIndex = () => {
    options.forEach((item: any, index: number) => {
      if (item.value) {
        if (item.value == value) {
          setFirstIndex(index);
          setTwoIndex(null);
        };
      } else if (item.childrens) {
        item.childrens.forEach((it: any, ind: number) => {
          if (it.value == value) {
            setFirstIndex(index);
            setTwoIndex(ind);
          };
        });
      };
    });
  };

  const handelOnChange = () => {
    if (firstIndex == null) {
      onChange('')
      return;
    };

    const firstRow = options[firstIndex];
    let twoRwo = null;
    if (twoIndex != null) {
      twoRwo = firstRow.childrens[twoIndex];
    };

    if (twoRwo) {
      onChange?.(twoRwo.value);
    } else {
      onChange?.(firstRow.value);
    };
  };

  const reset = () => {
    setFirstIndex(null);
    setTwoIndex(null);
  };

  const handelOptions = () => {
    if (!relationvalue) return;
    const _baseOptions = JSON.parse(JSON.stringify(baseOptions));
    let handelOptions = _baseOptions.filter((item: any) => {
      if (item?.relation) {
        return item?.relation.includes(relationvalue);
      };
      return true;
    });
    handelOptions = handelOptions.map((item: any) => {
      if (item.childrens) {
        item.childrens = item.childrens.filter((it: any) => {
          if (it?.relation) {
            return it?.relation.includes(relationvalue);
          };
          return true;
        });
      };
      return item;
    });
    setOptions(handelOptions);
    reset();
  };

  useUpdateEffect(() => {
    handelOnChange();
  }, [firstIndex, twoIndex]);

  useEffect(() => {
    handelIndex();
  }, [value]);

  useEffect(() => {
    handelOptions();
  }, [relationvalue]);

  return (
    <div>
      <Space wrap size={[6, 12]}>
        {
          options.map((item: any, index: number) => {
            const active = firstIndex == index;

            return (
              <div
                key={index}
                className={classnames({
                  [style['group-item']]: true,
                  [style['group-item-active']]: active,
                })}
                onClick={() => {
                  setFirstIndex(index);
                  if (item.childrens) {
                    setTwoIndex(0);
                  } else {
                    setTwoIndex(null);
                  };
                }}
              >
                <img src={active ? `${icon}#${item.iconName}-selected` : `${icon}#${item.iconName}`} alt="icon" style={{ display: 'block' }} />
                <div className={style['group-item-title']}>{item.label}</div>
                <div className={style['group-item-desc']}>{item.desc}</div>
              </div>
            )
          })
        }
      </Space>
      {
        firstIndex != null && options[firstIndex]?.childrens ? (
          <div>
            <Divider style={{ margin: '10px 0' }} />
            <Radio.Group
              options={options[firstIndex]?.childrens.map((item: any, index: number) => ({ ...item, value: index }))}
              onChange={(event) => setTwoIndex(event.target.value)}
              value={twoIndex}
              optionType="button"
            />
          </div>
        ) : null
      }
      {
        firstIndex != null ? (
          <div className={style['group-tips']}>
            <Alert message={<div dangerouslySetInnerHTML={{ __html: options[firstIndex].tips }} />} type="info" showIcon />
          </div>
        ) : null
      }
    </div>
  )
};

const ProFormPromotedObject = (props: PropsType) => {
  return (
    <ProForm.Item {...props}>
      <CustomPromotedObject {...props} />
    </ProForm.Item>
  );
};

const WatchCampaignType = ({ filedDependencyProps, ...props }: PropsType) => {
  let watchName: NamePath[] = [];
  if (filedDependencyProps?.name) watchName = [filedDependencyProps.name];

  return (
    <ProFormDependency {...filedDependencyProps} name={watchName} >
      {(watchValue) => {
        let relationvalue: any = '';
        if (filedDependencyProps?.name) relationvalue = watchValue[filedDependencyProps.name];
        return (
          <ProFormPromotedObject
            relationvalue={relationvalue}
            {...props}
          />
        );
      }}
    </ProFormDependency>
  )
};

export default WatchCampaignType;
