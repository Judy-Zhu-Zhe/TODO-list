import React, { useState, useEffect } from 'react';
import { Item } from './item';
import { isOverDue, formattingDate } from './date';
import './index.css';
import 'antd/dist/antd.css';
import { Space, Input, DatePicker, Button, message } from 'antd';

function TodoList() {
    const [itemList, setItemList] = useState([]);
    const [inputName, setName] = useState("");
    const [inputDue, setDue] = useState(null);

    const sortItem = (x, y) => {
        if (!x.isDone && y.isDone) return -1;
        if (x.isDone && !y.isDone) return 1;
        if (x.due && !y.due) return -1;
        if (!x.due && y.due) return 1;
        if (!x.due && !y.due) return 0;
        else return (x.due).localeCompare(y.due);
    }

    function handleChange(name) {
        setItemList(itemList.map((item) => {
            if (item.name === name) {
                if (!item.isDone) message.success("任务完成！");
                item.isDone = !item.isDone;
            }
            return item;
        }).sort(sortItem));
    }

    function addItem() {
        const name = inputName;
        const due = inputDue ? formattingDate(new Date(inputDue)) : null;
        if (due) console.log(due);
        if (!name) {
            message.error("请输入任务！");
            return;
        }
        if (isOverDue(due)) message.warn("这项任务已过期！");
        if (itemList.find((item) => item.name === name)) {
            message.error("这项任务已在列表中！");
            return;
        }
        setItemList([{ name: name, due: due, isDone: false, isEdit: false }, ...itemList].sort(sortItem));
        message.success("添加成功！");
        setName("");
    }

    function deletItem(name) {
        setItemList(itemList.filter((item) => {
            return item.name !== name;
        }))
        message.success("删除成功！");
    }

    function editItem(name) {
        setItemList(itemList.map((item) => {
            if (item.name === name) item.isEdit = true;
            return item;
        }));
    }

    function saveItem(name, inputName, inputDue) {
        const newName = inputName;
        const newDue = inputDue ? formattingDate(new Date(inputDue)) : null;
        if (!newName) {
            message.error("请输入任务！");
            return;
        }
        itemList.map((item) => {
            if (item.name === name) item.name = "";
            return item
        });
        if (itemList.find((item) => item.name === newName)) {
            message.error("这项任务已在列表中！");
            return;
        }
        setItemList(itemList.map((item) => {
            if (item.name === "") {
                item.name = newName;
                item.due = newDue;
                item.isEdit = false;
            }
            return item;
        }).sort(sortItem));
        message.success("修改成功！");
    }

    useEffect(() => {
        setItemList(JSON.parse(localStorage.getItem("store")));
    }, []);

    useEffect(() => {
        localStorage.setItem("store", JSON.stringify(itemList));
    }, [itemList]);

    function changeName(e) {
        setName(e.target.value);
    }

    function changeDue(e) {
        setDue(e);
    }

    return (
        <div className="wrapper">
            <div id="title">
                <h1>-- Todo list --</h1>
            </div>
            <div id="input">
                <Space>
                    <Input value={inputName} onChange={changeName} placeholder="添加任务" />
                    <DatePicker value={inputDue} onChange={changeDue} />
                    <Button onClick={addItem}>添加</Button>
                </Space>
            </div>
            <div id="list">
                <ul>
                    {itemList.map((item) => {
                        return <Item {...item}
                            handleChange={handleChange}
                            deletItem={deletItem}
                            editItem={editItem}
                            saveItem={saveItem}
                            originDue={inputDue}
                            key={item.name} />
                    })}
                </ul>
            </div>
            <div id="end">
                <p>my first react project todo list</p>
            </div>
        </div>
    );
}

export default TodoList;