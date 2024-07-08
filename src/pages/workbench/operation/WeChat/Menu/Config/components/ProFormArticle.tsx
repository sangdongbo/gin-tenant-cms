import { useEffect, useState } from 'react';
import { Space, message } from 'antd';
import { useUpdateEffect } from 'ahooks';
import { ProForm } from '@ant-design/pro-components';
import { Button as NewsButton, Card as NewsCard } from './News';
import EditCard from './EditCard';

import { getArticleIdRule } from '@/pages/workbench/operation/WeChat/Freepublish/service';

const maxCount = 1;

const Content = ({ appid, value, onChange, onDelete: propsOnDelete, onAdd: propsOnAdd }: any) => {
  const [list, setList] = useState<any>([]);

  useUpdateEffect(() => {
    if (list?.length) {
      onChange(list[0].article_id)
    } else {
      onChange('');
    };
  }, [list]);

  useEffect(() => {
    if (value) {
      getArticleIdRule(value, {
        appid,
      }).then(res => {
        setList([
          {
            type: 'article_id',
            article_id: value,
            content: res,
            update_time: res.update_time,
          }
        ]);
      });
    }
  }, [value]);

  const onAdd = (formValue: any) => {
    if (list.length >= maxCount) {
      message.warning(`最多设置${maxCount}条回推`);
      return;
    };
    const newValue = [
      ...list,
      formValue,
    ];
    setList(newValue);
    propsOnAdd?.(newValue);
  };

  const onDelete = (index: number) => {
    const currentList = [...list];
    currentList.splice(index, 1);
    setList(currentList);
    propsOnDelete?.([...currentList]);
  };

  return (
    <div>
      <div style={{ paddingBottom: 16 }}>
        <Space size={24}>
          <NewsButton
            appid={appid}
            onFinish={(values: any) => {
              onAdd({
                ...values,
                type: 'article_id',
              });
            }}
          />
        </Space>
      </div>
      {
        list?.map((item: any, index: number) => {
          return <div key={index}>
            {
              item.type == 'article_id' ? (
                <EditCard
                  onDelete={() => onDelete(index)}
                  style={{
                    padding: 0
                  }}
                >
                  <NewsCard data={item} bordered={false} />
                </EditCard>
              ) : null
            }
          </div>
        })
      }
    </div>
  );
};

export default ({ name, fieldProps, ...props }: any) => {
  return (
    <ProForm.Item name={name} {...fieldProps}>
      <Content {...props} />
    </ProForm.Item>
  )
}
