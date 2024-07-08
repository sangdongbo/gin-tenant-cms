import { useState, useCallback, useRef } from 'react';
import dayjs from 'dayjs';

const defaultParams = {
  project_ids: [],
  start_time: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
  end_time: dayjs().format('YYYY-MM-DD'),
};

const defaultDataDimensionOptions = [
  {
    label: '浏览总量-PV',
    value: 'pageview_pv_cnt',
  },
  {
    label: '浏览人数-UV',
    value: 'pageview_uv_cnt',
  },
  {
    label: '表单提交次数',
    value: 'user_register_pv_cnt',
  },
  {
    label: '表单提交人数',
    value: 'user_register_uv_cnt',
  },
  {
    label: '分享人数',
    value: 'share_uv_cnt',
  },
  {
    label: '文件预览次数',
    value: 'preview_cnt',
  },
  {
    label: '下载次数',
    value: 'download_cnt',
  }
];

export default function useEventModel() {
  const [params, setParams] = useState(defaultParams);
  const [dataDimensionOptions, setDataDimensionOptions] = useState(defaultDataDimensionOptions);

  const updaterParams = useCallback((playload: any) => {
    setParams({
      ...params,
      ...playload,
    });
  }, [params]);

  const clear = useCallback(() => {
    setParams(defaultParams);
    setDataDimensionOptions(defaultDataDimensionOptions);
  }, []);

  return {
    dataDimensionOptions,
    params,
    updaterParams,
    clear
  };
}
