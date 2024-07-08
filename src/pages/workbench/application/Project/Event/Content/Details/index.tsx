import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useParams, useModel, history, request } from '@umijs/max';
import { Button, Affix, Space, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { stringify } from 'qs';
import ProCard from '@/components/BaseComponents/ProCard';
import styles from '../style.less';
import { BaseForm } from '../components/Details';
import ModuleManagement from '../components/ModuleManagement';
import ModuleManagementSave from '../components/ModuleManagement/Save';
import Breadcrumb from '../components/ModuleManagement/Breadcrumb';

import useNoticePreview from '@/utils/useNoticePreview';

import { addRule, getRule } from '../service';

interface PropsType {

}

const handelerAddress = (moduleManagementMenu: any[], value: boolean) => {
  let currentValue = JSON.parse(JSON.stringify(moduleManagementMenu));
  currentValue = currentValue.map((item: any) => {
    if (item.value == 'before') {
      item.children = item.children.map((it: any) => {
        if (it.value == 'address') {
          it.hide = value;
        }
        return it;
      })
    };
    return item;
  });
  return currentValue;
}

const Management: React.FC<PropsType> = (props: any) => {
  const previewRef = useRef<any>(null);
  const [iframeLoad, setIframeLoad] = useState(false);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const projectId: any = searchParams.get('id');
  const eventId: any = searchParams.get('event_id');
  const { baseFormRef, moduleManagementMenu, updaterPreviewData, previewData, eventDetails, updaterEventDetails, setModuleManagementMenu } = useModel('event', (model) => model);

  useNoticePreview(previewRef, 'previewData', previewData);

  useEffect(() => {
    // 判断iframe是否加载完毕
    if (iframeLoad) {
      getRule(eventId).then(res => {
        if (res.type == 1) {
          setModuleManagementMenu(handelerAddress(moduleManagementMenu, true));
        };
        if (res.type == 2) {
          setModuleManagementMenu(handelerAddress(moduleManagementMenu, false));
        };
        updaterEventDetails(res);

        // 预览数据更新
        updaterPreviewData({
          details: res,
        });
      });
    };
  }, [iframeLoad]);

  return (
    <div>
      <ProCard
        split="vertical"
        headerBordered
        title={<Space>
          <ArrowLeftOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              history.push(`/workbench/application/project/event/basic/content?id=${projectId}&menu=list`);
            }}
          />
          活动编辑
        </Space>}
        extra={(
          <Button
            type="primary"
            loading={loading}
            onClick={() => baseFormRef.current?.submit()}
          >
            保存
          </Button>
        )}
      >
        <ProCard colSpan="424px" hoverable={false}>
          <Affix offsetTop={76}>
            <div className={styles.mobile}>
              <div id="mobile-title" className={styles['mobile-title']}></div>
              <iframe
                ref={previewRef}
                src={`${ACTIVITY_CENTER}/preview/details?${stringify({
                  id: eventId,
                  project: projectId,
                  token: localStorage.getItem('lookstar-tenant-token'),
                  tenant: localStorage.getItem('lookstar-tenant-X-Tenant'),
                })}`}
                frameBorder="0"
                style={{ width: '100%', height: '100%' }}
                onLoad={() => setIframeLoad(true)}
              />
            </div>
          </Affix>
        </ProCard>
        <ProCard
          colSpan="calc(100% - 423px)"
          hoverable={false}
          split="horizontal"
          bodyStyle={{ padding: 0 }}
        >
          <ProCard
            title="基础信息管理"
            loading={!eventDetails?.id}
          >
            <BaseForm
              formRef={baseFormRef}
              initialValues={{
                ...eventDetails,
                _meetingTime: eventDetails?.start_time || eventDetails?.end_time ? [dayjs(eventDetails.start_time), dayjs(eventDetails.end_time)] : undefined,
              }}
              onValuesChange={(_: any, allValues: any) => {
                if (allValues.type == 1) {
                  setModuleManagementMenu(handelerAddress(moduleManagementMenu, true));
                };
                if (allValues.type == 2) {
                  setModuleManagementMenu(handelerAddress(moduleManagementMenu, false));
                };
                updaterPreviewData({
                  details: {
                    ...previewData?.details,
                    ...allValues,
                  },
                });
              }}
              onFinish={async (formValues: any) => {
                setLoading(true);
                await addRule({
                  project_id: projectId,
                  id: eventId,
                  ...formValues,
                });
                setLoading(false);
                message.success('保存成功');
                return true;
              }}
            />
          </ProCard>
          <ProCard title={<Breadcrumb />} extra={<ModuleManagementSave />}>
            <ModuleManagement eventId={eventId} projectId={projectId} />
          </ProCard>
        </ProCard>
      </ProCard>
    </div>
  );
};

export default Management;
