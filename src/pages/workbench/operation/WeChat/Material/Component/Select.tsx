// import React, { useEffect } from 'react';
// import { ProFormSelect } from '@ant-design/pro-components';
// import { querySelectRule } from '../service';

// const Select: React.FC<any> = ({ name, width, rules, defaultParams, mode }) => {
//   return (
//     <>
//       <ProFormSelect
//         width={width}
//         mode={mode}
//         name={name}
//         label="素材"
//         rules={rules}
//         request={async (params) => await querySelectRule({ ...params, ...defaultParams })}
//       />
//     </>
//   );
// };

// Select.defaultProps = {
//   name: 'tags',
//   width: 'sm',
//   rules: [{ required: true }],
//   defaultParams: {},
//   mode: 'multiple',
// };

// export default Select;
import React, { useEffect, useState } from 'react';
import { Form, Button, Select, Tag, Modal } from 'antd';

import { querySelectRule } from '../service';

const GroupSelect: React.FC<any> = ({ defaultParams, ...props }) => {
  const [group, handleGroup] = useState<object[]>([]);

  useEffect(() => {
    handleSearch('');
  }, [defaultParams]);

  const handleSearch = (value: string) => {
    querySelectRule({ 'filter[name]': value, ...defaultParams }).then((result) =>
      handleGroup([...result]),
    );
  };

  return (
    <>
      <Select
        showSearch
        placeholder="点击输入名称"
        filterOption={false}
        onSearch={handleSearch}
        {...props}
        width="100%"
        allowClear
      >
        {group.map((item) => (
          <Select.Option key={item.value} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default GroupSelect;
