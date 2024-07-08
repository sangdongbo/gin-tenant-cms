export default ({ title, fieldsDataValue, fieldsDataOptions }: any) => {
  const fieldsValue = fieldsDataValue?.fields_data?.fields || [];
  const systemFieldsValue = fieldsDataValue?.fields_data?.system_fields || [];
  const newFieldsOptions: any[] = [];
  const newSystemFieldsVOptions: any[] = [];

  fieldsValue.forEach((item: any) => {
    fieldsDataOptions?.fields.forEach((it: any) => {
      if (item == it.value) {
        newFieldsOptions.push(it);
      };
    });
  });

  systemFieldsValue.forEach((item: any) => {
    fieldsDataOptions?.system_fields.forEach((it: any) => {
      if (item == it.value) {
        newSystemFieldsVOptions.push(it);
      };
    });
  });

  // const fieldsOptions = fieldsDataOptions?.fields?.filter((item: any) => fieldsValue?.includes(item?.value));
  // const systemFieldsVOptions = fieldsDataOptions?.system_fields?.filter((item: any) => systemFieldsValue?.includes(item?.value));

  return <div>
    项目名称：{title}<br />
    {newFieldsOptions?.map((item: any) => {
      return <>
        {item?.label}：xxx<br />
      </>
    })}
    {newSystemFieldsVOptions?.map((item: any) => {
      return <>
        {item?.label}：xxx<br />
      </>
    })}
  </div>;
};
