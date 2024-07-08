import React, { useEffect, useRef, useState } from 'react';
import { Popover, Form } from 'antd';
import { ProForm, ProFormTextArea, ProFormText } from '@ant-design/pro-components';

interface FormProps { }

const Editor: React.FC<FormProps> = ({ name }) => {
  const [form, setForm] = useState();
  const inputRef = React.useRef<any>(null);

  const handleAppendLink = async (value: any) => {
    let str = `<a href="${value.url}">${value.text}</a>`;
    let text = form.getFieldValue(name);
    text = text ? text + str : str;
    let fields = {};
    if (name instanceof Array) {
      fields[name[0]] = {};
      fields[name[0]][name[1]] = text;
    } else {
      fields[name] = text;
    }

    form.setFieldsValue({ data: { text: text } });
  };

  return (
    <>
      <ProFormTextArea
        name={name}
        label="内容"
        fieldProps={{ ref: inputRef, rows: '10' }}
        rules={[{ required: true }]}
      />
      <Form.Item noStyle shouldUpdate>
        {(form) => setForm(form)}
      </Form.Item>
      <div style={{ textAlign: 'right' }}>
        <Popover
          content={
            <>
              <ProForm layout="horizontal" onFinish={handleAppendLink}>
                <ProFormText label="链接文字" name="text" rules={[{ required: true }]} />
                <ProFormText
                  label="链接地址"
                  name="url"
                  placeholder="以http://或https://开头"
                  rules={[{ required: true }, { whitespace: true, message: '请输入链接地址' }]}
                />
              </ProForm>
            </>
          }
          trigger="click"
          placement="left"
        >
          <a>插入链接</a>
        </Popover>
      </div>
    </>
  );
};

export default Editor;
