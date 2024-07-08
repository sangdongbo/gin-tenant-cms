import { ProForm, ProFormSwitch, ProFormList, ProFormText, ProFormRadio, ProFormDependency } from '@ant-design/pro-components'
import { ProFormCron, ProFormNotice } from '@/components/BaseComponents';
import completeFormLibraryFields from '@/utils/completeFormLibraryFields';

import { getContactsFieldsRule as getFormsContactsFieldsRule } from '@/pages/workbench/material/Forms/service';
import { getContactsFieldsRule } from '@/pages/workbench/application/Project/service';
import { useEffect, useState } from 'react';

export default ({ hideFieldsData, projectId, onFieldsDataOptions, onSetValuesChange }: any) => {
  const [fieldsDataOptions, setFieldsDataOptions] = useState<any[]>([]);
  const form = ProForm.useFormInstance();

  const getFieldsDataOptions = async () => {
    const name = 'fields_data';
    const value = form.getFieldValue(name);
    const fields = await getContactsFieldsRule(projectId);

    // 如果有设置表单库，则获取表单库数据，重置当前保存的 Fields （因为表单库可以在任意项目中修改）
    if (fields?.forms_id) {
      const newList = await getFormsContactsFieldsRule({
        'filter[forms_id]': fields.forms_id
      });
      fields.data = completeFormLibraryFields(newList);
    };
    const currentOptions = fields?.data?.map((item: any) => ({
      label: item.label,
      value: item.name,
    })) || [];

    onFieldsDataOptions?.({
      fields: currentOptions,
      system_fields: ProFormNotice.systemFieldsOptions,
    });
    setFieldsDataOptions(currentOptions);

    // 没有设置过值就设置成所有的数据
    if (value == undefined || value == null) {
      form.setFieldsValue({
        [name]: {
          fields: currentOptions?.map((item: any) => item.value) || [],
          system_fields: [],
        }
      });
      onSetValuesChange?.(form.getFieldsValue());
    };
  };

  useEffect(() => {
    getFieldsDataOptions();
  }, []);

  return (
    <>
      <ProFormSwitch
        label="功能开启"
        name="status"
        initialValue={0}
        formItemProps={{
          getValueFromEvent: (event) => (event ? 1 : 0)
        }}
      />
      <ProFormText
        width="lg"
        name="title"
        label="邮件标题"
        fieldProps={{
          showCount: true,
          maxLength: 64
        }}
        rules={[
          {
            required: true,
          },
          {
            whitespace: true,
          },
        ]}
      />
      <ProFormText
        width="lg"
        name="alisa_title"
        label="发送别名"
        fieldProps={{
          showCount: true,
          maxLength: 30
        }}
        rules={[
          {
            required: true,
          },
          {
            whitespace: true,
          },
        ]}
      />
      <ProFormList
        required
        label="收件邮箱"
        name="emails"
        className="reset-pro-form-list"
        rules={[
          {
            validator(rule, value) {
              if (value?.length) {
                return Promise.resolve();
              };
              return Promise.reject(new Error('请新建邮箱'));
            },
          }
        ]}
        itemRender={(doms: any) => (<div className="reset-pro-form-list-item">{doms?.listDom}{doms?.action}</div>)}
      >
        <ProFormText
          name="email"
          width={396}
          placeholder="请输入邮箱"
          rules={[
            {
              required: true,
            },
            {
              pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
              message: '邮箱格式错误！',
            }
          ]}
        />
      </ProFormList>
      <ProFormList
        label="抄送邮箱"
        name="cc_emails"
        className="reset-pro-form-list"
        itemRender={(doms: any) => (<div className="reset-pro-form-list-item">{doms?.listDom}{doms?.action}</div>)}
      >
        <ProFormText
          name="email"
          width={396}
          placeholder="请输入邮箱"
          rules={[
            {
              required: true,
            },
            {
              pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
              message: '邮箱格式错误！',
            }
          ]}
        />
      </ProFormList>
      <ProFormRadio.Group
        initialValue={1}
        name="send_type"
        label="接收设置"
        options={[
          {
            label: '实时推送',
            value: 1,
          },
          {
            label: '定时发送',
            value: 2,
          }
        ]}
      />
      <ProFormDependency name={['send_type']}>
        {({ send_type }) => {
          if (send_type == 2) return (
            <ProFormCron
              label="接收时间"
              name="send_time"
            />
          );
          return null
        }}
      </ProFormDependency>
      {!hideFieldsData ? (
        <ProFormNotice
          label="通知字段"
          name="fields_data"
          options={fieldsDataOptions}
        />
      ) : null}

    </>
  )
}
