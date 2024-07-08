import { useEffect } from 'react';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import {
  ProForm,
  ProFormList,
  ProCard,
  ProFormTextArea,
  ProFormTimePicker,
} from '@ant-design/pro-components';

import {
  queryScheduleAllRule,
  addScheduleSaveListRule,
  updateConfigModuleRule,
} from '../../../service';
import dayjs from 'dayjs';

// 保存一版默认值
let defaultData = {};

const Schedule = ({ eventId }: any) => {
  const {
    moduleFormRef,
    moduleRadio,
    updaterPreviewData,
    updaterEventDetailsModule,
    setModuleFormLoading,
  } = useModel('event', (model) => model);

  useEffect(() => {
    updaterPreviewData({
      menuId: 'schedule',
    });
    return () => {
      updaterPreviewData({
        schedule: defaultData,
        menuId: '',
      });
      // 组件卸载，ref也需要销毁
      moduleFormRef.current = undefined;
    };
  }, []);

  return (
    <ProForm
      formRef={moduleFormRef}
      submitter={false}
      request={async () => {
        const res = await queryScheduleAllRule({
          'filter[event_id]': eventId,
          include: 'speaker',
        });

        if (!res?.length) {
          res.push({
            start_time: '08:10',
            end_time: '10:00',
          });
        }

        defaultData = {
          state: moduleRadio,
          lists: res.map((item: any) => {
            return {
              ...item,
              _time: item.start_time || item.end_time ? [item.start_time, item.end_time] : null,
            };
          }),
        };
        return {
          lists: res.map((item: any) => {
            return {
              ...item,
              _time: item.start_time || item.end_time ? [item.start_time, item.end_time] : null,
            };
          }),
        };
      }}
      onValuesChange={(_, formValue) => {
        updaterPreviewData({
          schedule: {
            state: moduleRadio,
            lists: formValue.lists.map(({ _time, ...item }: any) => {
              return {
                ...item,
                start_time: _time ? _time[0] : undefined,
                end_time: _time ? _time[1] : undefined,
              };
            }),
          },
        });
      }}
      onFinish={async (formValue) => {
        setModuleFormLoading(true);
        try {
          await addScheduleSaveListRule({
            event_id: eventId,
            state: moduleRadio,
            lists: formValue.lists.map(({ _time, ...item }: any) => {
              return {
                ...item,
                start_time: _time ? _time[0] : undefined,
                end_time: _time ? _time[1] : undefined,
              };
            }),
          });
          message.success('保存成功');
          defaultData = {
            state: moduleRadio,
            lists: formValue.lists.map(({ _time, ...item }: any) => {
              return {
                ...item,
                start_time: _time ? _time[0] : undefined,
                end_time: _time ? _time[1] : undefined,
              };
            }),
          };

          updateConfigModuleRule({
            name: 'schedule',
            state: moduleRadio,
            id: eventId,
          });

          updaterEventDetailsModule({
            key: 'before',
            type: 'schedule',
            state: moduleRadio,
          });
        } catch (error) {}
        setModuleFormLoading(false);
        return true;
      }}
    >
      <ProFormList
        name="lists"
        style={{
          width: 448,
        }}
        copyIconProps={false}
        itemRender={({ listDom, action }, { record }) => {
          return (
            <ProCard
              bordered
              extra={action}
              title={record?.name}
              style={{
                marginBottom: 8,
              }}
            >
              {listDom}
            </ProCard>
          );
        }}
      >
        <ProFormTextArea
          name="content"
          label="会议日程"
          width="lg"
          fieldProps={{
            maxLength: 255,
          }}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
            },
          ]}
        />
        <ProFormTimePicker.RangePicker
          name="_time"
          label="开始时间"
          width="lg"
          fieldProps={{
            format: 'HH:mm',
          }}
          rules={[
            {
              required: true,
              message: '请选择开始时间',
            },
          ]}
        />
      </ProFormList>
    </ProForm>
  );
};

export default Schedule;
