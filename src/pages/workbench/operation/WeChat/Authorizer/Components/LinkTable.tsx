import { useEffect, useState } from 'react';
import { ProList } from '@ant-design/pro-components';
import { Typography } from 'antd';
import { querySelectRule } from '../service';
export default ({ url, ...props }: any) => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    querySelectRule({ 'filter[type]': 1 }).then(setDataSource);
  }, []);
  return (
    <ProList
      metas={{
        title: { dataIndex: 'label' },
        actions: {
          render: (dom, entity, index, action) => [
            <Typography.Paragraph
              copyable={{
                text: `${url}${entity?.value}`,
              }}
            >
              点击复制
            </Typography.Paragraph>,
          ],
        },
      }}
      rowKey="label"
      headerTitle={<Typography.Text type="secondary">选择公众号链接获取用户OpenID</Typography.Text>}
      dataSource={dataSource}
      {...props}
    />
  );
};
