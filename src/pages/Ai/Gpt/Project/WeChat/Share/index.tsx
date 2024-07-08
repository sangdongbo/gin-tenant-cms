import { useSearchParams } from '@umijs/max';
import { Upload } from '@bluedot-tech/bluedot-antd';
import { message } from 'antd';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';

import { getConfigRule, createConfigRule } from '../../service';

export default (props: any) => {
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
          render: (props, dom) => {
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
          name={['data', 'share', 'title']}
          rules={[{ required: true }]}
        />
        <ProFormText
          label="卡片描述"
          name={['data', 'share', 'description']}
          rules={[{ required: true }]}
        />
        <ProForm.Item
          className="reset-upload-imgcrop"
          label="卡片封面"
          name={['data', 'share', 'image']}
          rules={[{ required: true }]}
          help="图片建议不大于500k"
        // getValueFromEvent={(value) => value.url}
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
