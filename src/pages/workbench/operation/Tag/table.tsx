import { useRef, useState } from 'react';
import { Button, Tag } from 'antd';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';

import type { ProColumns, ActionType } from '@ant-design/pro-components';
import ProTable from '@/components/BaseComponents/ProTable';

import {
  queryTableListRule,
  addCategoryRule,
  addRule,
  updateRule,
  updateCategoryRule,
} from './service';
import { CategoryForm, TagForm } from './Components';

export default () => {
  const categoryFormRef = useRef<any>();
  const addTagFormRef = useRef<any>();
  const [categoryVisible, handleCategoryVisible] = useState<boolean>(false);
  const [updateCategoryVisible, handleUpdateCategoryVisible] = useState<boolean>(false);
  const [categoryId, handleCategoryId] = useState<any>();
  const [tagVisible, handleTagVisible] = useState<boolean>(false);
  const [updateTagVisible, handleUpdateTagVisible] = useState<boolean>(false);
  const [tag, handleTag] = useState<any>();
  const [category, handleCategory] = useState<any>();

  const actionRef = useRef<ActionType>();

  const columns: ProColumns[] = [
    {
      title: '标签分类',
      dataIndex: 'name',
      width: 120,
      render: (text, record: any) => {
        const leftMargin = record.col == 0 ? '16px' : '16px';
        return (
          <div
            style={{
              marginLeft: leftMargin,
              cursor: 'pointer',
            }}
            onClick={() => {
              handleCategory(record);
              handleUpdateCategoryVisible(true);
            }}
          >
            {text}
          </div>
        );
      },
    },
    {
      title: (
        <>
          <div style={{ textAlign: 'left' }}>标签</div>
        </>
      ),
      dataIndex: 'tag',
      width: 320,
      render: (_, record: any) =>
        record.tag.map((item: any) => (
          <div style={{ paddingBottom: 8, display: 'inline-block' }}>
            <Tag
              onClick={() => {
                handleTag(item);
                handleUpdateTagVisible(true);
              }}
              style={{ borderRadius: '15px', padding: '4px 15px', cursor: 'pointer' }}
            >
              {item.name}
            </Tag>
          </div>
        )),
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 45,
      render: (_, record: any) => [
        <a
          onClick={() => {
            handleCategoryId(record.id);
            handleTagVisible(true);
          }}
        >
          新建
        </a>,
      ],
    },
  ];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button
            key="export"
            icon={<DownloadOutlined />}
            onClick={() => {
              window.location.href = `${API_URL}/tenant/tag/tag-export?token=${localStorage.getItem(
                'lookstar-tenant-token',
              )}&tenant=${localStorage.getItem('lookstar-tenant-X-Tenant')}`;
            }}
          >
            导出
          </Button>,
          <CategoryForm
            formRef={categoryFormRef}
            key="add"
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新建
              </Button>
            }
            visible={categoryVisible}
            onVisibleChange={handleCategoryVisible}
            onFinish={async (values: any) => {
              await addCategoryRule(values);
              handleCategoryVisible(false);
              actionRef.current?.reload();
              categoryFormRef.current?.resetFields();
            }}
            width={500}
            title="新建标签分类"
          />,
        ]}
        search={false}
        request={(params) => queryTableListRule(params)}
        columns={columns}
        pagination={false}
        bordered={true}
      />
      <TagForm
        hideGroup
        formRef={addTagFormRef}
        open={tagVisible}
        onOpenChange={handleTagVisible}
        onFinish={async (values: any) => {
          values.group_id = categoryId;
          await addRule(values);
          handleTagVisible(false);
          actionRef.current?.reload();
          addTagFormRef.current?.resetFields();
        }}
        width={500}
        title="新建标签"
      />

      {tag && updateTagVisible ? (
        <TagForm
          open={updateTagVisible}
          onOpenChange={(state: boolean) => {
            if (!state) {
              handleTag(undefined);
            }
            handleUpdateTagVisible(state);
          }}
          onFinish={async (values: any) => {
            values.id = tag.id;
            await updateRule(values);
            handleUpdateTagVisible(false);
            handleTag(undefined);
            actionRef.current?.reload();
          }}
          title="编辑标签"
          width={500}
          initialValues={tag}
        />
      ) : null}

      {category && updateCategoryVisible ? (
        <CategoryForm
          visible={updateCategoryVisible}
          onVisibleChange={(state: boolean) => {
            if (!state) {
              handleCategory(undefined);
            }
            handleUpdateCategoryVisible(state);
          }}
          onFinish={async (values: any) => {
            values.id = category.id;
            await updateCategoryRule(values);
            handleUpdateCategoryVisible(false);
            handleCategory(undefined);
            actionRef.current?.reload();
          }}
          title="编辑标签分类"
          width={500}
          initialValues={category}
        />
      ) : null}
    </>
  );
};
