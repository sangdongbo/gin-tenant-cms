import { useSearchParams } from '@umijs/max';
import { message } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';
import { updateBasicRule, queryBasicRule } from '../../service';

import BaseSettings from '../../components/BaseSettings';

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  return (
    <ProCard title="基础设置">
      <ProForm
        onFinish={async (values) => {
          await updateBasicRule(projectId, values);
          message.success('保存成功');
        }}

        request={() => queryBasicRule(projectId)}

        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
      >
        <BaseSettings />
      </ProForm>
    </ProCard>
  );
};
