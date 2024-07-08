import { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { message, Popconfirm, Button, Tag, Typography } from 'antd';
import { ModalForm } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

import FileForm from './components/FileForm';
import CategoryForm from './components/CategoryForm';
import ProDragTable from '@/components/BaseComponents/ProDragTable';

import { queryTreeRule, sortRule, addRule, updateRule, removeRule } from '../../service';
const { Paragraph } = Typography;

const typeEnum = {
  1: {
    color: 'blue',
    text: '资料',
  },
  2: {
    color: 'cyan',
    text: '分类',
  },
};

export default ({ projectId, onPreviewRegister, ...props }: any) => {
  const { list, updaterList } = useModel('dataDownload', (model) => model);
  // const [dataSource, setDataSource] = useState<any>([]);
  const [visibleCategory, setVisibleCategory] = useState<boolean>(false);
  const [visibleUpdateCategory, setVisibleUpdateCategory] = useState<boolean>(false);
  const [parentId, setparentId] = useState(0);
  const [row, setRow] = useState<any>(null);
  const [visibleContent, setVisibleContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  // 设置level参数，用户判断当前层级使用
  const handleData: any = (data: any[], index: number) => {
    return data.map((item) => {
      const _item = item;
      if (item.children) _item.children = handleData(item.children, index + 1);
      return {
        ..._item,
        level: index,
      };
    });
  };

  const dataReload = (parmas: any = {}) => {
    setLoading(true);
    queryTreeRule({
      'filter[project_id]': projectId,
      include: 'user',
      ...parmas,
    })
      .then((res) => {
        updaterList(handleData(res, 1));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const createCategoryForm = (pId: number) => {
    setparentId(pId);
    setVisibleCategory(true);
  };
  const createContentForm = (pId: number) => {
    setparentId(pId);
    setVisibleContent(true);
  };

  const handleSort = async (sortIds: number[]) => {
    const result = await sortRule({ ids: sortIds });
    if (result) {
      // message.success('排序成功');
      // updaterPublishTime(new Date());
    } else {
      message.error('排序失败');
      dataReload();
    }
  };

  const columns: ProColumns[] = [
    {
      title: '名称',
      dataIndex: 'sort',
      key: 'filter[title]',
      // width: 385,
      width: 285,
      render: (dom, record) => (
        <div style={{ display: 'inline-flex', width: 185 }}>
          <Paragraph ellipsis={{ rows: 2 }}>{`${record.title}`}</Paragraph>
        </div>
      ),
      // render: (dom, record) => record.title,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'filter[type]',
      valueType: 'select',
      valueEnum: typeEnum,
      render: (dom, record) => (
        <Tag color={typeEnum[record.type].color}>{typeEnum[record.type].text}</Tag>
      ),
    },
    // {
    //   title: '创建人',
    //   dataIndex: ['user', 'username'],
    //   search: false,
    // },
    {
      title: '创建时间',
      valueType: 'dateTime',
      dataIndex: 'created_at',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 270,
      fixed: 'right',
      render: (dom, record) => {
        const resutlDom: any[] = [
          <a
            key="edit"
            onClick={() => {
              setRow(record);

              if (record.type == 1) setVisibleContent(true);
              if (record.type == 2) setVisibleUpdateCategory(true);
            }}
          >
            编辑
          </a>,
        ];
        if (record.type == 2) {
          if (record.level < 3) {
            resutlDom.push(
              <a key="addCategory" onClick={() => createCategoryForm(record.id)}>
                新建分类
              </a>,
            );
          }

          resutlDom.push(
            <a key="addContent" onClick={() => createContentForm(record.id)}>
              新建内容
            </a>,
          );
        }
        resutlDom.push(
          <Popconfirm
            key="delete"
            title="确定删除此项?"
            onConfirm={async () => {
              await removeRule(record.id);
              dataReload();
            }}
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>,
        );
        return resutlDom;
      },
    },
  ];

  return (
    <>
      <ProDragTable
        loading={loading}
        columns={columns}
        pagination={false}
        dataSource={list}
        toolBarRender={() => [
          <Button key="category" onClick={() => createCategoryForm(0)}>
            新建一级分类
          </Button>,
        ]}
        isDrag={isSearch}
        search={false}
        options={false}
        onSubmit={(values) => {
          const valuesKeys = Object.keys(values);
          if (valuesKeys.length) {
            dataReload(values);
            setIsSearch(true);
          }
        }}
        onReset={() => {
          dataReload();
          setIsSearch(false);
        }}
        handleSort={handleSort}
        setDataSource={updaterList}
        {...props}
      />

      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        open={visibleCategory}
        onOpenChange={(visible: any) => {
          if (!visible) setRow(null);
          setVisibleCategory(visible);
          dataReload();
        }}
        autoFocusFirstInput
        onFinish={async (values) => {
          await addRule({ ...values, project_id: projectId, parent_id: parentId, type: 2 });
          message.success('提交成功');
          // updaterPublishTime(new Date());
          return true;
        }}
        title="新建分类"
        width={300}
      >
        <CategoryForm />
      </ModalForm>

      <ModalForm
        autoFocusFirstInput
        title="修改分类"
        initialValues={row || {}}
        width={500}
        modalProps={{
          destroyOnClose: true,
        }}
        open={visibleUpdateCategory}
        onOpenChange={(visible: any) => {
          if (!visible) setRow(null);
          setVisibleUpdateCategory(visible);
        }}
        onFinish={async (values) => {
          await updateRule(row.id, values);
          // updaterPublishTime(new Date());
          dataReload();
          return true;
        }}
      >
        <CategoryForm />
      </ModalForm>

      <ModalForm
        autoFocusFirstInput
        title={row ? '修改内容' : '新建内容'}
        initialValues={row || {}}
        width={500}
        modalProps={{
          destroyOnClose: true,
        }}
        open={visibleContent}
        onOpenChange={(visible: any) => {
          if (!visible) setRow(null);
          setVisibleContent(visible);
        }}
        onFinish={async (values) => {
          // 需要判断是否有status来判断资料是否上传完毕
          if (values.file && values.file.length && values.file[0].status) {
            message.info('请等待资料上传完毕后在提交');
            return false;
          }
          if (row) {
            await updateRule(row.id, { ...values, type: 1 });
          } else {
            await addRule({ ...values, project_id: projectId, parent_id: parentId, type: 1 });
          }
          // updaterPublishTime(new Date());
          dataReload();
          return true;
        }}
      >
        <FileForm />
      </ModalForm>
    </>
  );
};
