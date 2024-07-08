import type { ProListProps } from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';

export default (props: ProListProps) => {
  // const searchProps = props.search;
  return (
    <ProList
      className="reset-pro-list"
      revalidateOnFocus={false}
      {...props}
    // search={{
    //   style: {
    //     backgroundColor: '#ffffff',
    //     boxShadow: '0px 6px 20px 0px rgba(44, 49, 66, 0.06)',
    //     borderRadius: '6px',
    //   },
    //   ...searchProps,
    // }}
    />
  );
};
