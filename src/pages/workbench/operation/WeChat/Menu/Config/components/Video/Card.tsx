import styles from './style.less';

export default ({ url }: any) => {
  return (
    <>
      {url ? (
        <svg
          className={styles['preview-play']}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
        >
          <path d="M512 128a384 384 0 1 0 384 384A384 384 0 0 0 512 128z m128 449.493333l-160 96L384 731.733333V313.6l96.853333 58.24 160 96 91.52 54.826667z" />
        </svg>
      ) : null}
      <img className={styles["preview-image"]} src={url || 'https://lookstar.oss-cn-beijing.aliyuncs.com/static/images/WechatIMG3723.png'} alt="image" />
    </>
  );
};
