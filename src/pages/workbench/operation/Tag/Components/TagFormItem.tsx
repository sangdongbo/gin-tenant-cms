import React, { useEffect, useState } from 'react';
import { Form, Tag } from 'antd';
import { querySelectRule } from '../../Tag/service';
import TreeSelectTag from './TreeSelectTag';

const TagFormItem: React.FC<any> = ({ value, onChange }) => {
  const [tag, handleTag] = useState<any>([]);
  const [relationData, handleRelationData] = useState<any>([]);

  useEffect(() => {
    handleSearch('');
  }, []);

  useEffect(() => {
    let nowRelationData: any = [];
    tag.map((item) => {
      if (value.includes(item.value)) {
        nowRelationData.push({ id: item.value, name: item.label });
      }
    });
    handleRelationData([...nowRelationData]);
  }, [value, tag]);

  const handleSearch = (name: string) => {
    querySelectRule({ 'filter[name]': name }).then((result) => {
      handleTag([...result]);
    });
  };

  const handleDelete = (id: number) => {
    let nowRelationData = JSON.parse(JSON.stringify(relationData));
    let newData = nowRelationData.filter((item) => {
      return id != item.id;
    });
    handleOnChange(newData);
  };

  const handleOnSelect = (value) => {
    let nowRelationData = JSON.parse(JSON.stringify(relationData));
    let isShow = false;
    nowRelationData.map((item) => {
      if (item.id == value) {
        isShow = true;
      }
    });
    if (isShow) {
      return;
    }
    tag.map((item) => {
      if (item.value == value) {
        nowRelationData.push({ id: item.value, name: item.label });
      }
    });

    handleOnChange(nowRelationData);
  };

  const handleOnChange = (nowData: any) => {
    handleRelationData(nowData);
    let data_ids: any = nowData.map((item) => item.id);
    onChange([...data_ids]);
  };

  return (
    <>
      <Form.Item>
        <TreeSelectTag multiple={false} onChange={handleOnSelect} />
      </Form.Item>
      <Form.Item>
        {relationData.map((item, index) => (
          <Tag closable visible onClose={() => handleDelete(item.id)}>
            {item.name}
          </Tag>
        ))}
      </Form.Item>
    </>
  );
};

TagFormItem.defaultProps = {
  value: [],
};

export default TagFormItem;
