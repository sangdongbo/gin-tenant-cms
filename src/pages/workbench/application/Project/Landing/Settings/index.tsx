import { useEffect, useRef } from 'react';
import { ProForm } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';
import { Form, message } from 'antd';
import { useSearchParams } from '@umijs/max';
import { updateBasicRule, queryBasicRule } from '../../service';
import BaseSettings from '../../components/BaseSettings';
// import LinkTable from '@/pages/workbench/operation/WeChat/Authorizer/Components/LinkTable';

export default (props: any) => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('id');
  const formRef = useRef();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    queryBasicRule(projectId, {
      signal,
    }).then((res) => {
      formRef.current?.setFieldsValue(res);
    });
    return () => {
      controller.abort();
    };
  }, [projectId]);

  return (
    <ProCard title="项目设置">
      <ProForm
        formRef={formRef}
        onFinish={async (values) => {
          await updateBasicRule(projectId, values);
          message.success('保存成功');
        }}
        // request={() => queryBasicRule(projectId)}
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
      >
        <BaseSettings showPerviewTag />
      </ProForm>
    </ProCard>
  );
};
