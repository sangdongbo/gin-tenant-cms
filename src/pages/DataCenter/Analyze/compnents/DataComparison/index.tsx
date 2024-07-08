import { useModel } from '@umijs/max';
import { BarChartOutlined } from '@ant-design/icons';
import { ChartsCard, ChartsColumn } from '@/components/Dashboard';
import { getProjectDataRule } from '../../service';

const handelData = (data: any[], params: any) => {
  let currentData: any[] = [];

  data.forEach((item: any) => {
    currentData = [
      ...currentData,
      {
        name: item.title,
        value: item[params.data_dimension] || 0,
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
      titleIocn={<BarChartOutlined />}
      title="项目数据对比"
      time={false}
      params={{
        data_dimension: 'pageview_pv_cnt',
        comparison_dimension: 'folder',
        ...params,
        project_ids: params?.project_ids?.map((item: any) => item.value) || [],
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
                label: '文件夹',
                value: 'folder'
              },
              {
                label: '项目',
                value: 'project'
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
      <ChartsColumn
        debounceWait={1000}
        xAxis={{
          label: {
            autoHide: false,
            autoRotate: true,
            formatter: (title: any) => {
              if (title.length > 6) {
                title = `${title}`.substring(0, 6) + '...';
              };
              return title;
            },
          },
        }}
        mapping={(params: any) => {
          const currentData = dataDimensionOptions.filter(item => item.value == params.data_dimension)[0];
          return {
            meta: {
              value: {
                alias: currentData?.label || 'value',
              },
            },
          }
        }}
        request={async (currentParams: any) => {
          if (currentParams?.project_ids?.length) {
            return await getProjectDataRule(currentParams)
          };
          return [];
        }}
        handelData={handelData}
      />
    </ChartsCard>
  )
}
