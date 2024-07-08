import { useModel } from '@umijs/max';
import { message } from 'antd';
import { ProForm, ProFormSwitch, ProFormText } from "@ant-design/pro-components";
import { queryLiveRule, addLiveRule, updateConfigModuleRule } from '../../../service';

const LiveRoom = ({ eventId }: any) => {
  const { moduleFormRef, moduleRadio, updaterEventDetailsModule, setModuleFormLoading } = useModel('event', (model) => model);

  return (
    <ProForm
      formRef={moduleFormRef}
      submitter={false}
      request={() => queryLiveRule(eventId)}
      onFinish={async (formValue) => {
        setModuleFormLoading(true);
        try {
          await addLiveRule({
            event_id: eventId,
            state: moduleRadio,
            ...formValue,
          });

          message.success('保存成功');

          updateConfigModuleRule({
            name: "live",
            state: moduleRadio,
            id: eventId,
          });

          updaterEventDetailsModule({
            key: 'during',
            type: 'live',
            state: moduleRadio,
          });
        } catch (error) {

        }
        setModuleFormLoading(false);
        return true;
      }}
    >
      <ProFormText
        name="link"
        label="跳转链接"
        rules={[
          {
            required: true,
          }
        ]}
      />
    </ProForm>
  )
};

export default LiveRoom;
