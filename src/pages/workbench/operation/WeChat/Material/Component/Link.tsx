import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import ProList from '@/components/BaseComponents/ProList';
import { ProGetGrid, ProList } from '@/components/BaseComponents';
import { ModalForm } from '@ant-design/pro-components';
import { queryRule, addRule, removeRule, updateRule } from '../service';

import Form from './Link/Form';
import LinkCard from './Link/LinkCard';

const Link: React.FC<any> = ({ handleClickCard, listProps, linkCardProps, ...props }: any) => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [row, handleRow] = useState<any>();

  const actionRef = useRef<any>();

  return (
    <>
      <ProGetGrid>
        {({ adaptation }: any) => {
          const grid = {
            gutter: 8,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 5,
          };

          return (
            <ProList
              actionRef={actionRef}
              toolBarRender={() => {
                return [
                  <Button
                    key="add"
                    type="primary"
                    icon={< PlusOutlined />}
                    onClick={() => {
                      handleModalVisible(true);
                    }}
                  >
                    新建
                  </Button>,
                ];
              }}
              pagination={{
                defaultPageSize: grid[adaptation] * 2,
                showSizeChanger: false,
              }}
              grid={grid}
              params={{ 'filter[type]': 2 }}
              request={async (params) => queryRule(params)}
              renderItem={(item) => (
                <LinkCard
                  data={item}
                  handleEdit={(data: any) => {
                    handleRow(data);
                    handleUpdateModalVisible(true);
                  }}
                  handleDelete={(id: number) =>
                    removeRule(id).then(() => actionRef.current?.reset())
                  }
                  handleClickCard={handleClickCard}
                  {...linkCardProps}
                />
              )}
              itemCardProps={{
                style: { padding: '0' },
              }}
              {...listProps}
              {...props}
            />
          );
        }}
      </ProGetGrid>
      <ModalForm
        title="新建外链素材"
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={async (value) => {
          value.type = 2;
          try {
            await addRule(value);
            handleModalVisible(false);
            actionRef.current?.reload();
            return true;
          } catch (error) { }
          return false;
        }}
        open={modalVisible}
        onOpenChange={handleModalVisible}
        width={500}
      >
        <Form />
      </ModalForm>

      {row && updateModalVisible ? (
        <ModalForm
          title="修改外链素材"
          onFinish={async (value) => {
            value.id = row.id;
            try {
              await updateRule(value);
              handleUpdateModalVisible(false);
              handleRow(undefined);
              actionRef.current?.reload();
            } catch (error) { }
          }}
          initialValues={row}
          open={updateModalVisible}
          onOpenChange={(state) => {
            if (!state) {
              handleRow(undefined);
            }
            handleUpdateModalVisible(state);
          }}
          width={500}
        >
          <Form />
        </ModalForm>
      ) : null}
    </>
  );
};

Link.defaultProps = {
  handleClickCard: () => { },
};

export default Link;
