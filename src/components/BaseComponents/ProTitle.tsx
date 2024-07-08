import { Space, Typography } from 'antd';
import ProTooltip from './ProTooltip';

const UserSvg = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <svg
        fill={PRIMARYCOLOR}
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
      >
        <path
          d="M502.496 63.136c125.888 0 227.936 100.384 227.936 224.192 0 123.84-102.048 224.224-227.936 224.224S274.56 411.168 274.56 287.328c0-123.84 102.08-224.192 227.936-224.192z m0 0c125.888 0 227.936 100.384 227.936 224.192 0 123.84-102.048 224.224-227.936 224.224S274.56 411.168 274.56 287.328c0-123.84 102.08-224.192 227.936-224.192z m-85.472 523.168h189.984c162.624 0 294.432 129.632 294.432 289.6v18.656c0 63.04-131.84 65.44-294.432 65.44H417.024c-162.624 0-294.432-0.096-294.432-65.44v-18.656c0-159.968 131.808-289.6 294.432-289.6z m0 0"
          p-id="2200"
        ></path>
      </svg>
    </div>
  );
};

export default ({ titleIocn, title, tooltip }: any) => {
  return (
    <Space>
      {/* <div className={style['base-title-line']} /> */}
      {titleIocn || titleIocn === null ? (
        <div style={{ color: PRIMARYCOLOR, display: 'flex', alignItems: 'center' }}>
          {titleIocn}
        </div>
      ) : (
        <UserSvg />
      )}
      <Typography.Text>{title}</Typography.Text>
      {tooltip ? <ProTooltip tooltip={tooltip} /> : null}
    </Space>
  );
};
