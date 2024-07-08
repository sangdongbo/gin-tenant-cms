import { useModel } from '@umijs/max';
import { PieChartOutlined } from '@ant-design/icons';
import { ChartsCard, ChartsPie } from '@/components/Dashboard';
import { getFirstRegisterRule } from '../../service';

const handleData = (data: any[]) => {
  return data.map(item => {
    item.title = item.title || '其他';
    return item;
  });
};

export default () => {
  const { dataDimensionOptions, params } = useModel('analyze', (model) => model);

  return (
    <ChartsCard
      row={2}
      titleIocn={<PieChartOutlined />}
      title="首次注册来源对比"
      time={false}
      params={{
        comparison_dimension: 'folder',
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
                label: '文件夹',
                value: 'folder'
              },
              {
                label: '项目',
                value: 'project'
              }
            ],
          },
          // {
          //   type: 'select',
          //   name: 'data_dimension',
          //   size: 'small',
          //   options: dataDimensionOptions,
          // }
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
        colorField="title"
        angleField="first_time_registered_count"
        debounceWait={1000}
        request={async (currentParams: any) => {
          if (currentParams?.project_ids?.length) {
            return await getFirstRegisterRule(currentParams)
          };
          return [];
        }}
        handelData={handleData}
      />
    </ChartsCard>
  )
}
