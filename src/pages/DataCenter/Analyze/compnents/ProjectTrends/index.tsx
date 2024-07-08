import { useModel } from '@umijs/max';
import { LineChartOutlined } from '@ant-design/icons';
import { chunk } from 'lodash';
import { ChartsCard, ChartsLine } from '@/components/Dashboard';
import { getTimelineRule } from '../../service';

const handelData = (data: any[], params: any) => {
  let currentData: any[] = [];

  data.forEach((item: any) => {
    currentData = [
      ...currentData,
      {
        name: item.title,
        dt: item.create_date,
        value: item[params.data_dimension] || 0,
      },
    ];
  });
  return currentData;
}

export default () => {
  const { dataDimensionOptions, params } = useModel('analyze', (model) => model);

  return (
    <ChartsCard
      row={2}
      titleIocn={<LineChartOutlined />}
      title="项目趋势对比"
      time={false}
      params={{
        data_dimension: 'pageview_pv_cnt',
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
          {
            type: 'select',
            name: 'data_dimension',
            size: 'small',
            options: dataDimensionOptions,
          }
        ]
      }}
    >
      <ChartsLine
        debounceWait={1000}
        tooltip={{
          showMarkers: false,
          enterable: true,
          customContent: (title: any, items: any) => {
            const itemsArray = chunk(items, 6);
            let str = '';
            itemsArray.forEach((item, index) => {
              str += `
                <div style="padding-left: ${index != 0 ? 12 : 0}px">
                  <ul class="g2-tooltip-list" style="margin: 0px; list-style-type: none; padding: 0px;">
              `;

              item?.forEach((it: any) => {
                str += `
                        <li class="g2-tooltip-list-item" data-index="" style="list-style-type: none; padding: 0px; margin: 12px 0px;">
                          <span class="g2-tooltip-marker" style="background: ${it.color}; width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 8px;"></span>
                          <span class="g2-tooltip-name">${it.name}</span>:
                          <span class="g2-tooltip-value" style="display: inline-block; float: right; margin-left: 30px;">${it.value}</span>
                        </li>
                      `
              });

              str += `
              </ul>
                      </div>
              `;
            });

            return `<div class="g2-tooltip-title" style = "margin-bottom: 12px; margin-top: 12px;"> ${title}</div>
                <div style="display: flex;">${str}</div>`;
          },
        }}
        request={async (currentParams: any) => {
          if (currentParams?.project_ids?.length) {
            return await getTimelineRule(currentParams)
          };
          return [];
        }}
        handelData={handelData}
      />
    </ChartsCard>
  )
}
