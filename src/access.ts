export default function access(initialState: { currentUser?: any | undefined }) {
  const { currentUser } = initialState || {};

  return {
    canAdmin: () => currentUser?.is_admin, // 只有管理员可访问
    canProject: () => currentUser?.permission?.includes('project'), // initialState 中包含了的路由才有权限访问
    canTag: () => currentUser?.permission?.includes('tag'),
    canWechat: () => currentUser?.permission?.includes('wechat'),
    canContacts: () => currentUser?.permission?.includes('contacts'),
    canAI: () => currentUser?.permission?.includes('ai'),
    canAd: () => currentUser?.permission?.includes('ad'),
    canDataCenter: () => currentUser?.permission?.includes('data-center'),
    canPush: () => currentUser?.permission?.includes('push'),
    canForms: () => currentUser?.permission?.includes('forms'),
  };
}
