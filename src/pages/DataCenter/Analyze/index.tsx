import { useEffect } from 'react';
import { useModel } from '@umijs/max';
import ProRow from '@/components/BaseComponents/ProRow';
import Filters from './compnents/Filters';
import DataOverview from './compnents/DataOverview';
import DataComparison from './compnents/DataComparison';
import ProjectTrends from './compnents/ProjectTrends';
import SourceComparison from './compnents/SourceComparison';
import ChannelDrainage from './compnents/ChannelDrainage';

export default () => {
  const { clear } = useModel('analyze', (model) => model);

  useEffect(() => {
    return () => {
      // 离开页面清空当前数据
      clear();
    };
  }, []);

  return (
    <ProRow>
      <ProRow.Col span={24}>
        <Filters />
      </ProRow.Col>
      <ProRow.Col span={24}>
        <DataOverview />
      </ProRow.Col>
      <ProRow.Col span={24}>
        <DataComparison />
      </ProRow.Col>
      <ProRow.Col span={24}>
        <ProjectTrends />
      </ProRow.Col>
      <ProRow.Col span={12}>
        <SourceComparison />
      </ProRow.Col>
      <ProRow.Col span={12}>
        <ChannelDrainage />
      </ProRow.Col>
    </ProRow>
  );
};
