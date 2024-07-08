import { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';
import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProForm } from "@ant-design/pro-components";
import { ProCard } from '@/components/BaseComponents';

import RegisterTable from '@/components/Project/Register/Table';
import RegisterPrivacyPolicy from '@/components/Project/Register/PrivacyPolicy';

import { getNameRule } from '@/pages/workbench/operation/Contacts/Field/service';

interface PropsType extends ProFormItemProps {
  eventId?: any;
};

const CustomContent = ({ value, onChange }: any) => {
  const [defaultList, setDefaultList] = useState<any[]>([]);

  useEffect(() => {
    getNameRule('phone').then(res => {

      setDefaultList([{
        ...res,
        contacts_field_name: res.name, // 联系人字段、用户判断是否事联系人字段
        prohibithide: 1,
        prohibitdelete: 1,
        prohibitrequired: 1,
        show: 1,
        required: 1,
      }]);
      onChange({
        ...value,
        list: value?.list?.length ? value.list : [{
          ...res,
          contacts_field_name: res.name, // 联系人字段、用户判断是否事联系人字段
          prohibithide: 1,
          prohibitdelete: 1,
          prohibitrequired: 1,
          show: 1,
          required: 1,
        }],
      });
    });
  }, []);

  return (
    <ProCard
      tabs={{
        size: 'small',
        items: [
          {
            key: 'form',
            label: '留资表单',
            style: {
              height: 565,
            },
            children: <RegisterTable
              cardProps={{
                bodyStyle: { padding: 0 },
              }}
              value={{
                ...value,
                title: false,
                is_form: false,
                list: value?.list.length ? value?.list : defaultList,
                defaultList,
              }}
              updaterRegister={(formValue: any) => {
                onChange({
                  ...value,
                  ...formValue,
                });
              }}
            />
          },
          {
            key: 'privacy_policy',
            label: '隐私条款',
            style: {
              height: 565,
            },
            children: <RegisterPrivacyPolicy
              cardProps={{
                bodyStyle: { padding: 0 },
              }}
              value={{
                privacy_policy: value?.privacy_policy || [],
              }}
              updaterRegister={(formValue: any) => {
                onChange({
                  ...value,
                  ...formValue,
                })
              }}
            />,
          },
        ],
      }}
    />
  );
};

const ProFormContent = ({ fieldProps, eventId, ...props }: PropsType) => {
  return (
    <ProForm.Item {...props}>
      <CustomContent eventId={eventId} {...fieldProps} />
    </ProForm.Item>
  );
};

export default ProFormContent;
