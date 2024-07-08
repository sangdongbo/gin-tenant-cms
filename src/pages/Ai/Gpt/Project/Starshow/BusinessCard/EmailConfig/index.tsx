import { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useModel } from '@umijs/max';
import EditEmail from "@/components/EditEmail";
import EmailConfigForms from '@/components/EditEmail/EmailConfigForms';
import PreviewExtraDom from '@/components/EditEmail/PreviewExtraDom';
import { MailConfig as TipsMailConfig } from '@/components/Tips';

import { addContactsConfigRule, queryContactsConfigRule, queryBasicRule } from '../../../service';
import { formList } from '../index';

export default () => {
  const previewHtml = false;
  const { userRegisterEmailRichText }: any = useModel('global', (model) => model);
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');
  const [details, setDetails] = useState<any>({});
  const [fieldsDataOptions, setFieldsDataOptions] = useState<any>({
    fields: [],
    system_fields: [],
  });

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

  useEffect(() => {
    setFieldsDataOptions({
      fields: formList.map((item: any) => {
        return {
          label: item?.title,
          value: item?.dataIndex[1],
        }
      }),
      system_fields: [],
    });
  }, [])

  return (
    <TipsMailConfig>
      <EditEmail
        forms={<EmailConfigForms
          projectId={projectId}
          hideFieldsData={true}
        />}
        previewHtml={previewHtml}
        previewExtra={<PreviewExtraDom
          title={details?.title}
          fieldsDataValue={{
            ...emailRichText,
            fields_data: {
              fields: fieldsDataOptions.fields.map((item: any) => item.value),
              system_fields: [],
            },
          }}
          fieldsDataOptions={fieldsDataOptions}
        />}
        emailRichText={emailRichText}
        params={{
          'filter[project_id]': projectId,
        }}
        request={async (params: any) => {
          let { tenant_id, id, project_id, updated_at, created_at, ...res } = await queryContactsConfigRule(params);
          const basicData: any = await queryBasicRule(projectId);
          setDetails(basicData);
          res.title = res?.title || '新用户注册提醒';
          res.alisa_title = res?.alisa_title || basicData?.title;
          return res;
        }}
        postData={({ content, emails, cc_emails, ...formValue }: any) => {
          return {
            ...formValue,
            header: content || emailRichText.header,
            emails: emails?.map((item: any) => ({ email: item })),
            cc_emails: cc_emails?.map((item: any) => ({ email: item })),
          };
        }}
        onValuesChange={updaterEmailRichText}
        onFinish={async ({ clickKey, footer, header, emails, cc_emails, ...formValue }: any) => {
          await addContactsConfigRule({
            ...formValue,
            content: header,
            project_id: projectId,
            emails: emails?.map((item: any) => item.email),
            cc_emails: cc_emails?.map((item: any) => item.email),
          });
        }}
      />
    </TipsMailConfig>
  );
};
