import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { Empty } from 'antd';
import { Line } from '@ant-design/charts';

export default ({ request, debounceWait = 0, params, handelData, mapping, ...props }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [chart, setChart] = useState<any>();
  const [config] = useState({
    data,
    xField: 'dt',
    yField: 'value',
    seriesField: 'name',
    legend: {
      position: 'bottom',
    },
  });

  const { loading, run } = useRequest(() => request?.(params), {
    debounceWait,
    manual: true,
    onSuccess(res: any[]) {
      setData(handelData ? handelData(res, params) : res);
    }
  });

  useEffect(() => {
    run();
  }, [params]);

  useEffect(() => {
    chart?.update({
      ...config,
      ...props,
      ...(mapping?.(params) || {}),
      data,
    });
  }, [data, chart]);

  return (
    <div className="reset-charts-line" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Line
        onReady={setChart}
        loading={loading}
        {...config}
      />
      {
        data?.length == 0 ? (
          <div style={{ position: 'absolute', backgroundColor: '#ffffff', zIndex: 10, left: 0, top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        ) : null
      }
    </div>
  );
};
