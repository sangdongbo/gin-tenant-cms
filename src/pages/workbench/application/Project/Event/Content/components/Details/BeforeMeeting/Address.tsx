import { useEffect } from 'react';
import { useModel } from '@umijs/max';
import { ProForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { ProFormTencentMap } from '@/components/BaseComponents';
import { message } from 'antd';

import { queryAddressRule, addAddressRule, updateConfigModuleRule } from '../../../service';

// 保存一版默认值
let defaultData = {};

const Address = ({ eventId }: any) => {
  const {
    moduleFormRef,
    moduleRadio,
    updaterPreviewData,
    updaterEventDetailsModule,
    setModuleFormLoading,
  } = useModel('event', (model) => model);

  useEffect(() => {
    updaterPreviewData({
      menuId: 'address',
    });
    return () => {
      updaterPreviewData({
        menuId: '',
        address: defaultData,
      });
      // 组件卸载，ref也需要销毁
      moduleFormRef.current = undefined;
    };
  }, []);

  return (
    <ProForm
      formRef={moduleFormRef}
      submitter={false}
      request={async () => {
        const res = await queryAddressRule(eventId);

        return {
          data: res?.data || {},
          view: res?.view,
        };
      }}
      onValuesChange={(_, formValue) => {
        updaterPreviewData({
          address: {
            state: moduleRadio,
            view: formValue.view,
            data: formValue?.data || {},
          },
        });
      }}
      onFinish={async (formValue) => {
        setModuleFormLoading(true);
        await addAddressRule({
          event_id: eventId,
          state: moduleRadio,
          view: formValue.view,
          data: formValue?.data,
        });
        setModuleFormLoading(false);
        message.success('保存成功');

        defaultData = {
          state: moduleRadio,
          view: formValue.view,
          data: formValue.data,
        };

        updateConfigModuleRule({
          name: 'address',
          state: moduleRadio,
          id: eventId,
        });

        updaterEventDetailsModule({
          key: 'before',
          type: 'address',
          state: moduleRadio,
        });
        return true;
      }}
    >
      <ProFormRadio.Group
        name="view"
        label="查看权限"
        initialValue={1}
        options={[
          {
            label: '所有用户',
            value: 1,
          },
          {
            label: '报名用户',
            value: 2,
          },
        ]}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormText
        name={['data', 'address']}
        label="会场位置"
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormTencentMap
        name={['data', 'map']}
        label="会场地图"
        rules={[
          {
            required: true,
          },
        ]}
      />
    </ProForm>
  );
};

export default Address;
