import { useMemo } from 'react';
import { useModel, Link } from '@umijs/max';
import { ProForm, ProFormText, ProFormDependency, ProFormCheckbox, ProFormDigit } from '@ant-design/pro-components';
import TreeSelectTag from '@/pages/workbench/operation/Tag/Components/TreeSelectTag';
import UploadButton from '@/pages/settings/system/Resource/components/UploadButton';
import beforeUpload from '@/utils/beforeUpload';


const fileAccept = ['.jpg', '.png', '.jpeg', '.pdf', '.zip'];

export const fileType = [
  {
    label: '预览',
    value: '1',
  },
  {
    label: '下载',
    value: '2',
  },
];

export default () => {
  const { initialState }: any = useModel('@@initialState');
  const mailCofing = initialState?.mailCofing || {};

  const fileTypeData = useMemo(() => {
    let options = JSON.parse(JSON.stringify(fileType));
    let extra = null;
    // 邮箱没有配置禁止选择下载
    if (!mailCofing?.data?.host) {
      options[1].disabled = true;
      extra = <>您暂未配置邮箱，<Link to="/settings/system/config/mail">点击前往配置</Link></>;
    };
    return {
      options,
      extra,
    };
  }, [mailCofing]);

  return (
    <>
      <ProFormText name="title" label="资料名称" rules={[{ required: true }]} />
      <ProForm.Item name="tag_ids_prview" label="预览标签" rules={[]} initialValue={[]}>
        <TreeSelectTag width="100%" rules={[]} />
      </ProForm.Item>
      <ProFormDigit
        label="预览积分"
        name="lookstar_score_preview"
        fieldProps={{ precision: 0 }}
      />
      <ProForm.Item name="tag_ids_download" label="下载标签" rules={[]} initialValue={[]}>
        <TreeSelectTag width="100%" rules={[]} />
      </ProForm.Item>
      <ProFormDigit
        label="下载积分"
        name="lookstar_score_download"
        fieldProps={{ precision: 0 }}
      />
      <UploadButton
        fieldProps={{
          beforeUpload: (file: any) => beforeUpload(file, fileAccept),
        }}
        accept={fileAccept.join(',')}
        label="资料"
        name="file"
        rules={[{ required: true, message: '请上传资料' }]}
        max={1}
        extra={`推荐：资料大小不超过2M；格式：${fileAccept.join(',')}`}
        appSource="data_download"
      />
      <ProFormDependency name={['file']}>
        {({ file }) => {
          const fileTypeName: string = file ? file[0]?.type : '';

          return (
            <>
              {fileTypeName && !(fileTypeName.includes('/zip') || fileTypeName.includes('/x-zip-compressed') || fileTypeName.includes('/x-zip')) ? (
                <ProFormCheckbox.Group
                  name="file_type"
                  label="功能选择"
                  options={fileTypeData.options}
                  extra={fileTypeData.extra}
                  rules={[{ required: true, message: '请选择功能' }]}
                />
              ) : null}
            </>
          );
        }}
      </ProFormDependency>
    </>
  );
};
