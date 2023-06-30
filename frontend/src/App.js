import React, { useState, useEffect } from 'react';
import Form from './components/Form/Form'
import GoalList from './components/Goals/GoalList/GoalList';
import Input from './components/Goals/Input/Input';
import './App.css';
import Axios from 'axios';
import Navbar from './components/Navbar/Navbar'

const App = () => {
  // Runs first to check if form should be shown or not to avoid wrong 
  // reload during page refresh.
  const initial = async () => {
    const res = localStorage.getItem("userId")
    if (res !== null) {
      localStorage.setItem("formVisibility", JSON.stringify(false))
    }
    else{
      localStorage.setItem("formVisibility", JSON.stringify(true))
    }
  }

  // State variables
  const [courseGoals, setCourseGoals] = useState([])
  const [isVisible, setIsVisible] = useState(JSON.parse(localStorage.getItem("formVisibility")))
  const [userId, setUserId] = useState(localStorage.getItem("userId"))

  // Fetches data only if form is not visible
  useEffect(() => {
    if (!isVisible) {
      getData()
    }
  }, [isVisible])

  // Fetches data when the data changes
  useEffect(() => {
    getData()
  }, [courseGoals])

  // Runs when page reloads
  useEffect(() => {
    initial()
  }, [])

  // Adds the goal to database
  const addGoalHandler = async (desc) => {
    await Axios.post("http://localhost:5000/goals", {
      desc,
      userId
    });
    // getData()
  }

    // Updates the userid during register or login
  const changeUserHandler = (id) => {
    setUserId(id)
  }

  // Deletes the data from database
  const deleteItemHandler = async (goalId) => {
    await Axios.delete("http://localhost:5000/goals/" + goalId);
    // getData()
  };

  // Data fetch function
  const getData = async () => {
    const response = await Axios.get("http://localhost:5000/goals/" + userId + "?sortBy=completed");
    setCourseGoals(response.data)
  }

  // Hides the form
  const hideFormHandler = () => {
    localStorage.setItem("formVisibility", JSON.stringify(false))
    setIsVisible(JSON.parse(localStorage.getItem("formVisibility")))
  }

  // Shows the form
  const showFormHandler = () => {
    localStorage.setItem("formVisibility", JSON.stringify(true))
    setIsVisible(JSON.parse(localStorage.getItem("formVisibility")))
    localStorage.removeItem("userId")
    setCourseGoals('')
  }

  // GoalList container created.
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
