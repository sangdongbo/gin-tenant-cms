import React, { useRef, useState } from 'react';
import { ProForm, DrawerForm, ProFormText } from '@ant-design/pro-components';

const CreateForm: React.FC<any> = ({ visible, onVisibleChange }) => {
  const formRef = useRef();
  return (
    <>
      <DrawerForm
        open={visible}
        onOpenChange={onVisibleChange}
        title="新建联系人"
        formRef={formRef}
        drawerProps={{
          forceRender: true,
          destroyOnClose: true,
        }}
        onFinish={async (values) => { }}
      >
        <ProForm.Group title="联系人信息">
          <ProFormText
            width="md"
            name="full_name"
            label="姓名"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormText width="md" name="company" label="公司" placeholder="请输入名称" />
          <ProFormText
            name="phone"
            width="md"
            label="手机"
            placeholder="请输入手机"
            rules={[{ required: true }]}
          />
          <ProFormText width="md" name="email" label="邮箱" placeholder="请输入邮箱" />

          {/* <ProFormText width="md" name="sex" label="性别" placeholder="请输入名称" /> */}
        </ProForm.Group>
        <ProForm.Group title="粉丝信息">
          <ProFormText width="md" name="unionid" label="UnionID" />
          <ProFormText width="md" name="openid" label="OpenID" />
          <ProFormText width="md" name="appid" label="APPID" />
        </ProForm.Group>
      </DrawerForm>
    </>
  );
};

export default CreateForm;
