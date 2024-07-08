import { useSearchParams, useModel } from '@umijs/max';
import EditEmail from "@/components/EditEmail";
import { MailConfig as TipsMailConfig } from '@/components/Tips';

import { createRule, getRule } from './service';

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');
  const { emailRichText, updaterEmailRichText } = useModel('dataDownload', (model) => model);

  const previewHtml = `<table width="800"  border="0" align="center" cellSpacing="0" cellPadding="0">
      <tbody>
        <tr>
          <td width="33" colSpan="1" rowSpan="1">
            <img
              src="https://lookstar-landing.oss-cn-beijing.aliyuncs.com/uploads/tenant/202205/eidt-image-upload-1651739482717.png"
              alt="eidt-image-upload-1651739482717"
              data-href="https://lookstar-landing.oss-cn-beijing.aliyuncs.com/uploads/tenant/202205/eidt-image-upload-1651739482717.png"
              style="width: 10px;display: block;" />
          </td>
          <td colSpan="1" rowSpan="1" style="line-height: 1.5;padding: 10px 0;">
            测试资料一
            &nbsp;&nbsp;
            <a href="javascript:void(0)"
              style="text-decoration:underline">
              点击下载
            </a>
          </td>
        </tr>

        <tr>
          <td width="33" colSpan="1" rowSpan="1">
            <img
              src="https://lookstar-landing.oss-cn-beijing.aliyuncs.com/uploads/tenant/202205/eidt-image-upload-1651739482717.png"
              alt="eidt-image-upload-1651739482717"
              data-href="https://lookstar-landing.oss-cn-beijing.aliyuncs.com/uploads/tenant/202205/eidt-image-upload-1651739482717.png"
              style="width: 10px;display: block;" />
          </td>
          <td colSpan="1" rowSpan="1" style="line-height: 1.5;padding: 5px 0;">
            测试资料二
            &nbsp;&nbsp;
            <a href="javascript:void(0)"
              style="text-decoration:underline">
              点击下载
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <p></p>`;

  return (
    <TipsMailConfig>
      <EditEmail
        previewHtml={previewHtml}
        emailRichText={emailRichText}
        request={async () => {
          const { id, project_id, created_at, updated_at, tenant_id, ...res } = await getRule(projectId);
          return res;
        }}
        onValuesChange={(val: any) => {
          updaterEmailRichText(val);
        }}
        onFinish={async (formValue: any) => {
          await createRule({
            ...formValue,
            project_id: projectId
          });
        }}
      />
    </TipsMailConfig>
  );
};
