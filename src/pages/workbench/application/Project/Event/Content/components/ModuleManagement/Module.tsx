import React from 'react';
import { useModel } from '@umijs/max';
import { Badge, Card, Space, message } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import style from './style.less';

export default () => {
  const { moduleManagementMenu, eventDetails, updaterModuleManagementMenuKey } = useModel('event', (model) => model);
  const cardStyle = { width: 104, cursor: 'pointer' };

  return (
    <Space direction="vertical">
      {
        moduleManagementMenu.map((item: any, index) => {
          return (
            <Space key={index}>
              <Card className={style['card-title']} bodyStyle={{ width: 76 }}>{item.label}</Card>
              <Space key={index} wrap>
                {
                  item.children.map((it: any, ind: number) => {
                    const content = <Card
                      key={`${index}-${ind}`}
                      className="card-border-hover"
                      bodyStyle={cardStyle}
                      onClick={() => {
                        updaterModuleManagementMenuKey(it.value);
                      }}
                    >
                      {it.label}
                    </Card>;

                    const module_status = eventDetails?.module_status || {};
                    const keys = module_status[item.value] || [];

                    if (it.hide) return null;

                    if (!keys.includes(it.value)) return content;

                    return (
                      <Badge key={it.label} offset={[-5, 5]} count={<CheckCircleFilled className="color-primary" style={{ fontSize: 20 }} />}>
                        {content}
                      </Badge>
                    )
                  })
                }
              </Space>
            </Space>
          )
        })
      }
    </Space>
  )
}
