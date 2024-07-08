import { useEffect, useState } from 'react';
import { ProForm } from '@ant-design/pro-components';
import RegisterTable from '@/components/Project/Register/Table';
import { getNameRule } from '@/pages/workbench/operation/Contacts/Field/service';

const CustomRegisterTable = ({ value, onChange, ...props }: any) => {
  const [defaultList, setDefaultList] = useState<any[]>([]);
  useEffect(() => {
    getNameRule('phone').then((res) => {
      setDefaultList([
        {
          ...res,
          contacts_field_name: res.name, // 联系人字段、用户判断是否事联系人字段
          prohibithide: 1,
          prohibitdelete: 1,
          prohibitrequired: 1,
          show: 1,
          required: 1,
        },
      ]);
    });
  }, []);

  return (
    <RegisterTable
      cardProps={{
        bodyStyle: { padding: 0 },
      }}
      value={{
        title: false,
        is_form: false,
        list: value?.list || defaultList,
        defaultList,
        ...(value || {}),
      }}
      updaterRegister={(val: any) => {
        onChange(val);
      }}
      {...props}
    />
  );
};

const ProFormRegisterTable = ({ fieldProps, ...props }: any) => {
  return (
    <ProForm.Item {...props}>
      <CustomRegisterTable {...fieldProps} />
    </ProForm.Item>
  );
};

export default ProFormRegisterTable;
