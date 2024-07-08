import { Row, Col } from 'antd';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormDependency,
  ProFormDigit,
} from '@ant-design/pro-components';

import Select from '@/pages/workbench/operation/WeChat/Authorizer/Components/ProFormSelect';
// import SelectTag from '../../../Tag/Components/SelectTag';
import TreeSelectTag from '../../../Tag/Components/TreeSelectTag';
import SelectMaterial from '../../Material/Component/SelectMaterial';

export default ({ type }: any) => {
  return (
    <>
      <Select
        selectFirst
        label="选择公众号"
        name="appid"
        fieldProps={{
          defaultActiveFirstOption: true,
        }}
        rules={[{ required: true, message: '请选择公众号' }]}
      />
      {type == 'keyword' ? (
        <Row gutter={[32, 0]}>
          <Col span={8}>
            <ProFormSelect
              name="match"
              valueEnum={{
                EQUAL: '等于',
                CONTAIN: '包含关键词部分文字',
                CONTAINED: '包含全部关键词',
              }}
              placeholder="条件"
              rules={[{ required: true, message: '请选择' }]}
            />
          </Col>
          <Col span={16}>
            <ProFormText
              name="text"
              label=""
              placeholder="请输入关键词"
              rules={[{ required: true }, { whitespace: true, message: '请输入关键词' }]}
            />
          </Col>
        </Row>
      ) : null}

      <ProFormDependency name={['appid']}>
        {({ appid }) => {
          // if (!appid) return;
          return (
            <SelectMaterial
              disabled={!appid}
              label="选择素材"
              appid={appid}
              rules={[{ required: true, message: '请选择素材' }]}
              fieldProps={{
                maxLength: 5,
                linkProps: {
                  listProps: {
                    grid: {
                      gutter: 8,
                      column: 4,
                    },
                  },
                },
                textProps: {
                  listProps: {
                    grid: {
                      gutter: 8,
                      column: 4,
                    },
                  },
                },
              }}
            />
          );
        }}
      </ProFormDependency>

      {/* <SelectTag name="tag_ids" width="100%" rules={[]} /> */}
      <ProForm.Item name="tag_ids" label="标签">
        <TreeSelectTag width="100%" rules={[]} />
      </ProForm.Item>
      <ProFormDigit
        label="积分"
        name="lookstar_score"
        fieldProps={{ precision: 0 }}
      />
      <ProFormTextArea
        label="备注"
        name="remark"
        fieldProps={{ showCount: true, maxLength: 255 }}
      />
    </>
  );
};
