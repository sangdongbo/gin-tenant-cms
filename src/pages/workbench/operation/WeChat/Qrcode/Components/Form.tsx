import {
  ProForm,
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDependency,
  ProFormDigit,
} from '@ant-design/pro-components';

import Select from '@/pages/workbench/operation/WeChat/Authorizer/Components/ProFormSelect';
// import SelectTag from '../../../Tag/Components/SelectTag';
import TreeSelectTag from '../../../Tag/Components/TreeSelectTag';
import SelectMaterial from '../../Material/Component/SelectMaterial';

export default ({ type, ...props }: any) => {
  return (
    <>
      <ModalForm {...props}>
        <Select
          label="选择公众号"
          disabled={props?.initialValues?.appid ? true : false}
          name="appid"
          rules={[{ required: true, message: '请选择公众号' }]}
        />
        <ProFormText
          label="二维码名称"
          name="name"
          rules={[{ required: true }, { whitespace: true, message: '请输入二维码名称' }]}
        />

        <ProFormDependency name={['appid']}>
          {({ appid }) => {
            return (
              <SelectMaterial
                disabled={!appid}
                label="选择素材"
                appid={appid}
                rules={[{ required: true, message: '请选择素材' }]}
                fieldProps={{
                  maxLength: 3,
                  linkProps: {
                    listProps: {
                      grid: {
                        gutter: 8,
                        column: 4,
                      },
                    },
                  },
                  textProps: {
                    listProps: {
                      grid: {
                        gutter: 8,
                        column: 4,
                      },
                    },
                  },
                }}
              />
            );
          }}
        </ProFormDependency>

        {/* <SelectTag name="tag_ids" width="100%" rules={[]} /> */}
        <ProForm.Item name="tag_ids" label="标签">
          <TreeSelectTag width="100%" rules={[]} />
        </ProForm.Item>
        <ProFormDigit
          label="积分"
          name="lookstar_score"
          fieldProps={{ precision: 0 }}
        />
        <ProFormTextArea
          label="备注"
          name="remark"
          fieldProps={{ showCount: true, maxLength: 255 }}
        />
      </ModalForm>
    </>
  );
};
