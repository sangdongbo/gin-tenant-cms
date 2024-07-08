import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import BaseOverview from './BaseOverview';

export default ({ defaultData, params, postData, request }: any) => {
  const [data, setData] = useState<any[]>(defaultData || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    request(params).then((res: any) => {
      setLoading(false);
      setData(postData ? postData(res) : res);
    });
  }, []);

  return (
    <Row gutter={[16, 16]}>
      {data.map((item: any, index: number) => {
        return (
          <Col span={6} key={index}>
            <BaseOverview loading={loading} {...item} />
          </Col>
        );
      })}
    </Row>
  );
};
