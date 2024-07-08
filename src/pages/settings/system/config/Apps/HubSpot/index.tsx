import { useState, useRef, useEffect } from 'react';
import ProTable from '@/components/BaseComponents/ProTable';
import { Button, Modal, Radio } from 'antd';
import formOptionToValueenum from '@/utils/formOptionToValueenum';
import {
  formTypeOptions,
  systemFormType,
} from '@/pages/workbench/operation/Contacts/Field/components/Form';
import InfoDescriptions from './components/InfoDescriptions';
import { queryContactsFieldRule, addAuthConfigRule } from './service';
import { getHubSpotRule } from '../../service';
import FieldForm from './components/FieldForm';

export default () => {
  const actionRef = useRef<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState<any>(null);
  const [state, setState] = useState(null);
  const [authDetails, setAuthDetails] = useState({});

  const columns = [
    {
      title: '字段名称',
      dataIndex: 'label',
    },
    {
      title: '字段类型',
      valueEnum: formOptionToValueenum([...formTypeOptions, ...systemFormType]),
      dataIndex: 'form_type',
    },
    {
      title: '字段提示语',
      dataIndex: 'placeholder',
    },
    {
      title: '字段验证',
      dataIndex: ['rule', 'label'],
    },
    {
      title: 'HubSpot字段',
      dataIndex: 'hubspot_field_label',
    },
    {
      title: '操作',
      dataIndex: 'action',
      hideInSearch: true,
      valueType: 'option',
      render: (dom: any, record: any) => {
        return (
          <a
            key="edit"
            onClick={() => {
              setRow(record);
              setVisible(true);
            }}
          >
            设置
          </a>
        );
      },
    },
  ];

  useEffect(() => {
    getHubSpotRule().then((res) => {
      setAuthDetails(res.data);
      setState(Number(res.data.status));
    });
  }, []);

  return (
    <>
      <ProTable
        headerTitle="HubSpot设置"
        actionRef={actionRef}
        search={false}
        columns={columns}
        request={async () => {
          const res = await queryContactsFieldRule();
          return {
            data: res,
          };
        }}
        rowKey="id"
        pagination={false}
        options={false}
        toolBarRender={() => [
          <>
            {state != null ? (
              <>
                同步状态：
                <Radio.Group
                  key="state"
                  value={state}
                  onChange={async (e) => {
                    addAuthConfigRule({
                      status: e?.target?.value,
                    });
                    setState(e?.target?.value);
                  }}
                >
                  <Radio value={1}>开启</Radio>
                  <Radio value={0}>关闭</Radio>
                </Radio.Group>
              </>
            ) : null}
          </>,
          <Button key="auth" type="primary" onClick={() => setIsModalVisible(true)}>
            授权信息
          </Button>,
        ]}
      />

      <FieldForm
        visible={visible}
        initialValues={{
          hubspot_field_label: row?.hubspot_field_label || '',
          hubspot_field_name: row?.hubspot_field_name || '',
          hubspot_field_type: row?.hubspot_field_type || 'contact',
        }}
        setVisible={setVisible}
        contactsFieldName={row?.name}
        onSuccess={() => actionRef?.current?.reload()}
      />

      <Modal
        title="授权信息"
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        width={700}
      >
        <InfoDescriptions dataSource={authDetails} />
      </Modal>
    </>
  );
};
