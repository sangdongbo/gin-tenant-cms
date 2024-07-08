import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { Empty } from 'antd';
import { Pie } from '@ant-design/charts';

export default ({ style, request, debounceWait = 0, params, handelData, mapping, ...props }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [chart, setChart] = useState<any>();

  const { loading, run } = useRequest(() => request?.(params), {
    debounceWait,
    manual: true,
    onSuccess(res: any[]) {
      setData(handelData ? handelData(res, params) : res);
    }
  });

  const config = {
    loading,
    data,
    angleField: 'value',
    colorField: 'name',
    radius: 0.6,
    innerRadius: 0.55,
    legend: {
      position: 'bottom',
    },
    ...props,
    label: {
      autoRotate: false,
      ...(props?.label || {}),
    },
    ...(mapping?.(params) || {})
  };

  useEffect(() => {
    run();
  }, [params]);

  useEffect(() => {
    chart?.update(config);
  }, [data, chart]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      <Pie
        onReady={setChart}
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
