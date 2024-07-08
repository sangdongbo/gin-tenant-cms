import { Divider, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { ProCard } from '@/components/BaseComponents';
import styles from './styles.less';

export default ({ note, created_at, onDelete }: any) => {
  return (
    <div className={styles.card}>
      <ProCard
        headStyle={{
          padding: '14px 0 0 0'
        }}
        bodyStyle={{
          padding: '8px 0 0 0',
        }}
      >
        <div>{note}</div>
        <div style={{ paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
          <div>{dayjs(created_at).format('YYYY.MM.DD HH:mm')}</div>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={async () => {
              onDelete?.();
            }}
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </div>
      </ProCard>
      <Divider className="card-divider" style={{ margin: '8px 0 0 0' }} />
    </div>
  );
}
