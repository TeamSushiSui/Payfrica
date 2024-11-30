import { Link } from 'react-router-dom';
import './Savings.css';
import { IoIosPeople } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa6";
import { TiPlus } from "react-icons/ti";

const Savings = () => {
  return (
    <div className='savings'>
        <div className='savings-heading'>
            <Link to={'/'}>
                <FaChevronLeft />
            </Link>
            <p style={{fontFamily:'SansationBold'}}>Savings</p>
            <TiPlus />
        </div>
        <div className='saving-card'>
            <h2>WCA Contribution</h2>
            <div className='saving-details'>
                <div className='saving-balance'>
                    <p>Balance</p>
                    <p>50%</p>
                </div>
                <div className='saving-detail-demarcation'>
                    
                </div>
                <div className='saving-amount'>
                    <p><span style={{fontSize:'23px'}}>$300</span> 0f $699</p>
                    <p>14 days left</p>
                </div>
            </div>
            <div className='saving-card-cta'>
                <p>See Details</p>
                <p><IoIosPeople /> 100</p>
            </div>
        </div>
        <div className='saving-card'>
            <h2>WCA Contribution</h2>
            <div className='saving-details'>
                <div className='saving-balance'>
                    <p>Balance</p>
                    <p>50%</p>
                </div>
                <div className='saving-detail-demarcation'>
                    
                </div>
                <div className='saving-amount'>
                    <p><span style={{fontSize:'23px'}}>$300</span> 0f $699</p>
                    <p>14 days left</p>
                </div>
            </div>
            <div className='saving-card-cta'>
                <p>See Details</p>
                <p><IoIosPeople /> 100</p>
            </div>
        </div>
        <div className='saving-card'>
            <h2>WCA Contribution</h2>
            <div className='saving-details'>
                <div className='saving-balance'>
                    <p>Balance</p>
                    <p>50%</p>
                </div>
                <div className='saving-detail-demarcation'>
                    
                </div>
                <div className='saving-amount'>
                    <p><span style={{fontSize:'23px'}}>$300</span> 0f $699</p>
                    <p>14 days left</p>
                </div>
            </div>
            <div className='saving-card-cta'>
                <p>See Details</p>
                <p><IoIosPeople /> 100</p>
            </div>
        </div>
        <div className='saving-card'>
            <h2>WCA Contribution</h2>
            <div className='saving-details'>
                <div className='saving-balance'>
                    <p>Balance</p>
                    <p>50%</p>
                </div>
                <div className='saving-detail-demarcation'>
                    
                </div>
                <div className='saving-amount'>
                    <p><span style={{fontSize:'23px'}}>$300</span> 0f $699</p>
                    <p>14 days left</p>
                </div>
            </div>
            <div className='saving-card-cta'>
                <p>See Details</p>
                <p><IoIosPeople /> 100</p>
            </div>
        </div>
        <div className='saving-card'>
            <h2>WCA Contribution</h2>
            <div className='saving-details'>
                <div className='saving-balance'>
                    <p>Balance</p>
                    <p>50%</p>
                </div>
                <div className='saving-detail-demarcation'>
                    
                </div>
                <div className='saving-amount'>
                    <p><span style={{fontSize:'23px'}}>$300</span> 0f $699</p>
                    <p>14 days left</p>
                </div>
            </div>
            <div className='saving-card-cta'>
                <p>See Details</p>
                <p><IoIosPeople /> 100</p>
            </div>
        </div>
    </div>
  )
}

export default Savings;