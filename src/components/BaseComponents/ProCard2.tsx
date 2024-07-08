import style from './style.less';

export default ({ children, title, footer, headStyle, bodyStyle, ghost }: any) => {
  const cardStyle: any = {};
  if (ghost) {
    cardStyle.backgroundColor = 'transparent';
    cardStyle.borderRadius = 'none';
  };

  return (
    <div className={style['lookstar-card']} style={cardStyle}>
      <div className={style['lookstar-card-content']} style={bodyStyle}>
        {title ?
          <div
            className={style['lookstar-card-content-header']}
            style={headStyle}
          >
            {title}
          </div>
          : null
        }
        {children}
      </div>
      {footer}
    </div>
  );
};
