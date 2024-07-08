import { useEffect, useState } from 'react';
import { Popconfirm, message, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  ProForm,
  DragSortTable,
  ModalForm,
  ProFormText,
  ProFormCheckbox,
  ProFormDependency,
  ProFormDigit,
} from '@ant-design/pro-components';
import TreeSelectTag from '@/pages/workbench/operation/Tag/Components/TreeSelectTag';
import UploadButton from '@/pages/settings/system/Resource/components/UploadButton';
import beforeUpload from '@/utils/beforeUpload';

const fileAccept = ['.jpg', '.png', '.jpeg', '.pdf'];

const fileType = [
  {
    label: '预览',
    value: '1',
  },
  {
    label: '下载',
    value: '2',
  },
];

const FormDom = () => {
  return (
    <>
      <ProFormText name="title" label="资料名称" rules={[{ required: true }]} />
      <ProForm.Item name="tag_ids_prview" label="预览标签" rules={[]} initialValue={[]}>
        <TreeSelectTag width="100%" rules={[]} />
      </ProForm.Item>
      <ProFormDigit label="预览积分" name="lookstar_score_preview" fieldProps={{ precision: 0 }} />
      {/* <ProForm.Item name="tag_ids_download" label="下载标签" rules={[]} initialValue={[]}>
        <TreeSelectTag width="100%" rules={[]} />
      </ProForm.Item>
      <ProFormDigit
        label="下载积分"
        name="lookstar_score_download"
        fieldProps={{ precision: 0 }}
      /> */}
      <UploadButton
        fieldProps={{
          beforeUpload: (file: any) => beforeUpload(file, fileAccept),
        }}
        accept={fileAccept.join(',')}
        label="资料"
        name="file"
        rules={[{ required: true, message: '请上传资料' }]}
        max={1}
        extra={`推荐：资料大小不超过2M；格式：${fileAccept.join(',')}`}
        appSource="data_download"
      />
      <ProFormDependency name={['file']}>
        {({ file }) => {
          const fileTypeName: string = file ? file[0]?.type : '';
          return (
            <>
              {fileTypeName &&
                !(
                  fileTypeName.includes('/zip') ||
                  fileTypeName.includes('/x-zip-compressed') ||
                  fileTypeName.includes('/x-zip')
                ) ? (
                <ProFormCheckbox.Group
                  hidden
                  name="file_type"
                  label="功能选择"
                  options={fileType}
                  initialValue={['1']}
                  rules={[{ required: true, message: '请选择功能' }]}
                />
              ) : null}
            </>
          );
        }}
      </ProFormDependency>
    </>
  );
};

const Create = (props: any) => {
  return (
    <ModalForm
      title="新建资料"
      trigger={
        <Button icon={<PlusOutlined />} type="dashed" block style={{ marginTop: 10 }}>
          新建
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      {...props}
    >
      <FormDom />
    </ModalForm>
  );
};

const Edit = (props: any) => {
  return (
    <ModalForm
      title="编辑资料"
      trigger={<a>编辑</a>}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      {...props}
    >
      <FormDom />
    </ModalForm>
  );
};

const CustomProDragTable = ({ value, onChange, onDragSortEnd }: any) => {
  const [dataSource, setDatasource] = useState([]);

  const columns: ProColumns[] = [
    {
      title: '名称',
      dataIndex: 'sort',
      // width: 285,
      render: (dom, record) => (
        <span style={{ marginLeft: 6, wordBreak: 'break-all' }}>{record.title}</span>
      ),
    },
    // {
    //   title: '创建时间',
    //   valueType: 'dateTime',
    //   dataIndex: 'created_at',
    //   search: false,
    // },
    {
      title: '操作',
      valueType: 'option',
      width: 270,
      fixed: 'right',
      render: (dom, record, index) => {
        return [
          <Edit
            key="edit"
            width={500}
            initialValues={record}
            onFinish={async (formValue: any) => {
              const currentList = JSON.parse(JSON.stringify(dataSource));
              currentList[index] = formValue;
              onChange(currentList);
              return true;
            }}
          />,
          <Popconfirm
            key="delete"
            title="确定删除此项?"
            onConfirm={async () => {
              const currentList = JSON.parse(JSON.stringify(dataSource));
              currentList.splice(index, 1);
              onChange(currentList);
            }}
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>,
        ];
      },
    },
  ];

  const handleDragSortEnd = (beforeIndex: number, afterIndex: number, newDataSource: any) => {
    setDatasource(newDataSource);
    onDragSortEnd?.(newDataSource);
    onChange(newDataSource);
    message.success('修改列表排序成功');
  };

  useEffect(() => {
    setDatasource(value || []);
  }, [value]);

  return (
    <div>
      <DragSortTable
        cardProps={{
          bodyStyle: { padding: 0 },
        }}
        search={false}
        columns={columns}
        options={false}
        rowKey="title"
        pagination={false}
        dataSource={dataSource}
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd}
      />
      <Create
        width={500}
        onFinish={async (formValue: any) => {
          onChange([formValue, ...dataSource]);
          return true;
        }}
      />
    </div>
  );
};

const ProFormTable = (props: any) => {
  return (
    <ProForm.Item {...props}>
      <CustomProDragTable {...props} />
    </ProForm.Item>
  );
};

export default ProFormTable;
