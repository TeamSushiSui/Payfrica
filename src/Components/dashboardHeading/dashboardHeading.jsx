import './dashboardHeading.css';
import { FaRegBell } from "react-icons/fa6";
import ProfileImg from '../../Assets/Wallpaper_4.jpeg'

const dashboardHeading = () => {
    return (

        <div className='dashboard-heading mobile-only'>
            <div className='dashboard-left'>
                <img src={ProfileImg} className='profileImg' alt="Your profile pics" />
                <div className='greeting'>
                    <p>Good morning!</p>
                    <p>Adeniyi</p>
                </div>
            </div>
            <div className='dashboard-right'>
                <FaRegBell className='notification-icon'/>
            </div>
        </div>
    )
}

export default dashboardHeading;