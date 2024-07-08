import styles from './style.less';

export default ({ url, iframeProps }: any) => {
  return (
    <div className={styles['pro-mobile-preview']}>
      <div className={styles['pro-mobile-preview-mobile-title']}></div>
      <iframe
        src={url}
        style={{ width: '100%', height: '100%' }}
        frameBorder="0"
        {...iframeProps}
      />
    </div>
  )
}
