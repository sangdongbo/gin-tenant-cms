import { useState } from 'react';
import { history } from '@umijs/max';
import { Button, message } from 'antd';
import TemplateModal from './TemplateModal';
import { handelFormValues, handelInitValues } from './ProFormTemplate';
import { updateRule } from '../service';

export default ({ record, onSave, onCreateTask }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [createTaskLoading, setCreateTaskLoading] = useState(false);

  return (
    <div>
      <a onClick={() => setModalVisible(true)}>编辑</a>
      <TemplateModal
        title="修改模版"
        open={modalVisible}
        onOpenChange={setModalVisible}
        initialValues={{
          ...record,
          data: handelInitValues(record),
        }}
        width={900}
        submitter={{
          render: ({ form }: any) => {
            return [
              <Button
                key="save"
                loading={saveLoading}
                onClick={() => {
                  form?.validateFields().then(async (formValues: any) => {
                    setSaveLoading(true);
                    const res = await updateRule(record.id, handelFormValues(formValues));
                    setSaveLoading(false);
                    message.success('保存成功');

                    setModalVisible(false);

                    onSave?.(res);
                  });
                }}
              >
                保存
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={createTaskLoading}
                onClick={() => {
                  form?.validateFields().then(async (formValues: any) => {
                    setCreateTaskLoading(true);
                    const res = await updateRule(record.id, handelFormValues(formValues));
                    setCreateTaskLoading(false);
                    setModalVisible(false);
                    history.push(
                      `/workbench/operation/wechat/template/task/${res.id}?openCreate=1`,
                    );
                    onCreateTask?.(res);
                  });
                }}
              >
                保存并新建任务
              </Button>,
            ];
          },
        }}
      />
    </div>
  );
};
