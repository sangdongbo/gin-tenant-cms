import style from './index.less';

export default ({ list, onChange, activeKey }: any) => {
  // const [key, setKey] = useState();
  return (
    <div className={style['login-mode']}>
      {list.map((item: any) => {
        return (
          <div
            key={item.key}
            className={`${style['login-mode-tab']} ${
              activeKey == item.key ? style['login-mode-tab-active'] : ''
            }`}
          >
            <div
              className={style['login-mode-tab-title']}
              onClick={() => {
                onChange(item.key);
              }}
            >
              {item.title}
              <div className={style['login-mode-tab-active-line']} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
