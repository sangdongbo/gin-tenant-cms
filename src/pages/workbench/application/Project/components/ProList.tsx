import { useRef, useState, useImperativeHandle } from 'react';
import { FormOutlined, EyeOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Button, Tag, Typography, Dropdown, Menu } from 'antd';
import { useUpdateEffect } from 'ahooks';
import { history } from '@umijs/max';
import { stringify } from 'qs';
import ProList from '@/components/BaseComponents/ProList';
import styles from './index.less';
import ModalDelete from './ModalDelete';
import ModalCopy from './ModalCopy';
import { projectType } from './ModalForm';
import QuicklyCreateModalForm from './QuicklyCreateModalForm';

import { addRule, updateBasicRule, deleteRule, copyRule } from '../service';

const { Paragraph } = Typography;

interface PropsType {
  hideListType?: boolean;
  onCreate?: (res: any) => void;
  onDelete?: (entity: any) => void;
  onCopy?: (entity: any) => void;
  [key: string]: any;
}

const transformProjectType = () => {
  const valueEnum: any = {};
  projectType.forEach((item) => {
    valueEnum[item.value] = {
      text: item.label,
    };
  });
  return valueEnum;
};

const statusMap: any = {
  0: {
    color: '',
    text: '未开始',
  },
  1: {
    color: 'cyan',
    text: '进行中',
  },
};

export const descriptionValueEnum = {
  '': { text: '全部' },
  ...transformProjectType(),
};

export const stateValueEnum = {
  '': { text: '全部' },
  1: { text: '进行中' },
  0: { text: '未开始' },
};

export default ({
  actionRef: baseActionRef,
  hideListType,
  handleTypeEnum,
  onCreate,
  onDelete,
  onCopy,
  params,
  ...props
}: PropsType) => {
  const toolBarRender = props.toolBarRender || [];
  const actionRef = useRef<any>();

  const [deleteItem, setDeleteItem] = useState<any>({});

  const menu = (entity: any) => {
    return (
      <Menu>
        {entity?.type != 'event' ? (
          <Menu.Item key="copy">
            <ModalCopy
              width={300}
              trigger={<a>复制</a>}
              onOk={async () => {
                const res = await copyRule(entity?.id);
                onCopy?.({
                  ...entity,
                  id: res.id,
                });
                return true;
              }}
            />
          </Menu.Item>
        ) : null}
        <Menu.Item key="delete">
          <a
            type="text"
            onClick={() => {
              setDeleteItem(entity);
            }}
          >
            删除
          </a>
        </Menu.Item>
      </Menu>
    );
  };

  const actionsRender = (dom: any, entity: any, index: number) => {
    let FirstDom = (
      <Button
        className="reset-text-hover"
        size="small"
        type="text"
        icon={<EyeOutlined style={{ fontSize: 14, color: '#9da0aa' }} />}
        onClick={() => {
          let pageUrl: string = '';
          let pageQuery: string = stringify({
            tenant: localStorage.getItem('lookstar-tenant-X-Tenant'),
            project: entity.id,
          });
          switch (entity.type) {
            case 'landing':
              pageUrl = `https://landing-release.lookstar.com.cn/pages/${entity.uuid}`;
              break;
            case 'microbook':
              pageUrl = `${MICROBOOK_URL}/?${pageQuery}`;
              break;
            case 'data_download':
              pageUrl = `${DATA_DOWNLOAD_URL}/?${pageQuery}`;
              break;
            case 'event':
              pageUrl = `${ACTIVITY_CENTER}/list/?${pageQuery}`;
              break;
          }
          history.push(
            `/workbench/application/project/preview/?pageUrl=${encodeURIComponent(pageUrl)}`,
          );
        }}
      >
        预览
      </Button>
    );
    let EditDom = (
      <Button
        className="reset-text-hover"
        size="small"
        type="text"
        icon={<FormOutlined style={{ fontSize: 14, color: '#9da0aa' }} />}
        onClick={() => {
          switch (entity.type) {
            case 'landing':
              history.push(`/workbench/application/project/landing/basic/edit?id=${entity.id}`);
              break;
            case 'microbook':
              history.push(
                `/workbench/application/project/microbook/basic/template?id=${entity.id}`,
              );
              break;
            case 'data_download':
              history.push(
                `/workbench/application/project/data-download/basic/template?id=${entity.id}`,
              );
              break;
            case 'event':
              history.push(`/workbench/application/project/event/basic/content?id=${entity.id}`);
              break;
          }
        }}
      >
        编辑
      </Button>
    );

    if (entity.type == 'folder') {
      FirstDom = (
        <Button
          className="reset-text-hover"
          size="small"
          type="text"
          icon={<EyeOutlined style={{ fontSize: 14, color: '#9da0aa' }} />}
          onClick={() => {
            history.push(`/workbench/application/project/folder?id=${entity.id}`);
          }}
        >
          进入
        </Button>
      );
      EditDom = (
        <QuicklyCreateModalForm
          title="修改文件夹"
          modalProps={{
            destroyOnClose: true,
          }}
          initialValues={{
            title: entity.title,
          }}
          trigger={
            <Button className="reset-text-hover" size="small" type="text">
              编辑
            </Button>
          }
          onFinish={async (value: any) => {
            await updateBasicRule(entity.id, {
              ...value,
              type: entity.type,
            });
            // message.success('修改成功');
            actionRef?.current?.reload();
            // setVisible(false);
            // setRow(null);
            // onCreate?.(res);
            return true;
          }}
        />
      );
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px 6px' }}>
        {FirstDom}
        {EditDom}
        <Dropdown key={index} overlay={menu(entity)}>
          <Button
            className="reset-text-hover"
            size="small"
            type="text"
            icon={<AppstoreOutlined style={{ fontSize: 14, color: '#9da0aa' }} />}
          >
            操作
          </Button>
        </Dropdown>
      </div>
    );
  };

  const metas: any = {
    card: {
      title: {
        title: '项目名称',
        key: 'filter[title]',
        render: (dom: any) => {
          return (
            <span
              style={{
                display: 'inline-block',
                verticalAlign: 'top',
                maxWidth: 150,
                height: 22,
                overflow: 'hidden',
              }}
            >
              <Paragraph ellipsis={{ tooltip: dom }} style={{ marginBottom: 0 }}>
                {dom}
              </Paragraph>
            </span>
          );
        },
      },
      subTitle: {
        title: '项目状态',
        dataIndex: 'state',
        search: true,
        key: 'filter[state]',
        valueType: 'select',
        valueEnum: stateValueEnum,
        render: (dom: any, entity: any) => {
          if (entity.type == 'folder') return null;
          return <Tag color={statusMap[entity.state].color}>{statusMap[entity.state].text}</Tag>;
        },
      },
      content: {
        title: '项目类型',
        dataIndex: 'type',
        key: 'filter[type]',
        valueType: 'select',
        valueEnum: handleTypeEnum ? handleTypeEnum?.(descriptionValueEnum) : descriptionValueEnum,
      },
      actions: {
        dataIndex: 'actions',
        search: false,
        cardActionProps: 'actions',
        render: actionsRender,
      },
    },
  };

  const reload = () => {
    actionRef?.current?.reload();
  };

  useImperativeHandle(baseActionRef, () => ({
    reload,
  }));

  useUpdateEffect(() => {
    reload();
  }, [params]);

  return (
    <div className={styles['project-list']}>
      <ProList
        {...props}
        params={params}
        actionRef={actionRef}
        rowKey="id"
        grid={{
          gutter: 16,
          xxl: 4,
          xl: 3,
          lg: 2,
          md: 1,
          sm: 1,
          xs: 1,
        }}
        toolBarRender={() => [...toolBarRender]}
        showActions={undefined}
        split={false}
        metas={metas.card}
        itemCardProps={{
          style: {
            padding: 0,
            borderRadius: 12,
            width: '100%',
            ...props?.itemCardProps?.style,
          },
          bodyStyle: {
            color: '#666666',
            padding: '10px 24px 24px 24px',
            ...props?.itemCardProps?.bodyStyle,
          },
          ...props?.itemCardProps,
        }}
        onItem={(entity) => ({
          className: `card-border-hover reset-actions-border-none pro-card-${entity.type}`,
          onClick: () => {
            switch (entity.type) {
              case 'folder':
                history.push(`/workbench/application/project/folder?id=${entity.id}`);
                break;
              case 'landing':
                history.push(
                  `/workbench/application/project/landing/basic/settings?id=${entity.id}`,
                );
                break;
              case 'microbook':
                history.push(
                  `/workbench/application/project/microbook/basic/settings?id=${entity.id}`,
                );
                break;
              case 'data_download':
                history.push(
                  `/workbench/application/project/data-download/basic/settings?id=${entity.id}`,
                );
                break;
              case 'event':
                history.push(`/workbench/application/project/event/basic/settings?id=${entity.id}`);
                break;
            }
          },
        })}
      />
      <ModalDelete
        open={deleteItem?.id}
        width={300}
        onOk={async () => {
          await deleteRule(deleteItem.id);
          actionRef?.current?.reset();
          onDelete?.(deleteItem);
          setDeleteItem({});
        }}
        onCancel={() => {
          setDeleteItem({});
        }}
      />
    </div>
  );
};
