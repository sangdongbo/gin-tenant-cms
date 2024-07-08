import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import styles from './style.less';

export default ({ request, params }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    request(params).then((res: any[]) => {
      setData(res);
      setLoading(false);
    });
  }, [params]);

  return (
    <Spin spinning={loading}>
      <ul className={styles.rankingList}>
        {data.map((item: any, index: number) => (
          <li key={index}>
            <span className={`${styles.rankingItemNumber} ${index < 3 ? styles.active : ''}`}>
              {index + 1}
            </span>
            <span className={styles.rankingItemTitle} title={item.title}>
              {item.title}
            </span>
            <span className={styles.rankingItemValue}>{item.total}</span>
          </li>
        ))}
      </ul>
    </Spin>
  );
};
