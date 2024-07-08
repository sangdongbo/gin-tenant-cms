import { useRef } from 'react';
import { useSearchParams } from '@umijs/max';
import { message, Button } from 'antd';
import { stringify } from 'qs';
import { DownloadOutlined } from '@ant-design/icons'
import Question from '@/components/Project/Gpt/Question';
import ModalFormFeedback from '@/components/Project/Gpt/ModalFormFeedback';
import { queryListRule } from './service';
import { createConfigRule, getConfigRule } from '@/pages/workbench/application/Project/service';

export default () => {
  const paramsRef = useRef(null);
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  return (
    <Question
      params={{
        project_id: projectId,
      }}
      pagination={{
        pageSize: 10,
      }}
      request={(params: any) => {
        paramsRef.current = params;
        return queryListRule(params);
      }}
      toolBarRender={() => [
        <Button
          key="export"
          icon={<DownloadOutlined />}
          onClick={() => {
            let urlString: any = {
              token: localStorage.getItem('lookstar-tenant-token'),
              tenant: localStorage.getItem('lookstar-tenant-X-Tenant'),
              project_id: projectId,
              ...(paramsRef?.current || {}),
            };
            window.location.href = `${API_URL}/tenant/ai/gpt/dashboard/export?${stringify(urlString)}`;
          }}
        >
          导出
        </Button>,
        <ModalFormFeedback
          key="ModalFormFeedback"
          request={() => getConfigRule(projectId)}
          onFinish={async (formValues) => {
            await createConfigRule({
              project_id: projectId,
              ...formValues,
            });
            message.success('操作成功！');
            return true;
          }}
        />,
      ]}
    />
  );
};
