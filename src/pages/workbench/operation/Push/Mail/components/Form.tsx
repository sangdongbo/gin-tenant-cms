import {
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  ProFormDependency,
  ProFormUploadDragger,
} from '@ant-design/pro-components';

export const ProFormMailFile = (props: any) => {
  return (
    <ProFormUploadDragger
      accept="text/html"
      max={1}
      description=""
      fieldProps={{
        beforeUpload: () => false,
      }}
      {...props}
    />
  );
};

export default ({ typeProps, hidefile = false }: any) => {
  return (
    <>
      <ProFormText
        label="模版名称"
        name="title"
        rules={[
          {
            required: true,
          },
          {
            whitespace: true,
          }
        ]}
      />
      <ProFormTextArea
        label="邮件标题"
        name="subject"
        rules={[
          {
            required: true
          },
          {
            whitespace: true,
          }]}
      />
      <ProFormRadio.Group
        label="邮件类型"
        name="type"
        initialValue={1}
        options={[
          {
            value: 1,
            label: 'HTML文件',
          },
          {
            value: 2,
            label: '后台编辑',
          },
        ]}
        rules={[{ required: true }]}
        {...typeProps}
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (type == 1 && !hidefile) {
            return (<ProFormMailFile
              label="选择文件"
              name="file"
              rules={[
                {
                  required: true,
                  message: '请上传文件',
                }
              ]}
            />);
          }
        }}
      </ProFormDependency>
    </>
  )
}
