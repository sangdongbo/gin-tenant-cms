import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from '@umijs/max';
import User from '@/components/Project/Register/User';
import completeFormLibraryFields from '@/utils/completeFormLibraryFields';
import { getContactsFieldsRule as getFormsContactsFieldsRule } from '@/pages/workbench/material/Forms/service';
import { queryAllRule, queryFieldsUrlEventRule } from '../Content/service';

export default () => {
  const userRef = useRef<any>();
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');
  const eventId: any = searchParams.get('event_id');
  const [eventOptions, setEventOptions] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    queryAllRule({
      'filter[project_id]': projectId,
      sort: '-state,-created_at',
    }).then((res) => {
      setEventOptions(
        res.map((item: any) => ({
          label: item.title,
          value: item.id,
        })),
      );
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {!loading ? (
        <User
          actionRef={userRef}
          projectId={projectId}
          searchInitReset={true}
          getFormRuleRequest={async (formValue: any) => {
            let event_id = eventId || eventOptions?.[0]?.value;
            if (formValue && formValue['filter[event_id]'])
              event_id = formValue['filter[event_id]'];
            const fields = await queryFieldsUrlEventRule(event_id);
            // 如果有设置表单库，则获取表单库数据，重置当前保存的 Fields （因为表单库可以在任意项目中修改）
            if (fields?.forms_id) {
              const newList = await getFormsContactsFieldsRule({
                'filter[forms_id]': fields.forms_id,
              });
              fields.data = completeFormLibraryFields(newList);
            }
            return fields;
          }}
          onSubmit={(formValue: any) => {
            userRef.current.reload(formValue);
          }}
          columns={[
            {
              title: '活动',
              dataIndex: 'event_id',
              key: 'filter[event_id]',
              valueType: 'select',
              width: 200,
              initialValue: Number(eventId) || eventOptions?.[0]?.value,
              fieldProps: {
                allowClear: false,
                options: eventOptions,
              },
            },
          ]}
          handlerExportParams={(searchParams: any) => {
            return {
              'filter[event_id]': searchParams['filter[event_id]'],
            };
          }}
        />
      ) : null}
    </div>
  );
};
