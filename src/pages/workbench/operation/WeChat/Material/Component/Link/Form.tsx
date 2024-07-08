import React from 'react';
import { Form as AntdForm } from 'antd';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Upload } from '@bluedot-tech/bluedot-antd';

interface FormProps { }

const Form: React.FC<FormProps> = ({ }) => {
  return (
    <>
      <ProFormText
        label="名称"
        name="name"
        fieldProps={{ showCount: true, maxLength: 100 }}
        rules={[{ required: true }, { whitespace: true, message: '请输入名称' }]}
      />
      <ProFormText label="卡片标题" name={['data', 'title']} />
      <ProFormText label="卡片描述" name={['data', 'description']} />
      <AntdForm.Item
        className="reset-upload-imgcrop"
        label="卡片封面"
        name={['data', 'image']}
        rules={[{ required: true }]}
        help="图片建议不大于500k"
      >
        <Upload.ImgCrop
          imgCropProps={{
            aspect: 1,
          }}
        />
      </AntdForm.Item>
      <ProFormText
        label="链接"
        name={['data', 'url']}
        rules={[{ required: true }, { whitespace: true, message: '请输入链接' }]}
      />
      <ProFormTextArea
        label="备注"
        name="remark"
        fieldProps={{ showCount: true, maxLength: 255 }}
      />
    </>
  );
};

export default Form;
