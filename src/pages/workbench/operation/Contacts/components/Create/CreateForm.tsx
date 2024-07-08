import React, { useEffect, useRef, useState } from 'react';
import { Crypto } from '@bluedot-tech/bluedot-antd';
import { DrawerForm, BetaSchemaForm } from '@ant-design/pro-components';
import { querySelectRule } from '../../Field/service';
import { addRule } from '../../service';

const CreateForm: React.FC<any> = ({ visible, onVisibleChange, onFinish }) => {
  const formRef = useRef();
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    querySelectRule().then((res) => {
      const system: any = {
        title: '系统字段',
        valueType: 'group',
        columns: [],
      };
      const custom: any = {
        title: '自定义字段',
        valueType: 'group',
        columns: [],
      };
      res.forEach((item: any) => {
        const currentField: any = {
          title: item.label,
          formItemProps: {},
        };
        if (item.type === 'system') {
          currentField.dataIndex = ['system', item.value];
          if (item.value == 'phone') {
            currentField.valueType = 'number';
            currentField.formItemProps.rules = [
              {
                required: true,
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ];
          }
          if (item.value == 'email') {
            currentField.formItemProps.rules = [
              {
                pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                message: '邮箱格式错误！',
              },
            ];
          }
          system.columns.push(currentField);
        } else {
          currentField.dataIndex = ['custom', item.value];
          custom.columns.push(currentField);
        }
      });

      system.columns = system.columns.reverse();
      setColumns([system, custom]);
    });
  }, []);

  return (
    <>
      <DrawerForm
        open={visible}
        onOpenChange={onVisibleChange}
        title="新建联系人"
        formRef={formRef}
        drawerProps={{
          forceRender: true,
          destroyOnClose: true,
        }}
        onFinish={async (values: any) => {
          const crypt = new Crypto();
          const crypt_key = crypt.rsa_key_encrypt();
          const currentValues = {
            ...values,
            crypt_key,
          };

          if (currentValues?.system?.phone) {
            currentValues.system.phone = crypt.aes_encrypt(currentValues.system.phone);
          }
          if (currentValues?.system?.email) {
            currentValues.system.email = crypt.aes_encrypt(currentValues.system.email);
          }

          await addRule(currentValues);
          onFinish?.();
          return true;
        }}
      >
        <BetaSchemaForm layoutType="Embed" columns={columns} />
      </DrawerForm>
    </>
  );
};

export default CreateForm;
