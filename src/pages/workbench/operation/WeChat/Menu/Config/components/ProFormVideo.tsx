import { useEffect, useState } from 'react';
import { Space, message } from 'antd';
import { useUpdateEffect } from 'ahooks';
import { ProForm } from '@ant-design/pro-components';
import { Button as VideoButton, Card as VideoCard } from './Video';
import EditCard from './EditCard';

// import { getArticleIdRule } from '@/pages/workbench/operation/WeChat/Freepublish/service';

const maxCount = 1;

const Content = ({ appid, value, onChange, onDelete: propsOnDelete, onAdd: propsOnAdd }: any) => {
  const [list, setList] = useState<any>([]);

  useUpdateEffect(() => {
    if (list?.length) {
      onChange(list[0].media_id)
    } else {
      onChange('');
    };
  }, [list]);

  useEffect(() => {
    if (value) {
      // 暂时没有接口获取视频的详情
      setList([
        {
          type: 'media_id',
          article_id: value,
        }
      ]);
      // getArticleIdRule(value, {
      //   appid,
      // }).then(res => {
      //   setList([
      //     {
      //       type: 'article_id',
      //       article_id: value,
      //       content: res,
      //       update_time: res.update_time,
      //     }
      //   ]);
      // });
    }
  }, [value]);

  const onAdd = (value: any) => {
    if (list.length >= maxCount) {
      message.warning(`最多设置${maxCount}条回推`);
      return;
    };
    setList([
      ...list,
      value,
    ]);
  };

  const onDelete = (index: number) => {
    const currentList = [...list];
    currentList.splice(index, 1);
    setList(currentList);
  };

  return (
    <div>
      <div style={{ paddingBottom: 16 }}>
        <Space size={24}>
          <VideoButton
            appid={appid}
            // title="图文消息"
            onFinish={async (values: any) => {
              onAdd({
                type: 'media_id',
                ...values,
              });
              return true;
            }}
          />
        </Space>
      </div>
      {
        list?.map((item: any, index: number) => {
          return <div key={index}>
            {
              item.type == 'media_id' ? (
                <EditCard
                  onDelete={() => onDelete(index)}
                  style={{
                    height: 300
                  }}
                >
                  <VideoCard
                    url={item.url}
                  />
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
