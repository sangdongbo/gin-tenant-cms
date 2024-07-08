import { ProForm } from '@ant-design/pro-components';
import ProFormTitle from '@/pages/workbench/operation/Group/Settings/components/BaseInfo/ProFormTitle';
import ProFormWeChatAccessible from '@/pages/workbench/operation/Group/Settings/components/BaseInfo/ProFormWeChatAccessible';

export default (props: any) => {
  return (
    <ProForm
      layout="horizontal"
      submitter={false}
      {...props}
    >
      <ProFormTitle
        width="sm"
        labelCol={{
          flex: '0 1 auto',
        }}
        rules={[]}
      />
      <ProFormWeChatAccessible
        labelCol={{
          flex: '0 1 auto',
        }}
      />
    </ProForm>
  )
}
