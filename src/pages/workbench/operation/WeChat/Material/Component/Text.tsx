import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import { ProGetGrid, ProList } from '@/components/BaseComponents';
import { queryRule, addRule, removeRule, updateRule } from '../service';

import Form from './Text/Form';
import TextCard from './Text/TextCard';

const Text: React.FC<any> = ({ handleClickCard, listProps, linkCardProps, ...props }) => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [row, handleRow] = useState<any>();

  const actionRef = useRef<any>();
  const listref = useRef();

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
              ref={listref}
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
              params={{ 'filter[type]': 3 }}
              request={async (params) => queryRule(params)}
              renderItem={(item) => (
                <TextCard
                  data={item}
                  handleEdit={(data: any) => {
                    handleRow(data);
                    handleUpdateModalVisible(true);
                  }}
                  handleDelete={async (id: number) => {
                    await removeRule(id);
                    // actionRef.current?.reload();
                    actionRef?.current?.reset();
                  }}
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
        title="新增文本素材"
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={async (value) => {
          value.type = 3;
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
          title="修改文本素材"
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

// Text.defaultProps = {
//   handleClickCard: () => { },
// };
export default Text;
