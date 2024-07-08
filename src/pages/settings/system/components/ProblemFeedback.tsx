import { useRef, useState } from 'react';
import { Button, message } from 'antd';

import { ProCard2 } from '@/components/BaseComponents';
import { ProForm, ProFormRate, ProFormTextArea } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';

import style from './style.less';
import { addFeedbackRule } from '../service';

export default () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<ProFormInstance>();

  return (
    <ProCard2
      title="问题反馈"
      footer={
        <Button
          type="primary"
          block
          loading={loading}
          onClick={() => {
            formRef.current
              ?.validateFields()
              .then(async (values) => {
                setLoading(true);
                try {
                  await addFeedbackRule(values);
                  setLoading(false);
                  message.success('反馈成功！');
                  formRef.current?.resetFields();
                } catch (error) {
                  message.error('提交失败！请重新提交');
                }
                setLoading(false);
              })
              .catch(() => {
                message.info('请选择评分和填写问题后在提交');
              });
          }}
        >
          提交
        </Button>
      }
    >
      <div className={style['problem-feedback-tips']}>快速反馈，需求直达产品经理</div>
      <ProForm
        formRef={formRef}
        submitter={false}
        colon={false}
        layout="horizontal"
        // onFinish={async (values: any) => {
        //   setLoading(true);
        //   try {
        //     await addFeedbackRule(values);
        //     setLoading(false);
        //     message.success('反馈成功！');
        //     formRef.current?.resetFields();
        //   } catch (error) {
        //     message.error('提交失败！请重新提交');
        //   }
        //   setLoading(false);
        // }}
      >
        <ProFormRate
          required={false}
          name="score"
          label={<div style={{ marginTop: 4 }}>本产品使用感受如何</div>}
          fieldProps={{
            allowHalf: false,
            style: {
              color: '#0bc7ff',
              fontSize: 16,
            },
          }}
          formItemProps={{
            style: { marginBottom: 6 },
          }}
          rules={[
            {
              required: true,
              message: ' ',
            },
          ]}
        />
        <ProFormTextArea
          required={false}
          label={null}
          noStyle
          name="text"
          placeholder="请输入您的反馈和建议"
          fieldProps={{
            autoSize: {
              minRows: 4,
              maxRows: 4,
            },
          }}
          rules={[
            {
              required: true,
              message: ' ',
            },
            {
              whitespace: true,
              message: ' ',
            },
          ]}
        />
      </ProForm>
    </ProCard2>
  );
};
