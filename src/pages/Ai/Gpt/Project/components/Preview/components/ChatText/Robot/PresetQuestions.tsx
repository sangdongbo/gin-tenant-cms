import React from 'react';

export default ({ list, onPresetQuestions }: any) => {
  if (!list?.length) return null;

  return (
    <div className="chat-text-robot-preset-questions">
      {
        list.map((item: any, index: number) => {
          return <div
            key={index}
            className="chat-text-robot-preset-questions-text"
            onClick={() => onPresetQuestions?.(item)}
          >
            {item.title}
          </div>
        })
      }
    </div>
  )
}
