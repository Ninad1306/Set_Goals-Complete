import React, { useState } from 'react';

import Button from '../../UI/Button/Button';
import './Input.css';

const Input = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [isValid,setIsValid] = useState(true);

  // Checks if the user has not entered empty goal and if it is valid
  // then sets the enteredValue state
  const goalInputChangeHandler = event => {
    if(event.target.value.trim().length > 0){
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  // Adds the goals to database and the clears the input field and
  // if empty input the set isValid to false
  const formSubmitHandler = event => {
    event.preventDefault();
    if(enteredValue.length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
    
    setEnteredValue('');
  };



  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`form-control ${!isValid && 'invalid'}`}>
        <label>Enter a Goal</label>
        <input value={enteredValue} id='input' type="text" onChange={goalInputChangeHandler}/>
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default Input;
