import { useState, useEffect } from 'react';
import { message } from 'antd';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, Boot } from '@wangeditor/editor';
import { t } from '@wangeditor/core';
import upload from '@/utils/upload';

import '@wangeditor/editor/dist/css/style.css';

export default ({ onChange, value }: any) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null); // 存储 editor 实例
  const [html, setHtml] = useState<any>(value ? value : ''); // 编辑器内容

  const toolbarConfig: any = {
    toolbarKeys: [
      'bold',
      'underline',
      'italic',
      'through',
      // 'code',
      'sup',
      'sub',
      'clearStyle',
      'color',
      'bgColor',
      '|',
      'fontSize',
      // 'fontFamily',
      'lineHeight',
      '|',
      'todo',
      {
        key: 'group-justify', // 以 group 开头
        title: t('editor.justify'),
        iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
        menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify'],
      },
      {
        key: 'group-indent', // 以 group 开头
        title: t('editor.indent'),
        iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z"></path></svg>',
        menuKeys: ['indent', 'delIndent'],
      },
      '|',
      'emotion',
      'insertLink',
      'uploadImage',
      'divider',
      '|',
      'undo',
      'redo',
    ]
  };

  const editorConfig: any = {
    hoverbarKeys: {
      text: {
        menuKeys: [],
      },
    },
    MENU_CONF: {},
  };

  editorConfig.MENU_CONF.uploadVideo = {
    // 自定义上传
    customUpload(file: any, insertFn: any) {
      file.uid = `eidt-video-upload-${new Date().getTime()}`;

      message.loading({ content: '上传视频中，请勿进行其他操作！', duration: 0 });
      upload(file).then((res: any) => {
        insertFn(res.url);
        message.destroy();
      });
    },
  };

  editorConfig.MENU_CONF.uploadImage = {
    // 自定义上传
    customUpload(file: any, insertFn: any) {
      file.uid = `eidt-image-upload-${new Date().getTime()}`;
      message.loading({ content: '上传图片中，请勿进行其他操作！', duration: 0 });
      upload(file).then((res: any) => {
        insertFn(res.url, file.uid, res.url);
        message.destroy();
      });
    },
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  useEffect(() => {
    setHtml(value ? value : '');
  }, [value]);

  return (
    <div>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editorRef) => {
            // // 这里有一个闭包问题，暂未发现是什么引起的，导致获取不到 emailRichText里面的最新值
            // updaterEmailRichText({
            //   editHtml: editorRef.getHtml(),
            // });
            onChange?.(editorRef.getHtml());
            // setHtml(editorRef.getHtml());
          }}
          mode="default"
          style={{ height: '200px' }}
        />
      </div>
    </div>
  );
};
