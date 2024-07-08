import { Space, Tag, Empty } from 'antd';
import { useModel } from '@umijs/max';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProCard } from '@/components/BaseComponents';

export default () => {
  const { params: { project_ids }, updaterParams } = useModel('analyze', (model) => model);

  return (
    <ProCard bordered >
      <div
        id="scrollableDiv"
        style={{
          height: 188,
          overflow: 'auto',
          paddingBottom: 12,
        }}
      >
        <InfiniteScroll
          dataLength={project_ids?.length}
          scrollableTarget="scrollableDiv"
          next={() => { }}
          hasMore={true}
          loader={<></>}
        >
          <Space wrap>
            {
              project_ids.map((item: any, index) => {
                return (
                  <Tag
                    key={index}
                    closable
                    onClose={(e) => {
                      e.preventDefault();
                      const currentProjectIds = project_ids.filter((it: any) => {
                        return it.value != item.value;
                      })
                      updaterParams({
                        project_ids: currentProjectIds,
                      });
                    }}
                  >
                    {item.label}
                  </Tag>
                );
              })
            }
          </Space>
        </InfiniteScroll>
        {
          project_ids?.length == 0 ? (
            <div style={{ position: 'absolute', backgroundColor: '#ffffff', borderRadius: 15, zIndex: 10, left: 0, top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', }}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          ) : null
        }
      </div>
    </ProCard>
  )
}
