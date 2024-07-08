import { Button } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import { ProTitle, ProCard } from '@/components/BaseComponents';
import { BaseProCard } from '@/components/Dashboard';
import BaseCondition from './Condition';
import Result from './Result';

export default () => {
  const formRef = useRef<any>();
  const { params, updaterParams } = useModel('analyze', (model) => model);

  const conditionDom = useMemo(() => {
    return (
      <BaseCondition
        formRef={formRef}
        initialValues={{
          time: [params.start_time, params.end_time],
        }}
        onValuesChange={(changedValues: any, values: any) => {
          if (changedValues?.project_ids || changedValues.time?.length) {
            updaterParams({
              project_ids: values.project_ids,
              start_time: values.time[0],
              end_time: values.time[1],
            });
          };
        }}
      />
    );
  }, []);

  useEffect(() => {
    formRef.current?.setFieldValue('project_ids', params.project_ids);
  }, [params.project_ids]);

  return (
    <BaseProCard row={2} split="vertical">
      <ProCard
        title={<ProTitle
          titleIocn={null}
          title="筛选"
        />}
        headStyle={{ padding: '0' }}
      >
        {conditionDom}
      </ProCard>
      <ProCard
        title={<ProTitle
          titleIocn={null}
          title={`已筛选项目（${params?.project_ids?.length || 0}个）`}
        />}
        subTitle="推荐最多选择10个项目"
        extra={<Button onClick={() => updaterParams({ project_ids: [] })}>清空</Button>}
        style={{ height: '100%', padding: '0 12px 0 20px' }}
        headStyle={{ padding: '0' }}
      >
        <Result />
      </ProCard>
    </BaseProCard>
  )
}
