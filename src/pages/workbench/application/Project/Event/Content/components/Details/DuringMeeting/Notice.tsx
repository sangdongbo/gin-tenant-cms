import { useEffect } from 'react';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { ProForm, ProFormText, ProFormDigit, ProFormList, ProCard } from "@ant-design/pro-components";
import ProFormTemplate, { handelFormValues, handelInitValues } from '@/pages/workbench/operation/WeChat/Template/components/ProFormTemplate';
import { addWechatTemplateRule, queryWechatTemplateRule, updateConfigModuleRule } from '../../../service';

const Notice = ({ eventId, projectId }: any) => {
  const { moduleRadio, moduleFormRef, setModuleFormLoading, updaterEventDetailsModule } = useModel('event', (model) => model);

  useEffect(() => {
    return () => {
      // 组件卸载，ref也需要销毁
      moduleFormRef.current = undefined;
    };
  }, []);

  return (
    <ProForm
      formRef={moduleFormRef}
      submitter={false}
      request={async () => {
        const res = await queryWechatTemplateRule({
          'filter[type]': 'event',
          'filter[type_data.event_id]': eventId,
          pageSize: 100,
        });

        const data = res.data.map((item: any) => {
          return {
            title: item.title,
            type_data: {
              before_minute: item?.type_data?.before_minute,
            },
            data: handelInitValues(item),
          };
        });
        return {
          data: data || [],
        };
      }}
      onFinish={async (baseFormValues: any) => {
        const formValues = JSON.parse(JSON.stringify(baseFormValues));
        const type_data = {
          event_id: eventId,
          project_id: projectId,
          type: 2, // 发送模板消息的类型 1=》审核通过的消息 2=》会前模板消息
        };

        const values = {
          state: moduleRadio,
          data: formValues.data.map((item: any) => {
            const newItem: any = handelFormValues(item);
            newItem.type = 'event';
            newItem.type_data = {
              ...item.type_data,
              ...type_data,
            };
            return newItem;
          }),
        };

        setModuleFormLoading(true);
        try {
          await addWechatTemplateRule(values);
          message.success('保存成功');
        } catch (error) { };
        setModuleFormLoading(false);

        updateConfigModuleRule({
          name: "notice",
          state: moduleRadio,
          id: eventId,
        });
        updaterEventDetailsModule({
          key: 'during',
          type: 'notice',
          state: moduleRadio,
        });
        return true;
      }}
    >
      <ProFormList
        name="data"
        initialValue={[
          {}
        ]}
        creatorButtonProps={{
          creatorButtonText: '新建',
        }}
        itemRender={({ listDom, action }) => {
          return (
            <ProCard
              bordered
              extra={action}
              style={{
                marginBlockEnd: 8,
              }}
            >
              {listDom}
            </ProCard>
          );
        }}
      >
        <ProFormText
          width="md"
          fieldProps={{
            maxLength: 64,
          }}
          label="消息名称"
          name="title"
          rules={[
            {
              required: true,
              message: '请输入消息名称'
            }
          ]}
        />
        <ProFormDigit
          width={86}
          addonBefore="会前"
          addonAfter="分钟"
          label="发送时间"
          name={['type_data', 'before_minute']}
          min={1}
          fieldProps={{ precision: 0 }}
          rules={[
            {
              required: true,
              message: '请输入发送时间'
            }
          ]}
        />
        <ProFormTemplate
          label="模板消息"
          name="data"
          rules={[
            {
              required: true,
              message: '请选择模版后填写'
            }
          ]}
        />
      </ProFormList>
    </ProForm >
  );
};

export default Notice;
