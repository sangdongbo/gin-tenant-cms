import React, { useRef, useState } from 'react';
import { Form, Popover, Button, message } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import Select from '../../../Group/Components/Select';
import { querySearchResultGroup } from '../../service';

export default ({ params }: any) => {
  const [visible, handleVisible] = useState<boolean>(false);
  return (
    <>
      <Popover
        content={
          <div style={{ width: 250 }}>
            <ProForm
              onFinish={async (values) => {
                const result = await querySearchResultGroup({
                  ...params,
                  group_id: values.group_id,
                });
                if (result) {
                  handleVisible(false);
                  message.success('分组成功');
                }
              }}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
              }}
            >
              <ProForm.Item label="选择分组" name="group_id" rules={[{ required: true }]}>
                <Select />
              </ProForm.Item>
            </ProForm>
          </div>
        }
        title="搜索结果分组"
        trigger="click"
        open={visible}
        onOpenChange={handleVisible}
      >
        <Button disabled={!Object.values(params).length > 0}>结果分组</Button>
      </Popover>
    </>
  );
};

