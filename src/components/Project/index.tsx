import { useRef, useState, useImperativeHandle } from 'react';
import { FormOutlined, EyeOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Button, message, Tag, Typography, Dropdown, Menu } from 'antd';
import { useUpdateEffect } from 'ahooks';
import { history } from '@umijs/max';
import ProList from '@/components/BaseComponents/ProList';
import type { ProListProps } from '@ant-design/pro-components';
import styles from './index.less';

const { Paragraph } = Typography;

interface PropsType extends ProListProps {
  hideListType?: boolean;
  onCreate?: (res: any) => void;
  onDelete?: (entity: any) => void;
  onCopy?: (entity: any) => void;
  [key: string]: any;
}

const transformProjectType = (projectType: any) => {
  const valueEnum: any = {};
  projectType.forEach((item: any) => {
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

export const stateValueEnum = {
  '': { text: '全部' },
  1: { text: '进行中' },
  0: { text: '未开始' },
};

export default ({
  actionRef: baseActionRef,
  actionsRender,
  hideListType,
  handleTypeEnum,
  projectType,
  onCreate,
  onDelete,
  onCopy,
  params,
  ...props
}: PropsType) => {
  const actionRef = useRef<any>();

  const descriptionValueEnum = {
    '': { text: '全部' },
    ...transformProjectType(projectType || []),
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
          if (['folder', 'wechat', 'sales_gpt', 'starshow'].includes(entity.type)) return null;
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
        toolBarRender={() => []}
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
        showActions={undefined}
        split={false}
        metas={metas.card}
        itemCardProps={{
          ...props?.itemCardProps,
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
        }}
        onItem={(entity, index) => ({
          className: `card-border-hover reset-actions-border-none pro-card-${entity.type}`,
          ...props?.onItem?.(entity, index),
        })}
      />
    </div>
  );
};
