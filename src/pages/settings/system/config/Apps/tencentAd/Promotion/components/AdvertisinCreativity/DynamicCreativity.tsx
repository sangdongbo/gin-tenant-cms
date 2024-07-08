import { Divider } from 'antd';
import { ProFormSelect, ProFormText } from '@ant-design/pro-components';
import ProFormCreativeMaterial from './ProFormCreativeMaterial';
import ProFormCreativeText from './ProFormCreativeText';
import ProFormLandingPage from './ProFormLandingPage';
import ProFormAdditionalJump from './ProFormAdditionalJump';

const DynamicCreativity = () => {

  return (
    <div>
      <ProFormCreativeMaterial />
      <Divider />
      <ProFormCreativeText />
      <Divider />
      <ProFormSelect
        width="md"
        name="select2"
        label="品牌形象"
        options={[]}
        placeholder="请选择一个品牌形象，与广告创意一起展示"
        rules={[{ required: true }]}
      />
      <Divider />
      <ProFormLandingPage />
      <Divider />
      <ProFormAdditionalJump />
      <Divider />
      <ProFormText
        width="xl"
        name="additional_name"
        label="创意名称"
        initialValue="动态创意-横版大图 16:9-创意1"
        placeholder="请输入应用直达链接，指定点击广告可直达的应用内落地页"
        fieldProps={{ showCount: true, maxLength: 60 }}
      />
    </div>
  )
};
export default DynamicCreativity;
