import { ProFormText, ProFormCheckbox } from '@ant-design/pro-components';

import { selectPermissionRule } from '../../service';

export default () => {
  return (
    <>
      <ProFormText name="name" label="部门名称" rules={[{ required: true }]} />
      <ProFormCheckbox.Group
        name="permission"
        layout="vertical"
        label="选择权限"
        request={selectPermissionRule}
      />
    </>
  );
};
