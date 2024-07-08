import { useState, useEffect, useRef } from 'react';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, Boot } from '@wangeditor/editor';
import { t } from '@wangeditor/core';
import { insertNickname } from '@/utils/wangeditorExtend';
import upload from '@/utils/upload';

import '@wangeditor/editor/dist/css/style.css';
// import styles from './style.less';

Boot.registerMenu(insertNickname);

export default ({ emailRichText, updaterEmailRichText }: any) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<IDomEditor | null>(null); // 存储 editor 实例
  const [html, setHtml] = useState<any>(emailRichText[emailRichText.clickKey]); // 编辑器内容
  // 是否可以触发onChange（因为设置value后，onChange应不需要触发）
  const onChangeRef = useRef(true);

  const toolbarConfig: any = {
    // 目前不需要
    // insertKeys: {setHtml
    //   index: 0,
    //   keys: ['insertNickname']
    // },
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
        iconSvg:
          '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
        menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify'],
      },
      {
        key: 'group-indent', // 以 group 开头
        title: t('editor.indent'),
        iconSvg:
          '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z"></path></svg>',
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
    ],
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

  const countEditorHeight = () => {
    let maxHeight = 500;
    if (boxRef?.current) {
      const windowHeight = window.innerHeight * 0.8;
      const toolbarHeight = toolbarRef?.current?.clientHeight || 0;
      if (windowHeight < maxHeight) {
        return windowHeight - toolbarHeight;
      };
      return maxHeight - toolbarHeight;
    };
    return 'auto';
  };

  useEffect(() => {
    if (emailRichText.clickKey) {
      onChangeRef.current = false;
      setHtml(emailRichText[emailRichText.clickKey]);
      // 解决重新设置值后还会触发一次onChange问题
      setTimeout(() => {
        onChangeRef.current = true;
      }, 300);
    }
  }, [emailRichText.clickKey]);

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div ref={boxRef} style={{ border: '1px solid #ccc', zIndex: 100 }}>
      <div ref={toolbarRef}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
      </div>
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={(editorRef) => {
          if (!onChangeRef.current) return;
          // 这里有一个闭包问题，暂未发现是什么引起的，导致获取不到 emailRichText里面的最新值
          updaterEmailRichText({
            editHtml: editorRef.getHtml(),
          });
          setHtml(editorRef.getHtml());
        }}
        mode="default"
        style={{ height: countEditorHeight(), overflowY: 'hidden' }}
      />
    </div>
  );
};
