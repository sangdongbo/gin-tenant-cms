import { ProForm, ProFormText } from '@ant-design/pro-components';
import ProFormTime from './ProFormTime';

export const typeOptions = [
  {
    label: '动态分组',
    value: 1,
  },
  {
    label: '静态分组',
    value: 2,
  },
];

export default (props: any) => {
  return (
    <ProForm
      layout="horizontal"
      submitter={false}
      {...props}
    >
      <ProFormText
        label="分组名称"
        name="title"
        formItemProps={{
          style: {
            marginBottom: 8
          }
        }}
        labelCol={{
          flex: '82px',
        }}
        rules={[
          {
            required: true,
          },
          {
            whitespace: true,
            message: '分组名称不能为空'
          }
        ]}
      />

      {/* <ProFormTime
        label="生效时间"
        tooltip="不填写未截止当前"
        name="title"
      /> */}
    </ProForm>
  )
}
