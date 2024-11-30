import './QrInitPage.css';
import QrCodeInitPageImg from '../../Assets/QrCodeInitPageImg.png';
import { BiArrowFromLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const QrInitPage = () => {
    return (
        <div className='qrinitpage'>
            <img src={QrCodeInitPageImg} className='QrCodeInitPageImg' alt="Qr Code Pics" />
            <div className='get-started-box-overlay'>
                <h1>Get Started</h1>
                <p>Go and enjoy our features for free and make your life easy with us.</p>
                <Link to={'/scan'}>
                    <button>Let's Go <BiArrowFromLeft /></button>
                </Link>
            </div>
        </div>
    )
}

export default QrInitPage;