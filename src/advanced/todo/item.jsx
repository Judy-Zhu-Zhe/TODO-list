import React, { useState } from 'react';
import { isOverDue, isCloseDue } from './date';
import 'antd/dist/antd.css';
import { DeleteOutlined } from '@ant-design/icons';
import { Space, Checkbox, Popconfirm, Input, DatePicker, Popover } from 'antd';

export function Item(props) {
    const { name, due, isDone, isEdit, handleChange, deletItem, editItem, saveItem, originDue } = props;
    const [inputName, setName] = useState(name);
    const [inputDue, setDue] = useState(originDue);
    function changeName(e) {
        setName(e.target.value);
    }
    function changeDue(e) {
        setDue(e);
    }

    return (
        <li>
            <Space>
                {/* 打勾框 */}
                <Popover content="完成任务">
                    <Checkbox className="checkbox" checked={isDone} onChange={(e) => handleChange(name)} />
                </Popover>
                {/* 项目名称 */}
                {!isEdit ? <p className={isDone ? "itemDone name" : "name"}
                    onClick={!isDone ? (e) => editItem(name) : undefined}>{name}</p> :
                    <Input value={inputName} onChange={changeName} className="inputName"
                        onBlur={(e) => saveItem(name, inputName, inputDue)} />}
                {/* 截止日期 */}
                {!isEdit ? <p className={isDone ? "itemDone date" :
                    (isOverDue(due) ? "itemOverDue date" : (isCloseDue(due) ? "itemCloseDue date" : "date"))}
                    onClick={!isDone ? (e) => editItem(name) : undefined}>
                    {isDone ? "已完成" : (due ? (isOverDue(due) ? due + "已截止" :
                        (isCloseDue(due) ? due + "即将截止" : due + "截止")) : "无期限")}</p> :
                    <DatePicker value={inputDue} onChange={changeDue}
                        onBlur={(e) => saveItem(name, inputName, inputDue)} />}
                {/* 删除框 */}
                <Popover content="删除任务">
                    <Popconfirm title="确认删除任务？" okText="确认" cancelText="取消" onConfirm={(e) => deletItem(name)}>
                        <DeleteOutlined className="icon" />
                    </Popconfirm>
                </Popover>
            </Space>
        </li>
    )
}
