import React, { useState } from 'react';
import Axios from 'axios';
import classes from './GoalItem.module.css';

const GoalItem = props => {
  const [inputValue, setInputValue] = useState(props.text);
  const [isEditable, setIsEditable] = useState(!props.completed);

  const updateData = async (desc = inputValue, id, status = false) => {
    await Axios.patch("http://localhost:5000/goals/" + id, {
      desc,
      completed: status
    })
  }

  const deleteHandler = () => {
    props.onDelete(props.id);
  }

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  }

  const doneHandler = () => {
    setIsEditable(false);
    updateData(undefined, props.id, true)
  }

  const editableHandler = (e) => {
    if (isEditable) {
      const data = e.target.value;
      setInputValue(data);
      if (data.length === 0) {
        props.onDelete(props.id);
      }
      else {
        updateData(data, e.target.id, undefined)
      }
    }
  }

  const inputElement1 = (<input id={props.id} className={classes['inputItem1']} onBlur={editableHandler} onChange={inputHandler} value={inputValue}/>)
  const inputElement2 = (<input id={props.id} className={classes['inputItem2']} onBlur={editableHandler} onChange={inputHandler} value={inputValue} readOnly={!isEditable} />)
  return (
    <li className={classes['goal-item']}>
      {!isEditable ? inputElement2 : inputElement1}
      <div className={classes['btnCont']}>
        <button className={classes['buttonStyle']} onClick={deleteHandler}>Delete</button>
        <button className={classes['buttonStyle']} onClick={doneHandler}>Done</button>
      </div>
    </li>
  );
};

export default GoalItem;
