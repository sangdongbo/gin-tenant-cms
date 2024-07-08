import { Typography } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import type { ParamsType } from '@ant-design/pro-provider';
import type { ProTableProps } from '@ant-design/pro-components';
import classnames from 'classnames';
import style from './style.less';

interface PropsType extends ProTableProps<Record<string, any>, ParamsType, any> {
  hidenPadding?: boolean;// 隐藏所有的padding
  hideBottom?: boolean;
  hidenScrollbar?: boolean;
  pagination?: any;
}

export default <T extends Record<string, any>, U extends ParamsType, ValueType>(
  { className, ...props }: PropsType,
) => {
  const pagination = props?.pagination || {};

  return (
    <>
      <ProTable
        className={classnames({
          [style['base-pro-table-not-bottom-line']]: props.hideBottom,
          [style['hiden-scrollbar']]: props.hidenScrollbar,
          [style['hiden-padding']]: props.hidenPadding,
          "reset-table": !props?.bordered,
        }, className)}
        revalidateOnFocus={false}
        options={false}
        {...props}
        pagination={props?.pagination === false ? false : {
          showSizeChanger: false,
          ...pagination,
        }}
      />
    </>
  );
};
