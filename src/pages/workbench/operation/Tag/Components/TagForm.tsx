import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-components';
import { queryCategorySelectRule } from '../service';


export default ({ hideGroup, ...props }: any) => {

  return (
    <>
      <ModalForm {...props}>
        {
          !hideGroup ? (
            <ProFormSelect
              request={queryCategorySelectRule}
              name="group_id"
              label="分组"
              rules={[{ required: true }]}
            />
          ):null
        }
        <ProFormText
          label="标签名称"
          name="name"
          rules={[{ required: true }]}
          placeholder="建议10个汉字"
          fieldProps={{ maxLength: 60 }}
        />
        <ProFormTextArea
          label="备注"
          name="remark"
          fieldProps={{ showCount: true, maxLength: 255 }}
        />
      </ModalForm>
    </>
  );
};
