import React, { useEffect, useState } from 'react';
import { Form, Button, Select, Tag, Modal } from 'antd';

import { queryAllRule } from '../service';

const GroupSelect: React.FC<any> = (props) => {
  const [group, handleGroup] = useState<object[]>([]);

  useEffect(() => {
    handleSearch('');
  }, []);

  const handleSearch = (value: string) => {
    queryAllRule({ 'filter[name]': value }).then((result) => handleGroup([...result]));
  };

  return (
    <>
      <Select
        showSearch
        placeholder="点击输入分组"
        filterOption={false}
        onSearch={handleSearch}
        {...props}
        width="100%"
        allowClear
      >
        {group.map((item) => (
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default GroupSelect;
