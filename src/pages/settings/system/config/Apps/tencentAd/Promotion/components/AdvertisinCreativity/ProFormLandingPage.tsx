import { ProFormList, ProFormText } from '@ant-design/pro-components';
import { Typography } from 'antd';

const { Title } = Typography;


const ProFormLandingPage = () => {

  return (
    <div>
      <Title level={5}>落地页（1/3）</Title>

      <ProFormList
        label="落地页链接"
        name="landing_page"
        initialValue={[{}]}
        creatorButtonProps={{
          creatorButtonText: '新建',
        }}
      >
        <ProFormText
          name="url"
          width="md"
          placeholder="请输入落地页链接"
          rules={[{ required: true }]}
        />
      </ProFormList>
    </div>
  )
};
export default ProFormLandingPage;
