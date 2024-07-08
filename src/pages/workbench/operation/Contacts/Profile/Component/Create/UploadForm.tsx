import React, { useEffect, useState } from 'react';
import { Steps, Modal, Button, message, Form, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
// import { ProCard } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';

// import { formItemLayout, formLayout } from '@/formLayout';
// import { queryTagRelationRule } from '../service';
// import { useForm } from 'antd/es/form/Form';
// import TagFormItem from '../../Tag/Components/TagFormItem';

const UploadForm: React.FC<any> = ({ visible, onCancel }) => {
  const [current, setCurrent] = useState(0);
  const [file, setFile] = useState(0);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const uploadProps = {
    action: '/api/backend/user/import',
    // onChange: handleOnChange,
    // onRemove: handleOnRemove,
    // data: OSS.getExtraData,
    accept: '.csv',
    showUploadList: false,
  };

  const steps = [
    {
      title: '上传联系人',
      content: (
        <div>
          <Form.Item label="1. 下载模板">
            <a href="https://middle-platform-api.oss-cn-beijing.aliyuncs.com/assets/office/Import_Contacts_Template_202104.csv">
              点击下载
            </a>
          </Form.Item>
          <Form.Item label="2. 上传文件">
            <Upload.Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击选择或拖动文件到此区域</p>
              <p className="ant-upload-hint">文件小于10M，数据少于5万条，格式：CSV</p>
            </Upload.Dragger>
          </Form.Item>
        </div>
      ),
    },
    {
      title: '选择去重规则',
      content: 'Second-content',
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <style>{`.steps-content {
  min-height: 200px;
  margin-top: 16px;
  text-align: center;
  background-color: #fafafa;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
}

.steps-action {
  margin-top: 24px;
  text-align: center;
}`}</style>
      <Modal title="批量导入联系人" open={visible} onCancel={onCancel} footer={false}>
        <Steps current={current}>
          {steps.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <ProCard>{steps[current].content}</ProCard>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              导入
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              上一步
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default UploadForm;
