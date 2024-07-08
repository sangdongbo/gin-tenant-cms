import React from "react";
import { history } from '@umijs/max';
import { ProForm } from '@ant-design/pro-components';
import Plan from '../components/Plan';

const Create = () => {
  return (
    <ProForm
      submitter={{
        render: (_, dom) => dom.pop(),
      }}
      onFinish={async (formValues) => {
        history.back();
      }}
    >
      <Plan title="推广计划" />
    </ProForm>
  )
};

export default Create;
