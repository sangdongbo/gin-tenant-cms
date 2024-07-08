import { useState } from 'react';
import { Modal } from 'antd';
import {
  ProList,
} from '@ant-design/pro-components';
import Card from './Card';

import { queryMaterialRule } from '../../../service';

export const Icon = (props: any) => {
  return (
    <div
      {...props}
      style={{
        paddingTop: 2,
        ...props.style,
      }}
    >
      <svg
        width={22}
        height={22}
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <path d="M936.228571 87.771429v848.457142H87.771429V87.771429h848.457142M950.857143 0H73.142857a73.142857 73.142857 0 0 0-73.142857 73.142857v877.714286a73.142857 73.142857 0 0 0 73.142857 73.142857h877.714286a73.142857 73.142857 0 0 0 73.142857-73.142857V73.142857a73.142857 73.142857 0 0 0-73.142857-73.142857z"></path><path d="M804.571429 621.714286m-43.885715 0l-497.371428 0q-43.885714 0-43.885715-43.885715l0 0q0-43.885714 43.885715-43.885714l497.371428 0q43.885714 0 43.885715 43.885714l0 0q0 43.885714-43.885715 43.885715Z"></path><path d="M512 819.2m-43.885714 0l-204.8 0q-43.885714 0-43.885715-43.885714l0 0q0-43.885714 43.885715-43.885715l204.8 0q43.885714 0 43.885714 43.885715l0 0q0 43.885714-43.885714 43.885714Z"></path><path d="M219.428571 204.8m36.571429 0l512 0q36.571429 0 36.571429 36.571429l0 146.285714q0 36.571429-36.571429 36.571428l-512 0q-36.571429 0-36.571429-36.571428l0-146.285714q0-36.571429 36.571429-36.571429Z"></path>
      </svg>
    </div>
  )
};

export default ({ appid, onFinish }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => setModalVisible(true)}
      >
        <Icon
          style={{
            paddingRight: 6,
          }}
        />
        图文消息
      </div>

      <Modal
        title="选择素材"
        destroyOnClose={true}
        open={modalVisible}
        // onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={null}
        bodyStyle={{
          padding: '0 24px'
        }}
        width={1000}
      >
        <ProList
          params={{
            appid,
            type: 'article',
          }}
          grid={{ gutter: 16, column: 5 }}
          request={queryMaterialRule}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
          renderItem={(item) => <Card
            className="card-border-hover reset-actions-border-none"
            style={{
              padding: 0,
              borderRadius: 12,
              cursor: 'pointer',
            }}
            data={item}
            onClick={() => {
              onFinish(item);
              setModalVisible(false);
            }}
          />}
          cardProps={{
            bodyStyle: {
              padding: '16px 0 0 0',
            }
          }}
        />
      </Modal>
    </div>
  )
}
