import './Signup.css';
import Modal from '../UI/Modal/Modal';
import Axios from 'axios';
import { useState } from 'react'

const Signup = props => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios.post("http://localhost:5000/users",{
                name,
                email,
                password,
                status: true
            })

            // console.log(response.data)
            if(response.status === 201){
                props.onAdd(response.data._id)
                props.onClose()
            }
            else{
                alert("Error:" + response.status)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const loginHandler = () => {
        props.onLog()
    }

    return (
        <Modal >
            <div className='container'>
                <div className='formheading'>
                    <h2>Signup</h2>
                </div>
                <form onSubmit={submitHandler} method='POST' className='signupForm'>
                    <div className='inp1'>
                        <input type='text'
                            htmlFor='Username'
                            name="name"
                            id='name'
                            placeholder='Username'
                            onChange={e => setName(e.target.value)} />
                    </div>
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
                <p>Already registered? <a onClick={loginHandler} className='anchorLogin'>Login</a></p>
            </div>
        </Modal>
    )
}

export default Signup;