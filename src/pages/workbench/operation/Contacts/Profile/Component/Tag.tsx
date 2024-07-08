import React, { useEffect, useState } from 'react';
import { Form, Button, Select, Modal, Tag } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import { queryTagRelationRule } from '../service';
import { useForm } from 'antd/es/form/Form';
import TagFormItem from '../../../Tag/Components/TagFormItem';

const Group: React.FC<any> = ({ onSubmit, onCancel, modalVisible, row }) => {
  const [userTag, handleUserTag] = useState<object[]>([]);

  const [form] = useForm();

  useEffect(() => {
    queryTagRelationRule({ user_id: row.id }).then((result) => {
      let tag: any = [];
      result.map((item: any) => tag.push(item.tag.id));
      form.setFieldsValue({ tag_ids: tag });
    });
  }, []);

  const handleFormValue = async () => {
    let userTagIds: number[] = [];
    userTag.map((item) => userTagIds.push(item.id));
    onSubmit({ tagIds: userTagIds });
  };

  return (
    <>
      <Modal
        destroyOnClose
        title="标签"
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
          <Form.Item label="标签" name="tag_ids">
            <TagFormItem />
          </Form.Item>
        </ProForm>
      </Modal>
    </>
  );
};

export default Group;
