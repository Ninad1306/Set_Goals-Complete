import './Navbar.css'
import Axios from 'axios'

const Navbar = (props) => {

    /**
     * Updates the user status to false using their their userId as they loggedout and then displays the form to login or signup again.
     *  */
    const updateStatus = async () => {
        const response = await Axios.patch("http://localhost:5000/users/" + props.changeUserId)
        if (response.status === 200) {
            props.onLogout()
        }
        else {
            alert("Error:" + response.status)
        }
    }

    const logoutHandler = () => {
        updateStatus()
    }

    /** 
     * Logs the user out of their account when they leave the page without logging out
     * */
    // useEffect(() => {
    //     window.addEventListener('beforeunload', (e) => {
    //         e.preventDefault()
    //         e.returnValue = ''
    //         updateStatus()
    //     })
    // })

    return (
        <div className="navbar">
            <button className="logout" onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default Navbar