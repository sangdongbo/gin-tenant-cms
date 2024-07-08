import { useEffect } from 'react';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import TreeSelectTag from '@/pages/workbench/operation/Tag/Components/TreeSelectTag';
import ProFormRegisterTable from './ProFormRegisterTable';
import completeFormLibraryFields from '@/utils/completeFormLibraryFields';

import { getContactsFieldsRule as getFormsContactsFieldsRule } from '@/pages/workbench/material/Forms/service';
import {
  queryFieldsUrlEventRule,
  addFieldsUrlEventRule,
  updateConfigModuleRule,
} from '../../../service';

// 保存一版默认值
let defaultData = {};

const Register = ({ eventId }: any) => {
  const {
    moduleFormRef,
    moduleRadio,
    updaterPreviewData,
    updaterEventDetailsModule,
    setModuleFormLoading,
  } = useModel('event', (model) => model);

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
      layout="horizontal"
      submitter={false}
      request={async () => {
        const res = await queryFieldsUrlEventRule(eventId);
        // 如果有设置表单库，则获取表单库数据，重置当前保存的 Fields （因为表单库可以在任意项目中修改）
        if (res?.forms_id) {
          const newList = await getFormsContactsFieldsRule({
            'filter[forms_id]': res.forms_id,
          });
          res.data = completeFormLibraryFields(newList);
        }
        const currentOptions =
          res?.data?.map((item: any) => ({
            label: item.label,
            value: item.name,
          })) || [];

        defaultData = {
          state: moduleRadio,
          ...res,
        };

        updaterPreviewData({
          menuId: 'form',
          form: defaultData,
        });
        return {
          register: {
            list: currentOptions || [],
            form_library_id: res?.forms_id || '',
          },
        };
      }}
      onValuesChange={(_, { register }: any) => {
        updaterPreviewData({
          form: {
            state: moduleRadio,
            forms_id: register?.form_library_id || '',
            data: register?.list || [],
          },
        });
      }}
      onFinish={async ({ register }: any) => {
        setModuleFormLoading(true);
        await addFieldsUrlEventRule({
          event_id: eventId,
          state: moduleRadio,
          forms_id: register?.form_library_id || '',
          data: register?.list || [],
        });
        setModuleFormLoading(false);
        message.success('保存成功');

        defaultData = {
          state: moduleRadio,
          forms_id: register?.form_library_id || '',
          data: register?.list || [],
        };

        updateConfigModuleRule({
          name: 'form',
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
      <ProFormRegisterTable name="register" />
    </ProForm>
  );
};

export default Register;
