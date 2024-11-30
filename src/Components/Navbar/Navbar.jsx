import './Navbar.css';
import { FiHome } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { FaCcMastercard } from "react-icons/fa6";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='navbar-container'>
            <div>
                <Link to={'/dashboard'}>
                    <FiHome className='nav-icon' />
                    <p>Home</p>
                </Link>
            </div>
            <div>
                <Link href='/'>
                    <FaRegStar className='nav-icon' />
                    <p>Saved</p>
                </Link>
            </div>
            <div>
                <Link href='/'>
                    <IoWalletOutline className='nav-icon' />
                    <p>Save</p>
                </Link>
            </div>
            <div>
                <Link href='/'>
                    <FaCcMastercard className='nav-icon' />
                    <p>Card</p>
                </Link>
            </div>
            <div>
                <Link href='/'>
                    <RiAccountCircleLine className='nav-icon' />
                    <p>Profile</p>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;