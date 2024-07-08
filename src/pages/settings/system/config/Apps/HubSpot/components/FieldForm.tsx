import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { useState, useRef } from 'react';
import { queryPropertiesRule, addContactsFieldRule } from '../service';

const objectType: any[] = [
  {
    value: 'company',
    label: 'Company properties',
  },
  {
    value: 'contact',
    label: 'Contact properties',
  },
  {
    value: 'deal',
    label: 'Deal properties',
  },
  {
    value: 'invoice',
    label: 'Invoice properties',
  },
  {
    value: 'marketing',
    label: 'Marketing Event properties',
  },
  {
    value: 'product',
    label: 'Product properties',
  },
  {
    value: 'ticket',
    label: 'Ticket properties',
  },
];
export default ({ initialValues = {}, visible, setVisible, contactsFieldName, onSuccess }: any) => {
  const [label, setLabel] = useState<string>('');
  const currentOptionsRef = useRef([]);
  const objectTypeRef = useRef();

  return (
    <ModalForm
      title="HubSpot字段"
      modalProps={{
        destroyOnClose: true,
      }}
      initialValues={initialValues}
      open={visible}
      onOpenChange={setVisible}
      width={400}
      onFinish={async (values) => {
        await addContactsFieldRule({
          ...values,
          contacts_field_name: contactsFieldName,
          hubspot_field_label: label,
        });
        onSuccess?.();
        return true;
      }}
    >
      <ProFormSelect
        label="Select an object"
        options={objectType}
        name="hubspot_field_type"
        rules={[
          {
            required: true,
            message: '请选择',
          },
        ]}
        disabled
      />
      <ProFormSelect
        showSearch
        dependencies={['hubspot_field_type']}
        // request={queryPropertiesRule}
        request={async ({ hubspot_field_type }) => {
          if (objectTypeRef.current != hubspot_field_type) {
            objectTypeRef.current = hubspot_field_type;
            currentOptionsRef.current = await queryPropertiesRule({
              hubspot_field_type,
            });
          }
          return currentOptionsRef.current;
        }}
        label="Properties"
        name="hubspot_field_name"
        fieldProps={{
          optionFilterProp: 'label',
          filterOption: (inputValue, option: any) => {
            return option?.label.toLowerCase().includes(`${inputValue}`.toLowerCase());
          },
          onSelect: (_: any, option: any) => setLabel(option?.label),
        }}
        rules={[
          {
            required: true,
            message: '请选择',
          },
        ]}
      />
    </ModalForm>
  );
};
