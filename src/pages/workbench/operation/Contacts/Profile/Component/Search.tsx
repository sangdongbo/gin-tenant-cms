import React, { useState } from 'react';
import { Button } from 'antd';

import SearchForm from './SearchForm/Form';

const Search: React.FC<any> = ({ handleParams }) => {
  const [visible, handleVisible] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    handleParams({ filter: values });
    return true;
  };

  return (
    <>
      <Button type="primary" onClick={() => handleVisible(true)}>
        高级搜索
      </Button>
      <SearchForm visible={visible} onVisibleChange={handleVisible} onFinish={onFinish} />
    </>
  );
};

export default Search;
