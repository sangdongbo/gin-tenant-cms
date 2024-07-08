import React from 'react';
import { Col } from 'antd';
import ProCard from '@/components/BaseComponents/ProCard';
import Content from './Content';

const NewsCard: React.FC<any> = ({ data, handleClickCard, optionRender }) => {
  return (
    <Col style={{ margin: '8px 0', padding: '0 8px', width: 300 }}>
      <ProCard
        bodyStyle={{ padding: 0 }}
        onClick={() => handleClickCard?.(data)}
        style={{ cursor: handleClickCard ? 'pointer' : 'default' }}
      >
        <Content data={data.content} optionRender={optionRender} />
      </ProCard>
    </Col>
  );
};
export default NewsCard;
