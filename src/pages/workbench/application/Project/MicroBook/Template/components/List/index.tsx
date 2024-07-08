import { useState } from 'react';
import { ModalForm } from '@ant-design/pro-components';
import { Modal, Input, Tabs, Button, message, Typography } from 'antd';
import { useModel } from '@umijs/max';
import { addRule } from '../../service';
import { getUid } from '@/utils/uuid';

import DraggableTabs from '@/components/DraggableTabs';
import Table from './Table';
import TabsForm from './TabsForm';
import { useRef } from 'react';

export default ({ id }: any) => {
  const [modal, contextHolder] = Modal.useModal();
  const { article, tabsKey, updaterArticle, updaterPublishTime, updaterTabsKey } = useModel('microbook', (model) => model);
  const { tabs } = article;
  const [visible, setVisible] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const inputRef = useRef<any>();

  const addTabs = () => {
    setVisible(true);
  };

  const deleteTabs = async (targetKey: any) => {
    modal.confirm({
      content: '分类内容将同步删除！',
      onOk() {
        const newTabs = tabs.filter((item: any) => item.customId !== targetKey);
        if (targetKey === tabsKey) {
          if (newTabs.length) {
            updaterTabsKey(newTabs[0].customId);
          } else {
            updaterTabsKey('');
          };
        };
        updaterArticle({
          tabs: newTabs,
        });
      }
    });
  };

  return (
    <>
      {contextHolder}
      <DraggableTabs
        type="editable-card"
        onEdit={(targetKey: any, action: string) =>
          action === 'add' ? addTabs() : deleteTabs(targetKey)
        }
        destroyInactiveTabPane={true}
        onEnd={async (newTabKeys: any[]) => {
          let currentTabs: any[] = [];
          newTabKeys.forEach(item => {
            tabs.forEach((it: any) => {
              if (item == it.customId) {
                currentTabs = [
                  ...currentTabs,
                  it,
                ];
              }
            });
          });

          updaterArticle({
            tabs: currentTabs,
          });
        }}
        activeKey={tabsKey}
        onChange={(activeKey: any) => {
          updaterTabsKey(activeKey);
        }}
      >
        {tabs.map((item: any, index: number) => {
          return (
            <Tabs.TabPane
              key={item.customId}
              tab={item.name}
            >
              <Table
                index={index}
                categoryId={item.id}
                customId={item.customId}
                freepublishIds={item.freepublish_ids || null}
                cardProps={{
                  bodyStyle: { padding: 0 },
                }}
                scroll={{ y: 352 }}
                search={false}
                options={false}
                headerTitle={
                  <Input.Group compact>
                    <Input style={{ width: 150 }} defaultValue={item.name} ref={inputRef} maxLength={6} showCount />
                    <Button
                      onClick={async () => {
                        const value = inputRef?.current?.input?.value;
                        const currentTabs = JSON.parse(JSON.stringify(tabs));

                        if (!value) {
                          message.error('请输入分类名称');
                          return;
                        }
                        if (value == item.name) {
                          message.error('请更改后保存');
                          return;
                        };

                        currentTabs[index].name = value;
                        updaterArticle({
                          tabs: currentTabs,
                        });
                      }}
                    >
                      保存
                    </Button>
                  </Input.Group>
                }
                toolBarRender={() => [
                  <Button
                    key="publish"
                    type="primary"
                    loading={publishLoading}
                    onClick={async () => {
                      setPublishLoading(true);
                      try {
                        await addRule({
                          project_id: id, category: tabs.map((it: any) => {
                            const { customId, ...currentItem } = it;

                            return {
                              freepublish_ids: [],
                              ...currentItem,
                            };
                          })
                        });
                        updaterPublishTime(new Date());
                        message.success('发布成功');
                      } catch (error) { }

                      setPublishLoading(false);
                    }}
                  >
                    发布
                  </Button>
                ]}
              />
            </Tabs.TabPane>
          );
        })}
      </DraggableTabs>
      <div style={{ padding: '24px 0 0' }}>
        <Typography.Text type="secondary">内容设置建议不超过30个</Typography.Text>
      </div>

      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        title="新建分类"
        width={400}
        open={visible}
        onOpenChange={setVisible}
        onFinish={async (value) => {
          const currentTabs = JSON.parse(JSON.stringify(tabs));
          const currentCustomId = getUid();
          updaterArticle({
            tabs: [
              ...currentTabs,
              {
                project_id: id,
                customId: currentCustomId,
                ...value
              }
            ]
          });
          updaterTabsKey(currentCustomId);
          return true;
        }}
      >
        <TabsForm />
      </ModalForm>
    </>
  );
};
