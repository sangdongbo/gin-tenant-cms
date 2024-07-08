import { Button } from 'antd';
import { useState } from 'react';

interface PropsType {
  onClick?: () => {};
}

export default ({ onClick }: PropsType) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      loading={loading}
      onClick={async () => {
        setLoading(true);
        try {
          await onClick?.();
        } catch (error) { }
        setLoading(false);
      }}
    >
      恢复所有文章
    </Button>
  )
}
