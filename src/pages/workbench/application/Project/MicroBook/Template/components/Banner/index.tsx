import { getUid } from '@/utils/uuid';
import type { ProColumns } from '@ant-design/pro-components';
import { DragSortTable, ModalForm } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Radio, Typography, Space } from 'antd';
import { useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import { PlusOutlined } from '@ant-design/icons';
import useRepairDragSortTable from '@/utils/useRepairDragSortTable';
import { createConfigRule } from '../../../../service';
import { addBannerRule } from '../../service';
import Form, { linkOptions } from './Form';

const handelValueEnum = (values: any[]) => {
  const obj = {};
  values.map((item) => {
    obj[item.value] = item.label;
  });
  return obj;
};

export default ({ id }: any) => {
  const { banner, updaterBanner, updaterPublishTime } = useModel('microbook', (model) => model);
  const { list, is_banner } = banner;
  const domRef = useRepairDragSortTable({ dataSource: list });
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState<any>(null);
  const actionRef = useRef<any>();
  const [publishLoading, setPublishLoading] = useState(false);

  const columns: ProColumns[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      render: (dom, record: any) => (
        <span style={{ marginLeft: 6, wordBreak: 'break-all' }}>{record.title}</span>
      ),
      width: 260,
    },
    {
      title: 'banner图',
      dataIndex: 'img',
      valueType: 'image',
      fieldProps: {
        width: 100,
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueEnum: handelValueEnum(linkOptions),
      valueType: 'select',
      width: 60,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (dom, record, index) => [
        <a
          key="edit"
          onClick={() => {
            setRow({
              ...record,
              editIndex: index,
            });
            setVisible(true);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定删除此项?"
          onConfirm={async () => {
            const currentList = JSON.parse(JSON.stringify(list));
            currentList.splice(index, 1);
            updaterBanner({
              list: currentList,
            });
          }}
        >
          <a style={{ color: 'red' }}>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const handleDragSortEnd = async (beforeIndex: number, afterIndex: number, newDataSource: any) => {
    updaterBanner({
      list: newDataSource,
    });
  };

  const upDateFinish = async (values: any) => {
    const currentList = JSON.parse(JSON.stringify(list));
    currentList[row.editIndex] = {
      project_id: id,
      ...values,
    };
    updaterBanner({
      list: currentList,
    });
    return true;
  };

  const addFinish = async (values: any) => {
    updaterBanner({
      list: [
        {
          customId: getUid(),
          project_id: id,
          ...values,
        },
        ...list,
      ],
    });

    return true;
  };

  return (
    <>
      <div ref={domRef}>
        <DragSortTable
          actionRef={actionRef}
          search={false}
          options={false}
          columns={columns}
          rowKey="customId"
          dataSource={list}
          pagination={false}
          cardProps={{
            bodyStyle: { padding: 0 },
          }}
          scroll={{
            x: 720,
            y: 408,
          }}
          toolBarRender={() => [
            <Space style={{ whiteSpace: 'nowrap' }}>
              轮播图设置:
              <Radio.Group
                value={is_banner}
                onChange={async (value) => {
                  updaterBanner({
                    is_banner: value?.target?.value,
                  });
                }}
              >
                <Radio value={1}>开启</Radio>
                <Radio value={0}>关闭</Radio>
              </Radio.Group>
            </Space>,
            <Button
              key="add"
              icon={<PlusOutlined />}
              onClick={() => {
                setVisible(true);
              }}
            >
              新建
            </Button>,
            <Button
              key="publish"
              type="primary"
              loading={publishLoading}
              onClick={async () => {
                setPublishLoading(true);
                try {
                  await addBannerRule({
                    project_id: id,
                    data: list,
                  });
                  await createConfigRule({
                    data: {
                      is_banner: is_banner,
                    },
                    project_id: id,
                  });
                  updaterPublishTime(new Date());
                  message.success('发布成功');
                } catch (error) { }
                setPublishLoading(false);
              }}
            >
              发布
            </Button>,
          ]}
          dragSortKey="sort"
          onDragSortEnd={handleDragSortEnd}
          debounceTime={10}
        />
      </div>
      <div style={{ padding: '24px 0 0' }}>
        <Typography.Text type="secondary">banner设置建议不超过6个内容</Typography.Text>
      </div>

      <ModalForm
        initialValues={row}
        modalProps={{
          destroyOnClose: true,
        }}
        title={row ? '修改' : '新建'}
        open={visible}
        onOpenChange={(visibleValue) => {
          setVisible(visibleValue);
          if (!visibleValue) setRow(null);
        }}
        onFinish={row ? upDateFinish : addFinish}
      >
        <Form />
      </ModalForm>
    </>
  );
};
