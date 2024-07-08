import { Modal, Button, Typography } from 'antd';
import { StepsForm } from '@ant-design/pro-components';
import { getResetClientSecret } from '../service';
import { useState } from 'react';
import ClientSecret from './ClientSecret';

export default ({ clientId, onCancel, ...props }: any) => {
  const [current, setCurrent] = useState(0);
  const [initialValues, setInitialValues] = useState<any>({});

  const onClose = () => {
    setCurrent(0);
    onCancel?.();
  };

  return (
    <StepsForm
      current={current}
      onCurrentChange={setCurrent}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            {...props}
            title="重置Client Secret"
            footer={
              current == 1 ? (
                <Button type="primary" onClick={() => onClose()}>
                  我已保存，确认关闭
                </Button>
              ) : (
                submitter
              )
            }
            onCancel={onClose}
            destroyOnClose
            width={600}
          >
            {dom}
          </Modal>
        );
      }}
      stepsRender={(_, dom) => <div style={{ padding: '0 100px' }}>{dom}</div>}
      onFinish={async () => true}
    >
      <StepsForm.StepForm
        title="确认重置"
        onFinish={async () => {
          const res = await getResetClientSecret({ client_id: clientId });
          setInitialValues(res);
          return true;
        }}
      >
        <div>你确定要重置 Client Secret 吗？</div>
        <Typography.Text type="danger">
          请注意：重置 Client Secret 立即生效，所有使用旧 Client Secret
          的接口将立即失效。为确保测试开放平台的正常使用，请尽快更新 Client Secret 信息。
        </Typography.Text>
      </StepsForm.StepForm>
      <StepsForm.StepForm title="重置成功" layout="horizontal">
        <ClientSecret value={initialValues.secret} />
      </StepsForm.StepForm>
    </StepsForm>
  );
};
