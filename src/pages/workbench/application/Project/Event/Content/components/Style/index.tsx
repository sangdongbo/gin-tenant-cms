import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { useModel } from '@umijs/max';
import { createConfigRule } from '../../../../service';
import Color from './Color';

export default ({ id }: any) => {
  const { style: BasicsStyle, configData, updaterPublishTime, updaterStyle } = useModel('event', (model) => model);

  return (
    <ProForm
      initialValues={{
        data: BasicsStyle
      }}
      onFinish={async (values) => {
        // const extend = configData?.extend || {};
        // const formValues = { ...values };
        // formValues.data.extend = {
        //   ...extend,
        //   ...formValues.data.extend,
        // };

        await createConfigRule({ ...values, project_id: id });
        updaterPublishTime(new Date());
        message.success('发布成功');
      }}
      onValuesChange={(changeValues) => {
        updaterStyle(changeValues?.data || {});
      }}
      submitter={{
        searchConfig: {
          submitText: '发布',
        },
        render: (_, dom) => dom.pop(),
      }}
    >
      <ProFormText name={['data', 'title']} label="页面标题" rules={[{ required: true }]} />
      <ProForm.Item name={['data', 'color']} label="主题颜色" rules={[{ required: true, message: '请选择主体颜色' }]}>
        <Color />
      </ProForm.Item>
    </ProForm>
  );
};
