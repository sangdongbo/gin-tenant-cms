import { useRef } from 'react';
import { useModel } from '@umijs/max';
import classNames from 'classnames';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './styles.less';

export default ({ html, emailRichText, updaterEmailRichText }: any) => {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={classNames({
          'reset-rich-text': true,
          [styles['preview-rich-text']]: true,
          [styles['preview-rich-text-active']]: emailRichText.clickKey !== 'header',
        })}
        onClick={() => {
          updaterEmailRichText({
            clickKey: 'header',
          });
        }}
      >
        {emailRichText.clickKey !== 'header' ? (
          <Button className={styles['preview-rich-text-btn']} type="link" icon={<EditOutlined />} />
        ) : null}
        <div
          dangerouslySetInnerHTML={{
            __html: emailRichText.header,
          }}
        />
      </div>

      {
        html ? (
          <div
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        ) : null
      }
      {
        emailRichText?.footer !== false ? (
          <div
            ref={footerRef}
            className={classNames({
              'reset-rich-text': true,
              [styles['preview-rich-text']]: true,
              [styles['preview-rich-text-active']]: emailRichText.clickKey !== 'footer',
            })}
            onClick={() => {
              updaterEmailRichText({
                clickKey: 'footer',
              });
            }}
          >
            {emailRichText.clickKey !== 'footer' ? (
              <Button className={styles['preview-rich-text-btn']} type="link" icon={<EditOutlined />} />
            ) : null}
            <div
              dangerouslySetInnerHTML={{
                __html: emailRichText.footer,
              }}
            />
          </div>
        ) : null
      }
    </>
  );
};
