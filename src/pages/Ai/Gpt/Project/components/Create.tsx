import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormDependency,
} from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';

import { projectType } from '../index';
import { useEffect, useState } from 'react';
import { querySelectRule } from '../service';

interface PropsType extends ModalFormProps { }

export default (props: PropsType) => {
  const [relatedKnowledgeOptions, setRelatedKnowledgeOptions] = useState([]);

  useEffect(() => {
    querySelectRule({ 'filter[type]': 'wechat' }).then((result) => {
      setRelatedKnowledgeOptions(result);
    });
  }, []);

  return (
    <ModalForm
      modalProps={{
        destroyOnClose: true,
      }}
      width={400}
      {...props}
    >
      <ProFormText
        name="title"
        label="项目名称"
        fieldProps={{ maxLength: 16 }}
        extra="项目名称最多输入16个中文或英文"
        rules={[{ required: true }, { whitespace: true, message: '请输入项目名称' }]}
      />
      <ProFormSelect
        name="type"
        label="项目类型"
        options={projectType}
        initialValue="wechat"
        rules={[{ required: true }]}
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (['starshow', 'wechat'].includes(type)) {
            return (
              <ProFormSelect
                name="repository_project"
                label="关联知识库"
                options={relatedKnowledgeOptions}
                rules={[{ required: false }]}
              />
            );
          }
          return null; // 如果不是 wechat 类型，则不显示关联知识库表单项
        }}
      </ProFormDependency>
    </ModalForm>
  );
};
