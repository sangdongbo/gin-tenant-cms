import { DrawerForm } from '@ant-design/pro-components';
import { Alert } from 'antd';
import { useModel } from '@umijs/max';
import { PlusCircleOutlined } from '@ant-design/icons';
import { createConfigRule } from '../service';
import { FollowUserForm, ReachUserForm, RegisteredUserForm, TagUserForm } from './components';

export default () => {
  const { dataCustomization, updaterDataCustomization } = useModel(
    'declarationPeriod',
    (model) => model,
  );

  return (
    <DrawerForm
      title="自定义生命周期"
      initialValues={dataCustomization}
      trigger={
        <a>
          <PlusCircleOutlined style={{ fontSize: 16 }} />
          <br />
          自定义生命周期
        </a>
      }
      onFinish={async (values) => {
        updaterDataCustomization(values);
        await createConfigRule({
          ...values,
          type: 'lifecycle',
        });
        return true;
      }}
      layout="horizontal"
      submitter={{
        render: (_, dom) => dom.pop(),
      }}
    >
      <Alert
        message="阶段名称 用于后台展示"
        type="info"
        showIcon
        closable
        style={{ marginBottom: 24 }}
      />
      <ReachUserForm />
      <FollowUserForm />
      <TagUserForm />
      <RegisteredUserForm />
      {/* <ActiveUserForm /> */}
    </DrawerForm>
  );
};
