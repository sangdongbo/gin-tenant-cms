import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Modal, Image } from 'antd';
import type { ModalProps } from 'antd';
import QRCode from 'qrcode.react';

import { ProTable } from '@/components/BaseComponents';

import urlToBase64, { getBase64URL } from '@/utils/urlToBase64';

interface PropsType extends ModalProps {
  trigger: any;
  url: string;
  fieldQrcodeProps?: any;
};


const mockADownLoad = (url: string, name?: string) => {
  const a = document.createElement('a');
  a.download = name || 'qrcode'; // 设置下载的文件名，默认是'下载'
  a.href = url;
  document.body.appendChild(a);
  a.click();
  a.remove(); // 下载之后把创建的元素删除
};

const DownloadBtn = ({ record, fieldQrcodeProps }: any) => {
  const [qrcodeUrl, setQRCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [fieldQrcodeProps]);

  return <>
    <QRCodeUrl
      value={record.url}
      size={record.pixel / 2}
      onLoad={(qrcodeImageUrl: any) => {
        setQRCodeUrl(qrcodeImageUrl);
        setLoading(false);
      }}
      {...fieldQrcodeProps}
    />
    <a
      onClick={() => {
        if (loading) return;
        mockADownLoad(qrcodeUrl, `qrcode_${record.pixel}`);
      }}
    >
      {loading ? "生成中" : "下载"}
    </a>
  </>
};

// const PreviewQrcode = ({ record, fieldQrcodeProps }: any) => {
//   const [qrcodeUrl, setQRCodeUrl] = useState('');

//   return (
//     <div>
//       <QRCodeUrl
//         value={record.url}
//         size={record.pixel / 2}
//         onLoad={(qrcodeImageUrl: any) => {
//           setQRCodeUrl(qrcodeImageUrl);
//         }}
//         {...fieldQrcodeProps}
//       />
//       <Image
//         width={80}
//         src={qrcodeUrl}
//       />
//     </div>
//   )
// };

const Table = ({ url, fieldQrcodeProps }: any) => {
  const dataSource = [
    {
      sideLength: 8,
      scanningDistance: 0.5,
      pixel: 258,
      url,
    },
    {
      sideLength: 12,
      scanningDistance: 0.8,
      pixel: 344,
      url,
    },
    {
      sideLength: 15,
      scanningDistance: 1,
      pixel: 430,
      url,
    },
    {
      sideLength: 30,
      scanningDistance: 1.5,
      pixel: 860,
      url,
    },
    {
      sideLength: 50,
      scanningDistance: 2.5,
      pixel: 1280,
      url,
    }
  ];

  const columns: any = [
    {
      title: '像素(px)',
      dataIndex: 'pixel',
      render: (dom: any) => `${dom}px`
    },
    {
      title: '建议扫描距离(m)',
      dataIndex: 'scanningDistance',
      render: (dom: any) => `${dom}m`
    },
    // {
    //   title: '预览',
    //   dataIndex: 'preview',
    //   render: (dom: any, record: any) => {
    //     return <PreviewQrcode record={record} fieldQrcodeProps={fieldQrcodeProps}/>
    //   }
    // },
    {
      title: '操作',
      valueType: 'option',
      width: 116,
      render: (dom: any, record: any) => {
        return <DownloadBtn record={record} fieldQrcodeProps={fieldQrcodeProps} />;
      },
    },
  ];

  return <ProTable
    rowKey="pixel"
    search={false}
    pagination={false}
    dataSource={dataSource}
    columns={columns}
  />
};

export const QRCodeUrl = ({ onLoad, domStyle, imageSettings: baseImageSettings, ...props }: any) => {
  const qrcodeBoxRef = useRef<any>();
  const qrcodeTime = useRef<any>();
  const [imageSettings, setImageSettings] = useState({
    x: undefined,
    y: undefined,
    ...(baseImageSettings || {}),
    excavate: true,
  });

  const getqrcodeUrl = () => {
    qrcodeTime.current = setTimeout(() => {
      try {
        const qrcodeBox: any = qrcodeBoxRef.current;
        const qrcodeCanvas = qrcodeBox.querySelector('canvas');
        const qrcodeImageUrl = qrcodeCanvas.toDataURL('image/png');
        onLoad?.(qrcodeImageUrl);
      } catch (error) {
        console.error('二维码生成失败！');
      };
    }, 500);
  };

  const handleImageSettings = () => {
    let currentUrl = baseImageSettings?.src || '';

    return new Promise<void>((resolve, reject) => {
      if (currentUrl) {
        currentUrl = currentUrl.replace('http://', 'https://')
        urlToBase64(currentUrl).then((res: any) => {
          setImageSettings({
            ...imageSettings,
            src: getBase64URL(res),
            height: props.size ? props.size * 0.23 : 24,
            width: props.size ? props.size * 0.23 : 24,
          });
          resolve();
        });
      } else {
        setImageSettings({
          ...imageSettings,
          src: currentUrl,
          height: props.size ? props.size * 0.23 : 24,
          width: props.size ? props.size * 0.23 : 24,
        });
        resolve();
      };
    });
  };

  useEffect(() => {
    handleImageSettings().then(() => {
      getqrcodeUrl();
    });
  }, [baseImageSettings]);

  useEffect(() => {

    return () => {
      clearTimeout(qrcodeTime.current);
    };
  }, []);

  return (
    <div
      ref={qrcodeBoxRef}
      style={{ opacity: 0, display: 'none', ...domStyle }}
    >
      <QRCode
        includeMargin={true}
        bgColor="#ffffff"
        fgColor="#000000"
        level="M"
        imageSettings={imageSettings}
        {...props}
      />
    </div>
  );
};

const ProQRcode = ({ trigger, url, fieldQrcodeProps, ...props }: PropsType) => {
  const [open, setOpen] = useState(false);

  const triggerDom = useMemo(() => {
    if (!trigger) {
      return null;
    };

    return React.cloneElement(trigger, {
      key: 'trigger',
      ...trigger.props,
      onClick: async (e: any) => {
        setOpen(!open);
        trigger.props?.onClick?.(e);
      },
    });
  }, [setOpen, trigger, open]);


  return (
    <>
      {triggerDom}
      <Modal
        destroyOnClose={true}
        width={600}
        footer={null}
        title="二维码下载"
        {...props}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Table url={url} fieldQrcodeProps={fieldQrcodeProps} />
      </Modal>
    </>
  )
};

ProQRcode.QRCodeUrl = QRCodeUrl;

export default ProQRcode;
