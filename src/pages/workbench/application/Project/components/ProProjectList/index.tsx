import React, { useEffect, useState, useRef } from 'react';
import { Space, Button, message, Modal } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { arrayMove } from '@dnd-kit/sortable';
import { ProTabsRenderTabBar } from '@/components/BaseComponents';
import ProList from '../ProList';
import Search from './Search';
import CreateFolder from './CreateFolder';

import {
  queryRule,
  addFolderRule,
  sortFolderRule,
  removeFolderRule,
  queryFolderAllRule,
} from '../../service';

export default ({
  onCreate,
  onDelete,
  onCopy,
  params: defaultParams = {
    sort: '-state,-created_at',
  },
}: any) => {
  const actionRef = useRef<any>();
  const [modal, contextHolder] = Modal.useModal();
  const [tabsList, setTabsList] = useState([]);
  const [params, setParams] = useState<any>(defaultParams);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeKey, setActiveKey] = useState('all');

  const customRequest = async (currentParams: any) => {
    setLoading(true);
    let res = {};
    try {
      res = await queryRule({
        'filter[type]': 'project',
        ...currentParams,
      });
    } catch (error) {}
    setLoading(false);
    return res;
  };

  const remove = (targetKey: any) => {
    const targetIndex = tabsList.findIndex((pane: any) => pane.key === targetKey);
    const newPanes = tabsList.filter((pane: any) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    } else {
      if (!newPanes?.length) {
        setActiveKey('all');
        setParams((par: any) => {
          const currentParams = JSON.parse(JSON.stringify(par));
          delete currentParams['filter[folder_id]'];
          return currentParams;
        });
      } else {
        // 如果不是当前文件夹需要重新 reload
        actionRef?.current?.reload();
      }
    }
    setTabsList(newPanes);
  };

  const onEdit = async (targetKey: any, action: 'add' | 'remove') => {
    if (action !== 'add') {
      const currentData: any = tabsList.filter((item: any) => item.key == targetKey)[0];
      const confirmed = await modal.confirm({
        // width: 438,
        title: (
          <>
            删除 <span style={{ color: 'red' }}>{currentData.label}</span>
          </>
        ),
        content: <p>文件夹内的所有内容将同步删除！</p>,
      });
      if (confirmed) {
        await removeFolderRule(targetKey);
        remove(targetKey);
      }
    }
  };

  const onDragEnd = ({ active, over }: any) => {
    if (active.id !== over?.id) {
      setTabsList((prev) => {
        const activeIndex = prev.findIndex((i: any) => i.key === active.id);
        const overIndex = prev.findIndex((i: any) => i.key === over?.id);
        const newTabsList = arrayMove(prev, activeIndex, overIndex);
        sortFolderRule({
          ids: newTabsList.map((item: any) => item.key),
        });
        return newTabsList;
      });
    }
  };

  const resetFolder = async () => {
    const res = await queryFolderAllRule();
    setTabsList(
      res.map((item: any) => ({
        key: `${item.id}`, // key不能是数字类型，否则拖拽会失效
        label: item.title,
      })),
    );
  };

  useEffect(() => {
    resetFolder();
  }, []);

  return (
    <Space direction="vertical" size={[24, 24]} style={{ width: '100%' }}>
      {contextHolder}
      <Search
        loading={loading}
        setParams={setParams}
        onFinish={async (formValue: any) => {
          const formValueKeys = Object.keys(formValue);
          const currentParams: any = JSON.parse(JSON.stringify(params));
          // currentParams.current = 1;// 页码重置为第一页
          formValueKeys.map((item) => {
            if (`${formValue[item]}`) {
              currentParams[`filter[${item}]`] = formValue[item];
            } else {
              delete currentParams[`filter[${item}]`];
            }
          });
          setParams(currentParams);
          return true;
        }}
      />
      <ProCard
        className="reset-pro-card"
        tabs={{
          activeKey,
          hideAdd: true,
          type: 'editable-card',
          destroyInactiveTabPane: true,
          tabBarExtraContent: {
            right: (
              <CreateFolder
                key="create-folder"
                title="创建文件夹"
                trigger={
                  <div style={{ paddingRight: 24 }}>
                    <Button type="primary">新建文件夹</Button>
                  </div>
                }
                onFinish={async (formValue) => {
                  await addFolderRule(formValue);
                  await resetFolder();
                  message.success('创建成功');
                  return true;
                }}
              />
            ),
          },
          renderTabBar: (tabBarProps, DefaultTabBar) => (
            <ProTabsRenderTabBar
              tabBarProps={tabBarProps}
              DefaultTabBar={DefaultTabBar}
              onDragEnd={onDragEnd}
              items={tabsList}
            />
          ),
          onEdit,
          onChange: (event) => {
            const currentParams = JSON.parse(JSON.stringify(params));
            // currentParams.current = 1;// 页码重置为第一页
            if (event == 'all') {
              delete currentParams['filter[folder_id]'];
            } else {
              currentParams['filter[folder_id]'] = event;
            }
            setParams(currentParams);
            setActiveKey(event);
          },
          items: [
            {
              label: `全部`,
              key: 'all',
              closeIcon: null,
              children: (
                <ProList
                  actionRef={actionRef}
                  ghost
                  loading={{
                    wrapperClassName: 'spin507',
                  }}
                  params={params}
                  request={customRequest}
                  search={false}
                  onCreate={onCreate}
                  onDelete={onDelete}
                  onCopy={onCopy}
                  pagination={{ defaultPageSize: 12, showSizeChanger: false }}
                />
              ),
            },
            ...tabsList?.map((item: any) => {
              return {
                ...item,
                children: (
                  <ProList
                    actionRef={actionRef}
                    ghost
                    loading={{
                      wrapperClassName: 'spin507',
                    }}
                    params={params}
                    request={customRequest}
                    search={false}
                    onCreate={onCreate}
                    onDelete={onDelete}
                    onCopy={onCopy}
                    pagination={{ defaultPageSize: 12, showSizeChanger: false }}
                  />
                ),
              };
            }),
          ],
        }}
      />
    </Space>
  );
};
