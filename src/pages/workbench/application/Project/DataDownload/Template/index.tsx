import { useRef, useEffect, useState } from 'react';
import { useSearchParams, useModel, Link } from '@umijs/max';
import { Tabs, message } from 'antd';
import { stringify } from 'qs';
import { addMeta, deleteMeta } from '@/utils/meta';
import useNoticePreview from '@/utils/useNoticePreview';
import styles from './style.less';
// import moment from 'moment';
import ProCard from '@/components/BaseComponents/ProCard';
import { List, Style } from './components';
import RegisterTable from '@/components/Project/Register/Table';
import RegisterPrivacyPolicy from '@/components/Project/Register/PrivacyPolicy';


import completeFormLibraryFields from '@/utils/completeFormLibraryFields';
import {
  getConfigRule,
  getContactsFieldsRule,
  addContactsFieldsRule,
  createConfigRule,
} from '../../service';
import { getContactsFieldsRule as getFormsContactsFieldsRule } from '@/pages/workbench/material/Forms/service';
import { getNameRule } from '@/pages/workbench/operation/Contacts/Field/service';

import { queryTreeRule } from './service';

// 设置level参数，用户判断当前层级使用
const handleData: any = (data: any[], index: number) => {
  return data.map((item) => {
    const _item = item;
    if (item.children) _item.children = handleData(item.children, index + 1);
    return {
      ..._item,
      level: index,
    };
  });
};

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  const {
    list,
    register,
    configData,
    style: BasicsStyle,
    updaterList,
    clear,
    updaterRegister,
    updaterStyle,
    updaterConfigData,
  } = useModel('dataDownload', (model) => model);

  const [iframeLoad, setIframeLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const previewRef = useRef<any>(null);

  useNoticePreview(previewRef, 'list', list);
  useNoticePreview(previewRef, 'BasicsStyle', BasicsStyle);
  useNoticePreview(previewRef, 'register', register);

  // 获取内容列表
  const getListData = async () => {
    const res = await queryTreeRule({
      'filter[project_id]': projectId,
      include: 'user',
    });
    updaterList(handleData(res, 1));
  };

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

  useEffect(() => {
    addMeta('referrer', 'referrer', 'no-referrer');
    // 判断iframe是否加载完毕
    if (iframeLoad) {
      setLoading(true);
      Promise.all([getListData(), getConfigData()])
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }

    return () => {
      deleteMeta('referrer');
      clear();
    };
  }, [iframeLoad]);

  return (
    <ProCard
      title="内容设置"
      // extra={
      //   <>最近一次发布时间：{publishTime ? moment(publishTime).format('YYYY.MM.DD HH:mm') : '-'}</>
      // }
      split="vertical"
      headerBordered
      subTitle={
        <Link
          to={`/workbench/application/project/data-download/basic/template/email-config?id=${projectId}`}
        >
          邮件设置
        </Link>
      }
    >
      <ProCard colSpan={'424px'} hoverable={false}>
        <div className={styles.mobile}>
          <div id="mobile-title" className={styles['mobile-title']}></div>
          <iframe
            ref={previewRef}
            src={`https://clould-app.lookstar.com.cn/data-download${REACT_APP_ENV == 'beta' ? '-beta' : ''
              }/preview?${stringify({
                project: projectId,
                token: localStorage.getItem('lookstar-tenant-token'),
                tenant: localStorage.getItem('lookstar-tenant-X-Tenant'),
              })}`}
            style={{ width: '100%', height: '100%' }}
            frameBorder="0"
            onLoad={() => setIframeLoad(true)}
          />
        </div>
      </ProCard>
      <ProCard colSpan={'calc(100% - 423px)'} hoverable={false} loading={loading}>
        <Tabs defaultActiveKey="list">
          <Tabs.TabPane tab="设置内容" key="list" style={{ height: 597 }}>
            <List
              projectId={projectId}
              cardProps={{
                bodyStyle: { padding: 0 },
              }}
              scroll={{ y: 454, x: 828 }}
              onPreviewRegister={async (values: any) => {
                await createConfigRule({
                  data: {
                    preview_register: values,
                  },
                  project_id: projectId,
                });
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="留资表单" key="form" style={{ height: 597 }}>
            <RegisterTable
              cardProps={{
                bodyStyle: { padding: 0 },
              }}
              id={projectId}
              value={register}
              updaterRegister={updaterRegister}
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
                try {
                  await createConfigRule({
                    data: {
                      extend: {
                        expand: BasicsStyle?.data?.extend?.expand || 0,
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
          <Tabs.TabPane key="style" tab="基础设置">
            <Style projectId={projectId} />
          </Tabs.TabPane>
        </Tabs>
      </ProCard>
    </ProCard>
  );
};
