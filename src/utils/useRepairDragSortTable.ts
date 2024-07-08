import { useEffect, useRef } from 'react';

const useRepairDragSortTable = ({ dataSource }: any) => {
  const scrollTopRef = useRef<number>(0);
  const domRef = useRef<any>(null);

  const initListener = () => {
    if (!domRef.current.querySelector('.ant-table-body')) {
      const clearTime = setTimeout(() => {
        initListener();
        clearTimeout(clearTime);
      }, 300);
      return;
    };
    const tableBody = domRef?.current?.querySelector('.ant-table-body');
    tableBody.scrollTop = scrollTopRef.current;// 滚动到上一次的记录位置
    const handleScroll = (event: any) => {
      scrollTopRef.current = event.target.scrollTop;
    };
    tableBody?.addEventListener('scroll', handleScroll);
  };

  useEffect(() => {
    initListener();
  }, [dataSource]);

  return domRef;
};

export default useRepairDragSortTable;
