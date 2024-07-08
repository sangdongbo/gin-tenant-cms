const clearRichTextTag = (value) => {
  if (!value) {
    return "";
  }
  return value.replace(/<.*?>/g, "");
};

export default clearRichTextTag;
