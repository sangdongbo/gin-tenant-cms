import React from "react";
import { ProFormText } from '@ant-design/pro-components';
// import moment from 'moment';
import dayjs from 'dayjs';
import { ProCard } from '@/components/BaseComponents';

const Basics = () => {

  return (
    <ProCard>
      <ProFormText
        name="title"
        label="广告名称"
        width="xl"
        initialValue={`优量汇-${dayjs().format('YYYY-MM-DD HH:mm')}`}
        fieldProps={{ showCount: true, maxLength: 60 }}
        rules={[
          {
            required: true,
          },
          {
            whitespace: true,
          },
        ]}
      />
    </ProCard>
  )
};

export default Basics;
