import React from 'react';
import { Layout, Row, Col } from 'antd';
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Source from './Source';
import Target from './Target';


const Container: React.FC<any> = () => {
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <Row>
                    <Col span={4} ><Source /></Col>
                    <Col span={20} style={{ height: 1000 }}><Target /></Col>
                </Row>
            </DndProvider>
        </>
    );

};

export default Container;
