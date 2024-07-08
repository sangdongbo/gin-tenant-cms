import { useState } from 'react';
import { ProCard } from '@/components/BaseComponents';
import Dashboard from './dashboard';
import Table from './table';

export default () => {
  const [key, setKey] = useState('table');

  return (
    <ProCard tabs={{ activeKey: key, onChange: setKey }}>
      <ProCard.TabPane key="table" tab="内容">
        <Table />
      </ProCard.TabPane>
      <ProCard.TabPane key="dashboard" tab="概览">
        <Dashboard />
      </ProCard.TabPane>
    </ProCard>
  );
};
