import { useEffect } from 'react';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { ProForm } from "@ant-design/pro-components";
import { ProFormRichText } from '@/components/BaseComponents';

import { getInfoRule, addInfoRule, updateConfigModuleRule } from '../../../service';

// 保存一版默认值
let defaultData = {};

const Introduction = ({ eventId }: any) => {
  const { moduleFormRef, moduleRadio, updaterPreviewData, updaterEventDetailsModule, setModuleFormLoading } = useModel('event', (model) => model);

  useEffect(() => {
    updaterPreviewData({
      menuId: 'info'
    });
    return () => {
      updaterPreviewData({
        info: defaultData,
        menuId: '',
      })
      // 组件卸载，ref也需要销毁
      moduleFormRef.current = undefined;
    };
  }, []);

  return (
    <ProForm
      request={() => {
        const res = getInfoRule(eventId);
        defaultData = {
          state: moduleRadio,
          ...res,
        };
        return res;
      }}
      formRef={moduleFormRef}
      submitter={false}
      onValuesChange={(_, formValue) => {
        updaterPreviewData({
          info: {
            state: moduleRadio,
            ...formValue,
          },
        });
      }}
      onFinish={async (formValue) => {
        setModuleFormLoading(true);
        await addInfoRule({
          event_id: eventId,
          state: moduleRadio,
          ...formValue,
        });
        setModuleFormLoading(false);
        defaultData = {
          state: moduleRadio,
          ...formValue,
        }

        message.success('保存成功');
        updateConfigModuleRule({
          name: "info",
          state: moduleRadio,
          id: eventId,
        });
        updaterEventDetailsModule({
          key: 'before',
          type: 'info',
          state: moduleRadio,
        });
        return true;
      }}
    >
      <ProFormRichText
        name="content"
        style={{
          width: 420,
        }}
      />
    </ProForm>
  )
};

export default Introduction;
