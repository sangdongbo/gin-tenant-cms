import { useEffect } from 'react';

// 通知Preview页面数据变化
const useNoticePreview = (previewRef: any, key: string, value: any) => {
  useEffect(() => {
    previewRef.current?.contentWindow.postMessage({ [key]: value }, '*');
  }, [value]);
};

export default useNoticePreview;
