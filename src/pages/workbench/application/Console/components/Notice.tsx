import { ProCard2 } from '@/components/BaseComponents';

import style from './style.less';

export default () => {
  return (
    <ProCard2 title="通知公告">
      <div style={{ paddingTop: 8 }}>
        <div className={style['notice-same']}>
          <div className={style['notice-same-version']}>测试V6.2.1</div>
          <div className={style['notice-same-details']}>欢迎您使用测试系统！</div>
          <div className={style['notice-same-time']}>发版时间：2024/01/05</div>
        </div>
      </div>
    </ProCard2>
  );
};
