import './Navbar.css'
import Axios from 'axios'

const Navbar = (props) => {

    /**
     * Updates the user status to false using their their userId as they loggedout and then displays the form to login or signup again.
     *  */
    const updateStatus = () => {
        props.onLogout()
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