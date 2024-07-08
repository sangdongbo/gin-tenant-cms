import { ProForm, ProFormText, ProFormTextArea, ProFormList, ProFormSlider, ProFormSwitch, ProFormDependency } from '@ant-design/pro-components';
import { Row, Col, Space, message } from 'antd';
import ProFormPrompt from './ProFormPrompt';

import { getConfigPromptRule, addConfigPromptRule } from '../../../../../service';

export default ({ projectId }: any) => {

  return (
    <div style={{ minHeight: 520, padding: 24 }}>
      <ProForm
        layout="horizontal"
        labelCol={{
          span: 3
        }}
        wrapperCol={{
          span: 18
        }}
        request={async () => {
          const res = await getConfigPromptRule(projectId);
          // 其他语气处理
          if (res?.data?.tone_other) {
            res.data.tone = '其他';
          };
          if (res?.data?.conversation_stages) {
            res.data.conversation_stages = res.data.conversation_stages.map((item: any) => {
              return {
                text: item,
              };
            })
          }

          return res;
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
          // 其他语气处理
          if (formValue?.data?.tone_other) {
            delete formValue.data.tone;
          };
          if (formValue?.data?.conversation_stages) {
            formValue.data.conversation_stages = formValue.data.conversation_stages.map((item: any) => {
              return item.text;
            })
          }

          await addConfigPromptRule({
            ...formValue,
            project_id: projectId,
          });
          message.success('保存成功');
          return true;
        }}
      >
        <ProFormSlider
          name="temperature"
          label="回复多样性"
          initialValue={0.1}
          // wrapperCol={{
          //   span: 6,
          // }}
          // className="temperature-width"
          min={0}
          max={1}
          step={0.01}
          marks={{
            0: '准确性强',
            1: '天马行空',
          }}
          fieldProps={{
            className: 'reset-pro-form-slider-lg',
            included: false,
          }}
        />
        <ProFormText
          width="md"
          label="姓名"
          name={['data', 'salesperson_name']}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        />
        <ProFormText
          width="md"
          label="职位"
          name={['data', 'salesperson_role']}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        />
        <ProFormText
          width="md"
          label="公司名称"
          name={['data', 'company_name']}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        />
        <ProFormTextArea
          // width="lg"
          label="公司业务"
          name={['data', 'company_business']}
          fieldProps={{
            autoSize: {
              minRows: 7,
            }
          }}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        />
        {/* <ProFormTextArea
          width="lg"
          label="公司价值观"
          name={['data', 'company_values']}
          fieldProps={{
            autoSize: {
              minRows: 7,
            }
          }}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        /> */}
        <ProFormTextArea
          // width="lg"
          label="对话目的"
          name={['data', 'conversation_purpose']}
          fieldProps={{
            autoSize: {
              minRows: 7,
            }
          }}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        />
        <ProFormTextArea
          // width="lg"
          label="公司服务"
          name={['data', 'company_service']}
          fieldProps={{
            autoSize: {
              minRows: 7,
            }
          }}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        />
        {/*
        <ProFormText
          width="md"
          label="年龄"
          name={['data', 'salesperson_age']}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        />
        <ProFormText
          width="md"
          label="性别"
          name={['data', 'salesperson_gender']}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        />





        <ProFormText
          width="md"
          label="服务效益"
          name={['data', 'service_benefits']}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        />
        <ProFormText
          width="md"
          label="对话风格"
          name={['data', 'tone_style']}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        /> */}
        <ProFormPrompt
          name={['data', 'sales_conversation_chain_prompt']}
          label="销售对话链提示"
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        />
        <ProFormPrompt
          name={['data', 'stage_analyzer_chain_prompt']}
          label="阶段分析器链提示"
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        />
        <ProFormList
          className="reset-pro-form-list-container"
          required
          creatorButtonProps={{
            block: false,
            creatorButtonText: '新建',
          }}
          label="会话阶段"
          name={['data', 'conversation_stages']}
        >
          <ProFormTextArea
            name="text"
            fieldProps={{
              autoSize: {
                minRows: 7,
              }
            }}
            rules={[
              {
                required: true,
              },
              {
                whitespace: true,
                message: '请输入',
              },
            ]}
          />
        </ProFormList>
      </ProForm>
    </div>
  )
}
