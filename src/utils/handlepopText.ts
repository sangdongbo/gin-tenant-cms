const handlepopText = (text: any, split: boolean) => {
  text = `${text}`;
  let currentText = text;
  if (text && split) {
    const textArrays = text.split('');
    textArrays.pop();
    currentText = textArrays.join('');
  };
  return currentText
};

export default handlepopText;
