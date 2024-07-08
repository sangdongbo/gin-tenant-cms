import React from 'react';

const Content: React.FC<any> = ({ data }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data.text && data.text.toString().replace('\n', '<br/>'),
      }}
      style={{
        backgroundColor: '#fff',
        padding: 10,
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        wordBreak: 'break-all',
      }}
    />
  );
};

export default Content;
