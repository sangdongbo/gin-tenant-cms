import { useState, useCallback, useEffect } from 'react';
import { message, Input } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import RegisterTable from '@/components/Project/Register/Table';

import completeFormLibraryFields from '@/utils/completeFormLibraryFields';

import { getContactsFieldsRule as getFormsContactsFieldsRule } from '@/pages/workbench/material/Forms/service';
import { getNameRule } from '@/pages/workbench/operation/Contacts/Field/service';

import { addContactsFieldsRule, createConfigRule, getConfigRule, getContactsFieldsRule } from '../../../../service';

export default ({ actionRef, projectId }: any) => {
  const form = ProForm.useFormInstance();
  const [loading, setLoading] = useState(true);
  const [register, setRegister] = useState<any>({
    title: '',
    is_form: false,
    list: [],
    privacy_policy: [],
  });

  const updaterRegister = useCallback((playload: any) => {
    setRegister((value: any) => ({ ...value, ...playload }));
  }, []);

  const getConfigData = async () => {
    setLoading(true);
    const res = await getConfigRule(projectId);
    const fields = await getContactsFieldsRule(projectId);

    // 如果有设置表单库，则获取表单库数据，重置当前保存的 Fields （因为表单库可以在任意项目中修改）
    if (fields.forms_id) {
      const newList = await getFormsContactsFieldsRule({
        'filter[forms_id]': fields.forms_id
      });
      fields.data = completeFormLibraryFields(newList);
    };

    const phoneFields = await getNameRule('phone');

    setLoading(false);

    updaterRegister({
      title: res.data?.form?.title,
      is_form: res.data?.form?.show || 0,
      form_library_id: fields.forms_id || null,
      list: fields.data || [
        {
          ...phoneFields,
          contacts_field_name: phoneFields.name, // 联系人字段、用户判断是否事联系人字段
          prohibithide: 1,
          prohibitdelete: 1,
          prohibitrequired: 1,
          show: 1,
          required: 1,
        },
      ],
      // 默认的list
      defaultList: [
        {
          ...phoneFields,
          contacts_field_name: phoneFields.name, // 联系人字段、用户判断是否事联系人字段
          prohibithide: 1,
          prohibitdelete: 1,
          prohibitrequired: 1,
          show: 1,
          required: 1,
        }
      ],
      privacy_policy: res.data?.extend?.privacy_policy_url || [],
    });
  };

  useEffect(() => {
    getConfigData();
  }, []);

  return <RegisterTable
    showPadding
    hideTitle
    id={projectId}
    value={register}
    headerTitle={!loading ? <Input
      style={{ width: 150 }}
      defaultValue={register.title}
      maxLength={4}
      placeholder="请输入标题"
      showCount
      onChange={(e) => updaterRegister({ title: e.target.value })}
    /> : null}
    updaterRegister={updaterRegister}
    onPublish={async (values: any) => {
      try {
        await addContactsFieldsRule({
          project_id: projectId,
          data: values.list,
          forms_id: values.forms_id,
        });
      } catch (error) { }
      try {
        await createConfigRule({
          data: {
            form: {
              title: values.title,
            },
          },
          project_id: projectId,
        });
        message.success('发布成功');
      } catch (error) { }

      actionRef.current.setOpen(false);

      form.validateFields(["is_download_register"]);
    }}
  />
}
