import { useEffect, useState } from 'react';
import { useUpdateEffect } from 'ahooks';
import { BaseKPI, BaseProCard } from '@/components/Dashboard';
import { getMenuOverviewRule } from '../service';

const perCapitaCalculation = (pv: number, uv: number) => {
  const number = pv / uv;
  if (uv == 0) {
    return 0;
  }
  return number;
};

export default ({ appid }: any) => {
  const [params, setParams] = useState<any>({
    appid,
  });

  const [loading, setLoading] = useState(true);

  const [list, setList] = useState([
    {
      title: '菜单点击次数',
      value: '0',
      type: 'pv',
      list: [
        {
          title: '昨日',
          value: '0',
        },
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
      title: '菜单点击人数',
      value: '0',
      type: 'uv',
      list: [
        {
          title: '昨日',
          value: '0',
        },
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
      title: '人均点击次数',
      value: '0',
      type: 'average',
      list: [
        {
          title: '昨日',
          value: '0',
        },
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
  ]);

  useEffect(() => {
    setLoading(true);
    getMenuOverviewRule(params)
      .then((res: any) => {
        setLoading(false);
        const pv = {
          total: res?.pv || 0,
          '1d': res?.pv_new_cnt_1d || 0,
          '7d': res?.pv_new_cnt_7d || 0,
          '30d': res?.pv_new_cnt_30d || 0,
        };

        const uv = {
          total: res?.uv || 0,
          '1d': res?.uv_new_cnt_1d || 0,
          '7d': res?.uv_new_cnt_7d || 0,
          '30d': res?.uv_new_cnt_30d || 0,
        };

        const average = {
          total: pv.total / uv.total || 0,
          '1d': perCapitaCalculation(pv['1d'], uv['1d']),
          '7d': perCapitaCalculation(pv['7d'], uv['7d']),
          '30d': perCapitaCalculation(pv['30d'], uv['30d']),
        };

        const data: any = {
          pv,
          uv,
          average,
        };

        const currentList = list.map((item: any) => {
          const currentValue: any = item;
          const currentData = data[item.type];
          if (item.type == 'average') {
            currentValue.value = currentData.total.toFixed(2);
            currentValue.list[0].value = currentData['1d'].toFixed(2);
            currentValue.list[1].value = currentData['7d'].toFixed(2);
            currentValue.list[2].value = currentData['30d'].toFixed(2);
          } else {
            currentValue.value = Number(currentData.total.toFixed(2));
            currentValue.list[0].value = Number(currentData['1d'].toFixed(2));
            currentValue.list[1].value = Number(currentData['7d'].toFixed(2));
            currentValue.list[2].value = Number(currentData['30d'].toFixed(2));
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
    <BaseProCard
      loading={loading}
      bordered
      title="昨日关键指标分析"
      row={2}
    >
      <BaseKPI list={list} style={{ padding: 0 }} bodyStyle={{ padding: 0 }} />
    </BaseProCard>
  );
};
