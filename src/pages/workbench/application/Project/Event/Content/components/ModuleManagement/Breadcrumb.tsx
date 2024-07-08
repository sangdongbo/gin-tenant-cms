import React, { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';
import { Breadcrumb } from 'antd';

const findLabel = (list: any[], value: string, labels: string[] = []) => {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.value === value) {
      labels.push(item.label);
      return labels;
    }
    const children = item.children || [];
    const foundLabels: string[] = findLabel(children, value, [...labels, item.label]);
    if (foundLabels.length > 0) {
      return foundLabels;
    }
  }
  return [];
};


export default () => {
  const { moduleManagementMenu, moduleManagementMenuKey, updaterModuleManagementMenuKey } = useModel('event', (model) => model);
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    if (moduleManagementMenuKey) {
      const currentList = findLabel(moduleManagementMenu, moduleManagementMenuKey, []);
      setList(currentList);
    } else {
      setList([]);
    };
  }, [moduleManagementMenu, moduleManagementMenuKey])

  return (
    <Breadcrumb separator=">">
      <Breadcrumb.Item>
        <span onClick={() => updaterModuleManagementMenuKey(null)} style={{ cursor: 'pointer', fontSize: 16, fontWeight: 'bold' }}>模块信息管理</span>
      </Breadcrumb.Item>
      {
        list.length ? (
          <>
            {
              list.map((item: any, index: number) => {
                if (list.length == (index + 1)) {
                  return (
                    <Breadcrumb.Item key={index}>
                      <span style={{ fontSize: 16, fontWeight: 'bold' }}>{item}</span>
                    </Breadcrumb.Item>
                  )
                };
                return (
                  <Breadcrumb.Item key={index}>
                    <span onClick={() => updaterModuleManagementMenuKey(null)} style={{ cursor: 'pointer', fontSize: 16, fontWeight: 'bold' }}>{item}</span>
                  </Breadcrumb.Item>
                )
              })
            }
          </>
        ) : null
      }
    </Breadcrumb>
  )
};
