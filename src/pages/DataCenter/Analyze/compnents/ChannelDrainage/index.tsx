import { useModel } from '@umijs/max';
import { PieChartOutlined } from '@ant-design/icons';
import { ChartsCard, ChartsPie } from '@/components/Dashboard';
import { getChannelDataRule } from '../../service';

const handelData = (data: any[], params: any) => {
  let currentData: any[] = [];

  data = data.filter(item => item.nick_name || item.properties_utm_source);

  data.forEach((item: any) => {
    currentData = [
      ...currentData,
      {
        name: item.nick_name || item.properties_utm_source || '其他',
        value: item[params?.data_dimension] || 0,
      },
    ];
  });
  return currentData;
};

export default () => {
  const { dataDimensionOptions, params } = useModel('analyze', (model) => model);

  return (
    <ChartsCard
      row={2}
      titleIocn={<PieChartOutlined />}
      title="渠道引流对比"
      time={false}
      params={{
        data_dimension: 'pageview_pv_cnt',
        comparison_dimension: 'offiaccount',
        ...params,
        project_ids: params?.project_ids.map((item: any) => item.value) || [],
      }}
      extra={{
        customForms: [
          {
            type: 'radio',
            name: 'comparison_dimension',
            size: 'small',
            buttonStyle: 'solid',
            optionType: 'button',
            options: [
              {
                label: '公众号',
                value: 'offiaccount'
              },
              {
                label: '广告来源',
                value: 'source'
              }
            ],
          },
          {
            type: 'select',
            name: 'data_dimension',
            size: 'small',
            options: dataDimensionOptions,
          }
        ]
      }}
    >
      <ChartsPie
        radius={1}
        innerRadius={0}
        label={{
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        }}
        debounceWait={1000}
        request={async (currentParams: any) => {
          if (currentParams?.project_ids?.length) {
            return await getChannelDataRule(currentParams)
          };
          return [];
        }}
        handelData={handelData}
      />
    </ChartsCard>
  )
}
