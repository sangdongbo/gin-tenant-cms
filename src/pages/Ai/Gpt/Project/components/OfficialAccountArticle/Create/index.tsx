import { useState } from 'react';
import { Dropdown, Button, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Check from './Check';

import { syncRule } from '../../../../service';

export default ({ projectId, onReset }: any) => {
  const [loading, setLoading] = useState(false);
  return <div>
    <Dropdown
      key="menu"
      disabled={loading}
      menu={{
        items: [
          {
            key: 'sync',
            label: <div
              // loading={loading}
              onClick={async () => {
                if (loading) return;
                setLoading(true);
                await syncRule(projectId);
                setLoading(false);
                onReset?.()
              }}
            >
              <Spin spinning={loading}>
                同步所有文章
              </Spin>
            </div>
          },
          {
            key: 'sync2',
            label: <Check
              projectId={projectId}
              trigger={<div>同步勾选文章</div>}
              onReset={onReset}
            />
          },

        ]
      }}
    >
      <Button loading={loading} type="primary">同步文章<DownOutlined /></Button>
    </Dropdown>
  </div>
}
