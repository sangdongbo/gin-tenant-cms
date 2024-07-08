import { useState } from 'react';
import { Space, message, Tooltip } from 'antd';
import { useUpdateEffect } from 'ahooks';
import { ProForm, ModalForm } from '@ant-design/pro-components';
import { Button as ImageButton, Card as ImageCard } from './Image';
import { Button as TextButton, Form as TextForm, Card as TextCard } from './Text';
import { Button as VideoButton, Card as VideoCard } from './Video';
import EditCard from './EditCard';

const maxCount = 3;

const Content = ({ appid, value, onChange }: any) => {
  const [list, setList] = useState(value || []);
  const [rows, setRows] = useState<any>(null);

  useUpdateEffect(() => {
    onChange(list);
  }, [list]);

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

  const onEdit = async (formValues: any) => {
    const currentList = JSON.parse(JSON.stringify(list));
    currentList[rows.index].value = formValues.value;
    setList(currentList);
    setRows(null);
    return true;
  };

  return (
    <div>
      <div style={{ paddingBottom: 16 }}>
        <Space size={22}>
          <ImageButton
            appid={appid}
            onFinish={(values: any) => {
              onAdd({
                type: 'image',
                value: values?.media_id,
                url: values.url,
              });
            }}
          />

          <TextButton
            // title="图文消息"
            onFinish={async (formValues: any) => {
              onAdd({
                type: 'text',
                value: formValues?.value,
              });
              return true;
            }}
          />

          {/* <VideoButton
            appid={appid}
            // title="图文消息"
            onFinish={async (values: any) => {
              onAdd({
                type: 'video',
                value: values?.media_id,
                url: values.cover_url,
              });
              return true;
            }}
          /> */}
        </Space>
      </div>
      {
        list?.map((item: any, index: number) => {
          return <div key={index}>
            {
              item.type == 'text' ? (
                <EditCard
                  onDelete={() => onDelete(index)}
                  onEdit={() => setRows({
                    ...item,
                    index,
                  })}
                >
                  <TextCard
                    content={item.value}
                  />
                </EditCard>
              ) : null
            }
            {
              item.type == 'image' ? (
                <EditCard
                  onDelete={() => onDelete(index)}
                  style={{
                    height: 300
                  }}
                >
                  <ImageCard
                    url={item.url}
                  />
                </EditCard>
              ) : null
            }
            {
              item.type == 'video' ? (
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

      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={onEdit}
        open={rows}
        onOpenChange={(visible: boolean) => {
          if (!visible) setRows(null);
        }}
        initialValues={{
          value: rows?.value,
        }}
        width={500}
        title="修改文案"
      >
        <TextForm />
      </ModalForm>
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
