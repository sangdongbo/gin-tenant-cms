import React from 'react';
import styles from './styles.less';

export default ({ data }: any) => {
  return (
    <div className={styles['preview-content']}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {
          data.cover_url ? (
            <svg
              className={styles['preview-content-play']}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
            >
              <path d="M512 128a384 384 0 1 0 384 384A384 384 0 0 0 512 128z m128 449.493333l-160 96L384 731.733333V313.6l96.853333 58.24 160 96 91.52 54.826667z" />
            </svg>
          ) : null
        }
        <img className={styles['preview-image']} src={data.cover_url || 'https://lookstar.oss-cn-beijing.aliyuncs.com/static/images/WechatIMG3723.png'} alt="preview-image" />
      </div>
    </div>
  );
};
