import { cloneDeep } from 'lodash';

const swap = (arr: any[], index1: number, index2: number) => {
  let newArr = cloneDeep(arr);
  let temp = newArr[index1];
  newArr[index1] = newArr[index2];
  newArr[index2] = temp;
  return newArr;
};

export default swap;
