import { Popconfirm, Button } from 'antd';
import type { PopconfirmProps } from 'antd';

interface PropsType extends PopconfirmProps {

}

export default (props: PropsType) => {
  return (
    <Popconfirm
      okText="是"
      cancelText="否"
      {...props}
    >
      <Button danger>删除所有文章</Button>
    </Popconfirm>
  )
}
