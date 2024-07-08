import { useEffect, useRef, useState } from 'react';
import { Space, Button, Modal, Spin } from 'antd';
import { queryRule, getRule } from '../service';
import { CloseCircleOutlined } from '@ant-design/icons';

import { ProForm, ProFormDependency } from '@ant-design/pro-components';

import ArticleContent from './Content';

export default (props: any) => {
  const formRef = useRef<any>(null);
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [articleSelectKeys, setArticleSelectKeys] = useState<any[]>([]);

  const getRow = async (articleId: any) => {
    setLoading(true);
    try {
      const res = await getRule(articleId);
      setRow(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    };
  };

  useEffect(() => {
    const value = formRef.current?.getFieldValue(props.name);
    if (value && !row) {
      getRow(value).then(() => {
        setArticleSelectKeys([value]);
      }).catch(() => {
        // 无数据或者发布图文id无法找到
        setRow(null);
        formRef.current?.setFieldsValue({
          [props.name]: '',
        });
        setArticleSelectKeys([]);
      });
    };
  }, []);

  return <>
    <ProFormDependency name={[props.name]}>
      {(values: any, form) => {
        formRef.current = form;
        const currentVaule = values[props.name];
        if (!currentVaule) {
          setRow(null);
        };

        return (
          <>
            <ProForm.Item {...props}>
              <Spin spinning={loading}>
                {!currentVaule ? (
                  <Space size={[8, 16]} wrap>
                    <Button onClick={() => setVisible(true)}>点击选择文章</Button>
                  </Space>
                ) : null}
                {currentVaule && row ? (
                  <Space>
                    <div
                      style={{ width: 300, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(0, 0, 0, 0.06)', padding: '12px' }}
                      onClick={() => setVisible(true)}
                    >
                      <div style={{ width: 200 }}>{row.title}</div>
                      <img style={{ width: 80 }} src={row.thumb_url} />
                    </div>
                    <CloseCircleOutlined
                      style={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.45)' }}
                      onClick={() => {
                        // 删除数据
                        setRow(null);
                        form.setFieldsValue({
                          [props.name]: '',
                        });
                        setArticleSelectKeys([]);
                      }}
                    />
                  </Space>
                ) : null}
              </Spin>
            </ProForm.Item>
          </>
        );
      }}
    </ProFormDependency>


    <Modal
      destroyOnClose={true}
      footer={null}
      title="选择已发布内容"
      width={1000}
      open={visible}
      onCancel={() => setVisible(false)}
    >
      <ArticleContent
        rowSelection={{
          selectedRowKeys: articleSelectKeys,
          onSelect: (record: any, clickType: boolean) => {
            let currentKeys = [record.id];
            if (!clickType) {
              currentKeys = currentKeys.filter((item) => item != record.id);
            }
            setArticleSelectKeys(currentKeys);
          },
        }}
        request={queryRule}
        onOk={async ({ selectedRowKeys, selectedRows }: any) => {
          setVisible(false);
          setRow(selectedRows[0]);
          formRef.current?.setFieldsValue({
            [props.name]: selectedRowKeys[0],
          });
        }}
      />
    </Modal>
  </>
};
