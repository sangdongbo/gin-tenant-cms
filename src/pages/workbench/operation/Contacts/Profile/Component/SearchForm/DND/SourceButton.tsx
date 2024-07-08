import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { useDrag } from 'react-dnd';

const SourceButton: React.FC<any> = ({ item }) => {

    const [, drag] = useDrag({
        item: {
            type: 'card',
            item
        }
    });

    return (
        <div ref={drag}>
            <Button block type="dashed">{item?.title}</Button>
        </div>
    );
};

export default SourceButton;
