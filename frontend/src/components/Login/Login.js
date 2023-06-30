import './Login.css';
import Modal from '../UI/Modal/Modal';
import Axios from 'axios';
import { useState } from 'react'

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios.post("http://localhost:5000/users/login",{
                email,
                password
            })
            if(response.status === 200){
                props.onAdd(response.data._id)
                localStorage.setItem("userId",response.data._id)
                props.onClose()
            }
            else{
                alert("Error:" + response.status)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const signupHandler = () => {
        props.onReg()
    }

    return (
        <Modal >
            <div className='container'>
                <div className='formheading'>
                    <h2>Login</h2>
                </div>
                <form onSubmit={submitHandler} method='POST' className='loginForm'>
                    <div className='inp2'>
                        <input type='text'
                            htmlFor='Email'
                            name="email"
                            id='email'
                            placeholder='Email'
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='inp3'>
                        <input type='password'
                            htmlFor='Password'
                            name="password"
                            id='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className='submitbtn'><button className='formbtn' type='submit'>Submit</button></div>
                </form>

                <p>Not registered? <a onClick={signupHandler} className='anchorSignup'>register</a></p>
            </div>
        </Modal>
    )
}

export default Login;