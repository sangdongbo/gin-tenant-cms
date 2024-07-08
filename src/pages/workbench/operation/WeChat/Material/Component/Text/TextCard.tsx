import React from 'react';
// import moment from 'moment';
import dayjs from 'dayjs';
import { Popconfirm, Tooltip, Col } from 'antd';
// import { ProCard } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';
import { EditOutlined, FieldTimeOutlined, DeleteOutlined } from '@ant-design/icons';
import Content from './Content';

const TextCard: React.FC<any> = ({ footer, data, handleEdit, handleDelete, handleClickCard }) => {
  let actions = footer
    ? footer
    : [
      <EditOutlined
        key="edit"
        onClick={(e) => {
          handleEdit(data);
          e.stopPropagation();
        }}
      />,
      <Tooltip
        placement="top"
        title={
          <>
            <div>创建时间：{dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div>更新时间：{dayjs(data.updated_at).format('YYYY-MM-DD HH:mm:ss')}</div>
          </>
        }
      >
        <FieldTimeOutlined />
      </Tooltip>,

      <Popconfirm
        title="确定要删除吗?"
        onCancel={(e: any) => {
          e.stopPropagation();
        }}
        onConfirm={async (e) => {
          e?.stopPropagation();
          await handleDelete(data.id);
        }}
      >
        <DeleteOutlined
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </Popconfirm>,
    ];
  if (footer === null) {
    actions = footer;
  }

  return (
    <Col style={{ margin: '8px 0', padding: '0 8px', width: 300 }}>
      <ProCard
        title={data.name}
        headStyle={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
        style={{ background: 'rgb(240, 242, 245)', overflow: 'hidden' }}
        actions={actions}
        hoverable
        bordered
        onClick={() => handleClickCard(data)}
      >
        <Content data={data.data} />
      </ProCard>
    </Col>
  );
};

TextCard.defaultProps = {
  handleClickCard: () => { },
};
export default TextCard;
