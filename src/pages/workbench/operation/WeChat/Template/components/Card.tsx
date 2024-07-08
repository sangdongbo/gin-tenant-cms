import React from 'react';
import { Col } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import wrapToBr from '@/utils/wrapToBr';

const NewsCard: React.FC<any> = ({ data, optionRender, ...props }) => {

  return (
    <Col style={{ margin: '8px 0', padding: '0 8px' }}>
      <ProCard bodyStyle={{ padding: 0 }} bordered {...props}>
        <div
          style={{
            padding: 16,
          }}
          dangerouslySetInnerHTML={{
            __html: wrapToBr(data.example || '<div style="height: 130px;display: flex;justify-content: center;align-items: center;">暂未设置</div>')
          }} />
      </ProCard>
    </Col>
  );
};
export default NewsCard;
