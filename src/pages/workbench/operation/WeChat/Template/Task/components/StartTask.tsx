import { useEffect, useState } from 'react';
import { StepsForm } from '@ant-design/pro-components';
import { Popconfirm, Modal, Button, Alert, message } from 'antd';
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { MobileOutlined, LockOutlined } from '@ant-design/icons';

import { ProFormTime } from './Form';

import { updateTaskStatusRule } from '../service';
import { getAdminRule, getAdminCaptchaRule } from '@/pages/settings/service';

export default ({ children, record, onSubmit, modalProps, ...props }: any) => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [adminPhone, setAdminPhone] = useState('');

  if (record.status == 1) {
    return (
      <Popconfirm
        key="clone"
        title={`确定关闭任务?`}
        onConfirm={async () => {
          await updateTaskStatusRule(record.id, {
            status: 0,
          });
          onSubmit?.();
        }}
      >
        {children}
      </Popconfirm>
    );
  };

  return (
    <>
      <div
        onClick={() => {
          getAdminRule().then(res => {
            setCurrent(0);
            setVisible(true);
            setAdminPhone(res.mask_phone);
          });
        }}
      >
        {children}
      </div>
      <StepsForm
        stepsFormRender={(dom, submitter: any) => {
          if (current == 1 && !adminPhone) {
            submitter[1] = <Button type="primary" disabled>提交</Button>;
          };
          return (
            <Modal
              title="确认发送时间"
              width={350}
              onCancel={() => setVisible(false)}
              open={visible}
              footer={submitter}
              destroyOnClose
              {...modalProps}
            >
              {dom}
            </Modal>
          );
        }}
        current={current}
        {...props}
        onCurrentChange={setCurrent}
        onFinish={async (formValue: any) => {
          await updateTaskStatusRule(record.id, {
            ...formValue,
            status: 1,
          });
          setVisible(false);
          setCurrent(0);
          onSubmit?.();
          return true;
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="选择时间"
          initialValues={{
            send_time: record.send_time,
          }}
        >
          <ProFormTime
            fieldProps={{
              style: {
                width: 302,
              },
            }}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="checkbox"
          title="启动确认"
        >
          {
            adminPhone ? (
              <>
                <ProFormText
                  fieldProps={{
                    value: adminPhone,
                    size: 'large',
                    prefix: <MobileOutlined className={'prefixIcon'} />,
                  }}
                  width={302}
                  disabled
                  name="phone"
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  width={302}
                  captchaProps={{
                    size: 'large',
                  }}
                  phoneName="phone"
                  placeholder={'请输入验证码'}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${'获取验证码'}`;
                    }
                    return '获取验证码';
                  }}
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ]}
                  onGetCaptcha={async () => {
                    const params = { action: 'template', type: 'sms' };
                    await getAdminCaptchaRule(params);
                    message.success('获取验证码成功！');
                  }}
                />
              </>
            ) : (
              <Alert
                style={{
                  width: 302
                }}
                message="超管未绑定手机号，请联系超管绑定手机号后在启动！"
                type="error"
              />
            )
          }
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
}
