import './Navbar.css'
import Axios from 'axios'

const Navbar = (props) => {

    const updateStatus = async () => {
        const response = await Axios.patch("http://localhost:5000/users/" + props.changeUserId)
        if (response.status === 200) {
            props.onLogout()
        }
        else{
            alert("Error:" + response.status)
        }
    }

    const logoutHandler = () => {
        updateStatus()
    }

    return (
        <div className="navbar">
            <button className="logout" onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default Navbar