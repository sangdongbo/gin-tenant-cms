import React, { useEffect, useState } from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import UploadForm from './UploadForm';
import CreateForm from './CreateForm';

const CreateMenu: React.FC<any> = ({ }) => {
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
          新建联系人 <DownOutlined />
        </Button>
      </Dropdown>

      <UploadForm visible={uploadVisible} onCancel={() => handleUploadVisible(false)} />
      <CreateForm visible={createVisible} onVisibleChange={handleCreateVisible} />
    </>
  );
};

export default CreateMenu;
