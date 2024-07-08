import { ProForm, ProFormRadio, ProFormText, ProFormSelect, ProFormDependency } from '@ant-design/pro-components';
import { Upload } from '@bluedot-tech/bluedot-antd';
import { queryAllRule } from '../../service';

export const linkOptions = [
  { label: '无跳转', value: 'none' },
  { label: '外链', value: 'link' },
  { label: '活动', value: 'event' },
];

export default ({ id }: any) => {

  return (
    <>
      <ProFormDependency name={['img']}>
        {({ img }) => (
          <ProForm.Item
            className="reset-upload-imgcrop"
            label="banner图"
            name="img"
            // getValueFromEvent={(value) => value.url}
            rules={[{
              required: true,
              message: '请上传banner图'
            }]}
            extra="推荐：图片大小不超过2M；"
          >
            <Upload.ImgCrop
              uploadProps={{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('lookstar-tenant-token')}`,
                  'X-Tenant': localStorage.getItem('lookstar-tenant-X-Tenant'),
                  'X-Requested-With': null,
                },
                action: `${API_URL}/tenant/system/resource`,
              }}
              imgCropProps={{
                aspect: 828 / 350,
              }}
            >
              {img ? <img src={img} alt="banner" style={{ width: '100%' }} /> : <div>点击上传</div>}
            </Upload.ImgCrop>
          </ProForm.Item>
        )}
      </ProFormDependency>

      <ProFormText
        label="标题"
        name="title"
        fieldProps={{
          maxLength: 34,
          showCount: true,
        }}
        rules={[
          { required: true }
        ]}
      />

      <ProFormRadio.Group
        label="类型"
        name="type"
        initialValue="none"
        options={linkOptions}
        rules={[{ required: true }]}
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (type === 'link') {
            return (
              <ProFormText
                label="外部链接"
                name="link"
                rules={[{ required: true }, { type: 'url', message: '链接格式错误' }]}
              />
            );
          };
          if (type === 'event') {
            return (
              <ProFormSelect
                name="event_id"
                label="选择活动"
                request={async () => {
                  const res: any[] = await queryAllRule({
                    'filter[project_id]': id,
                    sort: '-state,-created_at',
                  });
                  return res?.map((item: any) => {
                    return {
                      value: item.id,
                      label: item.title,
                    }
                  });
                }}
                rules={[{
                  required: true,
                  message: '请选择活动'
                }]}
              />
            );
          };
          return null;
        }}
      </ProFormDependency>
    </>
  );
};
