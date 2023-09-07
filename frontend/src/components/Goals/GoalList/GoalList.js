import React from 'react';

import GoalItem from '../GoalItem/GoalItem';
import './GoalList.css';

const GoalList = props => {

  return (
    <ul className="goal-list">
      {props.items.map(goal => (
        <GoalItem
          key={goal._id}
          id={goal._id}
          onDelete={props.onDeleteItem}
          text={goal.desc}
          completed={goal.completed}
          token={props.token}
        />
      ))}
    </ul>
  );
};

export default GoalList;
