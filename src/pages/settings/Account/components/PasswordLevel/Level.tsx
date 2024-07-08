import { Tag } from 'antd';

interface PropsType {
  grade: number;
}

export default ({ grade }: PropsType) => {
  if (grade <= 1) return <Tag color="error">弱</Tag>;
  if (grade === 2) return <Tag color="warning">中</Tag>;
  return <Tag color="success">强</Tag>;
};
