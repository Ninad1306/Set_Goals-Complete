import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import React, { Fragment, useState } from 'react'

const Form = (props) => {
    const [loginVisible, setLoginVisible] = useState(true)
    const [signupVisible, setSignupVisible] = useState(false)

    const showLogin = () => {
        setLoginVisible(true)
        setSignupVisible(false)
    }
    const showSignup = () => {
        setLoginVisible(false)
        setSignupVisible(true)
    }
    return(
        <Fragment>
            {loginVisible && <Login onReg={showSignup} onClose={props.onClose} onAdd={props.onAdd} />}
            {signupVisible && <Signup onLog={showLogin} onClose={props.onClose} onAdd={props.onAdd} />}
        </Fragment>
    )
}

export default Form