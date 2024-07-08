import {
  ProFormText,
  ProFormDatePicker,
} from '@ant-design/pro-components';
// import moment from 'moment';
import dayjs from 'dayjs';

const disabledDate = (current: any) => {
  return current && current < dayjs().add(-1, 'day').endOf('day');
};

export const ProFormTime = ({ fieldProps, ...props }: any) => {
  return (
    <ProFormDatePicker
      allowClear={false}
      initialValue={dayjs().add(6, 'minute')}
      fieldProps={{
        format: "YYYY-MM-DD HH:mm",
        showTime: true,
        disabledDate: disabledDate,
        // disabledTime: disabledDateTime,
        style: {
          width: '100%',
        },
        ...fieldProps,
      }}
      label="发送时间"
      name="send_time"
      rules={[
        {
          required: true,
        }
      ]}
      {...props}
    />
  )
};

export default () => {
  return (
    <>
      <ProFormText
        label="任务名称"
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
      <ProFormTime />
    </>
  )
}
