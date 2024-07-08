
import classNames from 'classnames';
import styles from './index.less';

interface PropsType {
  star?: boolean;
  [key: string]: any;
}

export default ({ star, ...props }: PropsType) => {
  return (
    <svg
      className={classNames(styles.star, {
        [styles['star-active']]: star,
        [styles['star-click']]: props.onClick,
      })}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M512 85.76l104.96 326.08 342.72-0.64-277.44 200.96 106.56 325.76L512 736l-277.12 201.92 106.56-325.76L64 411.2l342.72 0.64z" />
    </svg>
  )
}
