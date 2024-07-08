import { ProForm, ProFormSelect, ProFormText, ProFormDependency } from '@ant-design/pro-components';
import { message, Alert } from 'antd';
import { useModel } from '@umijs/max';

import { createServiceRule } from '../service';
export default () => {
  const { initialState, setInitialState }: any = useModel('@@initialState');
  const smsCofing = initialState?.smsCofing || {};

  return (
    <>
      <ProForm
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
        onFinish={async (value) => {
          value.type = 'sms';
          const res = await createServiceRule(value);
          message.success('配置成功');
          setInitialState({
            ...initialState,
            smsCofing: res,
          });
        }}
        initialValues={smsCofing}
      >
        <ProFormSelect
          name={['data', 'type']}
          label="服务平台"
          initialValue="yunpian"
          options={[
            {
              label: '云片网',
              value: 'yunpian',
            },
          ]}
          rules={[{ required: true }]}
          width="md"
          extra="1分钟只能修改一次"
        />
        <ProFormDependency name={[['data', 'type']]}>
          {({ data }) => {
            if (data?.type == 'yunpian') {
              return (
                <>
                  <ProFormText label="apikey" name={['data', 'apikey']} width="md" rules={[{ required: true }]} />
                  <ProFormText label="模板ID" name={['data', 'template_id']} width="md" rules={[{ required: true }]} />
                  <ProFormText label="模板变量" name={['data', 'code']} width="md" initialValue="#code#" rules={[{ required: true }]} />
                </>
              );
            };
            return null;
          }}
        </ProFormDependency>
      </ProForm>
    </>
  );
};
