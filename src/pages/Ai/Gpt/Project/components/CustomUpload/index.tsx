import { Button, Popconfirm } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { isArray } from 'lodash';
import { ProTable } from "@/components/BaseComponents";
import getUrlName from '@/utils/getUrlName';
import { update } from '@/utils/upload';
import Create from "./Create";
import Update from './Update';

import { addRepositoryDataRule, queryRepositoryDataRule, updateRepositoryDataRule, removeRepositoryDataRule } from '../../../service';

// 更新md链接内容
const updateMD = async (formValue: any) => {
  const blob: any = new Blob([formValue?.md], { type: 'text/markdown' });
  const fileName = getUrlName(formValue?.url);
  const fileOptions: any = { type: blob.type, lastModified: new Date() };
  const markdownFile = new File([blob], fileName, fileOptions);
  const newMDData: any = await update(markdownFile, {
    app_source: 'ai',
    update_url: formValue?.url,
  });
  return newMDData.url;
};

// 处理特殊的表单库数据
const handleFormValue = (value: any) => {
  let currentValue: any = JSON.parse(JSON.stringify(value));
  currentValue.metadata = {
    ...currentValue.metadata,
    source: currentValue.metadata?.source?.file?.url
  };
  currentValue = {
    ...currentValue,
    url: currentValue?.url[0].url,
  };
  return currentValue;
};

export default ({ projectId, fieldProps }: any) => {
  const columns: ProColumns[] = [
    {
      title: '资料名称',
      dataIndex: 'title',
      key: 'filter[title]',
      width: 300
    },
    {
      title: '资料类型',
      dataIndex: 'type',
      width: 300,
      hideInSearch: true,
    },
    {
      title: '上传时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      hideInSearch: true,
      valueType: 'option',
      render: (dom: any, record: any, index: number, action) => {
        const initialValues: any = {
          title: record.title,
          url: [
            {
              url: record?.url,
              uid: "rc-upload-1692859433281-0",
              status: 'done',
              name: getUrlName(record?.url || record?.metadata?.source),
            }
          ]
        };
        if (record?.metadata) {
          initialValues.metadata = {
            ...record.metadata,
            source: {
              file: {
                url: record?.metadata?.source,
                uid: "rc-upload-1692859433282-1",
                status: 'done',
                name: getUrlName(record?.metadata?.source),
              },
            },
          };
        };

        if (record?.metadata?.tag_ids_download && !isArray(record?.metadata?.tag_ids_download)) {
          initialValues.metadata.tag_ids_download = record.metadata.tag_ids_download.split(',').map((it: any) => Number(it));
        };

        return [
          <Update
            key="update"
            initialValues={initialValues}
            fieldProps={fieldProps}
            trigger={<a>编辑</a>}
            onFinish={async ({ md, ...formValue }: any) => {
              const currentValues = handleFormValue(formValue);
              currentValues.url = await updateMD({ md, url: currentValues?.url });

              if (currentValues?.metadata?.tag_ids_download) {
                currentValues.metadata.tag_ids_download = currentValues.metadata.tag_ids_download.join(',');
              };

              await updateRepositoryDataRule(record.id, {
                ...currentValues,
                project_id: projectId
              });
              action?.reload();
              return true;
            }}
          />,
          <a key="preview" href={record?.metadata?.source} target="_blank">下载</a>,
          <Popconfirm
            key="delete"
            title="确定删除此项?"
            okText="确认"
            cancelText="取消"
            onConfirm={async () => {
              await removeRepositoryDataRule(record.id);
              action?.reload();
            }}
          >
            <a style={{ color: 'red' }}>
              删除
            </a>
          </Popconfirm>,
        ];
      },
    },
  ];

  return (
    <div style={{ minHeight: 520 }}>
      <ProTable
        params={{
          'filter[project_id]': projectId,
          'filter[source_type]': 'upload',
        }}
        request={queryRepositoryDataRule}
        toolBarRender={(action) => {
          return [
            <Create
              key="create"
              title="资料上传"
              trigger={<Button icon={<PlusOutlined />} type="primary">新建</Button>}
              fieldProps={fieldProps}
              onFinish={async ({ md, ...formValue }) => {
                const currentValues = handleFormValue(formValue);

                currentValues.url = await updateMD({ md, url: currentValues?.url });

                if (currentValues?.metadata?.tag_ids_download) {
                  currentValues.metadata.tag_ids_download = currentValues.metadata.tag_ids_download.join(',');
                };

                await addRepositoryDataRule({
                  ...currentValues,
                  project_id: projectId
                });
                action?.reload();
                return true;
              }}
            />
          ]
        }}
        columns={columns}
        toolbar={{
          className: "reset-pro-table-toolbar-padding0",
        }}
      />
    </div>
  );
};
