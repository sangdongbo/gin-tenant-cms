import React, { useEffect, useState } from 'react';
import {
  BorderOutlined,
  CheckSquareTwoTone,
  EyeInvisibleOutlined,
  EyeTwoTone,
  PlusOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { DragSortTable, ModalForm, ProFormSelect } from '@ant-design/pro-components';
import {
  Button,
  Divider,
  Dropdown,
  Input,
  Menu,
  Popconfirm,
  Radio,
  Space,
  Modal,
  Select,
} from 'antd';

import FieldForm from '@/pages/workbench/operation/Contacts/Field/components/FieldForm';
import Form from '@/pages/workbench/operation/Contacts/Field/components/Form';
import { getNameRule } from '@/pages/workbench/operation/Contacts/Field/service';
import {
  querySelectRule,
  getContactsFieldsRule,
  updateContactsFieldsRule,
} from '@/pages/workbench/material/Forms/service';

import { getUid } from '@/utils/uuid';
import completeFormLibraryFields from '@/utils/completeFormLibraryFields';
import handleFormLibraryValues from '@/utils/handleFormLibraryValues';
import useRepairDragSortTable from '@/utils/useRepairDragSortTable';

const dataSourceContacts = (values: any, currentRow: any) => {
  const contacts_field_name = values.filter(
    (item: any) =>
      item.contacts_field_name && item.contacts_field_name !== currentRow?.contacts_field_name,
  );
  return contacts_field_name.map((item: any) => item.contacts_field_name);
};

const getIgnoreRuleName = (values: any[], currentRow: any) => {
  let isVerificationCode = false;
  let verificationCode = ['regexp_code_email', 'regexp_ch_code_phone'];

  values.forEach((item: any) => {
    if (verificationCode.includes(item.rule_name)) {
      isVerificationCode = true;
    }
  });

  if (currentRow && currentRow.rule_name)
    verificationCode = verificationCode.filter((item) => item !== currentRow.rule_name);

  if (isVerificationCode) return verificationCode;
  return [];
};

const HandlePopconfirm = ({ showPopconfirm, onClick, fieldProps, children }: any) => {
  return (
    <>
      {showPopconfirm ? (
        <Popconfirm {...fieldProps} onConfirm={() => onClick?.()}>
          <a>{children}</a>
        </Popconfirm>
      ) : (
        <a onClick={() => onClick?.()}>{children}</a>
      )}
    </>
  );
};

export default ({ updaterRegister, onPublish, showPadding, value, hideTitle, ...props }: any) => {
  let { title, is_form, form_library_id, list, defaultList } = value;
  const domRef = useRepairDragSortTable({ dataSource: list });

  const [row, setRow] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [contactsVisible, setContactsVisible] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [forms, setForms] = useState([]);

  const columns: ProColumns[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      readonly: true,
      width: 50,
    },
    {
      title: '标题',
      dataIndex: 'label',
    },
    {
      title: '提示语',
      dataIndex: 'placeholder',
    },
    {
      title: '是否展示',
      dataIndex: 'show',
      valueType: 'switch',
      fieldProps: {
        checkedChildren: '展示',
        unCheckedChildren: '不展示',
      },
      formItemProps: {
        getValueFromEvent: (e) => (e ? 1 : 0),
      },
      render: (_, record: any) => {
        if (record.name === 'phone') return '-';

        if (record.show) {
          return <EyeTwoTone />;
        }
        return <EyeInvisibleOutlined />;
      },
    },
    {
      title: '必填',
      dataIndex: 'required',
      valueType: 'switch',
      fieldProps: {
        checkedChildren: '必填',
        unCheckedChildren: '非必填',
      },
      formItemProps: {
        getValueFromEvent: (e) => (e ? 1 : 0),
      },
      render: (_, record: any) => {
        if (record.name === 'phone') return '-';

        if (record.required) {
          return <CheckSquareTwoTone />;
        }
        return <BorderOutlined />;
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'option',
      width: 200,
      render: (text, record: any, index) => {
        record.editIndex = index;

        return (
          <>
            <HandlePopconfirm
              showPopconfirm={!!form_library_id}
              fieldProps={{
                title: '凡对表单的调整均会实时更新线上已发布的项目表单',
              }}
              onClick={() => {
                if (record.contacts_field_name) {
                  setContactsVisible(true);
                } else {
                  setVisible(true);
                }
                setRow(record);
              }}
            >
              编辑
            </HandlePopconfirm>
            {!record?.prohibitdelete ? (
              <>
                <Divider type="vertical" />
                <Popconfirm
                  title={
                    form_library_id
                      ? '凡对表单的调整均会实时更新线上已发布的项目表单'
                      : '确定删除此项?'
                  }
                  onConfirm={async () => {
                    let currentList = JSON.parse(JSON.stringify(list));
                    currentList.splice(index, 1);

                    // 表单库需要而外处理
                    if (form_library_id) {
                      currentList = await updateFormLibrary(currentList);
                    }

                    updaterRegister({
                      list: currentList,
                    });
                  }}
                >
                  <a style={{ color: 'red' }}>删除</a>
                </Popconfirm>
              </>
            ) : null}
          </>
        );
      },
    },
  ];

  const handleDragSortEnd = async (beforeIndex: number, afterIndex: number, newDataSource: any) => {
    let newList: any[] = JSON.parse(JSON.stringify(newDataSource || []));
    // 表单库需要而外处理
    if (form_library_id) {
      // 防抖
      updaterRegister({
        list: JSON.parse(JSON.stringify(newDataSource)),
      });
      newList = await updateFormLibrary(newDataSource);
    }
    updaterRegister({
      list: newList,
    });
  };

  const updateFormLibrary = async (formList: any[]) => {
    const newFields = await updateContactsFieldsRule(form_library_id, {
      data: handleFormLibraryValues(formList),
    });
    return completeFormLibraryFields(newFields);
  };

  const addFinish = async (values: any) => {
    const newValues = {
      ...values,
      prohibitdelete: 0,
      name: getUid(),
    };
    let newList = [...list, newValues];

    // 表单库需要而外处理
    if (form_library_id) {
      newList = await updateFormLibrary(newList);
    }

    updaterRegister({
      list: newList,
    });
    return true;
  };

  const upDateFinish = async (values: any) => {
    let currentList = JSON.parse(JSON.stringify(list));
    currentList[row.editIndex] = {
      ...currentList[row.editIndex],
      ...values,
      rule_name: values.rule_name,
    };

    // 表单库需要而外处理
    if (form_library_id) {
      // 修改的时，如果name值不同的话，需要删除id
      if (currentList[row.editIndex].name != list[row.editIndex].name) {
        delete currentList[row.editIndex].id;
      }
      currentList = await updateFormLibrary(currentList);
    }

    updaterRegister({
      list: currentList,
    });
    return true;
  };

  const upDateFieldFinish = async ({ name, ...values }: any) => {
    const data = await getNameRule(name);

    // 需要把联系人的id删除掉
    if (form_library_id) {
      delete data.id;
    }

    let currentList = JSON.parse(JSON.stringify(list));

    currentList[row.editIndex] = {
      contacts_field_name: name,
      ...currentList[row.editIndex],
      ...data,
      ...values,
    };

    // 表单库需要而外处理
    if (form_library_id) {
      // 修改的时，如果name值不同的话，需要删除id
      if (currentList[row.editIndex].name != list[row.editIndex].name) {
        delete currentList[row.editIndex].id;
      }
      currentList = await updateFormLibrary(currentList);
    }

    updaterRegister({
      list: currentList,
    });
    return true;
  };

  const addFieldFinish = async (values: any) => {
    const data = await getNameRule(values.name);
    // 需要把联系人的id删除掉
    if (form_library_id) {
      delete data.id;
    }

    const newValues = {
      contacts_field_name: values.name,
      ...data,
      ...values,
    };

    let newList = [...list, newValues];

    // 表单库需要而外处理
    if (form_library_id) {
      newList = await updateFormLibrary(newList);
    }

    updaterRegister({
      list: newList,
    });
    return true;
  };

  const handleFormLibrary = async (form_library_value: any) => {
    const newList = await getContactsFieldsRule({
      'filter[forms_id]': form_library_value,
    });
    updaterRegister({
      list: completeFormLibraryFields(newList),
      form_library_id: form_library_value,
    });
  };

  const menufieldItems = [
    {
      label: (
        <HandlePopconfirm
          showPopconfirm={!!form_library_id}
          fieldProps={{
            title: '凡对表单的调整均会实时更新线上已发布的项目表单',
          }}
          onClick={() => {
            setContactsVisible(true);
          }}
        >
          联系人字段
        </HandlePopconfirm>
      ),
      key: 'contacts_field',
    },
    {
      label: (
        <HandlePopconfirm
          showPopconfirm={!!form_library_id}
          fieldProps={{
            title: '凡对表单的调整均会实时更新线上已发布的项目表单',
          }}
          onClick={() => {
            setVisible(true);
          }}
        >
          自定义字段
        </HandlePopconfirm>
      ),
      key: 'custom_field',
    },
  ];

  const menufield = <Menu items={menufieldItems} />;

  useEffect(() => {
    querySelectRule().then(setForms);
  }, []);

  return (
    <>
      <div style={showPadding ? { paddingInline: 24, paddingTop: 16 } : {}}>
        {title !== false && !hideTitle ? (
          <Input
            style={{ width: 150 }}
            // value={title}
            defaultValue={title}
            maxLength={4}
            placeholder="请输入标题"
            showCount
            onChange={(e) => updaterRegister({ title: e.target.value })}
          />
        ) : null}
      </div>
      <div ref={domRef}>
        <DragSortTable
          columns={columns}
          rowKey="name"
          pagination={false}
          dataSource={list}
          dragSortKey="sort"
          search={false}
          options={false}
          scroll={{
            y: 454,
          }}
          headerTitle={
            is_form !== false ? (
              <Space style={{ whiteSpace: 'nowrap' }}>
                留资表单设置:
                <Radio.Group
                  value={is_form}
                  onChange={async (values: any) => {
                    updaterRegister({
                      is_form: values?.target?.value,
                    });
                  }}
                >
                  <Radio value={1}>开启</Radio>
                  <Radio value={0}>关闭</Radio>
                </Radio.Group>
              </Space>
            ) : null
          }
          editable={{
            onSave: (key: any, record: any) => {
              updaterRegister({
                list: list.map((item: any) => {
                  if (item.name === record.name) {
                    return {
                      ...item,
                      ...record,
                    };
                  }
                  return item;
                }),
              });
              return record;
            },
            actionRender: (_, config, defaultDom) => {
              return [
                <Space style={{ width: '100%' }}>
                  {defaultDom.save}
                  {defaultDom.cancel}
                </Space>,
              ];
            },
          }}
          toolBarRender={() => [
            <Space style={{ whiteSpace: 'nowrap' }}>
              选择表单库:
              <Select
                allowClear
                value={form_library_id}
                style={{ minWidth: 180 }}
                options={forms}
                onChange={(form_library_value) => {
                  if (!form_library_value) {
                    updaterRegister({
                      list: defaultList, // 无值的时候使用默认值的list
                      form_library_id: '',
                    });
                    return;
                  }

                  handleFormLibrary(form_library_value);
                }}
              />
            </Space>,
            <Dropdown key="Dropdown" overlay={menufield} trigger={['click']}>
              <Button icon={<PlusOutlined />}>新建</Button>
            </Dropdown>,
            <React.Fragment key="publish">
              {onPublish ? (
                <Button
                  type="primary"
                  loading={publishLoading}
                  onClick={async () => {
                    setPublishLoading(true);
                    const params: any = {
                      list,
                      title,
                      forms_id: form_library_id || null,
                    };
                    if (is_form !== false) {
                      params.show = is_form;
                    }
                    await onPublish?.(params);
                    setPublishLoading(false);
                  }}
                >
                  发布
                </Button>
              ) : null}
            </React.Fragment>,
          ]}
          onDragSortEnd={handleDragSortEnd}
          {...props}
        />
      </div>

      <ModalForm
        omitNil={false}
        initialValues={row}
        modalProps={{
          destroyOnClose: true,
        }}
        title={row ? '修改联系人字段' : '新建联系人字段'}
        open={contactsVisible}
        onOpenChange={(visibleValue) => {
          setContactsVisible(visibleValue);
          if (!visibleValue) setRow(null);
        }}
        width={500}
        onFinish={row ? upDateFieldFinish : addFieldFinish}
      >
        <FieldForm
          ignoreField={dataSourceContacts(list, row)}
          ignoreRuleName={getIgnoreRuleName(list, row)}
          nameProps={{
            disabled: row?.name === 'phone',
          }}
          showProps={{
            disabled: row?.name === 'phone',
          }}
          requiredProps={{
            disabled: row?.name === 'phone',
          }}
        />
      </ModalForm>

      <ModalForm
        omitNil={false}
        initialValues={row}
        modalProps={{
          destroyOnClose: true,
        }}
        title={row ? '修改' : '新建'}
        open={visible}
        onOpenChange={(visibleValue) => {
          setVisible(visibleValue);
          if (!visibleValue) setRow(null);
        }}
        onFinish={row ? upDateFinish : addFinish}
        width={500}
      >
        <Form
          ignoreRuleName={['regexp_ch_code_phone', 'regexp_code_email']}
          formTypeProps={{
            disabled: row ? true : false,
          }}
          showFieldProps={{ disabled: row?.prohibithide }}
          requiredFieldProps={{ disabled: row?.prohibitrequired }}
        />
      </ModalForm>
    </>
  );
};
