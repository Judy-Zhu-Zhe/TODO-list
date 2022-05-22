import React, { useState, useRef, useEffect } from 'react';
import { Item } from './item';
import { isOverDue } from './date';
import './index.css';

function TodoList() {
    const [itemList, setItemList] = useState([]);
    const ref = useRef();
    const date = useRef();

    const sortItem = (x, y) => {
        if (!x.isDone && y.isDone) return -1;
        if (x.isDone && !y.isDone) return 1;
        if (x.due && !y.due) return -1;
        if (!x.due && y.due) return 1;
        else return (x.due).localeCompare(y.due);
    }

    function handleChange(name) {
        setItemList(itemList.map((item) => {
            if (item.name === name) item.isDone = !item.isDone;
            return item;
        }).sort(sortItem));
    }

    function addItem() {
        const input = ref.current.value;
        const due = date.current.value;

        if (!input) return;
        if (isOverDue(due)) {
            if (!window.confirm("已过期，是否继续创建任务？")) return;
        }
        if (itemList.find((item) => item.name === input)) {
            alert("这项任务已在列表中！");
            return;
        }
        setItemList([{ name: input, due: due, isDone: false, isEdit: false }, ...itemList].sort(sortItem));
        ref.current.value = "";
    }

    function deletItem(name) {
        if (!window.confirm("确认删除任务？")) return;
        setItemList(itemList.filter((item) => {
            return item.name !== name;
        }))
    }

    function editItem(name) {
        setItemList(itemList.map((item) => {
            if (item.name === name) item.isEdit = true;
            return item;
        }));
    }

    function saveItem(name, ref, date) {
        const newName = ref.current.value;
        const newDue = date.current.value;
        if (!newName) {
            alert("请填写任务！");
            return;
        }
        itemList.map((item) => {
            if (item.name === name) item.name = "";
            return item
        });
        if (itemList.find((item) => item.name === newName)) {
            alert("这项任务已在列表中！");
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
        ref.current.value = "";
        date.current.value = "";
    }

    useEffect(() => {
        setItemList(JSON.parse(localStorage.getItem("store")));
    }, []);

    useEffect(() => {
        localStorage.setItem("store", JSON.stringify(itemList));
    }, [itemList]);

    return (
        <div className="wrapper">
            <div id="title">
                <h1>-- Todo list --</h1>
            </div>
            <div id="input">
                <input type="text" ref={ref} id="userInput" placeholder="添加任务" />
                <input type="date" ref={date} id="dueInput" />
                <button type="submit" onClick={addItem}>提交</button>
            </div>
            <div id="list">
                <ul>
                    {
                        itemList.map((item) => {
                            return <Item {...item}
                                handleChange={handleChange}
                                deletItem={deletItem}
                                editItem={editItem}
                                saveItem={saveItem}
                                key={item.name} />
                        })
                    }
                </ul>
            </div>
            <div id="end">
                <p>my first react project todo list</p>
            </div>
        </div>
    );
}

export default TodoList;