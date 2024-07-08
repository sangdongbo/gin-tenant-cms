import React, { useRef, useState } from 'react';
import { Form, Button, message } from 'antd';

import {
  ProForm,
  DrawerForm,
  ProFormText,
  ProFormCheckbox,
  ProFormSelect,
  ProFormList,
  ProFormGroup,
} from '@ant-design/pro-components';

import TreeSelectTag from '../../../../Tag/Components/TreeSelectTag';

const life_cycle = [
  {
    label: '访客',
    value: 1,
  },
  {
    label: '粉丝',
    value: 2,
  },
  {
    label: '标注',
    value: 3,
  },
  {
    label: '注册',
    value: 4,
  },
  {
    label: '现客',
    value: 5,
  },
];

const filterType = {
  AND: '并且',
  OR: '或者',
  // NOT: '但不是',
};

const tagFilterType = {
  IN: '包含其一',
  EQUAL: '包含全部',
  NOT_IN: '不包含',
};

const whereType = {
  EQUAL: '是',
  NOT_EQUAL: '不是',
  CONTAIN: '包含',
  NOT_CONTAIN: '不包含',
  STARTWITH: '起始于',
  ENDWITH: '结束于',
};

const offiaccountItem = {
  nickname: '昵称',
  sex: '性别',
  country: '国家',
  province: '省份',
  city: '城市',
};

const Search: React.FC<any> = ({ visible, onVisibleChange, onFinish }) => {
  const [offiaccountForm, setOffiaccountForm] = useState([
    <ProFormSelect
      name={['contacter', 'full_name', 'conditions']}
      label="条件"
      valueEnum={filterType}
    />,
  ]);
  const [form] = Form.useForm();

  return (
    <>
      <DrawerForm
        open={visible}
        onOpenChange={onVisibleChange}
        title="高级搜索"
        form={form}
        drawerProps={{
          forceRender: true,
          destroyOnClose: true,
        }}
        onFinish={onFinish}
        submitter={{
          render: (props, doms) => {
            return [
              <Button key="rest" onClick={() => props.form?.resetFields()}>
                重置
              </Button>,
              <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                搜索
              </Button>,
            ];
          },
        }}
      >
        <ProForm.Group title="生命周期">
          <ProFormCheckbox.Group width="lg" name="life_cycle" options={life_cycle} />
        </ProForm.Group>

        <ProForm.Group title="粉丝信息">
          <ProForm.Group>
            <ProFormSelect
              name={['wechat', 'nickname', 'conditions']}
              label="条件"
              valueEnum={filterType}
            />
            <ProFormSelect
              name={['wechat', 'nickname', 'where']}
              label="条件"
              valueEnum={whereType}
            />
            <ProFormText
              width="md"
              name={['wechat', 'nickname', 'value']}
              label="昵称"
              placeholder="昵称"
            />
          </ProForm.Group>
        </ProForm.Group>

        <ProForm.Group title="联系人信息">
          <ProForm.Group>
            <ProFormSelect
              name={['info', 'full_name', 'conditions']}
              label="条件"
              valueEnum={filterType}
            />
            <ProFormSelect
              name={['info', 'full_name', 'where']}
              label="条件"
              valueEnum={whereType}
            />
            <ProFormText
              width="md"
              name={['info', 'full_name', 'value']}
              label="姓名"
              placeholder="请输入名称"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              name={['info', 'company', 'conditions']}
              label="条件"
              valueEnum={filterType}
            />
            <ProFormSelect name={['info', 'company', 'where']} label="条件" valueEnum={whereType} />
            <ProFormText
              width="md"
              name={['info', 'company', 'value']}
              label="公司"
              placeholder="请输入名称"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              name={['contacter', 'phone', 'conditions']}
              label="条件"
              valueEnum={filterType}
            />
            <ProFormSelect
              name={['contacter', 'phone', 'where']}
              label="条件"
              valueEnum={whereType}
            />
            <ProFormText
              name={['contacter', 'phone', 'value']}
              width="md"
              label="手机"
              placeholder="请输入手机"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              name={['contacter', 'email', 'conditions']}
              label="条件"
              valueEnum={filterType}
            />
            <ProFormSelect
              name={['contacter', 'email', 'where']}
              label="条件"
              valueEnum={whereType}
            />
            <ProFormText
              width="md"
              name={['contacter', 'email', 'value']}
              label="邮箱"
              placeholder="请输入邮箱"
            />
          </ProForm.Group>
        </ProForm.Group>

        <ProFormList
          name="tag"
          label="标签"
          creatorButtonProps={{
            position: 'bottom',
            creatorButtonText: '新建条件',
            block: true,
          }}
          initialValue={[{}]}
        >
          <ProFormGroup>
            <ProFormSelect name="conditions" label="条件" valueEnum={filterType} />
            <ProFormSelect name="where" label="标签条件" valueEnum={tagFilterType} />
            <ProForm.Item name="value" label="选择标签" style={{ width: 400 }}>
              <TreeSelectTag multiple />
            </ProForm.Item>
          </ProFormGroup>
        </ProFormList>
      </DrawerForm>
    </>
  );
};

export default Search;
