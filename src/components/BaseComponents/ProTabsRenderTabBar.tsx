import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react';

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string;
}

const DraggableTabNode = ({ className, ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
    transition,
  };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

export default ({ items, tabBarProps, DefaultTabBar, ...props }: any) => {
  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });

  return (
    <DndContext sensors={[sensor]} {...props}>
      <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
        <DefaultTabBar {...tabBarProps}>
          {(node: any) => (
            <DraggableTabNode {...node.props} key={node.key}>
              {node}
            </DraggableTabNode>
          )}
        </DefaultTabBar>
      </SortableContext>
    </DndContext>
  )
};
