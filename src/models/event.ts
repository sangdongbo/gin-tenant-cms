import { useState, useCallback, useRef } from 'react';
import type { ProFormInstance } from "@ant-design/pro-components";

// 模块信息管理
const defaultModuleManagementMenu = [
  {
    label: '会前',
    value: 'before',
    children: [
      {
        label: '会议介绍',
        value: 'info',
      },
      {
        label: '会议资料',
        value: 'data-download',
      },
      {
        label: '会议日程',
        value: 'schedule',
      },
      {
        label: '会议嘉宾',
        value: 'speaker',
      },
      {
        label: '会议地点',
        value: 'address',
        hide: true,
      },
      {
        label: '报名表单',
        value: 'form',
      },
      // {
      //   label: '会议提醒',
      //   value: 'remind',
      // }
    ],
  },
  {
    label: '会中',
    value: 'during',
    children: [
      {
        label: '直播间',
        value: 'live',
      },
      {
        label: '活动通知',
        value: 'notice',
      }
    ],
  }
];

export default function useEventModel() {
  const baseFormRef = useRef<ProFormInstance>();
  const moduleFormRef = useRef<ProFormInstance>();
  const [moduleFormLoading, setModuleFormLoading] = useState(false);
  const [beforeMeetingTabKey, setBeforeMeetingTabKey] = useState('info');
  const [duringMeetingTabKey, setDuringMeetingTabKey] = useState('live');
  const [selectKey, setSelectKey] = useState('base');
  const [publishTime, setPublishTime] = useState<any>(null);
  const [tabsKey, setTabsKey] = useState<any>('');
  const [moduleRadio, setModuleRadio] = useState(0);
  const [style, setStyle] = useState<any>({});

  const [moduleManagementMenu, setModuleManagementMenu] = useState(defaultModuleManagementMenu);
  const [moduleManagementMenuKey, setModuleManagementMenuKey] = useState(null);

  const [banner, setBanner] = useState<any>({
    is_banner: 0,
    list: [],
  });
  const [eventList, setEventList] = useState<any>([]);

  const [previewData, setPreviewData] = useState<any>({

  });

  const [eventDetails, setEventDetails] = useState<any>({});


  const updaterStyle = useCallback((playload: any) => {
    setStyle((value: any) => ({ ...value, ...playload }));
  }, []);

  const updaterBanner = useCallback((playload: any) => {
    setBanner((value: any) => ({ ...value, ...playload }));
  }, []);


  const updaterModuleRadio = useCallback((playload: any) => {
    setModuleRadio(playload);
  }, []);
  const updaterEventDetails = useCallback((playload: any) => {
    setEventDetails(playload);
  }, []);
  const updaterModuleManagementMenuKey = useCallback((playload: any) => {
    setModuleManagementMenuKey(playload);
  }, []);
  const updaterPublishTime = useCallback((playload: any) => {
    setPublishTime(playload);
  }, []);
  const updaterBeforeMeetingTabKey = useCallback((playload: any) => {
    setBeforeMeetingTabKey(playload);
  }, []);
  const updaterDuringMeetingTabKey = useCallback((playload: any) => {
    setDuringMeetingTabKey(playload);
  }, []);
  const updaterSelectKey = useCallback((playload: any) => {
    setSelectKey(playload);
  }, []);
  const updaterEventList = useCallback((playload: any) => {
    setEventList(playload);
  }, []);
  const updaterTabsKey = useCallback((playload: any) => {
    setTabsKey(playload);
  }, []);

  const updaterPreviewData = useCallback((playload: any) => {
    setPreviewData((value: any) => ({
      ...value,
      ...playload
    }));
  }, []);

  const updaterEventDetailsModule = useCallback((playload: any) => {
    setEventDetails((val: any) => {
      if (!val?.module_status) val.module_status = {};
      const { key, type, state } = playload;
      const currentArray = val?.module_status[key] || [];
      if (state == 1) {
        // 添加
        val.module_status[key] = [...new Set([...currentArray, type])];
      } else {
        // 删除
        val.module_status[key] = currentArray.filter((item: any) => item != type);
      };
      return val;
    });
  }, []);

  const clear = useCallback(() => {
    setBeforeMeetingTabKey('info');
    setDuringMeetingTabKey('live');
    setSelectKey('base');
    setPublishTime(null);
    setTabsKey('');
    setModuleRadio(0);
    setStyle({});
    setModuleManagementMenuKey(null);
    setBanner({
      is_banner: 0,
      list: [],
    });
    setEventList([]);
    setEventDetails({});
    setModuleFormLoading(false);
    setPreviewData({})
  }, []);

  return {
    baseFormRef,
    moduleFormRef,
    moduleRadio,
    updaterModuleRadio,
    eventDetails,
    updaterEventDetails,
    updaterEventDetailsModule,
    moduleManagementMenu,
    setModuleManagementMenu,
    moduleManagementMenuKey,
    updaterModuleManagementMenuKey,
    tabsKey,
    updaterTabsKey,
    eventList,
    updaterEventList,
    banner,
    updaterBanner,
    publishTime,
    updaterPublishTime,
    selectKey,
    updaterSelectKey,
    beforeMeetingTabKey,
    updaterBeforeMeetingTabKey,
    duringMeetingTabKey,
    updaterDuringMeetingTabKey,
    style,
    updaterStyle,
    moduleFormLoading,
    setModuleFormLoading,
    previewData,
    updaterPreviewData,
    clear
  };
}
