// import moment from 'moment';
import dayjs from 'dayjs';
import { useUpdateEffect } from 'ahooks';
import { cloneElement, useEffect, useState } from 'react';
import BaseProCard from './BaseProCard';

const ChartsCard = ({
  title,
  options,
  children,
  time = true,
  size,
  params: parentParams,
  extra = {},
  ...props
}: any) => {
  const [params, setParams] = useState<any>(() => {
    const currentParams = { ...parentParams };
    if (options) {
      currentParams.type = options[0].value;
    }
    if (time) {
      currentParams.star_time = dayjs().subtract(8, 'day').format('YYYY-MM-DD');
      currentParams.end_time = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    }
    return currentParams;
  });


  useUpdateEffect(() => {
    setParams({
      ...params,
      ...parentParams,
    });
  }, [parentParams]);

  return (
    <BaseProCard
      {...props}
      title={title}
      extra={{
        data: { options },
        params: params,
        onChange: setParams,
        ...extra,
      }}
    >
      {cloneElement(children, {
        params,
      })}
    </BaseProCard>
  );
};

ChartsCard.defaultProps = {
  params: {},
};

export default ChartsCard;
