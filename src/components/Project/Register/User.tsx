import { querySelectRule } from '@/pages/workbench/operation/WeChat/Authorizer/service';
import ProTable from '@/components/BaseComponents/ProTable';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState, useImperativeHandle } from 'react';
import {
  getContactsFieldsRule as getFormRule,
  queryContactsRule as queryRule,
} from '@/pages/workbench/application/Project/service';
import { stringify } from 'qs';

export default ({
  projectId,
  actionRef,
  searchInitReset,
  getFormRuleRequest,
  columns: baseColumns,
  params: baseParams,
  exportParams,
  handlerExportParams,
  ...props
}: any) => {
  const ref = useRef<any>();
  const [searchParmas, setSearchParmas] = useState<any>({});

  const [columns, setColumns] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [showExport, setShowExport] = useState(false);
  const [handleAddress, setHandleAddress] = useState<any>(null);

  const handlerColumns = (result: any) => {
    const beseData: any[] = [
      ...(baseColumns || []),
      {
        title: '公众号',
        dataIndex: ['source', 'appid'],
        key: 'filter[source->appid]',
        valueType: 'select',
        width: 150,
        request: querySelectRule,
        render(dom: any, record: any) {
          if (!record?.source?.appid || record?.source?.appid == 'undefined') return '-';
          return dom;
        },
      },
    ];

    if (result?.data) {
      const t: any[] = beseData;
      const newHandleAddress: any[] = [];

      result.data.map((item: any) => {
        const columnsItem: any = {};
        if (item.form_type === 'address' && item.level === 'full_address') {
          newHandleAddress.push(item.name);
        }
        if (item.name === 'full_name' || item.name === 'phone') {
          columnsItem.width = 100;
        } else {
          columnsItem.width = 150;
        }

        if (item.form_type === 'address') {
          if (item.level == 'province') {
            columnsItem.width = 120;
          }
          if (item.level == 'city') {
            columnsItem.width = 150;
          }
          if (item.level == 'district') {
            columnsItem.width = 250;
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
              return (
                <div
                  dangerouslySetInnerHTML={{
                    __html: value.map((item: any) => item?.replace('#_#', '：')).join('<br/>'),
                  }}
                />
              );
            }

            if (['radio', 'select'].includes(item.form_type) && value) {
              return value?.replace('#_#', '：');
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
        valueType: 'dateTimeRange',
        render(text: any, record: any) {
          return dayjs(record?.created_at).format('YYYY.MM.DD HH:mm:ss');
        },
      });

      setHandleAddress(newHandleAddress);

      setColumns(t);
      setLoading(undefined);
      ref.current?.reload();
    } else {
      setColumns(beseData);
      setLoading(undefined);
    }
  };

  const init = async (params?: any) => {
    if (getFormRuleRequest) {
      getFormRuleRequest(params).then((result: any) => {
        handlerColumns(result);
      });
    } else {
      getFormRule(projectId).then((result: any) => {
        handlerColumns(result);
      });
    }
  };

  const calculationColumnsWidth = () => {
    let width: number = 300;
    columns.forEach((item: any) => {
      if (item.width) width += item.width;
    });
    return width;
  };

  useImperativeHandle(actionRef, () => {
    return {
      reload(params: any) {
        init(params);
      },
    };
  });

  useEffect(() => {
    init();
  }, [projectId]);

  return (
    <div>
      {columns.length > 0 ? (
        <ProTable
          loading={loading}
          actionRef={ref}
          columns={columns}
          scroll={{
            x: calculationColumnsWidth(),
          }}
          rowKey="id"
          params={{
            'filter[project_id]': projectId,
            ...baseParams,
          }}
          toolBarRender={() => {
            if (showExport) {
              return [
                <Button
                  key="export"
                  icon={<DownloadOutlined />}
                  onClick={() => {
                    let urlString: any = {
                      token: localStorage.getItem('lookstar-tenant-token'),
                      tenant: localStorage.getItem('lookstar-tenant-X-Tenant'),
                      ...(exportParams || {}),
                    };
                    if (searchParmas['filter[start_time]']) {
                      urlString = {
                        ...urlString,
                        'filter[start_time]': searchParmas['filter[start_time]'],
                        'filter[end_time]': searchParmas['filter[end_time]'],
                      };
                    }
                    if (searchParmas['filter[source->appid]']) {
                      urlString = {
                        ...urlString,
                        'filter[source->appid]': searchParmas['filter[source->appid]'],
                      };
                    }
                    urlString = {
                      ...urlString,
                      ...(handlerExportParams?.(searchParmas) || {}),
                    };
                    window.location.href = `${API_URL}/tenant/project/contacts/export/${projectId}?${stringify(
                      urlString,
                    )}`;
                  }}
                >
                  导出
                </Button>,
              ];
            }
            return [];
          }}
          request={async ({ created_at, ...params }) => {
            if (created_at?.length) {
              params['filter[start_time]'] = created_at[0];
              params['filter[end_time]'] = created_at[1];
            }

            setSearchParmas(params);
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
                }
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
          {...props}
        />
      ) : null}
    </div>
  );
};
