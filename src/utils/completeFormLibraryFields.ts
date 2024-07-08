// 把表单库返回的字段补全为前端判断的数据类型
const completeFormLibraryFields = (fields: any[]) => {
  return fields.map(item => {
    let { created_at, tenant_id, updated_at, ...it }: any = item;
    it.show = 1;

    // 手机无法编辑和显示
    if (item.name == "phone") {
      it = {
        ...it,
        "prohibitdelete": 1,
        "prohibitrequired": 1,
        "prohibithide": 1
      };
    };
    // 联系人字段前端的区分方案
    if (['system','custom'].includes(item.type)) {
      it = {
        ...it,
        "contacts_field_name": item.name,// 前端区分是联系人的还是项目自己的字段使用
      };
    };
    return it;
  });
};

export default completeFormLibraryFields;
