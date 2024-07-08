import { useState } from 'react';
import { Button } from 'antd';
import { useModel } from '@umijs/max';
import { ProList } from '@ant-design/pro-components';

import style from './style.less';

export default ({ onSelect }: any) => {
  const { templateList } = useModel('global', (model) => model);
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <ProList
        toolBarRender={() => {
          return [
            <Button
              disabled={!template}
              loading={loading}
              key="3"
              type="primary"
              onClick={async () => {
                setLoading(true);
                await onSelect(template);
                setLoading(false);
              }}
            >
              选择模版
            </Button>,
          ];
        }}
        pagination={false}
        itemCardProps={{
          hoverable: false,
          style: {
            padding: '0',
            cursor: 'pointer',
          },
        }}
        tableAlertRender={false}
        rowSelection={{
          type: 'radio',
          onChange: (value) => {
            setTemplate(templateList[value[0]]);
          },
        }}
        grid={{ gutter: 16, column: 4 }}
        metas={{
          title: {
            dataIndex: 'title',
          },
          content: {
            render: (_: any, record: any) => {
              return (
                <div
                  className={style['select-templates-preview']}
                  style={{ backgroundImage: `url(${record.previewImage})` }}
                />
              );
            },
          },
        }}
        headerTitle="模板选择"
        dataSource={templateList}
      />
    </>
  );
};
