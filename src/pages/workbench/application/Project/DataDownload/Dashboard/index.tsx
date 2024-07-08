import { useSearchParams } from '@umijs/max';
import { ChartsCard, ChartsLine, DataScreening, Rank } from '@/components/Dashboard';
import { LineChartOutlined, OrderedListOutlined } from '@ant-design/icons';
import ProRow from '@/components/BaseComponents/ProRow';
import Channel from '../../components/Channel';

import { queryOverviewRule, queryTimelineRule, queryUserTopRule } from './service';

const handleTrendAnalysisData = (list: any[]) => {
  const currentList: any[] = [];
  list.forEach((item) => {
    currentList.push({
      dt: item.dt,
      value: item.uv,
      type: 'UV',
    });
    currentList.push({
      dt: item.dt,
      value: item.pv,
      type: 'PV',
    });
  });
  return currentList;
};

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
  download: (
    <svg
      fill={PRIMARYCOLOR}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
    >
      <path d="M512.159834 619.104064 651.236509 480.027388 693.60456 522.395337 520.19803 695.801868 512.164126 703.835772 512.159834 703.831479 512.155542 703.835772 330.71521 522.395337 373.083261 480.027388Z"></path>
      <path d="M480.027388 64.383234l63.945223 0 0 575.507315-63.945223 0 0-575.507315Z"></path>
      <path d="M128.328486 480.027374 128.328486 863.717352C128.328486 881.353326 142.627858 895.671514 160.188903 895.671514L863.811097 895.671514C881.235751 895.671514 895.671514 881.25129 895.671514 863.717352L895.671514 480.027374 927.644141 480.027374 959.616766 480.027374 959.616766 863.717352C959.616766 916.681136 916.437792 959.616766 863.811097 959.616766L160.188903 959.616766C107.276893 959.616766 64.383234 916.634343 64.383234 863.717352L64.383234 480.027374 96.35586 480.027374 128.328486 480.027374Z"></path>
    </svg>
  ),
};

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

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
      title: '下载',
      type: 'download',
      cardProps: {
        titleIocn: icon.download,
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
                pv: res?.download_pv || 0,
                uv: res?.download_uv || 0,
                type: 'download',
              },
            ];

            const list: any[] = defaultOverviewData.map((item: any) => {
              const currentValue = postData.filter((it: any) => item.type === it.type)[0] || {};
              let title: string = item.title;
              switch (currentValue.type) {
                case 'pageview':
                  title = '访问';
                  break;
                case 'preview':
                  title = '预览';
                  break;
                case 'download':
                  title = '下载';
                  break;
                default:
                  break;
              }

              return {
                ...item,
                title,
                list: [
                  {
                    title: 'PV',
                    value: currentValue.pv || 0,
                    // descriptionTitle: '昨日新增',
                    // descriptionValue: '-',
                    // descriptionTrend: 'up',
                  },
                  {
                    title: 'UV',
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
              value: 'download',
              label: '下载',
            },
          ]}
          params={{
            app_id: projectId,
          }}
        >
          <ChartsLine
            xField="dt"
            yField="value"
            seriesField="type"
            handelData={handleTrendAnalysisData}
            request={queryTimelineRule}
          />
        </ChartsCard>
      </ProRow.Col>
      <ProRow.Col span={6}>
        <ChartsCard
          row={3}
          size="small"
          title="排行"
          titleIocn={<OrderedListOutlined />}
          subTitle="(TOP 10)"
          options={[
            {
              label: '预览',
              value: 'preview',
              checked: true,
            },
            {
              label: '下载',
              value: 'download',
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
            event: '$pageview'
          }}
          centerTitle="浏览"
        />
      </ProRow.Col>
      <ProRow.Col span={12}>
        <Channel
          title="注册渠道占比"
          params={{
            app_id: projectId,
            event: 'user_register_success'
          }}
          centerTitle="注册"
        />
      </ProRow.Col>
    </ProRow>
  );
};
