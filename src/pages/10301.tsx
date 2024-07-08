import { Button, Result } from 'antd';
import React from 'react';
import { history } from '@umijs/max';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="当前资源不存在"
    extra={
      <Button type="primary" onClick={() => history.push('/workbench/application/project')}>
        返回项目汇总页
      </Button>
    }
  />
);

export default NoFoundPage;
