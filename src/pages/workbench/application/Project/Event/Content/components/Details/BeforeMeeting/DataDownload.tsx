import { useEffect } from 'react';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { ProForm } from "@ant-design/pro-components";
import ProFormTable from "./ProFormTable";
import { queryDataDownloadTreeRule, addDataDownloadSaveListRule, updateConfigModuleRule } from '../../../service';


// 保存一版默认值
let defaultData = {};

const DataDownload = ({ eventId, projectId }: any) => {
  const { moduleFormRef, moduleRadio, updaterPreviewData, updaterEventDetailsModule, setModuleFormLoading } = useModel('event', (model) => model);

  useEffect(() => {
    updaterPreviewData({
      menuId: 'data-download'
    });
    return () => {
      updaterPreviewData({
        menuId: '',
        'data-download': defaultData
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
        const res = await queryDataDownloadTreeRule({
          'filter[event_id]': eventId,
        });
        defaultData = {
          state: moduleRadio,
          lists: res || [],
        };
        return {
          lists: res || [],
        }
      }}
      onValuesChange={(_, formValue) => {
        updaterPreviewData({
          'data-download': {
            state: moduleRadio,
            lists: formValue?.lists?.map((item: any) => ({ ...item, type: 1 })),
          },
        });
      }}
      onFinish={async (formValue) => {
        setModuleFormLoading(true);
        try {
          await addDataDownloadSaveListRule({
            event_id: eventId,
            state: moduleRadio,
            project_id: projectId,
            lists: formValue?.lists?.map((item: any) => ({ ...item, type: 1 })),// type ==  1: 下载 2: 分类(活动中心暂时没有分类)
          });
          defaultData = {
            state: moduleRadio,
            lists: formValue?.lists?.map((item: any) => ({ ...item, type: 1 })),// type ==  1: 下载 2: 分类(活动中心暂时没有分类)
          };

          message.success('保存成功');
          updateConfigModuleRule({
            name: "data-download",
            state: moduleRadio,
            id: eventId,
          });

          updaterEventDetailsModule({
            key: 'before',
            type: 'data-download',
            state: moduleRadio,
          });
        } catch (error) { }
        setModuleFormLoading(false);
        return true;
      }}
    >
      <ProFormTable
        name="lists"
        onDragSortEnd={(data: any) => {
          updaterPreviewData({
            'data-download': {
              state: moduleRadio,
              lists: data?.map((item: any) => ({ ...item, type: 1 })),
            },
          });
        }}
      />
    </ProForm>
  )
};

export default DataDownload;
