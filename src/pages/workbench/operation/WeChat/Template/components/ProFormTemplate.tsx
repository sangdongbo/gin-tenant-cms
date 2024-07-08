import { useEffect, useRef, useState } from 'react';
import { Input, Empty } from 'antd';
import type { ProFormItemProps } from '@ant-design/pro-components';
import Schema from 'async-validator';
import { ProForm, ProFormText, ProFormRadio, ProFormDependency } from '@ant-design/pro-components';

import { ProFromSketchPicker, ProCard } from '@/components/BaseComponents';
import SelectTemplate from './SelectTemplate';

import wrapToBr from '@/utils/wrapToBr';
import { getRule } from '../service';

import styles from './styles.less';

interface PropsType extends ProFormItemProps {
  fieldProps?: any;
  onSelectTemplate?: any;
};

// 判断当前的类型
export const handelTypeValue = (data: any) => {
  if (data?.url) {
    return 'url';
  };
  if (data?.miniprogram?.appid) {
    return 'miniprogram';
  };
  return 'none';
};

// 因为提交格式和组件格式不一致，所以需要转换
export const handelFormValues = (baseFormValues: any) => {
  const formValues = JSON.parse(JSON.stringify(baseFormValues));
  let values = {
    appid: formValues.data.template_appid,
    template_id: formValues.data.template_id,
    title: formValues.title,
    data: {},
  };
  // 删除冗余数据
  delete formValues.data.template_appid;
  delete formValues.data.template_id;
  delete formValues.data.type;
  // 赋值为新数据格式
  values.data = formValues.data;
  return values;
};

// 处理回显数据
export const handelInitValues = (baseFormValues: any) => {
  const formValues = JSON.parse(JSON.stringify(baseFormValues));
  let values = {
    ...formValues.data,
    type: handelTypeValue(formValues.data),
    template_appid: formValues.appid,
    template_id: formValues.template_id,
  };
  return values;
};

// 变量正则
const wrapReg = /[\r\n|\n|\r]/g;

const transform = (content: string) => {
  let array = [];
  array = content.split(wrapReg);
  return array;
};

const CustomTextArea = ({ prefix, ...props }: any) => {
  return (
    <div className={styles['custom-textarea']}>
      {prefix ? <div className={styles['custom-textarea-prefix']}>{prefix}</div> : null}
      <Input.TextArea
        bordered={false}
        style={{ paddingLeft: 2 }}
        autoSize={{
          minRows: 2,
          maxRows: 5,
        }}
        {...props}
      />
    </div>
  );
};

const ProFormExampleItem = ({ content, item, name }: any) => {
  const form = ProForm.useFormInstance();
  const key = item.split('}}')[0];
  const formKey = key.split('.')[0];
  const watchName = ['data', formKey, 'value'];
  const watchValue = ProForm.useWatch(watchName) || `{{${key}}}`;

  return (
    <span
      style={{
        display: content.includes('remark') ? 'block' : 'inline',
        color: form.getFieldValue(['data', formKey, 'color']),
      }}
      dangerouslySetInnerHTML={{
        __html: wrapToBr(watchValue),
      }}
    />
  );
};

const ProFormExample = ({ content, name }: any) => {
  const contentArray = content.split('{{');
  return (
    <div style={{ display: content.includes('first') ? 'inline' : 'flex', padding: '5px 0' }}>
      {content.includes('remark') ? <div style={{ whiteSpace: 'nowrap' }}>备注：</div> : null}

      {contentArray.map((item: any) => {

        if (item.includes('}}')) {
          return (
            <ProFormExampleItem content={content} item={item} name={name} />
          );
        }
        return <span key={item}>{item}</span>;
      })}
    </div>
  );
};

const ProFormInput = ({ content, name }: any) => {
  const contentArray = content.split('{{');

  return (
    <div
      style={{
        display: content.includes('first') ? 'inline' : 'flex',
      }}
    >
      {contentArray.map((item: any) => {
        if (item.includes('}}')) {
          const key = item.split('}}')[0];
          const formKey = key.split('.')[0];
          return (
            <ProForm.Item
              key={item}
              name={['data', formKey, 'value']}
              rules={[
                {
                  required: true,
                  message: '请输入',
                },
              ]}
              style={{
                flex: 1,
              }}
            >
              {['first', 'remark'].includes(formKey) ? (
                <CustomTextArea
                  autoSize={{
                    minRows: 2,
                    maxRows: 5,
                  }}
                  style={
                    formKey == 'remark'
                      ? {
                        width: 266,
                      }
                      : {}
                  }
                />
              ) : (
                <Input
                  placeholder="请输入"
                />
              )}
            </ProForm.Item>
          );
        };

        if (content.includes('first')) {
          return <span key={item} />;
        };

        if (content.includes('remark')) {
          return (
            <div
              key={item}
              style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', height: 32 }}
            >
              备注：
            </div>
          );
        };

        return (
          <div key="item" style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', height: 32, paddingRight: 5, }}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

const CustomTemplate = ({
  name,
  label,
  value,
  onChange,
  onChangeList,
  onSelectTemplate,
  ...props
}: any) => {
  const formRef = useRef<any>();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value?.template_id) {
      setLoading(true);
      getRule(value.template_id).then((res) => {
        setList(transform(res.content));
        setLoading(false);
      });
    };
  }, []);

  useEffect(() => {
    onChangeList?.(list);
  }, [list]);

  return (
    <ProForm
      className="reset-pro-form-template"
      initialValues={value}
      formRef={formRef}
      submitter={false}
      layout="horizontal"
      onValuesChange={(values: any, allvalues: any) => {
        onChange({
          template_id: value?.template_id,
          template_appid: value?.template_appid,
          ...(allvalues || {}),
        });
      }}
    >
      <>
        {!value?.template_id ? (
          <div style={{ marginBottom: 24 }}>
            <SelectTemplate
              onFinish={(templateValue: any) => {
                onSelectTemplate?.(templateValue);
                onChange?.({
                  ...(value || {}),
                  template_id: templateValue.template_id,
                  template_appid: templateValue.appid,
                });
                setList(transform(templateValue.content));
              }}
            />
          </div>
        ) : null}
        {list?.length ? (
          <ProCard bordered split="vertical" loading={loading}>
            <ProCard
              colSpan="45%"
              split="horizontal"
              bodyStyle={{ padding: 24 }}
              gutter={[0, 24]}
            >
              <ProCard bordered>
                {list.map((item, index) => {
                  if (item.includes('{{')) {
                    return <ProFormExample key={item} name={name} content={item} />;
                  }
                  return (
                    <div
                      key={item}
                      style={{ minHeight: '1em' }}
                      dangerouslySetInnerHTML={{
                        __html: item,
                      }}
                    />
                  );
                })}
              </ProCard>
            </ProCard>
            <ProCard split="horizontal" bodyStyle={{ padding: 24 }}>
              <ProForm.Item>
                <ProCard bordered>
                  {list.map((item, index) => {
                    if (item.includes('{{')) {
                      return <ProFormInput key={item} name={name} content={item} />;
                    }
                    return (
                      <div key={item} style={{ minHeight: '1em' }}>
                        {item}
                      </div>
                    );
                  })}
                </ProCard>
              </ProForm.Item>

              <ProFormRadio.Group
                label="跳转类型"
                name="type"
                initialValue="none"
                labelCol={{ span: 5 }}
                options={[
                  {
                    value: 'none',
                    label: '不跳转',
                  },
                  {
                    value: 'url',
                    label: '链接',
                  },
                  {
                    value: 'miniprogram',
                    label: '小程序',
                  },
                ]}
              />
              <ProFormDependency name={['type']}>
                {({ type }) => {
                  if (type == 'url') {
                    return (
                      <ProFormText
                        label=""
                        name="url"
                        rules={[
                          {
                            required: true,
                          },
                          {
                            type: 'url',
                          },
                        ]}
                        formItemProps={{
                          style: {
                            paddingLeft: 81,
                          },
                        }}
                      />
                    );
                  }
                  if (type == 'miniprogram') {
                    return (
                      <>
                        <ProFormText
                          label="APPID"
                          name={['miniprogram', 'appid']}
                          rules={[{ required: true }]}
                          labelCol={{ span: 5 }}
                        />
                        <ProFormText
                          label="页面路径"
                          name={['miniprogram', 'pagepath']}
                          rules={[{ required: true }]}
                          labelCol={{ span: 5 }}
                        />
                      </>
                    );
                  }
                  return null;
                }}
              </ProFormDependency>

            </ProCard>
          </ProCard>
        ) : (
          <ProCard bordered>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="请先选择模版" />
          </ProCard>
        )}
      </>
    </ProForm>
  );
};

const ProFormTemplate = ({ onSelectTemplate, fieldProps, rules = [], ...props }: PropsType) => {
  const listRef = useRef<any>();

  return (
    <ProForm.Item
      {...props}
      rules={[
        ...rules,
        {
          async validator(rule, value) {
            const list = listRef.current?.filter((item: any) => item.includes('{{'));
            const templateData = value.data || {};
            const url = value?.url;
            const miniprogramData = value?.miniprogram || {};
            const type = value?.type || '';
            const dataArray = Object.keys(templateData);
            let isVerify = true;

            if (templateData) {
              if (list?.length != dataArray.length) {
                isVerify = false;
              };
              dataArray.forEach(item => {
                if (!`${templateData[item].value || ''}`) {
                  isVerify = false;
                };
              });
            };
            if (type == 'url') {
              const descriptor = {
                url: [
                  {
                    required: true
                  },
                  {
                    type: 'url',
                  }
                ],
              };
              // 为了和 ProFormText 的 rules 验证 url 的规则统一
              const validator = new Schema(descriptor);
              try {
                await validator.validate({ url });
              } catch (error) {
                isVerify = false;
              };
            };
            if (type == 'miniprogram') {
              const descriptor = {
                appid: [
                  {
                    required: true
                  }
                ],
                pagepath: [
                  {
                    required: true
                  }
                ],
              };
              // 为了和 ProFormText 的 rules 验证 url 的规则统一
              const validator = new Schema(descriptor);
              try {
                await validator.validate(miniprogramData);
              } catch (error) {
                isVerify = false;
              };
            };
            if (isVerify) {
              return Promise.resolve();
            };
            return Promise.reject(new Error('请全部填写'));
          },
        }
      ]}
    >
      <CustomTemplate
        listRef={listRef}
        name={props.name}
        onSelectTemplate={onSelectTemplate}
        onChangeList={(list: any[]) => {
          listRef.current = list;
        }}
        rules={rules}
        {...fieldProps}
      />
    </ProForm.Item>
  );
};

export default ProFormTemplate;
