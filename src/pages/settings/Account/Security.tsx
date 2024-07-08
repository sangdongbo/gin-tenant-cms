import { useState } from 'react';
import { useModel } from '@umijs/max';
import { List, Modal, Button } from 'antd';
// import { ProCard } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';
import {
  BindForm as EmailBindForm,
  CheckBindForm as EmailCheckBindForm,
  UnBindForm as EmailUnBindForm,
} from './components/Email';
import {
  BindForm as SmsBindForm,
  CheckBindForm as SmsCheckBindForm,
  UnBindForm as SmsUnBindForm,
} from './components/Sms';
import { EditForm as PassWordForm } from './components/PassWord';
import style from './index.less';

export default () => {
  const [bindEmailUnBindModalVisible, setBindEmailUnBindModalVisible] = useState(false);
  const [bindEditModalVisible, setBindEditModalVisible] = useState(false);
  const [bindEmailModalVisible, setBindEmailModalVisible] = useState(false);
  const [checkBindEmailModalVisible, setCheckBindEmailModalVisible] = useState(false);
  const [bindSmsUnBindModalVisible, setBindSmsUnBindModalVisible] = useState(false);
  const [bindSmsModalVisible, setBindSmsModalVisible] = useState(false);
  const [checkBindSmsModalVisible, setCheckBindSmsModalVisible] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
    }
  };

  const getData = () => [
    {
      title: '账户密码',
      actions: [
        <Button size="small" type="link" key="Modify" onClick={() => setBindEditModalVisible(true)}>
          修改
        </Button>,
      ],
    },
    {
      title: '绑定邮箱',
      description: initialState?.currentUser?.mask_email
        ? '已绑定：' + initialState?.currentUser?.mask_email
        : '当前未绑定邮箱',
      actions: [
        initialState?.currentUser?.email ? (
          <>
            <Button size="small" type="link" onClick={() => setCheckBindEmailModalVisible(true)}>
              更换
            </Button>
            <Button
              size="small"
              danger
              type="link"
              onClick={() => setBindEmailUnBindModalVisible(true)}
            >
              解除绑定
            </Button>
          </>
        ) : (
          <Button size="small" type="link" onClick={() => setBindEmailModalVisible(true)}>
            绑定
          </Button>
        ),
      ],
    },
    {
      title: '绑定手机号',
      description: initialState?.currentUser?.mask_phone
        ? '已绑定：' + initialState?.currentUser?.mask_phone
        : '当前未绑定手机号',
      actions: [
        initialState?.currentUser?.phone ? (
          <>
            <Button size="small" type="link" onClick={() => setCheckBindSmsModalVisible(true)}>
              更换
            </Button>
            <Button
              danger
              size="small"
              type="link"
              onClick={() => setBindSmsUnBindModalVisible(true)}
            >
              解除绑定
            </Button>
          </>
        ) : (
          <Button size="small" type="link" onClick={() => setBindSmsModalVisible(true)}>
            绑定
          </Button>
        ),
      ],
    },
  ];

  const data = getData();

  return (
    <ProCard title="安全设置">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <PassWordForm
        modalProps={{
          maskClosable: false,
        }}
        open={bindEditModalVisible}
        onOpenChange={setBindEditModalVisible}
        width={450}
        title="修改密码"
        fetchUserInfo={async () => await fetchUserInfo()}
      />
      <EmailBindForm
        modalProps={{
          maskClosable: false,
        }}
        open={bindEmailModalVisible}
        onOpenChange={setBindEmailModalVisible}
        width={350}
        title="绑定邮箱"
        fetchUserInfo={async () => await fetchUserInfo()}
      />
      <EmailCheckBindForm
        email={initialState?.currentUser?.mask_email}
        fetchUserInfo={async () => await fetchUserInfo()}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              className={style['security-modal']}
              maskClosable={false}
              title="修改邮箱"
              width={350}
              onCancel={() => setCheckBindEmailModalVisible(false)}
              open={checkBindEmailModalVisible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      />
      <EmailUnBindForm
        modalProps={{
          maskClosable: false,
        }}
        width={350}
        title="解除绑定邮箱"
        // onVisibleChange={setBindEmailUnBindModalVisible}
        // visible={bindEmailUnBindModalVisible}
        open={bindEmailUnBindModalVisible}
        onOpenChange={setBindEmailUnBindModalVisible}
        email={initialState?.currentUser?.mask_email}
        fetchUserInfo={async () => await fetchUserInfo()}
      />

      <SmsBindForm
        modalProps={{
          maskClosable: false,
        }}
        // visible={bindSmsModalVisible}
        // onVisibleChange={setBindSmsModalVisible}
        open={bindSmsModalVisible}
        onOpenChange={setBindSmsModalVisible}
        width={350}
        title="绑定手机号"
        fetchUserInfo={async () => await fetchUserInfo()}
      />
      <SmsCheckBindForm
        phone={initialState?.currentUser?.mask_phone}
        fetchUserInfo={async () => await fetchUserInfo()}
        onOpenChange={setCheckBindSmsModalVisible}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              className={style['security-modal']}
              maskClosable={false}
              title="解除绑定"
              width={350}
              onCancel={() => setCheckBindSmsModalVisible(false)}
              open={checkBindSmsModalVisible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      />
      <SmsUnBindForm
        modalProps={{
          maskClosable: false,
        }}
        phone={initialState?.currentUser?.mask_phone}
        // visible={bindSmsUnBindModalVisible}
        // onVisibleChange={setBindSmsUnBindModalVisible}
        open={bindSmsUnBindModalVisible}
        onOpenChange={setBindSmsUnBindModalVisible}
        width={350}
        title="解除绑定手机号"
        fetchUserInfo={async () => await fetchUserInfo()}
      />
    </ProCard>
  );
};
