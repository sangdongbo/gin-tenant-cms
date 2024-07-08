import { WordCloud } from '@ant-design/charts';
import { useState, useEffect } from 'react';
import style from './style.less';

export default ({ request, params, handelData, mapping, dataSource: baseData, ...props }: any) => {
  const [chart, setChart] = useState<any>();
  const [data, setData] = useState<any[]>(baseData ? baseData : []);
  const [loading, setLoading] = useState(false);

  const config: any = {
    data,
    loading,
    className: style['word-cloud'],
    height: 'auto',
    wordField: 'name',
    weightField: 'value',
    colorField: 'name',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8, 40],
      rotation: 0,
    },
    random: function random() {
      return 0.5;
    },
    ...props,
    ...(mapping?.(params) || {})
  };

  useEffect(() => {
    if (request) {
      setLoading(true);
      request?.(params)
        .then((res: any[]) => {
          setData(handelData ? handelData(res) : res);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params]);

  useEffect(() => {
    if (baseData) setData(baseData);
  }, [baseData]);

  useEffect(() => {
    chart?.update(config);
  }, [data, chart]);

  if (!data?.length) return null;

  return <WordCloud onReady={setChart} {...config} />;
};
