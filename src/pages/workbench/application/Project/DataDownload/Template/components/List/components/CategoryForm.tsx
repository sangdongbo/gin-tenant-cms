import { ProFormText } from '@ant-design/pro-components';

export default () => {

  return <>
    <ProFormText name="title" label="分类名称" rules={[{ required: true }]} />
  </>
};
