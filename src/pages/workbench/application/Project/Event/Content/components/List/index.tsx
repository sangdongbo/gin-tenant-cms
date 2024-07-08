import { useState } from 'react';
import { ModalForm } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useModel, history, useSearchParams } from '@umijs/max';
import { getUid } from '@/utils/uuid';
import Table from './Table';
import Create from './Create';
import { addRule } from '../../service';

export default ({ id }: any) => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  return (
    <Table
      id={id}
      index={0}
      categoryId={0}
      customId={0}
      cardProps={{
        bodyStyle: { padding: 0 },
      }}
      scroll={{ y: 466 }}
      search={false}
      options={false}
      toolBarRender={() => [
        <Create
          key="create"
          trigger={<Button
            type="primary"
            icon={<PlusOutlined />}>
            新建
          </Button>}
          onFinish={async (formValue) => {
            const res = await addRule({
              project_id: id,
              ...formValue,
            });
            history.push(`/workbench/application/project/event/basic/content/details?id=${projectId}&event_id=${res.id}`);
            return true;
          }}
        />
      ]}
    />
  );
};
