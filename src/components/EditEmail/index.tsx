import React, { useEffect, useRef, useState } from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, ConfigProvider, message, Space, Affix } from 'antd';
import { useSize } from 'ahooks';

import ProCard from '@/components/BaseComponents/ProCard';
import Preview from './Preview';
import RichText from './RichText';

export default ({
  forms,
  previewHtml,
  previewExtra,
  emailRichText: baseEmailRichText,
  params,
  request,
  postData,
  onValuesChange: onBaseValuesChange,
  onFinish,
  ...props
}: any) => {
  // 剔除表单不需要的字段
  const [emailRichText, setEmailRichText] = useState<any>(baseEmailRichText || {});
  const { clickKey, header, footer, ...proForminitValues } = emailRichText;

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const formRef = useRef<any>(null);
  const formDomRef = useRef<HTMLDivElement>(null);
  const size: any = useSize(formDomRef);

  const getEmailRichText = async () => {
    setLoading(true);
    const resSource = await request?.(params);
    const res = postData?.(resSource) || resSource;

    if (res.header) {
      const formValue = {
        ...res,
        header: res.header || emailRichText.header,
        footer: res.footer || emailRichText.footer,
      };

      onValuesChange(formValue);
    }

    setLoading(false);
  };

  const onValuesChange = (val: any) => {
    onBaseValuesChange(val);
    // 目前因为富文本编辑器的原因获取不到最新的emailRichText值，这里需要做一个兼容
    setEmailRichText((newEmailRichText: any) => {
      const { editHtml, ...value } = JSON.parse(JSON.stringify(val));
      let currentValues = {
        ...newEmailRichText,
        ...value,
      };
      if (editHtml) {
        currentValues[currentValues.clickKey] = editHtml;
      }
      return currentValues;
    });
  };

  useEffect(() => {
    getEmailRichText();
  }, []);

  return (
    <ProCard loading={loading} title="邮件设置" headerBordered {...props}>
      <ProCard
        colSpan={{
          xs: 14,
          sm: 14,
          md: 14,
          lg: 14,
          xl: 14,
          xxl: 8,
        }}
        title={
          <div ref={formDomRef}>
            <Space direction="vertical">
              <ConfigProvider
                theme={{
                  token: {
                    marginLG: 8,
                  },
                }}
              >
                <ProForm
                  omitNil
                  formRef={formRef}
                  initialValues={proForminitValues}
                  submitter={false}
                  layout="horizontal"
                  labelCol={{
                    span: 4,
                  }}
                  onValuesChange={(changedValues, allValues) => {
                    onValuesChange({ ...allValues });
                  }}
                >
                  <>
                    {forms ? (
                      React.cloneElement(forms, {
                        ...forms?.props,
                        onSetValuesChange(allValues: any) {
                          onValuesChange({ ...allValues });
                          forms.props?.onSetValuesChange?.(allValues);
                        },
                      })
                    ) : (
                      <>
                        <ProFormText
                          width="lg"
                          name="subject"
                          label="邮件标题"
                          fieldProps={{
                            showCount: true,
                            maxLength: 64,
                          }}
                        />
                        <ProFormText
                          width="lg"
                          name="from_name"
                          label="发送别名"
                          fieldProps={{
                            showCount: true,
                            maxLength: 30,
                          }}
                        />
                      </>
                    )}
                  </>
                </ProForm>
              </ConfigProvider>
            </Space>
          </div>
        }
        bordered
        headerBordered
      >
        <Preview
          html={previewHtml}
          emailRichText={emailRichText}
          updaterEmailRichText={(val: any) => {
            onValuesChange(val);
          }}
        />
        {previewExtra}
      </ProCard>
      <ProCard colSpan={10} bodyStyle={{ paddingTop: 0 }}>
        <div style={{ width: '100%', height: size?.height + 32 }} />
        <Affix offsetTop={24}>
          <Space direction="vertical">
            <RichText
              emailRichText={emailRichText}
              updaterEmailRichText={(val: any) => {
                onValuesChange(val);
              }}
            />
            <Button
              key="submit"
              loading={submitLoading}
              type="primary"
              onClick={async () => {
                setSubmitLoading(true);
                try {
                  await formRef.current?.validateFields();
                  await onFinish?.(emailRichText);
                  message.success('提交成功');
                } catch (error) {}

                setSubmitLoading(false);
              }}
            >
              提交
            </Button>
          </Space>
        </Affix>
      </ProCard>
    </ProCard>
  );
};
