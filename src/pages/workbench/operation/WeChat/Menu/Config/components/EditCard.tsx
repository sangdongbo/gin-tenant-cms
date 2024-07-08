import classNames from 'classnames';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';
import styles from './style.less';

export default ({ children, onDelete, onEdit, ...props }: any) => {
  return (
    <div
      className={classNames(styles['media-card'], 'card-border-hover')}
      {...props}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {children}
      </div>
      <div className={styles['button-group']}>
        <Space>
          {onEdit ? (
            <EditOutlined onClick={() => onEdit?.()} />
          ) : null}
          {onDelete ? (
            <DeleteOutlined onClick={() => onDelete?.()} />
          ) : null}
        </Space>
      </div>
    </div>
  )
}
