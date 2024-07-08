import React, { useEffect, useRef, useMemo, useState } from 'react';
import { ProForm } from '@ant-design/pro-components';
import debounce from 'lodash/debounce';
import { Select, Spin, Input } from 'antd';
import styles from './index.less';

const suggest = new TMap.service.Suggestion({
  // 新建一个关键字输入提示类
  pageSize: 10, // 返回结果每页条目数
  region: '北京', // 限制城市范围
  regionFix: false, // 搜索无结果时是否固定在当前城市
});

const DebounceSelect = ({ fetchOptions, debounceTimeout = 800, ...props }: any) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions: any) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      showSearch
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
};

const CustomMap = ({ value, onChange }: any) => {
  const mapRef = useRef<any>();
  const mapContentRef = useRef<any>();
  const infoWindowRef = useRef<any>();
  const markerRef = useRef<any>();
  // 不需要引发dom重绘
  const suggestionsListRef = useRef<any[]>([]);
  const [selectValue, setSelectValue] = useState<any>();

  const initMap = () => {
    const location = value?.location || {
      lat: 39.960705,
      lng: 116.451369,
    };

    // 定义地图中心点坐标
    var center = new TMap.LatLng(location?.lat, location?.lng);

    //定义map变量，调用 TMap.Map() 构造函数创建地图
    mapRef.current = new TMap.Map(mapContentRef.current, {
      center: center, // 设置地图中心点坐标
      zoom: 15, // 设置地图缩放级别
      pitch: 43.5, // 设置俯仰角
      rotation: 45, // 设置地图旋转角度
    });

    // marker标记
    markerRef.current = new TMap.MultiMarker({
      id: 'marker-layer',
      map: mapRef.current,
      styles: {
        marker: new TMap.MarkerStyle({
          width: 24,
          height: 35,
          anchor: { x: 12, y: 35 },
          src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png',
        }),
      },
      geometries: [
        {
          id: 'address',
          styleId: 'marker',
          position: new TMap.LatLng(location?.lat, location?.lng),
          properties: {
            title: 'marker',
          },
        },
      ],
    });

    setInfoWindow(location?.lat, location?.lng);
  };

  // 会场地址提示文案
  const setInfoWindow = (lat: number, lng: number) => {
    infoWindowRef.current?.close();

    infoWindowRef.current = new TMap.InfoWindow({
      map: mapRef.current,
      position: new TMap.LatLng(lat, lng),
      offset: { x: 0, y: -50 },
      enableCustom: true,
      content:
        '<div class="info_card" style="box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;border-radius: 6px;padding: 12px 10px;text-align: center;background-color: white;white-space: nowrap;min-width: 100px;">会场地址</div>',
    });
  };

  const searchCity = async (keyword: any) => {
    if (!keyword?.trim()) return [];
    const result = await suggest.getSuggestions({
      keyword: keyword,
      location: mapRef.current.getCenter(),
    });
    suggestionsListRef.current = result.data;
    return result.data.map((item: any, index: number) => {
      return {
        label: `${item.title}（${item.address}）`,
        value: index,
      };
    });
  };

  // 设置地图位置
  const setMapPosition = (index: any) => {
    const currentData: any = suggestionsListRef.current[index];
    const { location } = currentData || {};
    if (!currentData) return;
    // 地图位置修改
    mapRef.current.setCenter(location);
    // 设置文案
    setInfoWindow(location.lat, location.lng);
    // 设置标记点
    markerRef.current.setGeometries([]);
    markerRef.current.updateGeometries([
      {
        id: '0', // 点标注数据数组
        position: location,
      },
    ]);

    onChange?.({
      ...(value || {}),
      ...currentData,
    });
  };

  const debounceSelectValue = () => {
    if (selectValue) return selectValue;
    if (value) return `${value?.title}（${value?.address}）`;
    return '';
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div className={styles['pro-form-tencent-map']}>
      <div style={{ position: 'relative' }}>
        <div className={styles['pro-form-tencent-map-select']}>
          <DebounceSelect
            value={debounceSelectValue()}
            fetchOptions={searchCity}
            onChange={(event: any) => {
              setSelectValue(event.value);
              setMapPosition(event.value);
            }}
            style={{ minWidth: 300 }}
          />
        </div>
        <div className={styles['pro-form-tencent-map-content']} ref={mapContentRef}></div>
      </div>
    </div>
  );
};

const ProFormTencentMap = (props: any) => {
  return (
    <ProForm.Item {...props}>
      <CustomMap {...props} />
    </ProForm.Item>
  );
};

export default ProFormTencentMap;
