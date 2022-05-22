import React, { useState, useRef } from 'react';
import { isOverDue, isCloseDue } from './date';

export function Item(props) {
    const { name, due, isDone, isEdit, handleChange, deletItem, editItem, saveItem } = props;
    const [currentName, changeCurrentName] = useState(name);
    const [currentDate, changeCurrentDate] = useState(due);
    const ref = useRef();
    const date = useRef();
    const handleNameChange = () => {
        changeCurrentName(ref.current.value);
    }
    const handleDateChange = () => {
        changeCurrentDate(date.current.value);
    }
    
    return (
        <li>
            {/* 打勾框 */}
            <input type="checkbox" checked={isDone} className="checkbox" onChange={(e) => handleChange(name)} />
            {/* 项目名称 */}
            {!isEdit ? <p className={isDone ? "itemDone name" : "name"}
                onClick={!isDone ? (e) => editItem(name) : undefined}>{name}</p> :
                <input type="text" ref={ref}
                    onBlur={(e) => saveItem(name, ref, date)}
                    onChange={handleNameChange} value={currentName} />}
            {/* 截止日期 */}
            {!isEdit ? <p className={isDone ? "itemDone date" : 
                (isOverDue(due) ? "itemOverDue date" : (isCloseDue(due) ? "itemCloseDue date" : "date"))} 
                onClick={!isDone ? (e) => editItem(name) : undefined}>
                {isDone ? "已完成" : (due ? (isOverDue(due) ? due + "已过期" : 
                    (isCloseDue(due) ? due + "即将截止" : due + "截止")) : "无期限")}</p> :
                <input type="date" ref={date} 
                    onBlur={(e) => saveItem(name, ref, date)}
                    onChange={handleDateChange} value={currentDate} />}
            {/* 删除框 */}
            <button onClick={(e) => deletItem(name)} >X</button>
        </li>
    )
}
