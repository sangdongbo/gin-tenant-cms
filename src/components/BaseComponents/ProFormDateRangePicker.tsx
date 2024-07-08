import { ProFormDateRangePicker } from '@ant-design/pro-components';
import dayjs from 'dayjs';

export default ({ fieldProps, ...props }: any) => {
  return (
    <ProFormDateRangePicker
      fieldProps={{
        presets: [
          {
            label: '7天',
            value: [dayjs().subtract(8, 'day'), dayjs().subtract(1, 'day')]
          },
          {
            label: '30天',
            value: [dayjs().subtract(31, 'day'), dayjs().subtract(1, 'day')]
          },
          {
            label: '90天',
            value: [dayjs().subtract(91, 'day'), dayjs().subtract(1, 'day')],
          }
        ],
        disabledDate: (current: any) => {
          return (current && current > dayjs().subtract(1, 'day')) || (current && current <= dayjs('2022-08-01T00:00:00.000Z').subtract(1, 'day'));
        },
        ...fieldProps,
      }}
      {...props}
    />
    // <ProForm.Item {...props}>
    //   <BaseDateRangePicker {...fieldProps} />
    // </ProForm.Item>
  );
};
