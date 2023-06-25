import React, { useState, useEffect } from 'react';
import Form from './components/Form/Form'
import GoalList from './components/Goals/GoalList/GoalList';
import Input from './components/Goals/Input/Input';
import './App.css';
import Axios from 'axios';
import Navbar from './components/Navbar/Navbar'

const App = () => {

  const [courseGoals, setCourseGoals] = useState([])
  const [isVisible, setIsVisible] = useState(true)
  const [userId, setUserId] = useState('')

  const addGoalHandler = async (desc) => {
    await Axios.post("http://localhost:5000/goals", {
      desc,
      userId
    });
    getData()
  }

  const changeUserHandler = (id) => {
    setUserId(id)
  }

  const deleteItemHandler = async (goalId) => {
    await Axios.delete("http://localhost:5000/goals/" + goalId);
    getData()
  };

  const getData = async () => {
    const response = await Axios.get("http://localhost:5000/goals/" + userId);
    setCourseGoals(response.data)
    // console.log(response.data)
  }


  useEffect(() => {
    if (!isVisible) {
      getData()
    }
  }, [isVisible]);


  let content = (<p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>);

  if (courseGoals.length > 0) {
    content = (<GoalList items={courseGoals} onDeleteItem={deleteItemHandler} />);
  }

  const hideFormHandler = () => {
    setIsVisible(false)
  }

  const showFormHandler = () => {
    setIsVisible(true)
    setCourseGoals('')
  }

  return (
    <div>
      {isVisible && <Form onClose={hideFormHandler} onAdd={changeUserHandler} />}
      <Navbar changeUserId={userId} onLogout={showFormHandler} />
      <section id="goal-form">
        <Input onAddGoal={addGoalHandler} />
      </section>
      <section id="goals">
        {content}
      </section>
    </div>
  );
};

export default App;
