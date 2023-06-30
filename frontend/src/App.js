import React, { useState, useEffect } from 'react';
import Form from './components/Form/Form'
import GoalList from './components/Goals/GoalList/GoalList';
import Input from './components/Goals/Input/Input';
import './App.css';
import Axios from 'axios';
import Navbar from './components/Navbar/Navbar'

const App = () => {

  const initial = async () => {
    const res = localStorage.getItem("userId")
    if (res !== null) {
      localStorage.setItem("formVisibility", JSON.stringify(false))
    }
    else{
      localStorage.setItem("formVisibility", JSON.stringify(true))
    }
  }

  const [courseGoals, setCourseGoals] = useState([])
  const [isVisible, setIsVisible] = useState(JSON.parse(localStorage.getItem("formVisibility")))
  const [userId, setUserId] = useState(localStorage.getItem("userId"))

  useEffect(() => {
    if (!isVisible) {
      getData()
    }
  }, [isVisible])

  useEffect(() => {
    getData()
  }, [courseGoals])

  useEffect(() => {
    initial()
  }, [])

  const addGoalHandler = async (desc) => {
    await Axios.post("http://localhost:5000/goals", {
      desc,
      userId
    });
    // getData()
  }

  const changeUserHandler = (id) => {
    setUserId(id)
  }

  const deleteItemHandler = async (goalId) => {
    await Axios.delete("http://localhost:5000/goals/" + goalId);
    // getData()
  };

  const getData = async () => {
    const response = await Axios.get("http://localhost:5000/goals/" + userId + "?sortBy=completed");
    setCourseGoals(response.data)
  }

  const hideFormHandler = () => {
    localStorage.setItem("formVisibility", JSON.stringify(false))
    setIsVisible(JSON.parse(localStorage.getItem("formVisibility")))
  }

  const showFormHandler = () => {
    localStorage.setItem("formVisibility", JSON.stringify(true))
    setIsVisible(JSON.parse(localStorage.getItem("formVisibility")))
    localStorage.removeItem("userId")
    setCourseGoals('')
  }

  let content = (<p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>);
  if (courseGoals.length > 0) {
    content = (<GoalList items={courseGoals} onDeleteItem={deleteItemHandler} />);
  }

  return (
    <div>
      {isVisible && <Form onClose={hideFormHandler} onAdd={changeUserHandler} />}
      <Navbar changeUserId={userId}  onLogout={showFormHandler} />
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
