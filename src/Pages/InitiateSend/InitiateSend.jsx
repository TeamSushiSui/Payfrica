import './InitiateSend.css';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { TiPlus } from 'react-icons/ti';
import { HiOutlineSearch } from "react-icons/hi";
import SendLogo from '../../Assets/Send logo.png';
import { BsQrCodeScan } from "react-icons/bs";
import { IoWifiSharp } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import Navbar from '../../Components/Navbar/Navbar';

const InitiateSend = () => {
    return (
        <div className='send-page'>
            <Navbar />
            <div className='send-heading'>
                <Link to={'/send'}>
                    <FaChevronLeft />
                </Link>
                <p style={{ fontFamily: 'SansationBold' }}>Send</p>
                <TiPlus />
            </div>
            <div className='send-search-area'>
                <input type="text" placeholder='Search NS Name or Payfrica Tag' />
                <HiOutlineSearch className='search-icon' />
            </div>
            <div className='send-cta'>
                <input type="text" className='tag-input' placeholder="Enter address, NS name, or payfrica tag " />
                <Link to={'/initiatesend'}>
                    <button>Send</button>
                </Link>
            </div>
            <div className='send-options'>
                <h2>More Send Options</h2>
                <div className='send-options-function'>
                    <div>
                        <Link href='/'>
                            <BsQrCodeScan className='function-option-icon send-option-icon' />
                            <p>QR Code</p>
                        </Link>
                    </div>
                    <div>
                        <Link href='/'>
                            <IoWifiSharp className='function-option-icon send-option-icon' />
                            <p>Airdrop</p>
                        </Link>
                    </div>
                    <div>
                        <Link href='/'>
                            <MdOutlinePhoneIphone className='function-option-icon send-option-icon' />
                            <p>USSD</p>
                        </Link>
                    </div>
                    <div>
                        <Link href='/'>
                            <FaCreditCard className='function-option-icon send-option-icon' />
                            <p>Card</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InitiateSend