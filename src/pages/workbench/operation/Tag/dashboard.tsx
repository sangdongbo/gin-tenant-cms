import { useState, useEffect } from 'react';
import { ProCard, ProRow, ProTable } from '@/components/BaseComponents';
import { WordCloud } from '@/components/Dashboard';
import { exportWordCloudRule, queryWordCloudRule } from './service';

export default () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const colums = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 70,
    },
    {
      title: '次数',
      width: 70,
      dataIndex: 'value',
    },
  ];

  useEffect(() => {
    setLoading(true);
    queryWordCloudRule()
      .then((res) => {
        setLoading(false);
        setDataSource(res);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ProCard
      bordered={false}
      style={{ marginBottom: 24 }}
      title="标签数据"
      // extra={
      //   <a
      //     onClick={() => {
      //       exportWordCloudRule().then((result) => {
      //         const elink = document.createElement('a'); // 创建a标签
      //         elink.download = '用户标签云.csv';
      //         elink.style.display = 'none';
      //         const blob = new Blob([result]);
      //         elink.href = URL.createObjectURL(blob);
      //         document.body.appendChild(elink);
      //         elink.click();
      //         document.body.removeChild(elink);
      //       });
      //     }}
      //   >
      //     导出
      //   </a>
      // }
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
            pagination={{
              pageSize: 10,
            }}
            options={false}
            columns={colums}
            dataSource={dataSource}
          />
        </ProRow.Col>
        <ProRow.Col span={12}>
          <WordCloud dataSource={dataSource} />
        </ProRow.Col>
      </ProRow>
    </ProCard>
  );
};
