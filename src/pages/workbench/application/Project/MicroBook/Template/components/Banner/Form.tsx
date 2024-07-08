import { ProForm, ProFormRadio, ProFormText, ProFormDependency } from '@ant-design/pro-components';
import { Upload } from '@bluedot-tech/bluedot-antd';

import SelectFreepublish from '@/pages/workbench/operation/WeChat/Freepublish/components/SelectFreepublish';

export const linkOptions = [
  { label: '外链', value: 'link' },
  { label: '图文', value: 'freepublish' },
];

export default () => {
  return (
    <>
      <ProFormDependency name={['img']}>
        {({ img }) => (
          <ProForm.Item
            className="reset-upload-imgcrop"
            label="banner图"
            name="img"
            // getValueFromEvent={(value) => value.url}
            rules={[{ required: true, message: '请上传banner图' }]}
            extra="推荐：图片大小不超过2M；"
          >
            <Upload.ImgCrop
              imgCropProps={{
                aspect: 390 / 200,
              }}
            >
              {img ? <img src={img} alt="banner" style={{ width: '100%' }} /> : <div>点击上传</div>}
            </Upload.ImgCrop>
          </ProForm.Item>
        )}
      </ProFormDependency>

      <ProFormText label="标题" name="title" rules={[{ required: true }]} />

      <ProFormRadio.Group
        label="类型"
        name="type"
        initialValue="link"
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
          }

          return (
            <SelectFreepublish
              label="选择图文"
              name="freepublish_id"
              rules={[{ required: true }]}
            />
          );
        }}
      </ProFormDependency>
    </>
  );
};
