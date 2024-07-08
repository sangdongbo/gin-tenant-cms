import { useEffect, useState, useRef, useMemo } from 'react';
import { useSearchParams, useModel } from '@umijs/max';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import { stringify } from 'qs';
import styles from './style.less';
import useNoticePreview from '@/utils/useNoticePreview';
import { getUid } from '@/utils/uuid';
import { addMeta, deleteMeta } from '@/utils/meta';
import { ProCard, ProSkeleton } from '@/components/BaseComponents';

import { queryBannerRule } from './service';
import { getConfigRule } from '../../service';

import { Style, Banner, List } from './components';

export default () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');
  const menuKey: any = searchParams.get('menu');
  const previewRef = useRef<any>(null);
  const {
    publishTime,
    eventList,
    style: BasicsStyle,
    banner,
    updaterBanner,
    updaterStyle,
    clear
  } = useModel('event', (model) => model);
  const [loading, setLoading] = useState(true);
  const [iframeLoad, setIframeLoad] = useState(false);

  useNoticePreview(previewRef, 'banner', banner);
  useNoticePreview(previewRef, 'eventList', eventList);
  useNoticePreview(previewRef, 'BasicsStyle', BasicsStyle);

  // 使用后清空当前页面的的menu参数
  useEffect(() => {
    addMeta('referrer', 'referrer', 'no-referrer');
    const entries = searchParams.entries();
    const { menu, ...queryAll } = Object.fromEntries(entries);
    setSearchParams(queryAll);
    return () => {
      deleteMeta('referrer');
      clear();
    };
  }, []);

  useEffect(() => {
    try {
      document.getElementById('mobile-title').innerText = BasicsStyle?.title || '';
    } catch (error) { };
  }, [BasicsStyle]);

  useEffect(() => {
    // 判断iframe是否加载完毕
    if (iframeLoad) {
      setLoading(true);
      Promise.all([
        getConfigRule(projectId),
        queryBannerRule({
          'filter[project_id]': projectId,
          include: 'event',
        }),
        // getListData()
      ]).then((res) => {
        const configData = res[0];
        const bannerData = res[1];

        updaterBanner({
          list: bannerData.map((item: any) => ({ ...item, customId: getUid() })),
          is_banner: configData?.data?.is_banner || 0,
        });

        // 应该只需要样式的数据，不应该传递所有数据
        updaterStyle(configData.data);

        setLoading(false);
      }).catch(() => setLoading(false));
    };
  }, [iframeLoad]);

  return (
    <ProCard
      title="内容设置"
      // extra={
      //   <>最近一次发布时间：{publishTime ? dayjs(publishTime).format('YYYY.MM.DD HH:mm') : '-'}</>
      // }
      split="vertical"
      headerBordered
    >
      <ProCard colSpan={'424px'} hoverable={false}>
        <div className={styles.mobile}>
          <div id="mobile-title" className={styles['mobile-title']}></div>
          <iframe
            ref={previewRef}
            src={`${ACTIVITY_CENTER}/preview/list?${stringify({
              project: projectId,
              token: localStorage.getItem('lookstar-tenant-token'),
              tenant: localStorage.getItem('lookstar-tenant-X-Tenant'),
            })}`}
            frameBorder="0"
            style={{ width: '100%', height: '100%' }}
            onLoad={() => setIframeLoad(true)}
          />
        </div>
      </ProCard>
      <ProCard
        colSpan={'calc(100% - 423px)'}
        hoverable={false}
        tabs={{
          defaultActiveKey: menuKey,
          items: [
            {
              key: 'list',
              label: '设置内容',
              style: {
                height: 595,
              },
              children: <ProSkeleton spinning={loading}><List id={projectId} /></ProSkeleton>,
            },
            {
              key: 'banner',
              label: '设置banner',
              style: {
                height: 565,
              },
              children: <ProSkeleton spinning={loading}><Banner id={projectId} /></ProSkeleton>,
            },

            {
              key: 'style',
              label: '基础设置',
              style: {
                height: 565,
              },
              children: <ProSkeleton spinning={loading}><Style id={projectId} /></ProSkeleton>,
            },
          ],
        }}
      />
    </ProCard>
  );
};
