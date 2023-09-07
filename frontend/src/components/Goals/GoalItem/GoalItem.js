import React, { useState } from 'react';
import Axios from 'axios';
import classes from './GoalItem.module.css';

const GoalItem = props => {
  const [inputValue, setInputValue] = useState(props.text);
  const [isEditable, setIsEditable] = useState(!props.completed);

  // Updates the enterd goal in the database
  const updateData = async (desc = inputValue, id, status = false) => {
    await Axios.patch("https://task-manager-api-e0aa.onrender.com/tasks/" + id, {
      desc,
      completed: status,
    }, {
      headers: {
        'Authorization': 'Bearer ' + props.token
      }
    })
  }

  // Deletes a goal in the database
  const deleteHandler = () => {
    props.onDelete(props.id);
  }

  // Sets the input value when the goal is updated
  const inputHandler = (e) => {
    setInputValue(e.target.value);
  }

  // This handler operates when the goal is completed
  const doneHandler = () => {
    setIsEditable(false);
    updateData(undefined, props.id, true)
  }

  // This handler operates when the goal is edited
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

  // Toggles whether the goal is completed or not
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
