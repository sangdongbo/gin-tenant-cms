import React, { useEffect } from 'react';

import './index.less';

export default ({ content }: any) => {
  return (
    <div className="chat-text-user">
      <div className="chat-text-user-content">
        <div className="chat-text-user-content-text">
          <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: content || '' }} />
        </div>
      </div>
    </div>
  )
}
