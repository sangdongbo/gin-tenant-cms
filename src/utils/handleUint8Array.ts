const handleUint8Array: any = (newArray: any) => {
  let str = '';
  let list = []
  if (newArray) {
    const valueUint8Array = new Uint8Array(newArray.split(','));
    const currentStr = new TextDecoder().decode(valueUint8Array);
    str = currentStr;
    if (currentStr.includes('<result_end><source_documents>')) {
      const currentStrArray: any = currentStr.split('<result_end><source_documents>');
      str = currentStrArray.shift() || '';
      try {
        list = JSON.parse(currentStrArray[0]);
      } catch (error) {
        console.error('RobotError', error)
      };
    };
    if (valueUint8Array.length <= 1) {
      str = newArray;
    };
  };

  return {
    text: str,
    list,
  };
};

export default handleUint8Array;
