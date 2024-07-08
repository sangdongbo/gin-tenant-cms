import { Button, Space, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
// import moment from 'moment';
import dayjs from 'dayjs';

import styles from './style.less';

import { addUploadEditRule } from '../../service';
import { useEffect, useState } from 'react';

const GoBack = () => {
  return (
    <Space>
      <ArrowLeftOutlined
        style={{ color: '#0bc7ff' }}
        onClick={() => {
          history.back();
        }}
      />
      <span style={{ fontWeight: 400, fontSize: 14, paddingRight: '50px' }}>
        返回项目设置
      </span>
    </Space>
  )
}

export default ({ editRef, lastTime, id, disabled }: any) => {
  const [publishTime, setPublishTime] = useState<any>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  // const [previewLoading, setPreviewLoading] = useState(false);


  const exportHtml = () => {
    editRef.current.editor.exportHtml(async (data: any) => {
      const { design, html } = data;
      setSaveLoading(true);
      const res = await addUploadEditRule(id, {
        body: html,
        edit_json: design,
      });
      setPublishTime(res?.updated_at);
      setSaveLoading(false);
      message.success({
        content: '保存成功'
      });
    });
  };

  useEffect(() => {
    setPublishTime(lastTime);
  }, [lastTime])

  return (
    <div className={styles['header-component']}>
      <div className={styles['header-left']}>
        <GoBack />
      </div>
      <div className={styles['header-right']}>
        <Space size={[10, 0]}>
          <div>最近一次保存时间：{publishTime ? dayjs(publishTime).format("YYYY.MM.DD HH:mm:ss") : '-'}</div>
          <Button
            disabled={disabled}
            loading={saveLoading}
            type="primary"
            onClick={() => exportHtml()}
          >
            保存
          </Button>
          <Button
            disabled={disabled}
            // loading={previewLoading}
            onClick={() => {
              editRef.current.editor.showPreview("desktop");
            }}
          >
            预览
          </Button>
        </Space>
      </div>
    </div>
  )
}
