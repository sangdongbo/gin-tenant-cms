import { useRef } from 'react';
import { history } from '@umijs/max';
import RightContent from './RightContent';
import LeftContent from './LeftContent';

export default ({}: any) => {
  const userInfoRef = useRef<any>(null);

  const createGoPage = (res: any) => {
    switch (res.type) {
      case 'folder':
        history.push(`/workbench/application/project/folder?id=${res.id}`);
        break;
      case 'landing':
        history.push(`/workbench/application/project/landing/basic/edit?id=${res.id}`);
        break;
      case 'microbook':
        history.push(`/workbench/application/project/microbook/basic/template?id=${res.id}`);
        break;
      case 'data_download':
        history.push(`/workbench/application/project/data-download/basic/template?id=${res.id}`);
        break;
      case 'event':
        history.push(`/workbench/application/project/event/basic/content?id=${res.id}`);
        break;
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: 'calc(100% - 332px)' }}>
        <LeftContent
          onQuicklyCreate={(res: any) => {
            userInfoRef.current?.reset();
            createGoPage(res);
          }}
          onCreate={(res: any) => {
            userInfoRef.current?.reset();
            createGoPage(res);
          }}
          onDelete={() => {
            userInfoRef.current?.reset();
          }}
          onCopy={(res: any) => {
            userInfoRef.current?.reset();
            createGoPage(res);
          }}
        />
      </div>
      <div style={{ width: '308px' }}>
        <RightContent userInfoRef={userInfoRef} />
      </div>
    </div>
  );
};
