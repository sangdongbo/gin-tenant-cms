import React from 'react';
import styles from './styles.less';

export default ({ data }: any) => {
  return (
    <div className={styles['preview-content']}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <img className={styles['preview-image']} src={data.url} alt="preview-image" />
      </div>
    </div>
  );
};
