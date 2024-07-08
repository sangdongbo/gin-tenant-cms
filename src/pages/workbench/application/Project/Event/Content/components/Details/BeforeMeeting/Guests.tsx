import { useEffect } from 'react';
import { useModel } from '@umijs/max';
import {
  ProForm,
  ProFormList,
  ProCard,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Upload } from '@bluedot-tech/bluedot-antd';
import {
  querySpeakerAllRule,
  addSpeakerSaveListRule,
  updateConfigModuleRule,
} from '../../../service';

// 保存一版默认值
let defaultData = {};

const Guests = ({ eventId }: any) => {
  const {
    moduleFormRef,
    moduleRadio,
    updaterPreviewData,
    updaterEventDetailsModule,
    setModuleFormLoading,
  } = useModel('event', (model) => model);

  useEffect(() => {
    updaterPreviewData({
      menuId: 'speaker',
    });
    return () => {
      updaterPreviewData({
        menuId: '',
        speaker: defaultData,
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
        const res = await querySpeakerAllRule({
          'filter[event_id]': eventId,
        });
        defaultData = {
          state: moduleRadio,
          lists: res || [],
        };
        return {
          lists: res,
        };
      }}
      onValuesChange={(_, formValue) => {
        updaterPreviewData({
          speaker: {
            state: moduleRadio,
            ...formValue,
          },
        });
      }}
      onFinish={async (formValue) => {
        setModuleFormLoading(true);
        try {
          await addSpeakerSaveListRule({
            event_id: eventId,
            state: moduleRadio,
            ...formValue,
          });
          message.success('保存成功');

          defaultData = {
            state: moduleRadio,
            ...formValue,
          };

          updateConfigModuleRule({
            name: 'speaker',
            state: moduleRadio,
            id: eventId,
          });

          updaterEventDetailsModule({
            key: 'before',
            type: 'speaker',
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
        <>
          {(f, index, action, count) => {
            return (
              <>
                <div style={{ right: '5px', textAlign: 'right' }}>
                  {index > 0 && (
                    <UpOutlined
                      title="向上移动"
                      style={{ marginLeft: '5px' }}
                      onClick={() => {
                        action.move?.(index - 1, index);
                      }}
                    />
                  )}

                  {index + 1 < count && (
                    <DownOutlined
                      title={'向下移动'}
                      style={{ marginLeft: '5px' }}
                      onClick={() => {
                        action.move?.(index + 1, index);
                      }}
                    />
                  )}
                </div>
              </>
            );
          }}
          <ProFormText name="username" label="嘉宾姓名" width="lg" rules={[{ required: true }]} />
          <ProForm.Item
            className="reset-upload-imgcrop"
            name="avatar"
            label="头像"
            // rules={[{ required: true }]}
            help="图片比例: 100*100"
          >
            <Upload.ImgCrop
              imgCropProps={{
                aspect: 100 / 100,
              }}
            />
          </ProForm.Item>

          <ProFormTextArea
            name="job"
            label="嘉宾职务"
            width="lg"
            rules={[
              {
                required: true,
              },
              {
                whitespace: true,
              },
            ]}
            fieldProps={{
              maxLength: 255,
            }}
          />
          <ProFormTextArea
            name="desc"
            label="嘉宾介绍"
            width="lg"
            fieldProps={{
              maxLength: 255,
              showCount: true,
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
        </>
      </ProFormList>
    </ProForm>
  );
};

export default Guests;
