import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { ProTable, ProCard, ProRow } from '@/components/BaseComponents';
import { WordCloud } from '@/components/Dashboard';
import Create from './Create';

import { queryTagTopRule } from '../../../service';
import { addCustomTagRule } from '../../../../service';

const Tag: React.FC<any> = ({ profile, id }) => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const colums = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '次数',
      dataIndex: 'value',
    },
  ];

  const init = () => {
    setLoading(true);
    queryTagTopRule(id)
      .then((res) => {
        setLoading(false);
        setDataSource(res);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <ProCard
      bordered={false}
      style={{ marginBottom: 24 }}
      title="标签数据"
      tooltip="手动打标签会有延迟情况出现，打标签后等待5-10秒左右才会生效。"
      extra={
        <Create
          title="新建标签"
          trigger={<PlusCircleOutlined style={{ fontSize: 16, cursor: 'pointer' }} />}
          onFinish={async (formValue: any) => {
            await addCustomTagRule({
              tag_ids: formValue.tag_ids.join(','),
              phone: profile.phone,
            });
            init();
            return true;
          }}
        />
      }
    >
      <ProRow>
        <ProRow.Col span={12}>
          <ProTable
            hidenScrollbar
            size="small"
            rowKey="id"
            bordered
            loading={loading}
            search={false}
            toolBarRender={false}
            pagination={false}
            options={false}
            columns={colums}
            dataSource={dataSource}
            // request={() => {
            //   return queryTagTopRule(id);
            // }}
            scroll={{
              y: 177,
            }}
          />
        </ProRow.Col>
        <ProRow.Col span={12}>
          <WordCloud
            dataSource={dataSource}
          />
        </ProRow.Col>
      </ProRow>
    </ProCard>
  );
};
export default Tag;
