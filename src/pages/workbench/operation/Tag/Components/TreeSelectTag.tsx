import { useEffect, useState, useImperativeHandle } from 'react';
import { TreeSelect } from 'antd';
import { queryTreeSelectRule } from '../service';

const getCategoryTree = (data: any[], key = '0') => {
  for (let i = 0; i < data.length; i++) {
    data[i].key = `${key}-${i}`;
    if (!data[i].value) data[i].value = data[i].key;

    if (data[i].children) {
      getCategoryTree(data[i].children, data[i].key);
      data[i].disabled = true;
    }
  }
  return data;
};

export default ({ actionRef, value, ...props }: any) => {
  const [treeData, handleTreeData] = useState<any[]>([]);

  const onChange = (value: any) => {
    props?.onChange?.(value);
  };

  // const onReset = () => {
  //   onChange('');
  // };

  useImperativeHandle(actionRef, () => ({
    onChange,
  }));

  useEffect(() => {
    queryTreeSelectRule().then((result) => handleTreeData(getCategoryTree(result)));
  }, []);

  return (
    <>
      <TreeSelect
        style={{ width: '100%' }}
        value={value || []}
        {...props}
        onChange={onChange}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="选择标签"
        treeDefaultExpandAll
        treeNodeFilterProp="title"
        multiple
      />
    </>
  );
};
