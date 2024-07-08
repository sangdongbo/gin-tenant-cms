import React, { useEffect, useState } from 'react';
import { useSearchParams } from '@umijs/max';
import { Card, Result } from 'antd';
import { GridContent } from '@ant-design/pro-components';
import { useCountDown } from 'ahooks';
import { bindRule } from './service';

export default () => {
  const [searchParams] = useSearchParams();
  const [targetDate, setTargetDate] = useState<number>();
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      window.close();
    },
  });

  useEffect(() => {
    bindRule({
      code: searchParams.get('code'),
    }).then(() => {
      setTargetDate(Date.now() + 3000);
    });
  }, []);

  return (
    <GridContent>
      <Card bordered={false}>
        <Result
          status="success"
          title="授权成功"
          subTitle={
            countdown ? (
              <p>
                <span>
                  您已在测试接入Hubpot，页面&nbsp;{Math.round(countdown / 1000)}s&nbsp;后关闭，或者
                </span>
                <a href="#" onClick={() => window.close()}>
                  点此关闭页面
                </a>
              </p>
            ) : null
          }
          style={{ marginBottom: 16 }}
        />
      </Card>
    </GridContent>
  );
};
