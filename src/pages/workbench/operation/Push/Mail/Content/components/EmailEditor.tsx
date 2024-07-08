import { useRef } from 'react';
import EmailEditor from 'react-email-editor';
import upload from '@/utils/upload';

export default ({ editRef, onReady: baseOnReady, ...props }: any) => {
  const emailEditorRef = useRef<any>(null);

  const onReady = () => {
    registerCallback();

    baseOnReady?.();
  }

  const registerCallback = () => {
    emailEditorRef.current.editor.registerCallback('image', function (file: any, done: (obj: any) => void) {
      done({ progress: 40 });

      file.attachments[0].uid = `eidt-video-upload-${new Date().getTime()}`;
      upload(file.attachments[0], 'edm').then((res: any) => {
        done({
          progress: 100,
          url: res.url,
        });
      });
    });
  }

  return (
    <div>
      <EmailEditor
        {...props}
        ref={(ref: any) => {
          emailEditorRef.current = ref;
          editRef.current = ref;
        }}
        onReady={onReady}
        minHeight={document.body.clientHeight - 50}
        options={{
          locale: 'zh-CN',
          features: {
            preview: false
          }
        }}
      />
    </div>
  )
}
