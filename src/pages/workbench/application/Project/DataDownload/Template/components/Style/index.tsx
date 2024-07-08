// import useNoticePreview from '@/utils/useNoticePreview';
import { ProForm, ProFormText, ProFormRadio } from '@ant-design/pro-components';
import { message } from 'antd';
import { Upload } from '@bluedot-tech/bluedot-antd';
// import { useEffect, useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import { createConfigRule } from '../../../../service';
import Color from './Color';

import ProRow from '@/components/BaseComponents/ProRow';

export default ({ projectId }: any) => {
  const { style: BasicsStyle, register, updaterStyle } = useModel('dataDownload', (model) => model);

  return (
    <ProForm
      initialValues={{
        data: BasicsStyle,
      }}
      onFinish={async (values) => {
        // const extend = configData?.extend || {};
        const formValues = { ...values };
        formValues.data.extend = {
          privacy_policy_url: register?.privacy_policy || [],
          ...formValues.data.extend,
        };
        await createConfigRule({
          ...formValues,
          project_id: projectId,
        });
        message.success('发布成功');
      }}
      onValuesChange={(changeValues) => {
        updaterStyle(changeValues?.data || {});
      }}
      submitter={{
        render: (_, dom) => dom.pop(),
      }}
    >
      <ProRow>
        <ProRow.Col span={12}>
          <ProFormText name={['data', 'title']} label="页面标题" rules={[{ required: true }]} />
        </ProRow.Col>
        <ProRow.Col span={12}>
          <ProFormText name={['data', 'banner', 'title']} label="banner标题" />
        </ProRow.Col>
        <ProRow.Col span={12}>
          <ProForm.Item
            className="reset-upload-imgcrop"
            label="logo设置"
            name={['data', 'logo']}
            rules={[{ required: true }]}
            help="图片建议不大于500k"
          >
            <Upload.ImgCrop showImgCrop={false} />
          </ProForm.Item>
        </ProRow.Col>
        <ProRow.Col span={12}>
          <ProForm.Item
            className="reset-upload-imgcrop"
            label="banner"
            name={['data', 'banner', 'image']}
            help="图片建议不大于500k，图片比例：390 * 200"
          >
            <Upload.ImgCrop
              imgCropProps={{
                aspect: 390 / 200,
              }}
            />
          </ProForm.Item>
        </ProRow.Col>
        <ProRow.Col span={12}>
          <ProForm.Item
            name={['data', 'color']}
            label="主题颜色"
            rules={[{ required: true, message: '请选择主体颜色' }]}
          >
            <Color />
          </ProForm.Item>
        </ProRow.Col>
        <ProRow.Col span={12}>
          <ProFormRadio.Group
            name={['data', 'extend', 'expand']}
            label="资料是否全部展开"
            rules={[{ required: true }]}
            options={[
              {
                label: '不展开',
                value: 0,
              },
              {
                label: '展开',
                value: 1,
              },
            ]}
            initialValue={0}
          />
          {/* <ProForm.Item
            name={['data', 'extend', 'expand']}
            label="主题颜色"
            rules={[{ required: true, message: '请选择主体颜色' }]}
          >
            <ProFormRadio.Group
              name="type"
              label="项目类型"
              options={projectType}
              rules={[{ required: true }]}
              initialValue="landing"
            />
          </ProForm.Item> */}
        </ProRow.Col>
      </ProRow>
    </ProForm>
  );
};
