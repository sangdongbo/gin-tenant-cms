import { useEffect, useState } from 'react';
import { useSearchParams } from '@umijs/max';
import { message, Modal, Space, Radio, Spin } from 'antd';
import Feedback from '@/components/Project/Gpt/Feedback';
import { createConfigRule, getConfigRule } from '@/pages/workbench/application/Project/service';
import { queryRule } from './service';

const StartFeedback = ({ request, onFinish }: any) => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (request) {
      request?.().then((res: any) => {
        setValue(res?.data?.is_conversation_feedback || 0);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    };
  }, [request]);

  if (loading) return null;

  return <Space style={{ whiteSpace: 'nowrap' }}>
    评分功能设置:
    <Radio.Group
      value={value}
      onChange={async (event: any) => {
        const currentValue = event?.target?.value;
        Modal.confirm({
          content: currentValue ? "是否要开启评分功能？" : "是否要关闭评分功能？",
          async onOk() {
            const finishRes = await onFinish?.({
              data: {
                is_conversation_feedback: currentValue,
              }
            });
            setValue(event?.target?.value);
            return finishRes;
          },
        });
      }}
    >
      <Radio value={1}>开启</Radio>
      <Radio value={0}>关闭</Radio>
    </Radio.Group>
  </Space>
}

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  return (
    <Feedback
      params={{
        project_id: projectId,
      }}
      pagination={{
        pageSize: 10,
      }}
      request={queryRule}
      toolBarRender={() => [
        <StartFeedback
          request={() => getConfigRule(projectId)}
          onFinish={async (formValues: any) => {
            await createConfigRule({
              project_id: projectId,
              ...formValues,
            });
            message.success(formValues?.data?.is_conversation_feedback ? '开启成功！' : "关闭成功！");
            return true;
          }}
        />
      ]}
    />
  );
};
