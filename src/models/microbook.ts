import { useState, useCallback } from 'react';
// import moment from 'moment';
import dayjs from 'dayjs';

export default function useMicrobookModel() {
  const [publishTime, setPublishTime] = useState<any>();

  const [banner, setBanner] = useState<any>({
    is_banner: 0,
    list: [],
  });

  const [tabsKey, setTabsKey] = useState<any>('');

  const [article, setArticle] = useState<any>({
    tabs: [],
    list: {},
  });

  const [register, setRegister] = useState<any>({
    title: '',
    is_form: 0,
    form_library_id: '',// 表单库id
    list: [],
    privacy_policy: [],
  });

  const [configData, setConfigData] = useState<any>({});

  const [style, setStyle] = useState<any>({});

  const updaterBanner = useCallback((playload: any) => {
    setBanner((value: any) => ({ ...value, ...playload }));
  }, []);

  const updaterPublishTime = useCallback((playload: any) => {
    setPublishTime((value: any) => {
      if (
        !value ||
        (playload && dayjs(value).format('YYYYMMDDHHmm') < dayjs(playload).format('YYYYMMDDHHmm'))
      ) {
        return playload;
      }
      return value;
    });
  }, []);

  const updaterTabsKey = useCallback((playload: any) => {
    setTabsKey(playload);
  }, []);

  const updaterArticle = useCallback((playload: any) => {
    setArticle((value: any) => ({ ...value, ...playload }));
  }, []);

  const updaterConfigData = useCallback((playload: any) => {
    setConfigData(playload);
  }, []);

  const updaterRegister = useCallback((playload: any) => {
    setRegister((value: any) => ({ ...value, ...playload }));
  }, []);

  const updaterStyle = useCallback((playload: any) => {
    setStyle((value: any) => ({ ...value, ...playload }));
  }, []);

  const clear = useCallback(() => {
    setPublishTime(null);
    setBanner({
      is_banner: 0,
      list: [],
    });
    setTabsKey('');
    setArticle({
      tabs: [],
      list: {},
    });
    setRegister({
      title: '',
      is_form: 0,
      list: [],
    });
    setStyle({});
    setConfigData({});
  }, []);

  return {
    publishTime,
    banner,
    tabsKey,
    article,
    register,
    style,
    configData,
    updaterPublishTime,
    updaterBanner,
    updaterTabsKey,
    updaterArticle,
    updaterRegister,
    updaterStyle,
    clear,
    updaterConfigData,
  };
}
