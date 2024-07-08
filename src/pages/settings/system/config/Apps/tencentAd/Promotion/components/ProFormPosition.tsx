import React, { useEffect, useRef, useState } from "react";
import type { ProFormItemProps, ProFormDependencyProps } from '@ant-design/pro-components';
import { ProForm, ProFormDependency } from '@ant-design/pro-components';
import { Radio, Space, Carousel, Typography } from 'antd';
import classnames from 'classnames';
import style from './style.less';

const { Title } = Typography;

interface PropsType extends ProFormItemProps {

}

const Preview = () => {
  const swiperRef = useRef<any>(null);

  return (
    <div className={style['preview']}>
      <div style={{ position: 'relative', width: 222, marginLeft: 24 }}>
        <div className={style['preview-arrow-left']} onClick={() => swiperRef.current?.prev()}></div>
        <div className={style['preview-arrow-right']} onClick={() => swiperRef.current?.next()}></div>
        <Carousel ref={swiperRef} autoplay dots={false}>
          <div>
            <img style={{ display: 'block', width: 222, height: 394 }} src={require('@/assets/images/adnet-navtive.png')} alt="navtive" />
            <Title level={5} style={{ textAlign: 'center' }}>优量汇 - 原生</Title>
          </div>
          <div>
            <img style={{ display: 'block', width: 222, height: 394 }} src={require('@/assets/images/adnet-splash.png')} alt="splash" />
            <Title level={5} style={{ textAlign: 'center' }}>优量汇 - 开屏</Title>
          </div>
        </Carousel>
      </div>
    </div>
  )
}

const Position = ({ value, onChange }: any) => {
  const [firstIndex, setFirstIndex] = useState<any>(null);
  const [twoIndex, setTwoIndex] = useState<any>(null);

  const options: any = [
    {
      label: '自动版位 (推荐)',
      value: '1',
      disabled: true,
    },
    {
      label: '选择特定版位',
      value: '2',
      childrens: [
        {
          value: 1,
          title: '微信朋友圈',
          desc: '以类似朋友的原创内容形式在用户朋友圈进行展示的原生广告',
          disabled: true,
        },
        {
          value: 2,
          title: '微信公众号与小程序',
          desc: '基于微信公众号、看一看、小程序与小游戏生态、新闻和微视插件的广告场景',
          disabled: true,
        },
        {
          value: 3,
          title: '腾讯平台与内容媒体',
          desc: '汇聚腾讯产品矩阵，全场景打通腾讯生态内优质媒体与平台',
          disabled: true,
        },
        {
          value: 4,
          title: '优量汇',
          desc: '集合数万优质媒体海量曝光，覆盖5亿+人群全营销场景的优量生态',
        }
      ]
    },
  ];

  const handelOnChange = () => {
    if (firstIndex == null) {
      onChange('')
      return;
    };

    const firstRow = options[firstIndex];
    let twoRwo = null;
    if (twoIndex != null) {
      twoRwo = firstRow?.childrens[twoIndex];
    };

    if (twoRwo) {
      onChange?.(twoRwo.value);
    } else {
      onChange?.(firstRow.value);
    };
  };

  useEffect(() => {
    handelOnChange();
  }, [firstIndex, twoIndex])

  return (
    <div>
      <Radio.Group
        options={options.map((item: any, index: number) => ({ ...item, value: index }))}
        onChange={(event) => {
          setFirstIndex(event.target.value)
          if (!options[event.target.value]?.data) setTwoIndex(null);
        }}
        value={firstIndex}
        optionType="button"
      />
      <div style={{ display: 'flex', width: '100%' }}>
        {
          firstIndex != null && options[firstIndex]?.childrens ? (
            <>
              <div className={style['position']}>
                <Space size={[4, 4]} direction="vertical" style={{ width: '100%' }}>
                  {
                    options[firstIndex]?.childrens.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className={classnames({
                            [style['position-same']]: true,
                            [style['active']]: twoIndex == index,
                            [style['disabled']]: item.disabled,
                          })}
                          onClick={() => {
                            if (item.disabled) return;
                            if (twoIndex == index) {
                              setTwoIndex(null);
                            } else {
                              setTwoIndex(index);
                            };
                          }}
                        >
                          <i className={style['position-same-icon']}>
                            <svg className={style['position-same-icon-svg']} viewBox="0 0 16 16" focusable="false" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.45 4.99L7.354 9.397 5.19 7.071 4.091 8.092l3.262 3.51 5.196-5.591-1.098-1.022z" fill="#0bc7ff" fill-rule="evenodd"></path>
                            </svg>
                          </i>
                          <div>
                            <h3 className={style['position-same-title']}>{item.title}</h3>
                            <div className={style['position-same-desc']}>{item.desc}</div>
                            <span className={style['position-same-badge']}>可多选</span>
                          </div>
                        </div>
                      )
                    })
                  }
                </Space>
              </div>
              {
                twoIndex != null ? (
                  <Preview />
                ) : null
              }
            </>
          ) : null
        }
      </div>
    </div>
  );
};

const ProFormPosition = (props: PropsType) => {
  return (
    <ProForm.Item {...props}>
      <Position {...props} />
    </ProForm.Item>
  );
};

export default ProFormPosition;
