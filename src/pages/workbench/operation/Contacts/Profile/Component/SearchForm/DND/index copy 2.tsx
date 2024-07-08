import React, { useRef, useState } from 'react';
import { Drawer } from 'antd';
import Container from './Container';


const Search: React.FC<any> = ({ visible, onVisibleChange, onFinish }) => {


  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        width={900}
        closable={false}
        onClose={() => onVisibleChange(false)}
        open={visible}
      >
        <Container />
      </Drawer>
    </>
  );
};
export default Search;
