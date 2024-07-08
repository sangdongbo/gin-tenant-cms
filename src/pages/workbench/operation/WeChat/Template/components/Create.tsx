import { useState } from 'react';
import { history } from '@umijs/max';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TemplateModal from './TemplateModal';
import { handelFormValues } from './ProFormTemplate';
import { addRule } from '../service';


export default ({ onSave, onCreateTask }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [createTaskLoading, setCreateTaskLoading] = useState(false);

  return (
    <div>
      <Button key="field" icon={<PlusOutlined />} type="primary" onClick={() => setModalVisible(true)}>
        新建
      </Button>
      <TemplateModal
        title="新建模板消息"
        open={modalVisible}
        onOpenChange={setModalVisible}
        width={1080}
        submitter={{
          render: ({ form }: any, dom: any, { templateData }: any) => {
            return [
              <Button
                key="save"
                loading={saveLoading}
                onClick={() => {
                  form?.validateFields().then(async (formValues: any) => {
                    setSaveLoading(true);
                    const res = await addRule(handelFormValues(formValues));
                    setSaveLoading(false);
                    message.success('保存成功');
                    setModalVisible(false);
                    onSave?.(res);
                  })
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
                    const res = await addRule(handelFormValues(formValues));
                    setCreateTaskLoading(false);
                    setModalVisible(false);
                    history.push(`/workbench/operation/wechat/template/task/${res.id}?openCreate=1`);
                    onCreateTask?.(res);
                  })
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
