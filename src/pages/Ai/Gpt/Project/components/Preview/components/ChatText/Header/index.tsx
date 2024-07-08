import React, { useContext } from 'react';
import BaseSettingsContent from '../../../BaseSettingsContent';

import './index.less';

export default () => {
  // const { initialState: { baseSettings } }: any = useModel('@@initialState');
  const { baseSettings }: any = useContext(BaseSettingsContent);

  return (
    <div className="chat-text-header">
      {/* <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M195.047619 512L707.047619 0l97.52381 97.52381L390.095238 512l414.476191 414.47619-97.52381 97.52381z" />
      </svg> */}
      <div className="chat-text-header-avatar">
        {baseSettings?.avatar ? (
          <img src={baseSettings?.avatar || ''} alt="avatar" />
        ) : null}
      </div>
      <div className="chat-text-header-nickname">{baseSettings?.nickname || ""}</div>
    </div>
  );
};
