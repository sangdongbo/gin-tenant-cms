import React, { useState } from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import UploadForm from './UploadForm';
import CreateForm from './CreateForm';

const CreateMenu: React.FC<any> = ({ onFinish }) => {
  const [uploadVisible, handleUploadVisible] = useState<boolean>(false);
  const [createVisible, handleCreateVisible] = useState<boolean>(false);

  return (
    <>
      <Dropdown
        key="menu"
        overlay={
          <Menu>
            <Menu.Item key="1" onClick={() => handleUploadVisible(true)}>
              批量导入
            </Menu.Item>
            <Menu.Item key="2" onClick={() => handleCreateVisible(true)}>
              手动新建
            </Menu.Item>
          </Menu>
        }
      >
        <Button>
          新建 <DownOutlined />
        </Button>
      </Dropdown>

      <UploadForm
        visible={uploadVisible}
        onVisibleChange={handleUploadVisible}
        onFinish={onFinish}
      />
      <CreateForm
        visible={createVisible}
        onVisibleChange={handleCreateVisible}
        onFinish={onFinish}
      />
    </>
  );
};

export default CreateMenu;
