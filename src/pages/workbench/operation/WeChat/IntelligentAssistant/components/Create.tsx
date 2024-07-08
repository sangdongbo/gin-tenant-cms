import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components'
import { Typography } from 'antd';

import { querySelectRule } from '@/pages/Ai/Gpt/Project/service';

const { Text } = Typography;

interface PropsType extends ModalFormProps {

}

export default (props: PropsType) => {
  return (
    <ModalForm
      modalProps={{
        destroyOnClose: true,
      }}
      layout="horizontal"
      width={500}
      {...props}
    >
      <Text type="secondary">
        声明：授权智能助手后，可能对已有配置造成以下影响，请谨慎授权<br />
        1.现有的关键词回复，会经过AI进行处理，回复内容与原有设置不同<br />
        2.因微信规则限制，仅在用户发送消息后可回复3条信息，因此当用户连续发送抄三段回复时，AI助手无法全部回复
      </Text>
      <div style={{ width: '100%', height: 16 }} />
      <ProFormSelect
        label="智能助手"
        name="project_id"
        params={{
          'filter[type]': 'sales_gpt',
        }}
        request={querySelectRule}
      />
    </ModalForm>
  )
}
