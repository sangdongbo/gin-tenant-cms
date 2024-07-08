import { Result } from 'antd';

export default () => (
  <Result
    status="403"
    title="您当前暂无此模块的使用权限"
    style={{
      background: 'none',
    }}
    subTitle="如需使用，请您联系管理员进行调整"
  />
);
