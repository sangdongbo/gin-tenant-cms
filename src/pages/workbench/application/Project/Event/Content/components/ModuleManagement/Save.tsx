import React, { useEffect, useState } from 'react';
import { Button, Radio, Space } from 'antd';
import { useModel } from '@umijs/max';



const findItems = (list: any[], value: string | any, items: any[] = []) => {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.value === value) {
      items.push(item);
      return items;
    }
    const children = item.children || [];
    const foundItems: string[] = findItems(children, value, [...items, item]);
    if (foundItems.length > 0) {
      return foundItems;
    }
  }
  return [];
};

// 保存一版默认值
let defaultData = 0;

export default () => {
  const { moduleFormLoading, eventDetails, moduleFormRef, moduleRadio, previewData, updaterPreviewData, updaterModuleRadio, moduleManagementMenu, moduleManagementMenuKey } = useModel('event', (model) => model);
  const [currentList, setCurrentList] = useState<any>([]);

  const handelerPreviewData = (val: any, list: any[]) => {
    if (!previewData?.details || !list?.length) return;
    const newPreviewDetails = JSON.parse(JSON.stringify(previewData.details));
    let module_status = newPreviewDetails?.module_status || {};
    let newModuleStatus = module_status[list[0].value] || [];
    if (val == 1) {
      newModuleStatus = [...newModuleStatus, moduleManagementMenuKey];
    } else {
      newModuleStatus = newModuleStatus.filter((item: string) => item !== moduleManagementMenuKey);
    };

    updaterPreviewData({
      details: {
        ...newPreviewDetails,
        module_status: {
          ...newPreviewDetails.module_status,
          [list[0].value]: newModuleStatus,
        },
      },
    });
  }

  useEffect(() => {
    let defaultModuleRadio = 0;
    if (eventDetails?.module_status) {
      const { before = [], during = [], after = [] } = eventDetails?.module_status || {};
      if (before?.includes(moduleManagementMenuKey) || during?.includes(moduleManagementMenuKey) || after?.includes(moduleManagementMenuKey)) {
        defaultModuleRadio = 1;
      };
    };
    const list = findItems(moduleManagementMenu, moduleManagementMenuKey, []);
    setCurrentList(list);

    updaterModuleRadio(defaultModuleRadio);
    defaultData = defaultModuleRadio;

    return () => {
      //关闭的时候如果没报错则恢复到之前数据
      handelerPreviewData(defaultData, list);
    };
  }, [moduleManagementMenuKey]);

  if (!moduleManagementMenuKey) return null;

  return (
    <Space>
      <Space style={{ whiteSpace: 'nowrap' }}>
        是否开启:
        <Radio.Group
          value={moduleRadio}
          onChange={(event: any) => {

            handelerPreviewData(event.target.value, currentList);
            updaterModuleRadio(event.target.value);
          }}
        >
          <Radio value={1}>开启</Radio>
          <Radio value={0}>关闭</Radio>
        </Radio.Group>
      </Space>
      <Button
        type="primary"
        loading={moduleFormLoading}
        onClick={() => {
          defaultData = moduleRadio;
          moduleFormRef.current?.submit();
        }}
      >
        保存
      </Button>
    </Space>
  );
};
