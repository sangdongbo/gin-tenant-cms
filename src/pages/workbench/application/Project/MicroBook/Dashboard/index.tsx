import { useSearchParams } from '@umijs/max';
import { DownloadOutlined, LineChartOutlined, OrderedListOutlined } from '@ant-design/icons';
import { ChartsCard, ChartsLine, DataScreening, Rank } from '@/components/Dashboard';
import { queryOverviewRule, queryTimelineRule, queryUserTopRule } from './service';
import ProRow from '@/components/BaseComponents/ProRow';
import Channel from '../../components/Channel';
import { Button } from 'antd';
import { stringify } from 'qs';
import { useRef } from 'react';

const icon = {
  pageview: (
    <svg
      fill={PRIMARYCOLOR}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
    >
      <path d="M242.526316 215.578947h431.157895v53.894737H242.526316V215.578947z m431.157895 269.473685H242.526316V431.157895h431.157895v53.894737z m323.368421 323.368421c0 88.279579-144.761263 215.578947-323.368421 215.578947s-323.368421-127.353263-323.368422-215.578947a164.055579 164.055579 0 0 1 53.894737-107.789474H242.526316v-53.894737h215.578947v10.778947a388.042105 388.042105 0 0 1 377.263158-28.725894V53.894737H80.842105v862.315789h323.368421v53.894737H26.947368V0h862.31579v658.054737A208.357053 208.357053 0 0 1 997.052632 808.421053z m-134.736843-107.789474H835.368421v-14.928842A356.675368 356.675368 0 0 0 673.684211 646.736842c-148.857263 0-269.473684 91.136-269.473685 161.684211 0 66.182737 120.616421 161.684211 269.473685 161.68421s269.473684-95.501474 269.473684-161.68421a149.989053 149.989053 0 0 0-80.842106-107.789474zM673.684211 916.210526a107.789474 107.789474 0 1 1 107.789473-107.789473 107.789474 107.789474 0 0 1-107.789473 107.789473z m0-161.68421a53.894737 53.894737 0 1 0 53.894736 53.894737 53.894737 53.894737 0 0 0-53.894736-53.894737z"></path>
    </svg>
  ),
  preview: (
    <svg
      fill={PRIMARYCOLOR}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
    >
      <path d="M576 992H128a32 32 0 0 1-32-32V64A32 32 0 0 1 128 32h768a32 32 0 0 1 32 32v576a32 32 0 0 1-64 0V96h-704v832H576a32 32 0 0 1 0 64z"></path>
      <path d="M768 288H256a32 32 0 0 1 0-64h512a32 32 0 0 1 0 64zM448 544H256a32 32 0 0 1 0-64h192a32 32 0 0 1 0 64zM384 800H256a32 32 0 0 1 0-64h128a32 32 0 0 1 0 64zM640 896a192 192 0 1 1 192-192 192 192 0 0 1-192 192z m0-320a128 128 0 1 0 128 128 128 128 0 0 0-128-128z"></path>
      <path d="M896 992a32 32 0 0 1-21.76-8.32l-138.24-128a32.64 32.64 0 0 1 44.16-47.36l137.6 128a32.64 32.64 0 0 1 0 45.44 32 32 0 0 1-21.76 10.24z"></path>
    </svg>
  ),
  share: (
    <svg
      fill={PRIMARYCOLOR}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
    >
      <path d="M768.73106 703.537712c-35.606921 0-67.945574 14.793214-91.167479 38.359147l-309.109357-171.670082c9.116748-17.545439 14.621199-37.155048 14.621199-58.312783 0-12.55703-2.408198-24.426004-5.676466-35.950949l304.63699-189.215522c22.705863 20.469679 52.464304 33.198723 85.146985 33.198723 70.525785 0 127.978498-57.452713 127.978498-127.978498S837.708718 63.989249 767.182933 63.989249s-127.978498 57.452713-127.978498 127.978498c0 14.621199 2.92424 28.382328 7.396607 41.455401L344.716278 420.746514c-23.049891-22.705863-54.700487-36.983034-89.791366-36.983034-70.525785 0-127.978498 57.452713-127.978498 127.978498s57.452713 127.978498 127.978498 127.978498c25.630102 0 49.540064-7.740635 69.493701-20.813707l321.150344 178.378633c-3.096254 11.008903-5.160423 22.18982-5.160423 34.058794 0 70.525785 57.452713 127.978498 127.978498 127.978498s127.978498-57.452713 127.978498-127.978498S839.256845 703.537712 768.73106 703.537712zM767.182933 127.978498c35.262893 0 63.989249 28.726356 63.989249 63.989249s-28.726356 63.989249-63.989249 63.989249-63.989249-28.726356-63.989249-63.989249S731.92004 127.978498 767.182933 127.978498zM191.107677 511.913993c0-35.262893 28.726356-63.989249 63.989249-63.989249s63.989249 28.726356 63.989249 63.989249-28.726356 63.989249-63.989249 63.989249S191.107677 547.176886 191.107677 511.913993zM768.73106 895.505459c-35.262893 0-63.989249-28.726356-63.989249-63.989249s28.726356-63.989249 63.989249-63.989249 63.989249 28.726356 63.989249 63.989249C832.720309 866.951117 803.993953 895.505459 768.73106 895.505459z"></path>
    </svg>
  ),
};

const handleTrendAnalysisData = (list: any[]) => {
  const currentList: any[] = [];
  list.forEach((item) => {
    let first = 'UV';
    let two = 'PV';
    if (item.type == 'share') {
      first = '分享人数';
      two = '分享回流';
    }
    currentList.push({
      dt: item.dt,
      value: item.uv,
      type: first,
    });
    currentList.push({
      dt: item.dt,
      value: item.pv,
      type: two,
    });
  });
  return currentList;
};

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');
  const paramsRef = useRef(null);
  const defaultOverviewData = [
    {
      title: '访问',
      type: 'pageview',
      cardProps: {
        titleIocn: icon.pageview,
      },
      list: [
        {
          title: 'PV',
          value: 0,
        },
        {
          title: 'UV',
          value: 0,
        },
      ],
    },
    {
      title: '预览',
      type: 'preview',
      cardProps: {
        titleIocn: icon.preview,
      },
      list: [
        {
          title: 'PV',
          value: 0,
        },
        {
          title: 'UV',
          value: 0,
        },
      ],
    },
    {
      title: '分享',
      type: 'share',
      cardProps: {
        titleIocn: icon.share,
      },
      list: [
        {
          title: '分享回流',
          value: 0,
        },
        {
          title: '分享人数',
          value: 0,
        },
      ],
    },
  ];

  return (
    <ProRow style={{ paddingTop: 8 }} gutter={[16, 16]}>
      <ProRow.Col span={24}>
        <DataScreening
          params={{
            app_id: projectId,
          }}
          defaultData={defaultOverviewData}
          request={queryOverviewRule}
          postData={(res: any) => {
            const postData: any[] = [
              {
                pv: res?.preview_pv || 0,
                uv: res?.preview_uv || 0,
                type: 'preview',
              },
              {
                pv: res?.pageview_pv || 0,
                uv: res?.pageview_uv || 0,
                type: 'pageview',
              },
              {
                pv: res?.share_pv || 0,
                uv: res?.share_uv || 0,
                type: 'share',
              },
            ];

            const list: any[] = defaultOverviewData.map((item: any) => {
              const currentValue = postData.filter((it: any) => item.type === it.type)[0] || {};
              return {
                ...item,
                title: item.title,
                list: [
                  {
                    title: item?.list[0]?.title || 'PV',
                    value: currentValue.pv || 0,
                    // descriptionTitle: '昨日新增',
                    // descriptionValue: '-',
                    // descriptionTrend: 'up',
                  },
                  {
                    title: item?.list[1]?.title || 'UV',
                    value: currentValue.uv || 0,
                    // descriptionTitle: '昨日新增',
                    // descriptionValue: '-',
                    // descriptionTrend: 'up',
                  },
                ],
              };
            });
            return list;
          }}
        />
      </ProRow.Col>
      <ProRow.Col span={18}>
        <ChartsCard
          row={3}
          size="small"
          titleIocn={<LineChartOutlined />}
          title="趋势分析"
          options={[
            {
              value: 'pageview',
              label: '访问',
              checked: true,
            },
            {
              value: 'preview',
              label: '预览',
            },
            {
              value: 'share',
              label: '分享',
            },
          ]}
          params={{
            app_id: projectId,
          }}
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
                  window.location.href = `${API_URL}/tenant/project/microbook/analytics/export?${urlString}`;
                }}
              >
                导出
              </Button>,
            ],
          }}
        >
          <ChartsLine
            xField="dt"
            yField="value"
            seriesField="type"
            handelData={handleTrendAnalysisData}
            request={(params: any) => {
              paramsRef.current = params;
              return queryTimelineRule(params);
            }}
            // request={queryTimelineRule}
          />
        </ChartsCard>
      </ProRow.Col>
      <ProRow.Col span={6}>
        <ChartsCard
          row={3}
          size="small"
          titleIocn={<OrderedListOutlined />}
          title="排行"
          subTitle="(TOP 10)"
          options={[
            {
              label: 'PV',
              value: 'pv',
              checked: true,
            },
            {
              label: 'UV',
              value: 'uv',
            },
          ]}
          time={false}
          params={{
            app_id: projectId,
          }}
        >
          <Rank request={queryUserTopRule} />
        </ChartsCard>
      </ProRow.Col>
      <ProRow.Col span={12}>
        <Channel
          title="浏览渠道占比"
          params={{
            app_id: projectId,
            event: '$pageview',
          }}
          centerTitle="浏览"
        />
      </ProRow.Col>
      <ProRow.Col span={12}>
        <Channel
          title="注册渠道占比"
          params={{
            app_id: projectId,
            event: 'user_register_success',
          }}
          centerTitle="注册"
        />
      </ProRow.Col>
    </ProRow>
  );
};
