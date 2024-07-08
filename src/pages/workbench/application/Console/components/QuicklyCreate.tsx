import { useState } from 'react';
import { message } from 'antd';

import { ProCard2 } from '@/components/BaseComponents';
import { ProRow } from '@/components/BaseComponents';
import ModalForm from '@/pages/workbench/application/Project/components/QuicklyCreateModalForm';
import { addRule } from '@/pages/workbench/application/Project/service';

import style from './style.less';

export default ({ onCreate }: any) => {
  const [row, setRow] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  const list: any[] = [
    {
      type: 'landing',
      title: 'Landing Page',
      img: require('@/assets/project-landing.png'),
      color: '#06d8c3',
    },
    {
      type: 'data_download',
      title: '资料下载',
      img: require('@/assets/project-data-download.png'),
      color: '#079bfb',
    },
    {
      type: 'microbook',
      title: '微刊',
      img: require('@/assets/project-micro-book.png'),
      color: '#90a0c4',
    },
    {
      type: 'event',
      title: '活动中心',
      img: require('@/assets/project-event.png'),
      color: '#df7f42',
    },
  ];

  return (
    <>
      <ProCard2 title="快速创建项目" ghost bodyStyle={{ padding: 0 }}>
        <ProRow style={{ paddingTop: 20 }}>
          {list?.map((item: any, index: number) => {
            return (
              <ProRow.Col span={24 / list.length} key={index}>
                <div
                  className={style['quickly-create-project']}
                  style={{ backgroundImage: `url(${item.img})`, backgroundColor: item.color }}
                  onClick={() => {
                    setRow(item);
                    setVisible(true);
                  }}
                >
                  {item.title}
                </div>
              </ProRow.Col>
            );
          })}
        </ProRow>
      </ProCard2>
      <ModalForm
        title={`创建${row?.title}`}
        modalProps={{
          destroyOnClose: true,
        }}
        open={visible}
        onOpenChange={setVisible}
        onFinish={async (value: any) => {
          const res = await addRule({
            ...value,
            type: row.type,
          });
          message.success('创建成功');
          setVisible(false);
          setRow(null);
          // actionRef?.current?.reload();
          onCreate?.(res);
          return true;
        }}
      />
    </>
  );
};
