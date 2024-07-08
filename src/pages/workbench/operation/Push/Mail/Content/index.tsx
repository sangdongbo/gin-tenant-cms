import { useEffect, useRef, useState } from "react";
import { useSearchParams } from '@umijs/max';
import { Modal } from 'antd';
import { MailConfig as TipsMailConfig } from '@/components/Tips';
import EmailEditor from "./components/EmailEditor";
import Header from "./components/Header";
import SelectTemplates from '@/components/SelectTemplates';

import { getRule } from '../service';

import styles from './style.less';

const templateList = [
  {
    id: 1,
    previewImage: 'https://lookstar.oss-cn-beijing.aliyuncs.com/tenant/uploads/20230303/6401685de5ba6.png',
    title: '邮箱模版',
    data: require('./template1.json'),
  },
];

export default () => {
  const [searchParams] = useSearchParams();
  const id: any = searchParams.get('id');

  const editRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);
  const [openTemplate, onOpenTemplate] = useState(false);
  const [currentTemplateData, setCurrentTemplateData] = useState<any>(null);
  const [defaultEditorValue, setDefaultEditorValue] = useState(null);

  const getDetails = () => {
    getRule(id).then(res => {
      setDetails(res);
      if (res?.edit_json) {
        onOpenTemplate(false);
      } else {
        onOpenTemplate(true);
      };
    });
  };

  const setEditData = (edit_json: any) => {
    if (!edit_json) return;
    editRef.current.editor.loadDesign(edit_json);
  }

  useEffect(() => {
    if (!loading && details) {
      if (details?.edit_json || defaultEditorValue) setEditData(defaultEditorValue || JSON.parse(details.edit_json));
      editRef.current.editor.setBodyValues({
        backgroundColor: "transparent",
      });
    };
  }, [loading, details, defaultEditorValue]);

  useEffect(() => {
    getDetails();
  }, []);


  return (
    <TipsMailConfig>
      <div className={styles['content-page']}>
        <Modal
          title="选择邮箱模版"
          // confirmLoading={loading}
          open={openTemplate}
          onCancel={() => {
            setDefaultEditorValue(null);
            onOpenTemplate(false);
          }}
          onOk={() => {
            setDefaultEditorValue(currentTemplateData?.data);
            onOpenTemplate(false)
          }}
          width={1200}
        >
          <SelectTemplates
            list={templateList}
            toolBarRender={false}
            onChange={setCurrentTemplateData}
          />
        </Modal>

        <>
          <Header
            disabled={loading}
            id={id}
            editRef={editRef}
            lastTime={details?.updated_at}
          />
          <EmailEditor
            editRef={editRef}
            onReady={() => {
              setLoading(false);
            }}
          />
        </>
      </div>
    </TipsMailConfig>
  )
}
