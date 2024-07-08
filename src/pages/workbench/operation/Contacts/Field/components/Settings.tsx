import { useState, useRef } from 'react';
import ProTable from '@/components/BaseComponents/ProTable';
import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Form, { formTypeOptions, systemFormType } from './Form';
import formOptionToValueenum from '@/utils/formOptionToValueenum';
import { ModalForm } from '@ant-design/pro-components';

import { queryRule, addRule, updateRule } from '../service';

// import { ignoreSystemField } from './FieldForm';

export default () => {
  const actionRef = useRef<any>();
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState<any>(null);

  const columns = [
    {
      title: '字段名称',
      dataIndex: 'label',
    },
    {
      title: '字段类型',
      valueEnum: formOptionToValueenum([...formTypeOptions, ...systemFormType]),
      dataIndex: 'form_type',
    },
    {
      title: '字段提示语',
      dataIndex: 'placeholder',
    },
    {
      title: '字段验证',
      dataIndex: ['rule', 'label'],
    },
    {
      title: '操作',
      width: 200,
      dataIndex: 'option',
      render: (dom: any, record: any) => {
        if (record.type == 'system')
          return <Typography.Text type="secondary">系统字段，不可操作</Typography.Text>;

        return (
          <a
            key="edit"
            onClick={() => {
              setRow(record);
              setVisible(true);
            }}
          >
            编辑
          </a>
        );
      },
    },
  ];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        search={false}
        columns={columns}
        request={queryRule}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
        params={{
          include: 'rule',
        }}
        options={false}
        toolBarRender={() => [
          <Button icon={<PlusOutlined />} key="add" type="primary" onClick={() => setVisible(true)}>
            新建
          </Button>,
        ]}
      />

      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        initialValues={row}
        open={visible}
        onOpenChange={(_visible: any) => {
          if (!_visible) setRow(null);
          setVisible(_visible);
        }}
        autoFocusFirstInput
        onFinish={async (values) => {
          if (row) {
            await updateRule(row.name, values);
          } else {
            await addRule(values);
          }
          actionRef?.current?.reload();
          return true;
        }}
        title={row ? '修改字段' : '新建字段'}
        width={500}
      >
        <Form
          disabled={!!row}
          hideShow
          hideRequired
          ignoreFormType={['address', 'textarea', 'date_range']}
          ignoreRuleName={['regexp_ch_code_phone', 'regexp_code_email']}
        />
      </ModalForm>
    </>
  );
};
