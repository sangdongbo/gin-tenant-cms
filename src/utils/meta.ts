export const addMeta = (metaId: any, name: any, content: any) => {
  const meta = document.createElement('meta');
  meta.content = content;
  meta.id = metaId;
  meta.name = name;
  document.getElementsByTagName('head')[0].appendChild(meta);
};

// 只有meta上有id的才可以使用改方法
export const deleteMeta = (metaId: any) => {
  document.getElementById(metaId)?.remove();
};
