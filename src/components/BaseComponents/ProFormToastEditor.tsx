import React, { useEffect, useRef, useState } from 'react';
import { ProForm } from '@ant-design/pro-components';
import type { ProFormItemProps } from '@ant-design/pro-components';
import classnames from 'classnames';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import upload from '@/utils/upload';

interface PropsType extends ProFormItemProps {
  height?: number;
}

export const ToastEditor = ({ width, height = 600, value: baseValue, onChange, ...props }: any) => {
  const editorRef = useRef<Editor>();
  const valueRef = useRef(baseValue);

  const handleOnChange = () => {
    const text = editorRef?.current?.getInstance()?.getMarkdown?.();
    valueRef.current = text;
    onChange?.(text);
  };

  const handleDddImageBlobHook = (blob: Blob, callback: any) => {
    upload(blob).then((res: any) => {
      callback(res.url);
    });
  };

  useEffect(() => {
    if (baseValue != valueRef.current) {
      editorRef.current?.getInstance().setMarkdown(baseValue);
      editorRef.current?.getInstance().setSelection(0, 0);
    };
  }, [baseValue]);

  return (
    <div
      className={classnames({
        [`pro-field-${width}`]: width,
      })}
    >
      <Editor
        initialValue={valueRef?.current ?? ''}
        previewStyle="vertical"
        height={`${height}px`}
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={handleOnChange}
        ref={editorRef}
        hooks={{ addImageBlobHook: handleDddImageBlobHook }}
        {...props}
      />
    </div>
  );
};

const ProFormToastEditor = ({ fieldProps, width, height, ...props }: PropsType) => {
  return (
    <ProForm.Item {...props}>
      <ToastEditor width={width} height={height} {...fieldProps} />
    </ProForm.Item>
  );
};

export default ProFormToastEditor;
