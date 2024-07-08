import { useState, useEffect } from 'react';
// import moment from 'moment';
import dayjs from 'dayjs';
import { Modal, DatePicker, Space, Button } from 'antd';
import { BaseKPI } from '@/components/Dashboard';
import { getSceneStrStatisticsRule } from '../service';

export default ({ row, ...props }: any) => {
  const [date, setDate] = useState<any[]>([dayjs().subtract(6, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'), dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')]);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState([
    {
      title: 'PV',
      value: '0',
      type: 'pv',
    },
    {
      title: 'UV',
      value: '0',
      type: 'uv',
    },
    {
      title: '新关注',
      value: '0',
      type: 'subscribe',
    },
  ]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const result = await getSceneStrStatisticsRule({
      appid: row?.appid,
      scene_str: row?.scene_str,
      start_time: date[0],
      end_time: date[1],
    });

    setList(list.map(item => ({
      ...item,
      value: result[item.type] || 0,
    })));
    setLoading(false);
  };

  return (
    <>
      <Modal
        footer={null}
        {...props}
      >
        <BaseKPI
          list={list}
          loading={loading}
          extra={
            <Space>
              <DatePicker.RangePicker
                allowClear={false}
                defaultValue={[dayjs(date[0]), dayjs(date[1])]}
                onChange={(date: string[]) => {
                  if (date) setDate([date[0].startOf('day').format('YYYY-MM-DD HH:mm:ss'), date[1].endOf('day').format('YYYY-MM-DD HH:mm:ss')]);
                }}
                disabledDate={(current) => {
                  return current && current >= dayjs().endOf('day');
                }}
                ranges={{
                  '上一月': [dayjs().subtract(1, 'months').startOf('month'), dayjs().subtract(1, 'months').endOf('month')],
                }}
              />
              <Button type="primary" loading={loading} onClick={getData}>
                查询
              </Button>
            </Space>
          }
        />
      </Modal>
    </>
  );
};
