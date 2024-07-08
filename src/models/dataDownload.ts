// import moment from 'moment';
import { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { merge } from 'lodash';
import { useModel } from '@umijs/max';

export default function useDataDownloadModel() {
  const { downloadEmailRichText }: any = useModel('global', (model) => model);

  const [publishTime, setPublishTime] = useState<any>();
  const [emailRichText, setEmailRichText] = useState<any>(downloadEmailRichText);

  const [list, setList] = useState<any[]>([]);

  const [register, setRegister] = useState<any>({
    title: '',
    is_form: 0,
    list: [],
    privacy_policy: [],
  });

  const [configData, setConfigData] = useState<any>({});

  const [style, setStyle] = useState<any>({});

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

  const updaterEmailRichText = useCallback((playload: any) => {
    setEmailRichText((values: any) => {
      const currentValues = JSON.parse(JSON.stringify(values));
      const { editHtml, ...value } = playload;
      if (editHtml) {
        currentValues[currentValues.clickKey] = editHtml;
      }

      return {
        ...currentValues,
        ...value,
      };
    });
  }, []);

  const updaterConfigData = useCallback((playload: any) => {
    setConfigData(playload);
  }, []);

  const updaterRegister = useCallback((playload: any) => {
    setRegister((value: any) => ({ ...value, ...playload }));
  }, []);
  const updaterList = useCallback((playload: any) => {
    setList(playload);
  }, []);

  const updaterStyle = useCallback((playload: any) => {
    // setStyle((value: any) => (merge(value, playload)));
    setStyle((value: any) => {
      let mergeData = value;
      if (playload && value) {
        mergeData = merge(JSON.parse(JSON.stringify(value)), JSON.parse(JSON.stringify(playload)));
      };
      return mergeData;
    });
  }, []);

  const clear = useCallback(() => {
    setPublishTime(null);
    setRegister({
      title: '',
      is_form: 0,
      list: [],
    });
    setList([]);
    setStyle({});
    setEmailRichText(downloadEmailRichText);
    setConfigData({});
  }, []);

  return {
    register,
    publishTime,
    emailRichText,
    list,
    style,
    configData,
    clear,
    updaterRegister,
    updaterPublishTime,
    updaterEmailRichText,
    updaterList,
    updaterStyle,
    updaterConfigData,
  };
}
