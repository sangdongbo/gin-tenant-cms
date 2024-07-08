import { ModalForm, ProForm, ProFormUploadDragger } from '@ant-design/pro-components';
import { addImportRule } from '../../service';

export default ({ visible, onVisibleChange, onFinish }: any) => {
  return (
    <ModalForm
      title="上传联系人"
      open={visible}
      onOpenChange={onVisibleChange}
      width={600}
      layout="horizontal"
      onFinish={async (values: any) => {
        const fd = new FormData();
        fd.append('file', values.file[0].originFileObj);
        await addImportRule(fd);

        onFinish?.();
        return true;
      }}
    >
      <ProForm.Item label="1. 下载模板">
        <a
          href={`${API_URL}/tenant/contacts/import-template?token=${localStorage.getItem(
            'lookstar-tenant-token',
          )}&tenant=${localStorage.getItem('lookstar-tenant-X-Tenant')}`}
        >
          点击下载
        </a>
      </ProForm.Item>
      <ProFormUploadDragger
        action={async (res) => {
          return res;
        }}
        fieldProps={{
          beforeUpload: () => false,
        }}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        label="2. 上传文件"
        name="file"
        rules={[{ required: true, message: '请上传资料' }]}
        max={1}
        title="点击选择或拖动文件到此区域"
        description="文件小于10M，数据少于5万条，格式：CSV"
      />
    </ModalForm>
  );
};
