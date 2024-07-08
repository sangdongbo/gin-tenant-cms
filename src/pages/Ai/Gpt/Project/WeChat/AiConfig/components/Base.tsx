import { ProForm, ProFormText, ProFormList } from '@ant-design/pro-components';
import { Upload } from '@bluedot-tech/bluedot-antd';
import { Row, Col, Space, message } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { ProFormToastEditor } from '@/components/BaseComponents';

import { getConfigRule, addConfigRule } from '../../../../service';

export default ({ onFinish, projectId }: any) => {
  return (
    <div style={{ minHeight: 520, padding: '24px 0' }}>
      <ProForm
        layout="horizontal"
        request={() => getConfigRule(projectId)}
        labelCol={{
          xs: 8,
          sm: 8,
          md: 8,
          lg: 8,
          xl: 7,
          xxl: 5,
        }}
        wrapperCol={{
          xs: 15,
          sm: 15,
          md: 15,
          lg: 15,
          xl: 16,
          xxl: 18,
        }}
        submitter={{
          render: (props, doms) => {
            doms.shift();
            return (
              <Row>
                <Col
                  xs={{
                    span: 8,
                  }}
                  sm={{
                    span: 8,
                  }}
                  md={{
                    span: 8,
                  }}
                  lg={{
                    span: 8,
                  }}
                  xl={{
                    span: 7,
                  }}
                  xxl={{
                    span: 5,
                  }}
                />
                <Col>
                  <Space>{doms}</Space>
                </Col>
              </Row>
            );
          },
        }}
        onFinish={async (formValue) => {
          const res = await addConfigRule({
            ...formValue,
            project_id: projectId,
          });
          await onFinish?.(res, formValue);
          message.success('保存成功');
          return true;
        }}
      >
        <ProForm.Item
          className="reset-upload-imgcrop"
          name="avatar"
          label="头像"
          rules={[{ required: true, message: '请上传头像' }]}
        >
          <Upload.ImgCrop
            uploadProps={{
              listType: 'picture-circle',
            }}
            imgCropProps={{
              aspect: 1,
              fillColor: 'transparent',
            }}
          >
            上传头像
          </Upload.ImgCrop>
        </ProForm.Item>
        <ProFormText
          name="nickname"
          label="昵称"
          width="md"
          placeholder="请输入昵称"
          fieldProps={{
            maxLength: 16,
          }}
          extra="昵称名称最多输入16个中文或英文"
          rules={[
            { required: true },
            {
              whitespace: true,
            },
          ]}
        />
        <ProFormText
          width="md"
          name="title"
          label="页面标题"
          placeholder="请输入页面标题"
          fieldProps={{
            maxLength: 16,
          }}
          extra="页面标题最多输入16个中文或英文"
          rules={[
            { required: true },
            {
              whitespace: true,
            },
          ]}
        />
        <ProFormToastEditor
          name="description"
          label="开篇介绍"
          placeholder="请输入开篇介绍"
          height={300}
          rules={[
            { required: true },
            {
              whitespace: true,
            },
          ]}
        />
        <ProFormList
          label="预设问题"
          name="preset_question"
          creatorButtonProps={{
            block: false,
            creatorButtonText: '新建',
          }}
          rules={[
            {
              validator(rule, value) {
                if (value && value.length > 5) {
                  return Promise.reject('最多设置5个');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          {(f, index, action, count) => {
            return (
              <div style={{ display: 'flex' }}>
                <ProFormText
                  width="md"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: '请输入',
                    },
                    {
                      whitespace: true,
                      message: '请输入',
                    },
                  ]}
                />
                {index > 0 && (
                  <UpOutlined
                    title="向上移动"
                    style={{ marginLeft: '5px', height: 32 }}
                    onClick={() => {
                      action.move?.(index - 1, index);
                    }}
                  />
                )}

                {index + 1 < count && (
                  <DownOutlined
                    title={'向下移动'}
                    style={{ marginLeft: '5px', height: 32 }}
                    onClick={() => {
                      action.move?.(index + 1, index);
                    }}
                  />
                )}
              </div>
            );
          }}
        </ProFormList>
      </ProForm>
    </div>
  );
};
