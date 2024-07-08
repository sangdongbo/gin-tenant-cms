import React, { useEffect, useState } from 'react';
import { Form, Select, Modal, Tag } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import { queryAllRule } from '../../../Group/service';
import { queryGroupRelationRule } from '../service';
import { useForm } from 'antd/es/form/Form';

const Group: React.FC<any> = ({ onSubmit, onCancel, modalVisible, row }) => {
  const [group, handleGroup] = useState<object[]>([]);
  const [userGroup, handleUserGroup] = useState<object[]>([]);

  const [form] = useForm();

  useEffect(() => {
    queryGroupRelationRule({ user_id: row.id }).then((result) => handleUserGroup([...result]));
    handleSearch('');
  }, []);

  const handleSearch = (value: string) => {
    queryAllRule({ 'filter[name]': value }).then((result) => handleGroup([...result]));
  };

  const handleDelete = (groupID: number) => {
    let nowUserGroup = JSON.parse(JSON.stringify(userGroup));
    let newData = nowUserGroup.filter((item) => {
      return groupID != item.id;
    });
    handleUserGroup([...newData]);
  };

  const handleFormValue = () => {
    let userGroupIds: number[] = [];
    userGroup.map((item) => userGroupIds.push(item.id));
    onSubmit({ groupIds: userGroupIds });
  };

  const handleOnSelect = (value) => {
    let nowUserGroup = JSON.parse(JSON.stringify(userGroup));
    let isShow = false;
    nowUserGroup.map((item) => {
      if (item.id == value) {
        isShow = true;
      }
    });
    if (isShow) {
      return;
    }
    group.map((item) => {
      if (item.id == value) {
        nowUserGroup.push(item);
      }
    });
    handleUserGroup(nowUserGroup);
  };

  return (
    <>
      <Modal
        destroyOnClose
        title="分组"
        open={modalVisible}
        onCancel={onCancel}
        footer={null}
        width={500}
      >
        <ProForm
          layout="horizontal"
          onFinish={handleFormValue}
          form={form}
          submitter={{
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
          }}
        >
          <Form.Item label="选择分组" name="value">
            <Select
              showSearch
              placeholder="点击输入分组"
              filterOption={false}
              onSearch={handleSearch}
              onSelect={handleOnSelect}
            >
              {group.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="已有分组" name="new_value">
            {userGroup.map((item, index) => (
              <Tag closable visible onClose={() => handleDelete(item.id)}>
                {item.name}
              </Tag>
            ))}
          </Form.Item>
        </ProForm>
      </Modal>
    </>
  );
};

export default Group;
