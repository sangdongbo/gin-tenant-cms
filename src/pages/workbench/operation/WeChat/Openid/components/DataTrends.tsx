import { useEffect, useState } from 'react';
import { useUpdateEffect } from 'ahooks';
import { BaseKPI, BaseProCard } from '@/components/Dashboard';
import { queryOverviewRule } from '../service';

const perCapitaCalculation = (subscribe_cnt: number, unsubscribe_cnt: number) => {
  const number = subscribe_cnt - unsubscribe_cnt;
  // if (unsubscribe_cnt == 0) {
  //   return 0;
  // }
  return number;
};

export default ({ appid }: any) => {
  const [params, setParams] = useState<any>({
    appid,
  });

  const [loading, setLoading] = useState(true);

  const [list, setList] = useState([
    {
      title: '新关注人数',
      value: '0',
      type: 'subscribe_cnt',
      list: [
        // {
        //   title: '昨日',
        //   value: '0',
        // },
        {
          title: '近7天',
          value: '0',
        },
        {
          title: '近30天',
          value: '0',
        },
      ],
    },
    {
      title: '取消关注人数',
      value: '0',
      type: 'unsubscribe_cnt',
      list: [
        // {
        //   title: '昨日',
        //   value: '0',
        // },
        {
          title: '近7天',
          value: '0',
        },
        {
          title: '近30天',
          value: '0',
        },
      ],
    },
    {
      title: '净增关注人数',
      value: '0',
      type: 'netgain_subscribe_cnt',
      list: [
        // {
        //   title: '昨日',
        //   value: '0',
        // },
        {
          title: '近7天',
          value: '0',
        },
        {
          title: '近30天',
          value: '0',
        },
      ],
    },
    // {
    //   title: '人均点击次数',
    //   value: '0',
    //   type: 'average',
    //   list: [
    //     {
    //       title: '昨日',
    //       value: '0',
    //     },
    //     {
    //       title: '近7天',
    //       value: '0',
    //     },
    //     {
    //       title: '近30天',
    //       value: '0',
    //     },
    //   ],
    // },
  ]);

  useEffect(() => {
    setLoading(true);
    queryOverviewRule(params)
      .then((res: any) => {
        setLoading(false);
        const subscribe_cnt = {
          total: res?.subscribe_cnt_1d || 0,
          // '1d': res?.subscribe_cnt_1d || 0,
          '7d': res?.subscribe_cnt_7d || 0,
          '30d': res?.subscribe_cnt_30d || 0,
        };
        const unsubscribe_cnt = {
          total: res?.unsubscribe_cnt_1d || 0,
          // '1d': res?.unsubscribe_cnt_1d || 0,
          '7d': res?.unsubscribe_cnt_7d || 0,
          '30d': res?.unsubscribe_cnt_30d || 0,
        };

        const netgain_subscribe_cnt = {
          total: subscribe_cnt.total - unsubscribe_cnt.total || 0,
          // '1d': perCapitaCalculation(subscribe_cnt['1d'], unsubscribe_cnt['1d']),
          '7d': perCapitaCalculation(subscribe_cnt['7d'], unsubscribe_cnt['7d']),
          '30d': perCapitaCalculation(subscribe_cnt['30d'], unsubscribe_cnt['30d']),
        };
        const data: any = {
          subscribe_cnt,
          unsubscribe_cnt,
          netgain_subscribe_cnt,
        };
        const currentList = list.map((item: any) => {
          const currentValue: any = item;
          const currentData = data[item.type];
          if (item.type == 'netgain_subscribe_cnt') {
            currentValue.value = Number(currentData.total.toFixed(2));
            // currentValue.list[0].value = currentData['1d'].toFixed(2);
            currentValue.list[0].value = Number(currentData['7d'].toFixed(2));
            currentValue.list[1].value = Number(currentData['30d'].toFixed(2));
          } else {
            currentValue.value = Number(currentData.total.toFixed(2));
            // currentValue.list[0].value = Number(currentData['1d'].toFixed(2));
            currentValue.list[0].value = Number(currentData['7d'].toFixed(2));
            currentValue.list[1].value = Number(currentData['30d'].toFixed(2));
          }

          return currentValue;
        });
        setList(currentList);
      })
      .catch(() => setLoading(false));
  }, [params]);

  useUpdateEffect(() => {
    setParams({
      ...params,
      appid,
    });
  }, [appid]);

  return (
    <BaseProCard loading={loading} bordered title="昨日关键指标" row={2}>
      <BaseKPI list={list} style={{ padding: 0 }} bodyStyle={{ padding: 0 }} />
    </BaseProCard>
  );
};
