import { useRef } from 'react';
import { Button } from 'antd';
import { stringify } from 'qs';
import { LineChartOutlined, DownloadOutlined } from '@ant-design/icons';
import { ChartsCard, ChartsLine } from '@/components/Dashboard';
import { getMenuTimelineRule } from '../service';

export default ({ appid }: any) => {
  const paramsRef = useRef(null);
  const trendNavList = [
    {
      value: 'pv',
      label: '菜单点击次数',
    },
    {
      value: 'uv',
      label: '菜单点击人数',
    },
    {
      value: 'rate',
      label: '人均点击次数',
    },
  ];

  return (
    <>
      <ChartsCard
        params={{ appid }}
        titleIocn={<LineChartOutlined />}
        title="趋势分析"
        options={trendNavList}
        row={3}
        extra={{
          right: [
            <Button
              key="export"
              size="small"
              icon={<DownloadOutlined />}
              onClick={() => {
                let urlString: any = stringify({
                  token: localStorage.getItem('lookstar-tenant-token'),
                  tenant: localStorage.getItem('lookstar-tenant-X-Tenant'),
                  ...(paramsRef?.current || {}),
                });
                window.location.href = `${API_URL}/tenant/wechat/menu/analytics/export?${urlString}`;
              }}
            >
              导出
            </Button>,
          ],
        }}
      >
        <ChartsLine
          request={(params: any) => {
            paramsRef.current = params;
            return getMenuTimelineRule(params);
          }}
          handelData={(data: any[]) => {
            return data.map((item) => {
              return {
                ...item,
                value: Number(item.value),
              };
            });
          }}
        />
      </ChartsCard>
    </>
  );
};
