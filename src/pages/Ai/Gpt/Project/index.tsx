import { Button, Dropdown, message, Popconfirm } from 'antd';
import { history } from '@umijs/max';
import { FormOutlined, EyeOutlined, AppstoreOutlined, LineChartOutlined } from '@ant-design/icons';
import Project from '@/components/Project';
import formOptionToValueenum from '@/utils/formOptionToValueenum';
import Create from './components/Create';
import { queryRule, addRule, removeRule } from './service';

export const projectType = [
  {
    label: 'WeChat GPT',
    value: 'wechat',
  },
  {
    label: 'Sales GPT',
    value: 'sales_gpt',
  },
  {
    label: '星拓',
    value: 'starshow',
  },
];

export default () => {
  return (
    <div>
      <Project
        className="reset-pro-list-padding-top0"
        ghost
        headerTitle="GPT"
        containerStyle={{
          padding: 0,
        }}
        request={(params) => queryRule({ 'filter[type]': 'ai', ...params })}
        toolBarRender={(action) => {
          return [
            <Create
              key="create"
              title="创建GPT"
              trigger={<Button type="primary">创建</Button>}
              onFinish={async (formValue) => {
                const res = await addRule(formValue);
                if (formValue.type == 'starshow') {
                  history.push(`/ai/gpt/project/starshow/basic/ai-config?id=${res.id}`);
                }
                if (formValue.type == 'wechat') {
                  history.push(`/ai/gpt/project/wechat/basic/ai-config?id=${res.id}`);
                }
                if (formValue.type == 'sales_gpt') {
                  history.push(`/ai/gpt/project/sales/basic/ai-config?id=${res.id}`);
                }
                message.success('创建成功');
                action?.reload();
                return true;
              }}
            />,
          ];
        }}
        actionsRender={(dom: any, record: any, index: any, action: any) => {
          return (
            <div
              style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px 6px' }}
            >
              <Button
                className="reset-text-hover"
                size="small"
                type="text"
                icon={<EyeOutlined style={{ fontSize: 14, color: '#9da0aa' }} />}
                onClick={() => {
                  history.push(`/ai/gpt/project/wechat/basic/preview?id=${record.id}`);
                }}
              >
                预览
              </Button>
              <Button
                className="reset-text-hover"
                size="small"
                type="text"
                icon={<FormOutlined style={{ fontSize: 14, color: '#9da0aa' }} />}
                onClick={() => {
                  history.push(`/ai/gpt/project/${record.type}/basic/ai-config?id=${record.id}`);
                }}
              >
                编辑
              </Button>
              <Dropdown
                key="dropdown"
                menu={{
                  items: [
                    {
                      key: 'delete',
                      label: (
                        <Popconfirm
                          title="确定要删除吗?"
                          onConfirm={async () => {
                            await removeRule(record.id);
                            action?.reload();
                          }}
                        >
                          <div>删除</div>
                        </Popconfirm>
                      ),
                    },
                  ],
                }}
              >
                <Button
                  className="reset-text-hover"
                  size="small"
                  type="text"
                  icon={<AppstoreOutlined style={{ fontSize: 14, color: '#9da0aa' }} />}
                >
                  操作
                </Button>
              </Dropdown>
            </div>
          );
        }}
        onItem={(entity) => {
          return {
            onClick: () => {
              if (entity.type == 'starshow') {
                history.push(`/ai/gpt/project/starshow/basic/settings?id=${entity.id}`);
              }
              if (entity.type == 'wechat') {
                history.push(`/ai/gpt/project/wechat/basic/settings?id=${entity.id}`);
              }
              if (entity.type == 'sales_gpt') {
                history.push(`/ai/gpt/project/sales/basic/settings?id=${entity.id}`);
              }
            },
          };
        }}
        handleTypeEnum={() => {
          return formOptionToValueenum(projectType);
        }}
        search={false}
        pagination={{ defaultPageSize: 12, showSizeChanger: false }}
        itemCardProps={{
          style: { padding: '0' },
        }}
      />
    </div>
  );
};
