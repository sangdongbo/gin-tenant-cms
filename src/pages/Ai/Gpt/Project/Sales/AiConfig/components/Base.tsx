import { ProCard, ProForm, ProFormText, ProFormTextArea, ProFormList, ProFormSwitch } from '@ant-design/pro-components';
import { Upload } from '@bluedot-tech/bluedot-antd';
import { Row, Col, Space, message } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import { getConfigRule, addConfigRule } from '../../../../service';

export default ({ projectId }: any) => {
  return (
    <div style={{ minHeight: 520, padding: '24px 0' }}>
      <ProForm
        layout="horizontal"
        request={() => getConfigRule(projectId)}
        labelCol={{
          span: 3
        }}
        submitter={{
          render: (props, doms) => {
            doms.shift();

            return (
              <Row>
                <Col offset={3}>
                  <Space>{doms}</Space>
                </Col>
              </Row>
            );
          },
        }}
        onFinish={async (formValue) => {
          await addConfigRule({
            ...formValue,
            project_id: projectId,
          });
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
          // labelCol={{
          //   span: 2
          // }}
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
          // labelCol={{
          //   span: 2
          // }}
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
        <ProFormTextArea
          width="md"
          name="description"
          label="开篇介绍"
          placeholder="请输入开篇介绍"
          fieldProps={{
            showCount: true,
            maxLength: 255,
          }}
          rules={[
            { required: true },
            {
              whitespace: true,
            },
          ]}
        />
        {/* 预设提问 */}
        <ProFormList
          label="预设问题"
          name="preset_question"
          creatorButtonProps={{
            block: false,
            creatorButtonText: '新建',
          }}
          rules={[
            {
              validator(rule, value, callback) {
                if (value && value.length > 5) {
                  return Promise.reject('最多设置5个');
                };
                return Promise.resolve();
              },
            }
          ]}
        // initialValue={[
        //   {
        //     validator(rule, value, callback) {
        //       if (value.length) {
        //         return Promise.resolve();
        //       };
        //       return Promise.reject('最多设置5个'))
        //     },
        //   }
        // ]}
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
                    }
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
        {/* <ProFormSwitch
          name={['data', 'showReferences']}
          label="推荐资料"
          initialValue={1}
          getValueFromEvent={(event) => event ? 1 : 0}
          fieldProps={{
            checkedChildren: '显示',
            unCheckedChildren: '隐藏',
          }}
        /> */}
      </ProForm>
    </div >
  )
}
