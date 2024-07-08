import { useState, useRef, useEffect } from 'react';
import { useModel, useSearchParams } from '@umijs/max';
import { Tabs, Spin, message } from 'antd';
import dayjs from 'dayjs';
import { stringify } from 'qs';
import { addMeta, deleteMeta } from '@/utils/meta';
import { getUid } from '@/utils/uuid';
import { getConfigRule, getContactsFieldsRule } from '../../service';
import { getContactsFieldsRule as getFormsContactsFieldsRule } from '@/pages/workbench/material/Forms/service';
import { queryBannerRule, queryRule } from './service';
// import moment from 'moment';
import useNoticePreview from '@/utils/useNoticePreview';
import { getNameRule } from '@/pages/workbench/operation/Contacts/Field/service';
import ProCard from '@/components/BaseComponents/ProCard';


import { Style, Banner, List } from './components';
import RegisterTable from '@/components/Project/Register/Table';
import RegisterPrivacyPolicy from '@/components/Project/Register/PrivacyPolicy';
import { addContactsFieldsRule, createConfigRule } from '../../service';
import completeFormLibraryFields from '@/utils/completeFormLibraryFields';

import styles from './style.less';

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');
  const previewRef = useRef<any>(null);

  const {
    publishTime,
    article,
    banner,
    style: BasicsStyle,
    tabsKey,
    register,
    configData,
    updaterPublishTime,
    updaterRegister,
    updaterBanner,
    updaterArticle,
    updaterStyle,
    updaterTabsKey,
    updaterConfigData,
    clear,
  }: any = useModel('microbook', (model) => model);

  const [iframeLoad, setIframeLoad] = useState(false);

  const [bannerLoading, setBannerLoading] = useState(false);
  const { tabs } = article;
  const [loading, setLoading] = useState(true);

  const getConfigData = async () => {
    const res = await getConfigRule(projectId);
    const fields = await getContactsFieldsRule(projectId);
    // 如果有设置表单库，则获取表单库数据，重置当前保存的 Fields （因为表单库可以在任意项目中修改）
    if (fields.forms_id) {
      const newList = await getFormsContactsFieldsRule({
        'filter[forms_id]': fields.forms_id
      });
      fields.data = completeFormLibraryFields(newList);
    };

    const phoneFields = await getNameRule('phone');

    updaterPublishTime(res?.updated_at || '');
    updaterBanner({
      is_banner: res.data?.is_banner || 0,
    });
    updaterRegister({
      title: res.data?.form?.title,
      is_form: res.data?.form?.show || 0,
      form_library_id: fields.forms_id || null,
      list: fields.data || [
        {
          ...phoneFields,
          contacts_field_name: phoneFields.name, // 联系人字段、用户判断是否事联系人字段
          prohibithide: 1,
          prohibitdelete: 1,
          prohibitrequired: 1,
          show: 1,
          required: 1,
        },
      ],
      // 默认的list
      defaultList: [
        {
          ...phoneFields,
          contacts_field_name: phoneFields.name, // 联系人字段、用户判断是否事联系人字段
          prohibithide: 1,
          prohibitdelete: 1,
          prohibitrequired: 1,
          show: 1,
          required: 1,
        }
      ],
      privacy_policy: res.data?.extend?.privacy_policy_url || [],
    });
    updaterConfigData(res.data);

    // 应该只需要样式的数据，不应该传递所有数据
    updaterStyle(res.data);
  };

  const getBannerData = async () => {
    setBannerLoading(true);
    const res = await queryBannerRule({
      'filter[project_id]': projectId,
    });
    setBannerLoading(false);
    updaterBanner({
      list: res.map((item: any) => ({ ...item, customId: getUid() })),
    });
  };

  const getListData = async () => {
    const res = await queryRule({
      'filter[project_id]': projectId,
      include: 'article.freepublish',
    });
    // 虚拟id，拖拽排序和添加图片使用。
    const data = res.map((item: any) => ({ ...item, customId: getUid() }));

    if (data.length) {
      updaterArticle({
        tabs: data.map((item: any) => {
          const { article: deleteArticle, ...tabsItem }: any = item;

          return {
            ...tabsItem,
            freepublish_ids: item.article.map((it: any) => it.freepublish?.id),
          };
        }),
      });

      updaterPublishTime(data[0].updated_at || '');

      updaterTabsKey(data[0].customId);
    }
  };

  useNoticePreview(previewRef, 'banner', banner);
  useNoticePreview(previewRef, 'tabs', tabs);
  useNoticePreview(previewRef, 'BasicsStyle', BasicsStyle);
  useNoticePreview(previewRef, 'tabsKey', tabsKey);
  useNoticePreview(previewRef, 'register', register);

  useEffect(() => {
    try {
      document.getElementById('mobile-title').innerText = BasicsStyle?.title || '';
    } catch (error) { }
  }, [BasicsStyle]);

  useEffect(() => {
    if (tabs.length === 1) {
      updaterTabsKey(tabs[0].customId);
    }
  }, [tabs]);

  useEffect(() => {
    addMeta('referrer', 'referrer', 'no-referrer');

    // 判断iframe是否加载完毕
    if (iframeLoad) {
      setLoading(true);
      Promise.all([getConfigData(), getBannerData(), getListData()])
        .then(() => setLoading(false))
        .catch(() => setLoading(false));

      window.addEventListener('message', function (e) {
        const data = e.data;
        if (data.tabsKey) {
          updaterTabsKey(data.tabsKey);
        }
      });
    }

    return () => {
      deleteMeta('referrer');
      clear();
    };
  }, [iframeLoad]);

  return (
    <ProCard
      title="内容设置"
      extra={
        <>最近一次发布时间：{publishTime ? dayjs(publishTime).format('YYYY.MM.DD HH:mm') : '-'}</>
      }
      split="vertical"
      headerBordered
    >
      <ProCard colSpan={'424px'} hoverable={false}>
        <div className={styles.mobile}>
          <div id="mobile-title" className={styles['mobile-title']}></div>
          <iframe
            ref={previewRef}
            src={`https://clould-app.lookstar.com.cn/microbook${REACT_APP_ENV == 'beta' ? '-beta' : ''
              }/preview?${stringify({
                id: projectId,
                token: localStorage.getItem('lookstar-tenant-token'),
                tenant: localStorage.getItem('lookstar-tenant-X-Tenant'),
              })}`}
            frameBorder="0"
            style={{ width: '100%', height: '100%' }}
            onLoad={() => setIframeLoad(true)}
          />
        </div>
      </ProCard>
      <ProCard colSpan={'calc(100% - 423px)'} hoverable={false} loading={loading}>
        <Tabs defaultActiveKey="banner">
          <Tabs.TabPane tab="设置banner" key="banner" style={{ height: 565 }}>
            <Spin spinning={bannerLoading}>
              <Banner id={projectId} />
            </Spin>
          </Tabs.TabPane>
          <Tabs.TabPane tab="设置内容" key="list" style={{ height: 565 }}>
            <List id={projectId} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="留资表单" key="form" style={{ height: 597 }}>
            <RegisterTable
              id={projectId}
              cardProps={{
                bodyStyle: { padding: 0 },
              }}
              value={register}
              updaterRegister={updaterRegister}
              updaterPublishTime={updaterPublishTime}
              onPublish={async (values: any) => {
                try {
                  await addContactsFieldsRule({
                    project_id: projectId,
                    data: values.list,
                    forms_id: values.forms_id,
                  });
                } catch (error) { }
                try {
                  await createConfigRule({
                    data: {
                      form: {
                        show: values.show,
                        title: values.title,
                      },
                    },
                    project_id: projectId,
                  });
                  updaterPublishTime?.(new Date());
                  message.success('发布成功');
                } catch (error) { }
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key="privacy_policy" tab="隐私条款">
            <RegisterPrivacyPolicy
              projectId={projectId}
              cardProps={{
                bodyStyle: { padding: 0 },
              }}
              value={register}
              updaterRegister={updaterRegister}
              onPublish={async (values: any) => {
                const extend = configData?.extend || {};

                try {
                  await createConfigRule({
                    data: {
                      extend: {
                        ...extend,
                        privacy_policy_url: values || [],
                      }
                    },
                    project_id: projectId,
                  });
                  message.success('发布成功');
                } catch (error) { };
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="基础设置" key="style" style={{ height: 565 }}>
            <Style id={projectId} />
          </Tabs.TabPane>
        </Tabs>
      </ProCard>
    </ProCard>
  );
};
