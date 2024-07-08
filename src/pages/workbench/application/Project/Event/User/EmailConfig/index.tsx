import { useState, useCallback } from 'react';
import { useSearchParams, useModel } from '@umijs/max';
import EditEmail from "@/components/EditEmail";
import { MailConfig as TipsMailConfig } from '@/components/Tips';
import EmailConfigForms from '@/components/EditEmail/EmailConfigForms';

import { addContactsConfigRule, queryContactsConfigRule, queryBasicRule } from '../../../service';


export default () => {
  const { userRegisterEmailRichText }: any = useModel('global', (model) => model);
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  const [emailRichText, setEmailRichText] = useState(userRegisterEmailRichText);

  const updaterEmailRichText = useCallback((playload: any) => {
    setEmailRichText((values: any) => {
      const currentValues = JSON.parse(JSON.stringify(values));
      const { editHtml, ...value } = playload;
      if (editHtml) {
        currentValues[currentValues.clickKey] = editHtml;
      };
      return {
        ...currentValues,
        ...value,
      };
    });
  }, []);

  const previewHtml = false;

  return (
    <TipsMailConfig>
      <EditEmail
        forms={<EmailConfigForms projectId={projectId} />}
        previewHtml={previewHtml}
        emailRichText={emailRichText}
        parmas={{
          'filter[project_id]': projectId,
        }}
        request={async (parmas: any) => {
          let { tenant_id, id, project_id, updated_at, created_at, ...res } = await queryContactsConfigRule(parmas);
          const basicData: any = await queryBasicRule(projectId);
          res.title = res?.title || '新用户注册提醒';
          res.alisa_title = res?.alisa_title || basicData?.title;
          return res;
        }}
        postData={({ content, emails, cc_emails, ...formValue }: any) => {
          return {
            ...formValue,
            header: content,
            emails: emails.map((item: any) => ({ email: item })),
            cc_emails: cc_emails.map((item: any) => ({ email: item })),
          };
        }}
        onValuesChange={updaterEmailRichText}
        onFinish={async ({ clickKey, footer, header, emails, cc_emails, ...formValue }: any) => {
          await addContactsConfigRule({
            ...formValue,
            content: header,
            project_id: projectId,
            emails: emails.map((item: any) => item.email),
            cc_emails: cc_emails.map((item: any) => item.email),
          });
        }}
      />
    </TipsMailConfig>
  );
};
