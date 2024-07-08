import ProFormGroup from '@/components/BaseComponents/ProFormGroup';
import { ProForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Space } from 'antd';

export default () => {
  return (
    <ProFormGroup title="标签用户" tooltip="指在系统中，通过行为沾染上系统标签的用户">
      <ProFormText
        name={['data', 'level_3', 'title']}
        label="阶段名称"
        rules={[
          {
            required: true,
          },
          {
            whitespace: true,
          },
        ]}
      />
      {/* <ProForm.Item label="规则设定" required>
        <Space size={6} align="start">
          <ProFormSelect
            options={[
              {
                value: 'one',
                label: '同一',
              },
              {
                value: 'any',
                label: '任一',
              },
            ]}
            width={100}
            name={['data', 'level_3', 'value', 'tag']}
            formItemProps={{
              style: {
                marginBottom: 0,
              },
            }}
            rules={[
              {
                required: true,
              },
            ]}
          />
          <div style={{ height: 32, lineHeight: '32px' }}>标签分类下沾染的</div>
          <ProFormSelect
            options={[
              {
                value: 'uv',
                label: '标签个数',
              },
              {
                value: 'pv',
                label: '标签次数',
              },
            ]}
            width={100}
            name={['data', 'level_3', 'value', 'where']}
            formItemProps={{
              style: {
                marginBottom: 0,
              },
            }}
            rules={[
              {
                required: true,
              },
            ]}
          />
          <div style={{ height: 32, lineHeight: '32px' }}>达到</div>
          <ProFormDigit
            name={['data', 'level_3', 'value', 'count']}
            width={100}
            formItemProps={{
              style: {
                marginBottom: 0,
              },
            }}
            fieldProps={{
              formatter: (value) => `${value}`.replace('.', ''),
            }}
            rules={[
              {
                required: true,
              },
            ]}
          />
        </Space>
      </ProForm.Item> */}
    </ProFormGroup>
  );
};
