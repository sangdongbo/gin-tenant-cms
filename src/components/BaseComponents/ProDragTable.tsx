import { ProTable } from '@ant-design/pro-components';
import type { ParamsType } from '@ant-design/pro-provider';
import type { ProTableProps } from '@ant-design/pro-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useCallback } from 'react';
import update from 'immutability-helper';

import {
  DraggableBodyRow,
  dataType,
  optionsTyps,
  findFromData,
  getParam,
  findDataPath,
  getUpdateData,
  getSortIds,
} from './utils';

/**
 * isDrag：是否可以拖动
*/
interface T extends Record<string, any> { }
interface U extends ParamsType { }
interface ValueType { }

interface PropsType extends ProTableProps<T, U, ValueType> {
  isDrag?: boolean;// 是否可以拖动
  handleSort: (ids: any[]) => void;// 返回需要排序的id
  setDataSource: (dataSource: any[]) => void;// 排序过后的 DataSource
}

export default ({ isDrag, dataSource, handleSort, setDataSource, ...props }: PropsType) => {
  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  const moveRow = useCallback(
    ({ dragId, dropId, dropParentId, operateType, originalIndex }: any) => {
      const {
        dragRow,
        dropRow,
        dragIndex,
        dropIndex,
      }: any = getParam(dataSource, dragId, dropId);

      // 拖拽是否是组
      const dragIsGroup = dragRow.tree_type === dataType.group || !dragRow.parent_id;
      // 放置的是否是组
      const dropIsGroup = !dropParentId;

      // 根据变化的数据查找拖拽行的row和索引
      const {
        row,
        index: rowIndex,
      } = findFromData(dataSource, dragId);

      let newData: any = dataSource;

      // 是否跨组拖动
      if (dragRow.parent_id === dropRow?.parent_id) {
        // 组拖拽
        if (dragIsGroup && dropIsGroup) {
          // 超出出拖拽区域还原
          if (operateType === optionsTyps.didDrop) {
            newData = update(dataSource, {
              $splice: [
                [rowIndex, 1], //删除目前拖拽的索引的数据
                [originalIndex, 0, row], // 将拖拽数据插入原始索引位置
              ],
            });
          } else {
            newData = update(dataSource, {
              $splice: [
                [dragIndex, 1],
                [dropIndex, 0, dragRow],
              ],
            });
          }
        }
        // 同一组下的子项拖拽
        else {
          const path = findDataPath(dataSource, dragRow.id);
          // 超出拖拽区域还原
          if (operateType === optionsTyps.didDrop) {
            newData = update(
              dataSource,
              getUpdateData(path, {
                $splice: [
                  [rowIndex, 1],
                  [originalIndex, 0, row],
                ],
              }),
            );
          } else {
            newData = update(
              dataSource,
              getUpdateData(path, {
                $splice: [
                  [dragIndex, 1],
                  [dropIndex, 0, dragRow],
                ],
              }),
            );
          }
        }
      };
      setDataSource(newData);
      const ids = getSortIds(newData, dragRow);
      handleSort(ids);
    },
    [dataSource],
  );

  const findRow = (id: any) => {
    const { row, index, parentIndex } = findFromData(dataSource, id);
    return {
      row,
      rowIndex: index,
      rowParentIndex: parentIndex,
    };
  };

  return <DndProvider backend={HTML5Backend}>
    <ProTable
      rowKey="id"
      {...props}
      components={components}
      dataSource={dataSource}
      expandable={{
        defaultExpandAllRows: true,
      }}
      onRow={(record, index) => ({
        record,
        dataSource,
        index,
        moveRow: (values: any) => {
          // 搜索后不能在拖动
          if (isDrag) return;

          moveRow(values);
        },
        findRow,
      })}
    />
  </DndProvider>;
};
