import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export const ItemTypes = 'DraggableBodyRow';

// 操作类型
export const optionsTyps = {
  didDrop: 'didDrop', // 拖拽出区域
  hover: 'hover',
  drop: 'drop', // 放置
};

// 数据类型
export const dataType = {
  group: 'group',
  child: 'child',
};

export const getChildParam = () => {};

export const getParam = (data: any, dragId: any, dropId: any) => {
  let dragRow, dropRow;
  let dragIndex, dropIndex;
  let dragParentIndex, dropParentIndex; // 拖拽子节点的父节点索引

  const getChildParam = (parentDom: any, i: number) => {
    const ele = parentDom.children || [];
    for (let j = 0; j < ele.length; j++) {
      const child = ele[j];

      if (child.id === dragId) {
        dragRow = child;
        dragIndex = j;
        dragParentIndex = i;
      }

      if (child.id === dropId) {
        dropRow = child;
        dropIndex = j;
        dropParentIndex = i;
      }
      if (child?.children) {
        getChildParam(child, j);
      }
    }
  };

  for (let i = 0; i < data.length; i++) {
    // 父节点拖拽
    const parentDom = data[i];
    if (parentDom.id === dragId) {
      dragRow = parentDom;
      dragIndex = i;
      dragParentIndex = null;
    }

    if (parentDom.id === dropId) {
      dropRow = parentDom;
      dropIndex = i;
      dropParentIndex = null;
    }

    // 子节点拖拽
    getChildParam(parentDom, i);
  }

  return {
    dragRow,
    dropRow,
    dragIndex,
    dropIndex,
    dragParentIndex,
    dropParentIndex,
  };
};

export const findFromData = (data: any, id: any) => {
  let row, index, parentIndex;

  const getChildParam = (parentDom: any, i: number) => {
    const ele = parentDom.children || [];
    for (let j = 0; j < ele.length; j++) {
      const child = ele[j];

      if (child.id === id) {
        row = child;
        index = j;
        parentIndex = i;
      }
      if (child?.children) {
        getChildParam(child, j);
      }
    }
  };

  for (let i = 0; i < data.length; i++) {
    // 父节点拖拽
    const parentDom = data[i];
    if (parentDom.id === id) {
      row = parentDom;
      index = i;
      parentIndex = null;
    }

    // 子节点拖拽
    getChildParam(parentDom, i);
  }

  return {
    row,
    index,
    parentIndex,
  };
};

export const DraggableBodyRow = ({
  record,
  dataSource,
  index,
  className,
  style,
  moveRow,
  findRow,
  ...restProps
}: any) => {
  if (!record) return null;

  const {
    row: originalRow,
    rowIndex: originalIndex,
    rowParentIndex: originalParentIndex,
  } = findRow(record.id);

  const itemObj = {
    id: record.id,
    parent_id: record.parent_id,
    index,
    isGroup: record.tree_type === dataType.group,
    originalRow, // 拖拽原始数据
    originalIndex, // 拖拽原始数据索引
    originalParentIndex, // 拖拽原始数据父节点索引
  };

  const isDrag = true;

  const ref = useRef();

  const [{ handlerId, isOver, dropClassName }, drop] = useDrop({
    accept: ItemTypes,
    collect: (monitor) => {
      const {
        id: dragId,
        parent_id: dropParentId,
        index: dragPreIndex,
        isGroup,
      } = monitor.getItem() || {};

      if (dragId === record.id) {
        return {};
      }

      // 是否可以拖拽替换
      let isOver: any = monitor.isOver();
      if (isGroup) {
        // 要覆盖的数据是分组，或者是最外层的子项可以替换，其他情况不可以
        const recordIsGroup = record.tree_type === dataType.group;
        if (!recordIsGroup) {
          isOver = false;
        }
      } else {
        // 要覆盖的数据是子项，但不在同分组不可以替换
        if (dropParentId !== record.parent_id) {
          isOver = false;
        }
      }

      return {
        isOver,
        dropClassName: dragPreIndex < index ? ' drop-over-downward' : ' drop-over-upward',
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: any) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const dropIndex = index;
      if (dragIndex === dropIndex) {
        return;
      }

      item.index = dropIndex;
    },
    drop: (item) => {
      const opt = {
        dragId: item.id, // 拖拽id
        dropId: record.id, // 要放置位置行的id
        dropParentId: record.parent_id,
        operateType: optionsTyps.drop,
      };
      moveRow(opt);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes,
    item: itemObj,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    // canDrag: (props, monitor) => isDrag //parent_id不为0的才可以拖拽
    end: (item: any, monitor: any) => {
      const { id: droppedId, originalRow } = item;
      const didDrop = monitor.didDrop();
      // 超出可拖拽区域，需要将拖拽行还原
      if (!didDrop) {
        const opt = {
          dragId: droppedId, // 拖拽id
          dropId: originalRow.id, // 要放置位置行的id
          dropParentId: originalRow.parent_id,
          originalIndex,
          originalParentIndex,
          operateType: optionsTyps.didDrop,
        };
        moveRow(opt);
      }
    },
  });

  drop(drag(ref));

  // 拖拽行的位置显示透明
  const opacity = isDragging ? 0 : 1;

  return (
    <tr
      ref={ref}
      className={`${className}
      ${isOver ? dropClassName : ''}
      ${isDrag ? 'can-drag' : ''}`}
      style={isDrag ? { cursor: 'move', opacity, ...style } : { ...style }}
      data-handler-id={handlerId}
      {...restProps}
    />
  );
};

export const findDataPath = (data: any[], id: number) => {
  const findChild = (data, id, index = []) => {
    index = index.slice();
    for (let i: number = 0; i < data.length; i++) {
      if (id === data[i].id) {
        index.push(i);
        return index;
      } else if (data[i].children) {
        index.push(i);
        let ret = findChild(data[i].children, id, index);
        if (ret) {
          return ret;
        }
        index.pop();
      }
    }
  };
  return findChild(data, id, []);
};

export const setDeepValue = (object, path, value) => {
  let fieldPath = [...path];
  if (fieldPath.length) {
    const key = fieldPath.shift();
    if (object[key]) {
      object[key] = {
        children: setDeepValue(object[key], fieldPath, value),
      };
    } else {
      object[key] = {};
      object[key] = {
        children: setDeepValue(object[key], fieldPath, value),
      };
    }
  } else {
    object = value;
  }

  return object;
};

export const getUpdateData = (keys: number[], value: any) => {
  const result = {} as any;
  keys.pop();
  setDeepValue(result, keys, value);

  return result;
};

export const getSortIds = (data: any, row: any) => {
  const ids = [] as number[];

  const findIds = (data: any[]) => {
    for (let i = 0; i < data.length; i++) {
      ids.push(data[i].id);
    }
  };

  const findChild = (data: any[]) => {
    for (let i = 0; i < data.length; i++) {
      if (row.parent_id == data[i].id) {
        findIds(data[i]['children']);
      } else {
        if (data[i]?.children) {
          findChild(data[i]?.children);
        }
      }
    }
  };

  if (row.parent_id == 0) {
    findIds(data);
  } else {
    findChild(data);
  }
  return ids;
};
