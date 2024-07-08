import { useContext, useEffect, useState } from 'react';
import type { UploadProps } from 'antd';
import { Button, message, Upload, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';
import uploadXHR from '@/utils/uploadXHR';
import isImage from '@/utils/isImage';
import Content from './content';

interface PropsType extends ProFormItemProps {
  fieldProps?: UploadProps;
};

interface CustomUploadPropsType extends UploadProps {
  value?: any;
  onChange?: any;
};


const Preview = ({ value }: any) => {
  const { conetntSize }: any = useContext(Content);
  const [fileType, setFileType] = useState<any>();// unknown == 未知  image == 图片

  const getFileType = async () => {
    let type = 'unknown';
    let fileUrl = value?.file?.url;
    if (/\.mp4$/i.test(fileUrl)) {
      type = 'video';
    } else {
      try {
        await isImage(fileUrl);
        type = 'image';
      } catch (error) { }
    };

    setFileType(type);
  };

  useEffect(() => {
    getFileType();
  }, [value]);

  return (
    <div style={{ width: conetntSize?.width - 24 * 2, height: conetntSize?.width - 41 - 16 * 2 }}>
      {
        fileType == 'unknown' ? (
          <iframe
            src={`/tenant/ai/gpt/project/preview-pdf?url=${encodeURIComponent(value?.file?.url)}`}
            frameBorder="0"
            style={{ width: '100%', height: '100%' }}
          />
        ) : null
      }
      {
        fileType == 'image' ? (
          <Image
            className="reset-image-auto"
            width={conetntSize?.width - 24 * 2}
            height={conetntSize?.width - 41 - 16 * 2}
            src={value?.file?.url}
          />
        ) : null
      }
      {
        fileType == 'video' ? (
          <video controls src={value?.file?.url} style={{ width: '100%', height: '100%' }} />
        ) : null
      }
    </div>
  );
};

const CustomUpload = (props: CustomUploadPropsType) => {
  const form = ProForm.useFormInstance();

  const [loading, setLoading] = useState(false);

  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.pdf,.doc,.docx,.mp4,image/*',
    customRequest({ file, onSuccess, onProgress, onError }) {
      setLoading(true);
      const title = form.getFieldValue('title');
      const fileName = file?.name || '';
      if (!`${title || ''}`) {
        form?.setFieldsValue({
          title: fileName.substring(fileName.lastIndexOf("."), -1),
        });
      };

      uploadXHR({
        file,
        app_source: 'ai',
        onProgress,
      }).then((res: any) => {
        onSuccess?.(res);
        setLoading(false);
      }).catch((event) => {
        onError?.(event);
        setLoading(false);
      });
    },
  };

  const beforeUpload = (file: any) => {
    const isLt128M = file.size / 1024 / 1024 < 128;
    if (!isLt128M) {
      message.error('文件必须小于128M！');
    };
    return isLt128M;
  };

  return (
    <>
      {
        props?.value?.file?.status == "done" ? (
          <Preview
            value={props?.value}
          />
        ) : (
          <Upload
            beforeUpload={beforeUpload}
            {...uploadProps}
            {...props}
            showUploadList={false}
          >
            <Button loading={loading} htmlType="button" icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        )
      }
    </>
  );
};

const ProFormUpload = ({ fieldProps, ...props }: PropsType) => {

  return (
    <ProForm.Item
      {...props}
      getValueFromEvent={(e: any) => {
        let file = e?.file;
        if (e?.file.status == 'done') {
          file = {
            ...file,
            ...file.response,
          };
        };

        const fileList = [] as any[];
        e?.fileList.map((item: any) => {
          if (item.status == 'done') {
            if (item.response.errcode) {
              message.error('资料上传失败，请重新上传！');
            } else {
              fileList.push({ ...item.response, uid: item.uid, type: item.type, name: item.name });
            }
          };
        });
        return {
          file,
          fileList,
        };
      }}
    >
      <CustomUpload {...fieldProps} />
    </ProForm.Item>
  );
};

export default ProFormUpload;
