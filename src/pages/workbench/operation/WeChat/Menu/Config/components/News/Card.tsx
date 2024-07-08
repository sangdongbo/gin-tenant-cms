import React from 'react';
// import moment from 'moment';
import dayjs from 'dayjs';
import { Col } from 'antd';
import classnames from 'classnames';
import { ProCard } from '@ant-design/pro-components';

import styles from './style.less';

const NewsCard: React.FC<any> = ({ data, optionRender, ...props }) => {
  let listLength = data.content.news_item.length;

  let cardMainTipsDom = (item: any) => (
    <div className={classnames(styles.cardMainTips, styles.multilineLineDisplay)}>
      {item.digest}
    </div>
  );

  let cardMainDom = (item: any, index: number) => (
    <div className={classnames(styles.cardMain, listLength === 1 ? styles.onlyOne : '')}>
      <div className={styles.cardMainView}>
        <img src={item.thumb_url} alt="" className={styles.cardMainImg} />
        <div className={classnames(styles.cardMainTitle, styles.oneLineDisplay)}>{item.title}</div>
      </div>
      {listLength === 1 ? cardMainTipsDom(item) : ''}
      <a href={item.url} target="_bank" className={styles.cardMainPreview} onClick={(e) => e.stopPropagation()}>
        点击预览
      </a>
    </div>
  );

  let cardSecondaryDom = (item: any, index: number) => (
    <div className={styles.cardSecondary}>
      <div className={classnames(styles.cardSecondaryTitle, styles.multilineLineDisplay)}>
        {item.title}
      </div>
      <div className={styles.cardSecondaryImgView}>
        <img src={item.thumb_url} alt="" className={styles.cardSecondaryImg} />
      </div>
      <a href={item.url} target="_bank" className={styles.cardSecondaryPreview} onClick={(e) => e.stopPropagation()}>
        点击预览
      </a>
    </div>
  );

  return (
    <Col style={{ margin: '8px 0', padding: '0 8px', width: 300 }}>
      <ProCard bodyStyle={{ padding: 0 }} bordered {...props}>
        <div className={styles.newsCard}>
          {data.content.news_item.map((item: any, index: number) =>
            index === 0 ? cardMainDom(item, index) : cardSecondaryDom(item, index),
          )}
          <div className={styles.newCardTime}>
            更新于 {dayjs(data.created_at * 1000).format('YYYY-MM-DD HH:mm:ss')}
            {optionRender ? optionRender(data) : null}
          </div>
        </div>
      </ProCard>
    </Col>
  );
};
export default NewsCard;
