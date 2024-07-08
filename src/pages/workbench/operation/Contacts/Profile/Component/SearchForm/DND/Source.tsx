import React, { useRef, useState } from 'react';
import { Collapse, Button, Space } from 'antd';
import { useDrag } from 'react-dnd';
import SourceButton from './SourceButton'

const Source: React.FC<any> = () => {

    const items: any = [
        { title: '姓名' },
        { title: '公司' },
        { title: '手机' },
        { title: '邮箱' },
    ];


    return (

        <Collapse defaultActiveKey={['1']} >
            <Collapse.Panel header="联系人信息" key="1">
                <Space direction="vertical" style={{ width: '100%' }}>
                    {items.map(item => <SourceButton item={item} />)}
                </Space>
            </Collapse.Panel>
        </Collapse>
    );
};

export default Source;
