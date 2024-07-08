import { useCallback, useEffect, useState } from 'react';
import { useModel } from '@umijs/max';

export default function useDeclarationPeriodModel() {
  const { initialState } = useModel('@@initialState');
  const defaultDataCustomization = {
    data: {
      level_1: {
        title: '触达用户',
      },
      level_2: {
        title: '关注用户',
      },
      level_3: {
        title: '标签用户',
        value: {
          tag: 'one',
          where: 'pv',
          count: 10,
        },
      },
      level_4: {
        title: '注册用户',
      },
      level_5: {
        title: '活跃用户',
      },
    },
    type: 'lifecycle',
  };

  // 声明周期多接口字段映射
  const [declarationPeriodFieldMapping, setDeclarationPeriodFieldMapping] = useState([
    {
      type: 'anonymous',
      titleKey: 'level_1',
      title: '触达用户',
    },
    {
      type: 'subscribe',
      titleKey: 'level_2',
      title: '关注用户',
    },
    {
      type: 'tag',
      titleKey: 'level_3',
      title: '标签用户',
    },
    {
      type: 'register',
      titleKey: 'level_4',
      title: '注册用户',
    },
    // {
    //   type: 'active',
    //   titleKey: 'level_5',
    //   title: '活跃用户',
    // },
  ]);

  const [dataCustomization, setDataCustomization] = useState<any>(defaultDataCustomization);

  const [lifeCycleOverview, setLifeCycleOverview] = useState<any>();

  const updaterDataCustomization = useCallback((playload: any) => {
    setDataCustomization(playload);
  }, []);

  const updaterLifeCycleOverview = useCallback((playload: any) => {
    setLifeCycleOverview(playload);
  }, []);

  const handelDeclarationPeriodFieldMapping = (value: any) => {
    const newDeclarationPeriodFieldMapping = declarationPeriodFieldMapping.map(item => {
      return {
        ...item,
        title: value?.data[item.titleKey]?.title || item?.title,
      };
    });
    setDeclarationPeriodFieldMapping(newDeclarationPeriodFieldMapping);
  };

  const clear = useCallback(() => {
    updaterDataCustomization(defaultDataCustomization);
  }, []);

  useEffect(() => {
    handelDeclarationPeriodFieldMapping(dataCustomization);
  }, [dataCustomization]);

  useEffect(() => {
    if (initialState?.dataCustomization && Object.keys(initialState?.dataCustomization).length) {
      updaterDataCustomization(initialState?.dataCustomization);
    } else {
      // 解决帐号切换 declarationPeriod没有切换为默认值问题
      updaterDataCustomization(defaultDataCustomization);
    };
  }, [initialState]);

  return {
    clear,
    declarationPeriodFieldMapping,

    dataCustomization,
    updaterDataCustomization,

    lifeCycleOverview,
    updaterLifeCycleOverview,
  };
}
