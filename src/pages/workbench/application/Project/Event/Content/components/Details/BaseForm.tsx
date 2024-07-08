import { ProForm, ProFormDependency, ProFormText, ProFormDateRangePicker, ProFormRadio, ProFormCascader } from "@ant-design/pro-components";
import { Upload } from '@bluedot-tech/bluedot-antd';
import { ProRow } from '@/components/BaseComponents';

export const eventTypeOptions = [
  {
    label: '线上',
    value: 1,
  },
  {
    label: '线下',
    value: 2,
  },
];

export const Forms = () => {
  return (
    <>
      <ProFormText
        name="title"
        label="会议名称"
        fieldProps={{
          maxLength: 34,
          showCount: true,
        }}
        rules={[
          {
            required: true
          },
          {
            whitespace: true,
          }
        ]}
      />
      <ProFormDateRangePicker
        name="_meetingTime"
        label="会议时间"
        fieldProps={{
          showTime: {
            format: 'HH:mm'
          },
          format: 'YYYY-MM-DD HH:mm'
        }}
        rules={[
          {
            required: true,
            message: '请选择会议时间',
          }
        ]}
        transform={(values) => {
          return {
            start_time: values ? values[0] : undefined,
            end_time: values ? values[1] : undefined,
          };
        }}
      />
      <ProFormRadio.Group
        name="type"
        label="活动类型"
        rules={[{ required: true }]}
        initialValue={1}
        options={eventTypeOptions}
      />

      {/* <ProFormDependency name={['type']}>
        {({ type }) => {
          if (type == 2) {
            return (<ProFormText name="address" label="详细地址" rules={[{ required: true }]} />)
          }
          return null;
        }}
      </ProFormDependency> */}

      <ProRow>
        <ProRow.Col span={12}>
          <ProForm.Item
            className="reset-upload-imgcrop"
            label="活动图片"
            name="banner_img"
            help="图片尺寸建议828*350,不大于500k"
            rules={[
              {
                required: true,
                message: '请上传活动图片'
              }
            ]}
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
              appSource="event"
              imgCropProps={{
                aspect: 828 / 350,
              }}
            />
          </ProForm.Item>
        </ProRow.Col>
        <ProRow.Col span={12}>
          <ProForm.Item
            className="reset-upload-imgcrop"
            label="活动缩略图"
            name="thumbnail"
            help="图片尺寸建议132*100,不大于500k"
            rules={[
              {
                required: true,
                message: '请上传活动图片'
              }
            ]}
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
              appSource="event"
              imgCropProps={{
                aspect: 132 / 100,
              }}
            />
          </ProForm.Item>
        </ProRow.Col>
      </ProRow>
    </>
  );
};

export default (props: any) => {
  return (
    <ProForm
      submitter={false}
      {...props}
    >
      <Forms />
    </ProForm>
  )
}
