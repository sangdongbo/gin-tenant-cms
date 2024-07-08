import { useSearchParams } from '@umijs/max';
import { message } from 'antd';
import { Upload } from '@bluedot-tech/bluedot-antd';
import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';

import { getConfigRule, createConfigRule } from '../../service';

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  return (
    <ProCard title="分享设置">
      <ProForm
        onFinish={async (values) => {
          await createConfigRule({
            ...values,
            project_id: projectId,
          });
          message.success('保存成功');
        }}
        request={() => getConfigRule(projectId)}
        submitter={{
          render: (_props, dom) => {
            return dom.pop();
          },
          submitButtonProps: {
            style: {
              marginTop: 24,
            },
          },
        }}
      >
        <ProFormText
          label="卡片标题"
          width="lg"
          name={['data', 'share', 'title']}
          rules={[{ required: true }]}
        />
        <ProFormTextArea
          width="lg"
          name={['data', 'share', 'description']}
          label="卡片描述"
          placeholder="请输入卡片描述"
          rules={[{ required: true }]}
          fieldProps={{
            style: { height: '100px' },
          }}
        />
        <ProForm.Item
          className="reset-upload-imgcrop"
          label="卡片封面"
          name={['data', 'share', 'image']}
          rules={[{ required: true }]}
          help="图片建议不大于500k"
        >
          <Upload.ImgCrop
            imgCropProps={{
              aspect: 1,
            }}
          />
        </ProForm.Item>
      </ProForm>
    </ProCard>
  );
};
