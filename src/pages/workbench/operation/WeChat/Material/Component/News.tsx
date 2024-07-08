import React, { useEffect, useState, useRef } from 'react';
import { useModel } from '@umijs/max';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import type { ActionType } from '@ant-design/pro-components';

import { addMeta, deleteMeta } from '@/utils/meta';

import NewsCard from './News/NewsCard';
import { queryMaterialRule } from '../service';
import { asyncRule } from '@/pages/workbench/operation/WeChat/Freepublish/service';
import { querySelectRule } from '@/pages/workbench/operation/WeChat/Authorizer/service';

const News: React.FC<any> = ({ appid, optionRender, handleClickCard, ...props }) => {
  const { initialState } = useModel('@@initialState');
  const { authorizer }: any = initialState;
  const [loading, handleLoading] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const params: any = {
    type: 'article',
  };
  if (appid) params.appid = appid;

  useEffect(() => {
    addMeta('referrer', 'referrer', 'no-referrer');
    return () => {
      deleteMeta('referrer');
    };
  }, []);

  return (
    <ProList<any>
      actionRef={actionRef}
      toolBarRender={() => [
        <Button
          key="async"
          type="primary"
          onClick={async () => {
            handleLoading(true);
            try {
              await asyncRule();
            } catch (error) { }
            handleLoading(false);
            actionRef.current?.reload();
          }}
          loading={loading}
          icon={<ReloadOutlined />}
        >
          同步
        </Button>,
      ]}
      pagination={{
        defaultPageSize: 8,
        showSizeChanger: false,
      }}
      grid={{
        gutter: 8,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4,
        xxl: 5,
      }}
      search={{
        filterType: 'light',
      }}
      metas={{
        appid: {
          title: '公众号',
          dataIndex: 'appid',
          key: 'appid',
          valueType: 'select',
          initialValue: authorizer?.length ? authorizer[0].value : '',
          fieldProps: {
            allowClear: false,
          },
          search: !appid,
          request: querySelectRule,
        },
      }}
      params={params}
      request={queryMaterialRule}
      renderItem={(item) => (
        <NewsCard
          className="card-border-hover reset-actions-border-none"
          // style={{
          //   padding: 0,
          //   borderRadius: 12,
          //   cursor: handleClickCard ? 'pointer' : 'default',
          // }}
          data={item}
          optionRender={optionRender}
          handleClickCard={handleClickCard}
        />
      )}
      itemCardProps={{
        style: { padding: '0' },
      }}
      {...props}
    />
  );
};

// News.defaultProps = {
//   handleClickCard: () => { },
// };
export default News;
