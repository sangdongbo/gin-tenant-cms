import { useContext, useEffect, useState } from 'react';
import { Empty, Spin } from 'antd';
import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';
import getUrlName from '@/utils/getUrlName';

import { ProFormToastEditor } from '@/components/BaseComponents';

import { addDocConvertMDRule } from '../../../../service';

import Content from './content';

interface CustomEditPropsType {
  value?: any;
  onChange?: any;
  watchValue?: any;
  name?: any;
}

interface PropsType extends ProFormItemProps {
  fieldProps?: CustomEditPropsType;
  watchName?: any;
}

const ProFormEdit = ({ fieldProps, watchName, ...props }: PropsType) => {
  const form = ProForm.useFormInstance();
  const watchValue = ProForm.useWatch(watchName, form);
  const value = ProForm.useWatch(props?.name, form);
  const mdValue = ProForm.useWatch("md", form);
  const { conetntSize }: any = useContext(Content);
  const [loading, setLoading] = useState(false);

  const pdfConvertMD = (url: string) => {
    if (/\.mp4$/i.test(url)) {
      setLoading(false);
      return;
    }
    setLoading(true);
    addDocConvertMDRule({ url }).then(res => {
      form?.setFieldValue(props?.name, [
        {
          url: res?.url,
          uid: 'rc-upload-1692859433281-2',
          name: getUrlName(res?.url),
        }
      ]);
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (watchValue?.file?.url && !value?.length) {
      pdfConvertMD(watchValue?.file?.url);
    };
  }, [watchValue, value]);

  useEffect(() => {
    if (value?.length && value[0]?.url && !mdValue) {
      // url获取md内容
      fetch(`${value[0]?.url}?time=${new Date().getTime()}`)
        .then(response => response.text())
        .then(markdown => {
          form?.setFieldValue("md", markdown);
        });
    };
  }, [value]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* 隐藏设置url */}
      <ProForm.Item name={props?.name} noStyle />
      {!watchValue ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据，请先上传资料" />
      ) : null}
      {watchValue?.file && watchValue?.file?.status == 'done' ? (
        <Spin spinning={loading}>
          <ProFormToastEditor
            {...props}
            name="md"
            height={conetntSize?.height - 41 - 32}
          />
        </Spin>
      ) : null}
    </div>
  );
};

export default ProFormEdit;
