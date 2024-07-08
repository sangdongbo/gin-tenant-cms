import { DatePicker } from 'antd';
import dayjs from 'dayjs';

export default ({ value, ...props }: any) => {
  return (
    <DatePicker.RangePicker
      value={value && value?.length == 2 ? [dayjs(value[0]), dayjs(value[1])] : value}
      presets={[
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
      ]}
      disabledDate={(current: any) => {
        return (current && current > dayjs().subtract(1, 'day')) || (current && current <= dayjs('2022-08-01T00:00:00.000Z').subtract(1, 'day'));
      }}
      size="small"
      allowClear={false}
      {...props}
    />
  );
};
