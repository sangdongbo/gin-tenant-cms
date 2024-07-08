import { useEffect, useState, useRef } from 'react';
import { Divider, message } from 'antd';
import { useParams } from '@umijs/max';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard } from '@/components/BaseComponents';
import formOptionToValueenum from '@/utils/formOptionToValueenum';
import Form from './components/Form';
import BaseInfo from './components/BaseInfo';
import TouchEffect from './components/TouchEffect';
import { typeOptions } from '../components/FormContent';

import { getRule, updateRule } from '../service';

const typeEnum = formOptionToValueenum(typeOptions);


export default () => {
  const params = useParams();
  const id: any = params.id;

  const formRef = useRef<ProFormInstance>();
  const formFilterRef = useRef<ProFormInstance>();
  const [loading, setLoading] = useState(true);
  const [currentDetails, setCurrentDetails] = useState<any>(null);

  const onInit = async () => {
    const res = await getRule(id);

    // let wechat_cnt: any = '-';
    // if (res?.total?.wechat_cnt) {
    //   wechat_cnt = 0;
    //   const newData = JSON.parse(res?.total?.wechat_cnt);
    //   newData.forEach((item: any) => {
    //     wechat_cnt = wechat_cnt + Number(item.openid_cnt);
    //   });
    // };

    setCurrentDetails({
      ...res,
      total: {
        wechat_cnt: res?.total?.wechat_cnt === undefined ? '-' : res?.total?.wechat_cnt,
        mobile_cnt: res?.total?.mobile_cnt === undefined ? '-' : res?.total?.mobile_cnt,
        email_cnt: res?.total?.email_cnt === undefined ? '-' : res?.total?.email_cnt,
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    onInit();
  }, []);

  return (
    <ProCard loading={loading} direction="column" bodyStyle={{ padding: 0 }}>
      <ProCard split="vertical">
        <ProCard colSpan={12}>
          <BaseInfo
            title={typeEnum[currentDetails?.type]?.text}
            formRef={formRef}
            initialValues={currentDetails}
          />
        </ProCard>
        <ProCard colSpan={12}>
          <TouchEffect
            showPredict
            formFilterRef={formFilterRef}
            total={currentDetails?.total}
          // rowProps={{
          //   onClick: (item: any) => {
          //     switch (item.type) {
          //       // case 'wechat_cnt':
          //       //   history.push(`/workbench/operation/group/contacts/wechat/${id}`);
          //       //   break;
          //       case 'mobile_cnt':
          //         history.push(`/workbench/operation/group/contacts/mobile/${id}`);
          //         break;
          //       // case 'email_cnt':
          //       //   history.push(`/workbench/operation/group/contacts/email/${id}`);
          //       //   break;
          //     }
          //   }
          // }}
          />
        </ProCard>
      </ProCard>
      <ProCard style={{ paddingTop: 0 }} bodyStyle={{ paddingTop: 0 }}>
        <Divider style={{ margin: 0 }} />
        <Form
          formRef={formFilterRef}
          initialValues={{
            filter: currentDetails?.filter || [],
          }}
          submitter={{
            render: (_: any, doms: any[]) => {

              return doms.pop();
            },
          }}
          onFinish={async (formValue: any) => {
            const naseValues = await formRef.current?.validateFields();
            const { title } = naseValues;

            const res = await updateRule(id, {
              title,
              ...formValue,
            });

            setCurrentDetails(res);

            // let wechat_cnt = 0;
            // if (res?.total?.wechat_cnt) {
            //   const newData = JSON.parse(res?.total?.wechat_cnt);
            //   newData.forEach((item: any) => {
            //     wechat_cnt = wechat_cnt + Number(item.openid_cnt);
            //   });
            // }

            // setCurrentDetails({
            //   ...res,
            //   total: {
            //     wechat_cnt: res?.total?.mobile_cnt,
            //     mobile_cnt: res?.total?.mobile_cnt,
            //     email_cnt: res?.total?.email_cnt,
            //   }
            // });

            message.success('提交成功！');
            return true;
          }}
        />
      </ProCard>
    </ProCard>
  );
};
