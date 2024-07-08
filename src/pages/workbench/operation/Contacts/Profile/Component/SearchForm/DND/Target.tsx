import React, { useRef, useState } from 'react';
import { Layout, Card } from 'antd';
import { useDrop } from 'react-dnd';


const Target: React.FC<any> = () => {

    const [, drop] = useDrop({
        accept: 'card'
    });
    return (
        <div ref={drop} style={{ height: 1000 }}>

        </div>
    );
};

export default Target;
