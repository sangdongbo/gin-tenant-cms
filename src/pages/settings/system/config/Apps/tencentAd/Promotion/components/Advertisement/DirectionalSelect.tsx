import { ProFormSelect } from "@ant-design/pro-components";


const DirectionalSelect = () => {

  return (
    <div>
      <ProFormSelect
        width="md"
        name="directional_package"
        label="定向包"
        placeholder="请选择定向包"
        rules={[{ required: true }]}
      />
    </div>
  );
};

export default DirectionalSelect;
