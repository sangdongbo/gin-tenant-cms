import { message } from 'antd';
import { ProFormUploadDragger } from '@ant-design/pro-components';

export default ({ appSource, fieldProps, ...props }: any) => {
  return (
    <ProFormUploadDragger
      {...props}
      action={`${API_URL}/tenant/system/resource`}
      fieldProps={{
        ...fieldProps,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('lookstar-tenant-token')}`,
          'X-Tenant': localStorage.getItem('lookstar-tenant-X-Tenant'),
          'X-Requested-With': null,
        },
        name: 'file',
        data: { app_source: appSource },
      }}
      getValueFromEvent={(e: any) => {
        if (e?.file.status !== 'done') {
          return e.fileList;
        }
        const fileList = [] as any[];
        e?.fileList.map((item: any) => {
          if (item.status == 'done') {
            if (item.response.errcode) {
              message.error('资料上传失败，请重新上传！');
            } else {
              fileList.push({ ...item.response, uid: item.uid, type: item.type, name: item.name });
            }
          }
        });
        return fileList;
      }}
    />
  );
};
