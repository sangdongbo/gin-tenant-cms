import { useState, useRef, useEffect } from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import { DragSortTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import useRepairDragSortTable from '@/utils/useRepairDragSortTable';

import {
  queryRule as queryFreepublishRule,
  asyncRule as asyncFreepublishRule,
  getIdsRule as getIdsFreepublishRule,
} from '@/pages/workbench/operation/WeChat/Freepublish/service';
import FreepublishContent from '@/pages/workbench/operation/WeChat/Freepublish/components/Content';

export default (props: any) => {
  const { categoryId, index, customId, freepublishIds, toolBarRender = () => [] } = props;
  const {
    article: { tabs, list },
    updaterArticle,
  } = useModel('microbook', (model) => model);

  const dataSource = list[customId] || [];
  const domRef = useRepairDragSortTable({ dataSource });

  const [visible, setVisible] = useState(false);
  const [articleSelectKeys, setArticleSelectKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [asyncLoading, setAsyncLoading] = useState(false);
  const modalActionRef = useRef<any>();

  const reset = async () => {
    if (!freepublishIds || !freepublishIds.length) return;

    setLoading(true);
    const res = await getIdsFreepublishRule({
      ids: freepublishIds.join(','),
    });

    setLoading(false);
    updaterArticle({
      list: {
        ...list,
        [customId]: res.map((item: any, index: number) => ({
          ...item,
          index,
        })),
      },
    });
  };

  const columns: any = [
    {
      title: '排序',
      dataIndex: 'sort',
      render: (dom: any, record: any) => record?.title || '',
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 200,
      render: (dom: any, record: any) => {
        return (
          <Popconfirm
            title="确定删除此项?"
            onConfirm={async () => {
              const currentTabs = JSON.parse(JSON.stringify(tabs));
              currentTabs[index].freepublish_ids = currentTabs[index].freepublish_ids.filter(
                (item: any) => item != record.id,
              );
              updaterArticle({
                tabs: currentTabs,
                list: {
                  ...list,
                  [customId]: dataSource.filter((item: any) => item.id !== record.id),
                },
              });
            }}
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        );
      },
    },
  ];

  const handleDragSortEnd = async (beforeIndex: number, afterIndex: number, newDataSource: any) => {
    const currentTabs = JSON.parse(JSON.stringify(tabs));
    currentTabs[index].freepublish_ids = newDataSource.map((item: any) => item.id);
    updaterArticle({
      list: {
        ...list,
        [customId]: newDataSource,
      },
      tabs: currentTabs,
    });
  };

  useEffect(() => {
    if (freepublishIds != null && freepublishIds.length != dataSource.length) {
      reset();
    }
  }, [freepublishIds]);

  return (
    <>
      <div ref={domRef}>
        <DragSortTable
          {...props}
          loading={loading}
          toolBarRender={() => [
            <Button
              loading={loading}
              key="primary"
              icon={<PlusOutlined />}
              // type="primary"
              onClick={async () => {
                setArticleSelectKeys(dataSource.map((item: any) => item?.id));
                setVisible(true);
              }}
            >
              新建
            </Button>,
            ...toolBarRender(),
          ]}
          tableStyle={{ padding: 0 }}
          columns={columns}
          rowKey="id"
          pagination={false}
          dataSource={dataSource}
          dragSortKey="sort"
          onDragSortEnd={handleDragSortEnd}
        />
      </div>
      <Modal
        destroyOnClose={true}
        footer={null}
        title="新建文章"
        width={1100}
        open={visible}
        onCancel={() => setVisible(false)}
      >
        <FreepublishContent
          actionRef={modalActionRef}
          rowSelection={{
            // selectedRowKeys: articleSelectKeys,
            onSelect: (record: any, clickType: boolean) => {
              let currentKeys = Array.from(new Set([...articleSelectKeys, record.id]));
              if (!clickType) {
                currentKeys = currentKeys.filter((item) => item != record.id);
              }
              setArticleSelectKeys(currentKeys);
            },
            onSelectAll: (clickType: any, selectedRows: any, changeRows: any) => {
              const currentSelectedRowsKeys = changeRows.map((item: any) => item.id);
              if (clickType) {
                setArticleSelectKeys([...articleSelectKeys, ...currentSelectedRowsKeys]);
              } else {
                setArticleSelectKeys(
                  articleSelectKeys.filter((item) => !currentSelectedRowsKeys.includes(item)),
                );
              }
            },
          }}
          search={{
            optionRender: (searchConfig: any, formProps: any, dom: any) => [
              ...dom.reverse(),
              <Button
                key="async"
                loading={asyncLoading}
                onClick={async () => {
                  setAsyncLoading(true);
                  await asyncFreepublishRule();
                  setAsyncLoading(false);
                  modalActionRef.current?.reload();
                }}
              >
                同步
              </Button>,
            ],
          }}
          request={queryFreepublishRule}
          params={{
            'filter[ignore_ids]': freepublishIds ? freepublishIds.join(',') : '',
          }}
          onOk={async ({ selectedRowKeys }: any) => {
            const currentTabs = JSON.parse(JSON.stringify(tabs));
            let newFreepublishIds = selectedRowKeys;
            if (freepublishIds) {
              newFreepublishIds = [...newFreepublishIds, ...freepublishIds];
            }
            currentTabs[index].freepublish_ids = newFreepublishIds;
            setVisible(false);
            updaterArticle({
              tabs: currentTabs,
            });
          }}
        />
      </Modal>
    </>
  );
};
