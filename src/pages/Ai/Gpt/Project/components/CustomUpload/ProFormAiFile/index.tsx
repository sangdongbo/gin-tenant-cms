import { useRef, useState } from 'react';
import { useSize } from 'ahooks';
import { Button, Space, Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import { ProForm, ProCard } from '@ant-design/pro-components';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import uploadXHR from '@/utils/uploadXHR';
import ProFormUpload from './ProFormUpload';
import ProFormEdit from './ProFormEdit';
import Content from './content';
import AutoEvaluator from './AutoEvaluator';

const UploadFile = ({ name, wordUrl, ...props }: any) => {
  const form = ProForm.useFormInstance();
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file: any) => {
    const isLt128M = file.size / 1024 / 1024 < 128;
    if (!isLt128M) {
      message.error('文件必须小于128M！');
    };
    return isLt128M;
  };

  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.doc,.docx',
    customRequest({ file, onSuccess, onProgress, onError }) {
      setLoading(true);
      uploadXHR({
        file,
        app_source: 'ai',
        onProgress,
      }).then((res: any) => {
        setLoading(false);
        try {
          res = JSON.parse(res);
        } catch (error) { }
        form.setFieldValue(name, [
          {
            url: res?.url,
            uid: "rc-upload-1692859433281-0",
            status: 'done',
            name: res.uid,
          }
        ]);
        onSuccess?.(res);
      }).catch((event) => {
        setLoading(false);
        onError?.(event);
      });
    },
  };

  return (
    <Upload
      beforeUpload={beforeUpload}
      {...uploadProps}
      {...props}
      showUploadList={false}
    >
      <Button size="small" loading={loading} htmlType="button" icon={<UploadOutlined />}>{wordUrl ? "替换" : "上传"}</Button>
    </Upload>
  )
};
const Buttons = ({ uploadName, watchName }: any) => {
  const form = ProForm.useFormInstance();
  const watchValue = ProForm.useWatch(watchName, form);
  const uploadValue = ProForm.useWatch(uploadName, form);
  let wordUrl = '';
  let uploadUrl = '';
  try {
    wordUrl = watchValue[0]?.url;
  } catch (error) { }
  try {
    uploadUrl = uploadValue?.file?.response?.url;
  } catch (error) { }

  const hideBtns = () => {
    let hide = false;
    // mp4显示按钮组
    if (!wordUrl && !/\.mp4$/i.test(uploadUrl)) {
      hide = true;
    };
    return hide;
  };

  // mp4视频显示上传按钮
  if (hideBtns()) return;

  return <Space>
    <UploadFile
      name="url"
      wordUrl={wordUrl}
    />
    {
      wordUrl ? (
        <>
          <Button
            size="small"
            icon={<DownloadOutlined />}
            onClick={() => {
              window.location.href = wordUrl;
            }}
          >
            下载文档
          </Button>
          <AutoEvaluator
            url={wordUrl}
            trigger={<Button size="small" type="primary">自动评估</Button>}
          />
        </>
      ) : null
    }
  </Space>
};

export default ({ name }: any) => {
  const leftRef = useRef<HTMLDivElement>();
  const leftRefSize = useSize(leftRef);
  const [editStatus, setEditStatus] = useState(0);

  return (
    <Content.Provider
      value={{
        conetntSize: leftRefSize,
        editStatus,
        setEditStatus,
      }}
    >
      <ProForm.Item>
        <ProCard
          bordered
          split="vertical"
        >
          <ProCard
            ref={leftRef}
            loading={!leftRefSize?.width}
            title="预览"
            colSpan="50%"
            style={{
              height: leftRefSize?.width
            }}
          >
            <ProFormUpload
              name={name}
            />
          </ProCard>
          <ProCard
            title="编辑"
            colSpan="50%"
            style={{
              height: leftRefSize?.width
            }}
          // extra={<Buttons uploadName={name} watchName="url" />}
          >
            <ProFormEdit
              name="url"
              watchName={name}
            />
          </ProCard>
        </ProCard>
      </ProForm.Item>
    </Content.Provider>
  )
}
