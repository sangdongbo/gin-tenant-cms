import { useRef } from 'react';
import { ProForm, ProFormSwitch, ProFormDateTimePicker, ProFormList, ProCard } from "@ant-design/pro-components";
import ProFormTemplate from '@/pages/workbench/operation/WeChat/Template/components/ProFormTemplate'

const Remind = ({ eventId }: any) => {
  const formRef = useRef();

  return (
    <ProForm
      formRef={formRef}
      submitter={false}
    >
      <ProFormList
        name="users"
        initialValue={[
          {}
        ]}
        creatorButtonProps={{
          creatorButtonText: '新建',
        }}
        itemRender={({ listDom, action }, { record }) => {
          return (
            <ProCard
              bordered
              extra={action}
              // title={record?.name}
              style={{
                marginBlockEnd: 8,
              }}
            >
              {listDom}
            </ProCard>
          );
        }}
      >
        {/* <ProFormDateTimePicker
          name="send-time"
          label="发送时间"
          fieldProps={{
            format: 'YYYY-MM-DD HH:mm'
          }}
        /> */}

        暂未开放
        {/* <ProFormTemplate
          required
          label="模板消息"
          name="data"
          rules={[{
            required: true,
            message: '请选择模版'
          }]}
        /> */}
      </ProFormList>

    </ProForm>
  )
};

export default Remind;
