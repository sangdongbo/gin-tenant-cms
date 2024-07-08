import {
  ProForm,
  ProFormSlider,
  ProFormTextArea,
  ProFormSelect,
  ProFormDependency,
  ProFormSwitch,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';
import { Row, Col, Space, message } from 'antd';
import { ProFormToastEditor } from '@/components/BaseComponents';

import { getConfigPromptRule, addConfigPromptRule } from '../../../../../service';

const llmNameOptions = [
  {
    label: 'GPT-3.5-turbo',
    value: 'gpt-3.5-turbo',
  },
  {
    label: 'GPT-4',
    value: 'gpt-4',
  },
  {
    label: '文心一言',
    value: 'ERNIE-Bot-turbo',
  },
];

export default ({ onFinish, projectId }: any) => {
  return (
    <div style={{ minHeight: 520, padding: '24px 0' }}>
      <ProForm
        layout="horizontal"
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
        request={async () => {
          const res = await getConfigPromptRule(projectId);
          // 其他语气处理
          if (res?.data?.tone_other) {
            res.data.tone = '其他';
          };
          return res;
        }}
        submitter={{
          render: (props, doms) => {
            doms.shift();

            return (
              <Row>
                <Col
                  xs={{
                    span: 8
                  }}
                  sm={{
                    span: 8
                  }}
                  md={{
                    span: 8
                  }}
                  lg={{
                    span: 8
                  }}
                  xl={{
                    span: 7
                  }}
                  xxl={{
                    span: 5
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
          // 其他语气处理
          if (formValue?.data?.tone_other) {
            delete formValue.data.tone;
          }

          const res = await addConfigPromptRule({
            ...formValue,
            project_id: projectId,
          });
          await onFinish?.(res, formValue);
          message.success('保存成功');
          return true;
        }}
      >
        <ProFormSelect
          allowClear={false}
          width="md"
          label="LLM模型"
          name="llm_name"
          options={llmNameOptions}
        />
        <ProFormSlider
          name="temperature"
          label="回复多样性"
          initialValue={0.1}
          min={0}
          max={1}
          step={0.01}
          marks={{
            0: '准确性强',
            1: '天马行空',
          }}
          fieldProps={{
            className: 'reset-pro-form-slider-md',
            included: false,
          }}
        />
        <ProFormTextArea
          name={['data', 'role']}
          width="md"
          label="角色设定"
          fieldProps={{
            showCount: true,
          }}
          rules={[
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        />
        <ProFormToastEditor
          name={['data', 'duty']}
          label="角色任务"
          rules={[
            {
              whitespace: true,
              message: '请输入',
            },
          ]}
        />
        <ProFormSwitch
          label="是否关联上下文"
          name="is_chat_history"
          getValueFromEvent={(event) => (event ? 1 : 0)}
        />
        <ProFormSelect
          allowClear
          width="md"
          label="回复语言"
          name={['data', 'language']}
          options={[
            {
              label: '中文（默认）',
              value: '中文',
            },
            {
              label: 'English',
              value: 'English',
            },
            {
              label: '按问题语种回复',
              value: 'Asklanguage',
            },
          ]}
        />
        <ProFormSelect
          allowClear
          width="md"
          label="回复长度"
          name={['data', 'character_limit']}
          options={[
            {
              label: '自由（默认）',
              value: '自由',
            },
            {
              label: '精简',
              value: '精简',
            },
            {
              label: '适中',
              value: '适中',
            },
            {
              label: '丰富',
              value: '丰富',
            },
          ]}
        />

        <ProFormSelect
          allowClear
          width="md"
          label="回复语气"
          name={['data', 'tone']}
          options={[
            {
              label: '亲切友好',
              value: '亲切友好',
            },
            {
              label: '专业严谨',
              value: '专业严谨',
            },
            {
              label: '热情积极',
              value: '热情积极',
            },
            {
              label: '幽默风趣',
              value: '幽默风趣',
            },
            {
              label: '活泼可爱',
              value: '活泼可爱',
            },
            {
              label: '条理清晰',
              value: '条理清晰',
            },
            {
              label: '其他',
              value: '其他',
            },
          ]}
        />
        <ProFormDependency name={[['data', 'tone']]}>
          {({ data }) => {
            if (data?.tone == '其他') {
              return (
                <ProFormText
                  preserve={false}
                  width="md"
                  label="自定义回复语气"
                  name={['data', 'tone_other']}
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
              );
            }
            return null;
          }}
        </ProFormDependency>

        <ProFormSwitch
          label="禁止回复设置"
          name={['data', 'do_not', 'status']}
          getValueFromEvent={(event) => (event ? 1 : 0)}
        />
        <ProFormDependency name={[['data', 'do_not', 'status']]}>
          {({ data }: any) => {
            if (!data?.do_not?.status) return null;

            return (
              <>
                <ProFormTextArea
                  name={['data', 'do_not', 'script']}
                  width="md"
                  label="回复话术"
                  fieldProps={{
                    showCount: true,
                    maxLength: 255,
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
                <ProFormList
                  label="禁用关键词"
                  name={['data', 'do_not', 'keyword']}
                  creatorButtonProps={{
                    block: false,
                    creatorButtonText: '新建',
                  }}
                  required
                  rules={[
                    {
                      validator(rule, value) {
                        if (value?.length) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('请新建禁用关键词'));
                      },
                    },
                  ]}
                >
                  <ProFormText
                    width="md"
                    name="text"
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
              </>
            );
          }}
        </ProFormDependency>
      </ProForm>
    </div>
  );
};
