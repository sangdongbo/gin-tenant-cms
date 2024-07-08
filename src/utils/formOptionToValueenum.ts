
// 转换form的option 为 tabel的valueenum
const formOptionToValueenum = (formOption: any[]) => {
  const value: any = {};
  formOption.forEach((item) => {
    value[item.value] = {
      text: item.label,
    };
  });
  return value;
}
export default formOptionToValueenum;
