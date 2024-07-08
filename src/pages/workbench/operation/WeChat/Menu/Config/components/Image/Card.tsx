import styles from './style.less';

export default ({ url }: any) => {
  return (
    <img className={styles["preview-image"]} src={url} alt="image" />
  )
}
