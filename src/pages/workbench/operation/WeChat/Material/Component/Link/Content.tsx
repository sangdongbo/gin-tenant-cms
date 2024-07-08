import classnames from 'classnames';
import React from 'react';
import styles from './LinkCard.less';

const Content: React.FC<any> = ({ data }) => {
  return (
    <div className={styles.linkShare}>
      <div className={classnames(styles.linkShareTitle, 'multilineLineDisplay')}>{data.title}</div>
      <div className={styles.linkShareBody}>
        <div className={classnames(styles.linkShareDesc, 'multilineLineDisplay')}>
          {data.description}
        </div>
        <img className={styles.linkShareImg} src={data.image} />
      </div>
    </div>
  );
};

export default Content;
