import React from "react";

const TodoItem = props => {
    return (
    <div className={`card ${props.element.isComplited ? 'completed' : ''}`} key={props.element.id}>
        <h2>{props.element.title}</h2>
        <h2>{props.element.value}</h2>
        <button onClick={() => props.markC(props.element.id)}>Zakończone</button>
    </div>
    )
}

export default TodoItem