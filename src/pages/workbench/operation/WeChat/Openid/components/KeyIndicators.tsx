import { ChartsCard, ChartsLine } from '@/components/Dashboard';
import { LineChartOutlined } from '@ant-design/icons';
import formOptionToValueenum from '@/utils/formOptionToValueenum';
import { queryTimelineRule } from '../service';

const navList = [
  {
    value: 'subscribe_cnt',
    label: '新增关注',
  },
  {
    value: 'unsubscribe_cnt',
    label: '取消关注',
  },
  {
    value: 'netgain_subscribe_cnt',
    label: '净增关注',
  },
  {
    value: 'total_subscribe_cnt',
    label: '累计关注',
  }
];

const nameMapping = formOptionToValueenum(navList);

export default ({ appid, ...props }: any) => {

  return (
    <div>
      <ChartsCard
        row={3}
        titleIocn={<LineChartOutlined />}
        title="趋势分析"
        params={{
          appid,
        }}
        options={navList}
        {...props}
      >
        <ChartsLine
          seriesField={null}
          mapping={(params: any) => {
            return {
              meta: {
                value: {
                  alias: nameMapping[params.type].text,
                }
              }
            }
          }}
          request={queryTimelineRule}
        />
      </ChartsCard>
    </div>
  )
}
