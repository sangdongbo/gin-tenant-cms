import { ProForm, ProFormText, ProFormDigit, ProFormSwitch } from '@ant-design/pro-components';
import TreeSelectTag from '@/pages/workbench/operation/Tag/Components/TreeSelectTag';
import ProFormAiFile from './ProFormAiFile';

export default ({ showDownload }: any) => {

  return (
    <>
      <ProFormText
        width="md"
        rules={[
          { required: true },
          { whitespace: true },
        ]}
        label="资料名称"
        name="title"
      />
      {
        showDownload ? (
          <>
            <ProFormSwitch
              width="md"
              name={["metadata", "is_recommend"]}
              label="显示资料"
              initialValue={1}
              getValueFromEvent={(event) => event ? 1 : 0}
              fieldProps={{
                checkedChildren: '开启',
                unCheckedChildren: '关闭',
              }}
            />
            <ProFormSwitch
              width="md"
              name={["metadata", "is_download"]}
              label="支持下载"
              getValueFromEvent={(event) => event ? 1 : 0}
              fieldProps={{
                checkedChildren: '开启',
                unCheckedChildren: '关闭',
              }}
            />
            <ProForm.Item name={["metadata", "tag_ids_download"]} label="下载标签" rules={[]} initialValue={[]}>
              <TreeSelectTag style={{ width: "328px" }} rules={[]} />
            </ProForm.Item>
            <ProFormDigit
              width="md"
              label="下载积分"
              name={["metadata", "lookstar_score_download"]}
              fieldProps={{ precision: 0 }}
            />
          </>
        ) : null
      }
      <ProFormAiFile
        name={['metadata', 'source']}
        IMMName="url"
      />
    </>
  )
}
