import { useState } from 'react';
import { message, Space } from 'antd';
import {
  ModalForm,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';
import { DeleteOutlined } from '@ant-design/icons';

import { addPreviewRule } from '../service';
import classNames from 'classnames';

export default ({ disabled, record, onSend, onDisabled }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [localStorageEmails, setLocalStorageEmails] = useState<any>();

  return (
    <div>
      <a
        className={classNames({ disabled })}
        onClick={() => {
          if (disabled) {
            onDisabled?.();
            return;
          }
          const localStoragePreviewMail = localStorage.getItem('preview-mail');
          setModalVisible(true);
          setLocalStorageEmails(localStoragePreviewMail ? JSON.parse(localStoragePreviewMail) : '');
        }}
      >
        预览样式
      </a>
      <ModalForm
        width={380}
        title="预览"
        open={modalVisible}
        onOpenChange={setModalVisible}
        onFinish={async (formValues: any) => {
          const res = await addPreviewRule(record.id, {
            email: formValues.email.map((item: any) => item.data),
          });
          localStorage.setItem('preview-mail', JSON.stringify(formValues.email));
          message.success('发送成功');
          setModalVisible(false);
          onSend?.(res);
        }}
      >
        <ProFormList
          containerStyle={{
            width: '100%'
          }}
          name="email"
          initialValue={localStorageEmails ? localStorageEmails : [{ data: '' }]}
          copyIconProps={false}
          creatorButtonProps={{
            creatorButtonText: '新建邮箱',
          }}
          actionRender={(field, action, defaultActionDom, count) => {
            if (count <= 1) return [];
            return [
              <Space align="center" style={{ paddingLeft: 10 }}>
                <DeleteOutlined onClick={() => action.remove(field.name)} />
              </Space>
            ]
          }}
          label="预览邮箱"
        >
          <ProFormText
            name="data"
            formItemProps={{
              style: { width: 300 }
            }}
            rules={[
              {
                required: true,
                message: '请输入邮箱',
              },
              {
                pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                message: '邮箱格式错误！',
              }
            ]}
          />
        </ProFormList>
      </ModalForm>
    </div>
  )
};
