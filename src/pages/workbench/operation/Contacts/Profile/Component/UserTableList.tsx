import React, { useState, useRef, useEffect } from 'react';
import type { FormInstance } from 'antd';
import { WomanOutlined, ManOutlined, SearchOutlined } from '@ant-design/icons';

import { Popover, Row, Col, List, Avatar, Tag as AntdTag, Space, Button, Form } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

// import { ProDescriptions } from '@ant-design/pro-components';
import { history } from '@umijs/max';

import { queryRule, updateRule, updateGroupRelationRule, updateTagRelationRule } from '../service';

const UserTableList: React.FC<any> = ({
  columnsOption,
  columnsSearch,
  children,
  params,
  ...props
}) => {
  const [currentParams, handleurrentParams] = useState<any>();
  useEffect(() => {
    if (params) {
      handleurrentParams(params);
    }
  }, [params]);

  const columns: ProColumns[] = [
    // {
    //   title: '基本资料',
    //   width: 200,
    //   render: (_, record) => {
    //     const data = [record.wechat];
    //     return (
    //       <List
    //         dataSource={data}
    //         itemLayout="horizontal"
    //         renderItem={(item) => (
    //           <List.Item>
    //             <List.Item.Meta
    //               avatar={
    //                 <Popover
    //                   content={
    //                     <div style={{ width: 400 }}>
    //                       <Row>
    //                         <Col span={8}>
    //                           <Avatar shape="square" size={120} src={record.avatar} />
    //                         </Col>
    //                         <Col span={16}>
    //                           <div style={{ paddingBottom: 10 }}>
    //                             <Space>
    //                               <a onClick={() => history.push(`user/profile/${record.id}`)}>
    //                                 {record.nickname}
    //                               </a>
    //                               {item.sex == 1 ? (
    //                                 <WomanOutlined style={{ color: '#1890ff' }} />
    //                               ) : item.sex == 2 ? (
    //                                 <ManOutlined style={{ color: '#c41d7f' }} />
    //                               ) : null}
    //                             </Space>
    //                           </div>
    //                           <ProDescriptions
    //                             column={1}
    //                             size="small"
    //                             labelStyle={{ color: '#6b6b6b' }}
    //                           >
    //                             <ProDescriptions.Item label="备注">
    //                               {record.remark}
    //                             </ProDescriptions.Item>
    //                             <ProDescriptions.Item label="地区">{`${record.country} ${record.province} ${record.city}`}</ProDescriptions.Item>
    //                             <ProDescriptions.Item label="分组">
    //                               <div>
    //                                 {record.group.map((group) => (
    //                                   <AntdTag visible>{group.name}</AntdTag>
    //                                 ))}
    //                               </div>
    //                             </ProDescriptions.Item>
    //                           </ProDescriptions>
    //                         </Col>
    //                       </Row>
    //                     </div>
    //                   }
    //                   trigger="hover"
    //                   placement="right"
    //                 >
    //                   <Avatar src={item.avatar} />
    //                 </Popover>
    //               }
    //               title={
    //                 <a onClick={() => history.push(`user/profile/${record.id}`)}>{item.nickname}</a>
    //               }
    //               description={item.sex == 1 ? '男' : item.sex == 2 ? '女' : '未知'}
    //             />
    //           </List.Item>
    //         )}
    //       />
    //     );
    //   },
    // },
    // {
    //   title: '公众号',
    //   dataIndex: 'subscribe',
    //   hideInSearch: true,
    //   valueEnum: {
    //     1: { text: '已关注', status: 'Success' },
    //     0: { text: '未关注', status: 'Error' },
    //   },
    // },
    // {
    //   title: '关注来源',
    //   dataIndex: 'subscribe_scene_text',
    //   hideInSearch: true,
    //   tooltip: '用户最后一次关注来源',
    // },
    // {
    //   title: '注册用户',
    //   dataIndex: 'register',
    //   hideInSearch: true,
    //   render: (_, record) => (record.register ? '是 / 查看' : '否 / —-'),
    // },
    {
      title: '粉丝信息',
      children: [
        {
          title: '头像',
          dataIndex: ['wechat', 'avatar'],
          valueType: 'avatar',
        },
        {
          title: '昵称',
          dataIndex: ['wechat', 'nickname'],
        },
        {
          title: '性别',
          dataIndex: ['wechat', 'sex'],
          valueEnum: {
            0: '未知',
            1: '男',
            2: '女',
          },
        },
      ],
    },
    {
      title: '联系人信息',
      children: [
        {
          title: '姓名',
          dataIndex: 'ful_name',
        },
        {
          title: '手机',
          dataIndex: 'phone',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
        },
        {
          title: '公司',
          dataIndex: 'company',
        },
      ],
    },
    {
      title: '标签数量',
      dataIndex: 'tag_count_count',
      width: 100,
    },
    {
      title: '生命周期',
      dataIndex: 'life_cycle',
      valueEnum: {
        1: '访客',
        2: '粉丝',
        3: '标注',
        4: '注册',
        5: '现客',
      },
    },
    // {
    //   title: '最近互动时间',
    //   dataIndex: 'updated_at',
    //   valueType: 'dateTime',
    //   width: 180,
    // },
    columnsOption,
  ];

  return (
    <>
      <ProTable
        headerTitle="用户管理"
        rowKey="id"
        params={currentParams}
        request={(params) => queryRule(params)}
        columns={columns}
        pagination={{ pageSize: 10 }}
        {...props}
        scroll={{ x: 1500 }}
      />
      {children}
    </>
  );
};

UserTableList.defaultProps = {
  columnsOption: {},
  columnsSearch: [],
  params: {},
};

export default UserTableList;
