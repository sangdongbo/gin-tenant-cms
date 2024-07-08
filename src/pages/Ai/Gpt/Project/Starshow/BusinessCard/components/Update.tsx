import { useState } from 'react';
import { Image } from 'antd';
import { ProCard } from '@/components/BaseComponents';
import { ModalForm, ProFormText, ProForm, ProFormDependency } from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';

interface PropsType extends ModalFormProps {
  formList: any[]
}



const Form = ({ formList }: any) => {
  return (
    <ProCard
      split="vertical"
      bordered
      bodyStyle={{ padding: 0 }}
    >
      <ProCard title="名片" colSpan="40%">
        <ProFormDependency name={[['data', 'img']]}>
          {({ data }) => {
            return <Image
              width={342}
              src={data?.img}
            />
          }}
        </ProFormDependency>
      </ProCard>
      <ProCard title="内容">
        <ProForm.Group>
          {formList.map((item: any) => {
            return <ProFormText key={item.dataIndex} colProps={{ span: 12 }} label={item.title} name={item.dataIndex} />
          })}
        </ProForm.Group>
      </ProCard>
    </ProCard>
  )
}

export default ({ formList, ...props }: PropsType) => {
  return (
    <ModalForm
      modalProps={{
        destroyOnClose: true,
      }}
      title="修改名片信息"
      width={1000}
      trigger={<a>编辑</a>}
      layout="horizontal"
      grid={true}
      {...props}
    >
      <Form formList={formList} />
    </ModalForm>
  )
};
