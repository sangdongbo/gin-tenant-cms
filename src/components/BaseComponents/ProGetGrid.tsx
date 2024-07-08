import { useRef, cloneElement } from 'react';
import { useSize } from 'ahooks';

export default ({ children }: any) => {
  // const domRef = useRef<HTMLDivElement>(null);
  const screenWidth: any = window.document.body.offsetWidth;
  let adaptation = '';
  if (576 > screenWidth) {
    adaptation = 'xs';
  };
  if (screenWidth >= 576) {
    adaptation = 'sm';
  };
  if (screenWidth >= 768) {
    adaptation = 'md';
  };
  if (screenWidth >= 992) {
    adaptation = 'lg';
  };
  if (screenWidth >= 1200) {
    adaptation = 'xl';
  };
  if (screenWidth >= 1600) {
    adaptation = 'xxl';
  };

  return (
    <div>
      {screenWidth ? children({ adaptation }) : null}
    </div>
  )
};
