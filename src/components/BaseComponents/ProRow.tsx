import { Row as BaseRow, Col as BaseCol } from 'antd';
import classname from 'classnames';
import style from './style.less';

export const Col = ({ showLine, children, ...props }: any) => {
  return (
    <BaseCol
      className={classname({
        [style['base-pro-col-line']]: showLine
      })}
      {...props}
    >
      {children}
    </BaseCol>
  );
};

const Row = ({ children, ...props }: any) => {
  return <BaseRow gutter={[24, 24]} {...props}>{children}</BaseRow>;
};

Row.Col = Col;

export default Row;
