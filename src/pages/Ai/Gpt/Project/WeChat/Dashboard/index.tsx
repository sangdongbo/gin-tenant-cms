import { useSearchParams } from '@umijs/max';
import { DataScreening } from '@/components/Dashboard';
import ProRow from '@/components/BaseComponents/ProRow';

import HotspotIssues from './components/HotspotIssues';

import { queryOverviewRule, queryResponseOverviewRule } from './service';

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
  question: (
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
      title: '提问',
      type: 'question',
      cardProps: {
        titleIocn: icon.question,
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
            project_id: projectId,
          }}
          defaultData={defaultOverviewData}
          request={queryOverviewRule}
          postData={(res: any) => {
            const postData: any[] = [
              {
                pv: res?.pageview_pv || 0,
                uv: res?.pageview_uv || 0,
                type: 'pageview',
              },
              {
                pv: res?.question_pv || 0,
                uv: res?.question_uv || 0,
                type: 'question',
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
      <ProRow.Col span={24}>
        <HotspotIssues
          params={{
            project_id: projectId,
          }}
          request={queryResponseOverviewRule}
        />
      </ProRow.Col>
    </ProRow>
  );
};
