import { useEffect, useState } from 'react';
import { Space, Avatar, Descriptions, Button, Popconfirm } from 'antd';
import { ProCard } from '@/components/BaseComponents';
import Create from './components/Create';

import { queryRule } from '../Authorizer/service';
import { removeAiReplyRule, addAiReplyRule } from '@/pages/workbench/operation/WeChat/service';

export default () => {
  const [list, setList] = useState([]);
  const [disabledAuth, setDisabledAuth] = useState(true);
  const reload = () => {
    queryRule({
      include: 'reply.project',
    }).then((res) => {
      let currentShowAuth = false;
      res.data.forEach((item: any) => {
        if (item.reply) {
          currentShowAuth = true;
        }
      });
      setDisabledAuth(currentShowAuth);
      setList(res.data);
    });
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <Space wrap size={[16, 16]}>
      {list.map((item: any, index) => {
        return (
          <ProCard key={index} style={{ width: 300 }}>
            <Avatar
              src={item.head_img}
              size={80}
              style={{ margin: '0 auto 20px', display: 'block' }}
            />
            <Descriptions
              column={1}
              items={[
                {
                  key: '1',
                  label: 'AppID',
                  children: item.appid,
                },
                {
                  key: '2',
                  label: '公众号标题',
                  children: item.nick_name,
                },
              ]}
              style={{
                height: 118,
              }}
            />
            {item.reply ? (
              <Popconfirm
                title="确定要取消授权吗?"
                onConfirm={async () => {
                  await removeAiReplyRule(item.appid);
                  reload();
                }}
              >
                <Button danger style={{ margin: '0 auto', display: 'block' }}>
                  取消授权
                </Button>
              </Popconfirm>
            ) : (
              <Create
                title="助手授权"
                trigger={
                  <Button
                    disabled={disabledAuth}
                    type="primary"
                    style={{ margin: '0 auto', display: 'block' }}
                  >
                    授权助手
                  </Button>
                }
                onFinish={async (formValue: any) => {
                  await addAiReplyRule({
                    ...formValue,
                    appid: item.appid,
                    state: 1,
                  });
                  reload();
                  return true;
                }}
              />
            )}
          </ProCard>
        );
      })}
    </Space>
  );
};
