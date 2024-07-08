import { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';
import { ProForm } from "@ant-design/pro-components";
import { message } from 'antd';
import completeFormLibraryFields from '@/utils/completeFormLibraryFields';
import ProFormContent from './ProFormContent';

import { getContactsFieldsRule as getFormsContactsFieldsRule } from '@/pages/workbench/material/Forms/service';
import { queryFieldsUrlEventRule, addFieldsUrlEventRule, updateConfigModuleRule, getConfigRule, addConfigRule } from '../../../../service';

// 保存一版默认值
let defaultData = {};

const Register = ({ eventId }: any) => {
  const { moduleFormRef, moduleRadio, updaterPreviewData, updaterEventDetailsModule, setModuleFormLoading } = useModel('event', (model) => model);

  const onSubmit = async (formValue: any) => {
    return Promise.all([
      addFieldsUrlEventRule(
        {
          event_id: eventId,
          state: moduleRadio,
          forms_id: formValue?.form_library_id || '',
          data: formValue?.list || [],
        }
      ),
      addConfigRule({
        data: {
          extend: {
            privacy_policy_url: formValue?.privacy_policy || [],
          }
        },
        event_id: eventId,
      })
    ]);
  };

  useEffect(() => {
    return () => {
      updaterPreviewData({
        form: defaultData,
        menuId: '',
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
        const fields = await queryFieldsUrlEventRule(eventId);
        // 如果有设置表单库，则获取表单库数据，重置当前保存的 Fields （因为表单库可以在任意项目中修改）
        if (fields?.forms_id) {
          const newList = await getFormsContactsFieldsRule({
            'filter[forms_id]': fields.forms_id
          });
          fields.data = completeFormLibraryFields(newList);
        };

        const config = await getConfigRule(eventId);

        defaultData = {
          ...fields,
          privacy_policy: config?.data?.extend?.privacy_policy_url || [],
          // 不能使用fields中有state
          state: moduleRadio,
        };

        updaterPreviewData({
          menuId: 'form',
          form: defaultData,
        });

        return {
          register: {
            privacy_policy: config?.data?.extend?.privacy_policy_url || [],
            list: fields.data || [],
            form_library_id: fields?.forms_id || '',
          },
        }
      }}
      onValuesChange={(_, { register }: any) => {
        updaterPreviewData({
          'form': {
            state: moduleRadio,
            forms_id: register?.form_library_id || '',
            data: register?.list || [],
            privacy_policy: register.privacy_policy || [],
          },
        });
      }}
      onFinish={async ({ register }: any) => {
        setModuleFormLoading(true);
        await onSubmit(register);
        setModuleFormLoading(false);
        message.success('保存成功');

        defaultData = {
          state: moduleRadio,
          forms_id: register?.form_library_id || '',
          data: register?.list || [],
        }

        updateConfigModuleRule({
          name: "form",
          state: moduleRadio,
          id: eventId,
        });

        updaterEventDetailsModule({
          key: 'before',
          type: 'form',
          state: moduleRadio,
        });
      }}
    >
      <ProFormContent
        // initialValue={{
        //   form_library_id: null,
        //   list: [],
        //   privacy_policy: [],
        // }}
        name="register"
      />
    </ProForm>
  );
};

export default Register;
