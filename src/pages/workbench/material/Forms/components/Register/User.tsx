import { querySelectRule } from '@/pages/workbench/operation/WeChat/Authorizer/service';
import ProTable from '@/components/BaseComponents/ProTable';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import {
  getContactsFieldsRule as getFormRule,
  queryContactsRule as queryRule,
  queryContactsProjectsRule
} from '../../service';

export default ({ formsId }: any) => {
  const { initialState }: any = useModel('@@initialState');
  const ref = useRef<any>();
  const [columns, setColumns] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [showExport, setShowExport] = useState(false);
  const [handleAddress, setHandleAddress] = useState<any>(null);

  const init = async () => {
    const beseData: any[] = [
      {
        title: '公众号',
        dataIndex: ['source', 'appid'],
        key: 'filter[source->appid]',
        valueType: 'select',
        width: 200,
        fieldProps: {
          options: initialState.authorizer,
        },
        render(dom: any, record: any) {
          if (!record?.source?.appid || record?.source?.appid == 'undefined') return '-';
          return dom;
        },
      },
      {
        title: '项目标题',
        dataIndex: ['project', 'title'],
        key: 'filter[project_id]',
        valueType: 'select',
        width: 200,
        request: (params: any) => queryContactsProjectsRule(formsId, params),
      },
    ];

    getFormRule({
      'filter[forms_id]': formsId
    }).then((result: any) => {
      if (result) {
        const t: any[] = beseData;
        const newHandleAddress: any[] = [];

        result.map((item: any) => {
          const columnsItem: any = {};
          if (item.form_type === 'address' && item.level === 'full_address') {
            newHandleAddress.push(item.name);
          }
          if (item.name === 'full_name' || item.name === 'phone') {
            columnsItem.width = 120;
          } else {
            columnsItem.width = 150;
          }

          if (item.form_type === 'address') {
            if (item.level == 'province') {
              columnsItem.width = 150;
            }
            if (item.level == 'city') {
              columnsItem.width = 250;
            }
            if (item.level == 'district') {
              columnsItem.width = 350;
            }
            if (item.level == 'full_address') {
              columnsItem.width = 450;
            }
          }

          t.push({
            ...columnsItem,
            title: item.label,
            dataIndex: ['data', item.name],
            search: false,
            render: (text: any, record: any) => {
              const value = record.data[item.name];
              if (item.form_type === 'date_range' && value && value.length > 1) {
                return `${value[0]} 至 ${value[1]}`;
              }

              if (item.form_type === 'date' && value) {
                return value;
              }

              if (item.form_type === 'checkbox' && value && value.length > 0) {
                return value.join('，');
              }

              if (item.form_type === 'address' && item.level == 'full_address') {
                let full_address = '';
                full_address = record?.data[`${item.name}_full_address`];

                return (
                  <>
                    <div>{text instanceof Array ? text.join('-') : text}</div>
                    <div>详细地址：{full_address}</div>
                  </>
                );
              }

              return text instanceof Array ? text.join('-') : text;
            },
          });
        });

        t.push({
          title: '注册时间',
          dataIndex: 'created_at',
          valueType: 'dateTime',
          search: false,
        });

        setHandleAddress(newHandleAddress);

        setColumns(t);
        setLoading(undefined);
        ref.current?.reload();
      } else {
        setColumns(beseData);
        setLoading(undefined);
      }
    });
  };

  const calculationColumnsWidth = () => {
    let width: number = 300;
    columns.forEach((item: any) => {
      if (item.width) width += item.width;
    });
    return width;
  };

  useEffect(() => {
    init();
  }, [formsId]);

  return (
    <div>
      <ProTable
        loading={loading}
        actionRef={ref}
        columns={columns}
        scroll={{
          x: calculationColumnsWidth(),
        }}
        rowKey="id"
        params={{
          'filter[forms_id]': formsId,
          include: ['project'].join(', '),
        }}
        toolBarRender={() => {
          if (showExport) {
            return [
              <Button
                key="export"
                icon={<DownloadOutlined />}
                onClick={() => {
                  window.location.href = `${API_URL}/tenant/forms/contacts/export/${formsId}?token=${localStorage.getItem(
                    'lookstar-tenant-token',
                  )}&tenant=${localStorage.getItem('lookstar-tenant-X-Tenant')}`;
                }}
              >
                导出
              </Button>,
            ];
          }
          return [];
        }}
        request={async (params) => {
          const result: any = await queryRule(params);

          const data: any[] = [];
          result.data.forEach((item: any) => {
            const itemKeys = Object.keys(item.data);
            const field: any = {};
            itemKeys.map((it: any) => {
              // 判断当前数据是否在脱敏数据里面，如果不在在取原数据。
              field[it] = item.mask_data[it] || item.data[it];
              if (handleAddress && handleAddress.includes(it)) {
                const full_address = item.data[it].pop();
                field[it] = item.data[it];
                field[`${it}_full_address`] = full_address;
              };
            });
            data.push({
              ...item,
              data: field,
            });
          });
          result.data = data;
          if (data.length > 0) {
            setShowExport(true);
          }
          return result;
        }}
      />
    </div>
  );
};
