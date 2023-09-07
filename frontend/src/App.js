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
    const res = localStorage.getItem("token")
    if (res !== null) {
      localStorage.setItem("formVisibility", JSON.stringify(false))
    }
    else {
      localStorage.setItem("formVisibility", JSON.stringify(true))
    }
  }

  // State variables
  const [courseGoals, setCourseGoals] = useState([])
  const [isVisible, setIsVisible] = useState(JSON.parse(localStorage.getItem("formVisibility")))
  const [token, setToken] = useState(localStorage.getItem("token"))

  // Fetches data only if form is not visible
  // useEffect(() => {
  //   if (!isVisible) {
  //     getData()
  //   }
  // }, [isVisible])

  // Data fetch function
  const getData = async () => {
    // const response = await Axios.get("https://task-manager-api-e0aa.onrender.com/goals/" + token + "?sortBy=completed");
    if (!isVisible) {
      const response = await Axios.get("https://task-manager-api-e0aa.onrender.com/tasks", {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      setCourseGoals(response.data)
    }
  }

  // Fetches data when the data changes
  useEffect(() => {
    getData()
  }, [courseGoals, isVisible,getData])

  // Runs when page reloads
  useEffect(() => {
    initial()
  }, [])

  // Adds the goal to database
  const addGoalHandler = async (desc) => {
    await Axios.post("https://task-manager-api-e0aa.onrender.com/tasks",
      { desc }, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    // getData()
  }

  // Updates the token during register or login
  const changeUserHandler = (tkn) => {
    setToken(tkn)
  }

  // Deletes the data from database
  const deleteItemHandler = async (taskId) => {
    await Axios.delete("https://task-manager-api-e0aa.onrender.com/tasks/" + taskId, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    // getData()
  };

  // Hides the form
  const hideFormHandler = () => {
    localStorage.setItem("formVisibility", JSON.stringify(false))
    setIsVisible(JSON.parse(localStorage.getItem("formVisibility")))
  }

  // Shows the form
  const showFormHandler = () => {
    localStorage.setItem("formVisibility", JSON.stringify(true))
    setIsVisible(JSON.parse(localStorage.getItem("formVisibility")))
    localStorage.removeItem("token")
    setCourseGoals('')
  }

  // GoalList container created.
  let content = (<p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>);
  if (courseGoals.length > 0) {
    content = (<GoalList items={courseGoals} onDeleteItem={deleteItemHandler} token={token} />);
  }

  return (
    <div>
      {isVisible && <Form onClose={hideFormHandler} onAdd={changeUserHandler} />}
      <Navbar changeToken={token} onLogout={showFormHandler} />
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
