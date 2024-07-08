const getUrlName = (url: string) => {
  url = url || '';
  if (!url.includes('/')) return '';

  return url.substring(url.lastIndexOf("/") + 1);
};

export default getUrlName
