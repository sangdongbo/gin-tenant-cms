import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { Button, Space, Empty, Modal } from 'antd';
import Card from './Card';
import Select from '@/pages/workbench/operation/WeChat/Authorizer/Components/Select';
import { ProCard } from '@/components/BaseComponents';

import styles from './styles.less';

import { queryRule, getSyncRule } from '../service';


const Content = ({ onFinish }: any) => {
  const [appid, setAppid] = useState<string>();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [asyncLoading, setAsyncLoading] = useState(false);

  const getDataSource = async () => {
    setLoading(true);
    const res = await queryRule({
      appid,
    });
    // 空数据不展示
    setDataSource(res.filter((item: any) => item.example));
    setLoading(false);
  };

  useEffect(() => {
    if (appid) getDataSource();
  }, [appid]);

  return (
    <>
      <ProCard
        extra={<Space>
          <div>
            选择公众号：
            <Select
              selectFirst
              value={appid}
              onChange={setAppid}
              allowClear={false}
              name="appid"
              parmas={{
                'filter[type]': 1,
              }}
              rules={[{ required: true }]}
            />
          </div>
          <Button
            type="primary"
            loading={asyncLoading}
            onClick={async () => {
              setAsyncLoading(true);
              await getSyncRule({
                appid,
              });
              await getDataSource();
              setAsyncLoading(false);
            }}
          >
            同步模版
          </Button>
        </Space>}
      >
        <Masonry
          breakpointCols={{
            default: 4,
          }}
          className={styles["masonry-grid"]}
          columnAttrs={{ style: { '--test': 'test' } }}
        >
          {
            dataSource.map(item => {
              return (
                <Card
                  className="card-border-hover reset-actions-border-none"
                  style={{
                    width: 220,
                    padding: 0,
                    borderRadius: 12,
                    cursor: 'pointer',
                  }}
                  data={item}
                  onClick={() => {
                    onFinish?.(item);
                  }}
                />
              )
            })
          }
        </Masonry>
        {
          !dataSource?.length ? (
            <div style={{ padding: 14, display: 'flex', justifyContent: 'center' }}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          ) : null
        }
      </ProCard>
    </>
  )
};


export default ({ onFinish }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        选择模版
      </Button>
      <Modal
        title="选择模板"
        zIndex={1004}
        width={1000}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Content
          onFinish={async (value: any) => {
            await onFinish(value);
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </div>
  )
}
