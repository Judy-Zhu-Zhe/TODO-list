import React, { useState, useRef } from 'react';
import './index.css';

function Item(props) {
    const { name, isDone, handleChange, deletItem } = props
    return (
        <li>
            <input type="checkbox" onChange={(e) => { handleChange(name) }} />
            <p className={isDone ? "itemDone" : ""}>{name}</p>
            <button onClick={(e) => deletItem(name) } >X</button>
        </li>
    )
}

function TodoList() {
    const [itemList, setItemList] = useState([]);
    const ref = useRef()

    function handleChange(name) {
        setItemList(itemList.map((item) => {
            if (item.name === name) item.isDone = !item.isDone;
            return item;
        }));
    }

    function AddItem() {
        const input = ref.current.value;
        if (itemList.find((item) => item.name === input)) {
            alert("这项任务已在进行中！");
            return;
        }
        setItemList([{ name: input, isDone: false }, ...itemList ]);
        ref.current.value = "";
    }

    function DeletItem(name) {
        setItemList(itemList.filter((item) => {
            return item.name !== name;
        }))
    }

    return (
        <div className="wrapper">
            <div id="title">
                <h1>-- Todo list --</h1>
            </div>
            <div id="input">
                <input type="text" ref={ref} id="userInput" name="userInput" />
                <button type="submit" onClick={AddItem}>提交</button>

            </div>
            <div id="list">
                <ul>
                    {
                        itemList.map((item) => {
                            return <Item {...item} 
                            handleChange={handleChange} 
                            deletItem={DeletItem}
                            key={item.name} />
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default TodoList;