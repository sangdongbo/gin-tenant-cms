import React from 'react';
import { ProForm, ProFormSwitch, ProFormDependency } from '@ant-design/pro-components';
import { Row, Col, Space, message } from 'antd';
import { ProDrawer } from '@/components/BaseComponents';
import Register from './Register';
import Email from './Email';
import { getConfigRule, updateConfigDownloadRule } from '../../../../../service';
import { getContactsFieldsRule } from '../../../../service';
import { getRule } from '../service';

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
          await updateConfigDownloadRule(projectId, {
            is_download: 0,
            is_download_register: 0,
            ...formValue,
          });
          message.success('保存成功');
          return true;
        }}
      >
        <ProFormSwitch
          name={['data', 'showReferences']}
          label="推荐资料"
          tooltip="如GPT回复中引用了资料内的内容，设置是否展示资料原件"
          getValueFromEvent={(event) => event ? 1 : 0}
          fieldProps={{
            checkedChildren: '开启',
            unCheckedChildren: '关闭',
          }}
        />
        <ProFormDependency name={[['data', 'showReferences']]}>
          {({ data }) => {
            if (data?.showReferences) {
              return <>
                <ProFormSwitch
                  name="is_download"
                  label="资料支持下载"
                  tooltip="如已推荐资料，设置该资料是否支持下载"
                  getValueFromEvent={(event) => event ? 1 : 0}
                  fieldProps={{
                    checkedChildren: '开启',
                    unCheckedChildren: '关闭',
                  }}
                  rules={[
                    {
                      validator(rule, value) {
                        if (value == 1) {
                          return new Promise<void>((resolve, reject) => {
                            getRule(projectId).then(res => {
                              if (res.id) {
                                resolve();
                              } else {
                                reject('请设置邮箱后在提交！');
                              };
                            }).catch(() => {
                              reject('请重新提交！');
                            });
                          })
                        } else {
                          return Promise.resolve();
                        }
                      },
                    }
                  ]}
                  addonAfter={<ProFormDependency name={['is_download']}>
                    {({ is_download }) => {
                      if (is_download) return <ProDrawer
                        title="邮件设置"
                        bodyStyle={{
                          padding: 0
                        }}
                        footer={null}
                        trigger={<a>点击设置邮件</a>}
                      >
                        <Email projectId={projectId} />
                      </ProDrawer>;
                      return null;
                    }}
                  </ProFormDependency>}
                />
                <ProFormSwitch
                  name="is_download_register"
                  label="下载需注册"
                  tooltip="如支持下载资料，是否需要用户留资"
                  getValueFromEvent={(event) => event ? 1 : 0}
                  fieldProps={{
                    checkedChildren: '开启',
                    unCheckedChildren: '关闭',
                  }}
                  rules={[
                    {
                      validator(rule, value) {
                        if (value == 1) {
                          return new Promise<void>((resolve, reject) => {
                            getContactsFieldsRule(projectId).then(res => {
                              if (res?.forms_id || res?.data?.length) {
                                resolve();
                              } else {
                                reject('请设置表单后在提交！');
                              };
                            }).catch(() => {
                              reject('请重新提交！');
                            });
                          });
                        } else {
                          return Promise.resolve();
                        };
                      },
                    },
                  ]}
                  addonAfter={<ProFormDependency name={['is_download_register']}>
                    {({ is_download_register }) => {
                      if (is_download_register) return <ProDrawer
                        title="留资表单"
                        bodyStyle={{
                          padding: 0
                        }}
                        footer={null}
                        trigger={<a>点击设置表单</a>}
                      >
                        <Register projectId={projectId} />
                      </ProDrawer>;
                      return null;
                    }}
                  </ProFormDependency>}
                />
              </>
            };
            return null;
          }}
        </ProFormDependency>
      </ProForm>
    </div >
  )
}
