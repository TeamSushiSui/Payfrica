import './paymentFunctions.css'
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { AiOutlineSend } from "react-icons/ai";
import { RiFolderReceivedFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const paymentFunctions = () => {
    return (
        <div className="payment-functions">
            <div>
                <Link to={'/payment'}>
                    <FaArrowDown className='function-option-icon' />
                    <p>Deposit</p>
                </Link>
            </div>
            <div>
                <Link to={'/'}>
                    <FaArrowUp className='function-option-icon' />
                    <p>Withdraw</p>
                </Link>
            </div>
            <div>
                <Link to={'/send'}>
                    <AiOutlineSend className='function-option-icon' />
                    <p>Send</p>
                </Link>
            </div>
            <div>
                <Link to={'/generatecode'}>
                    <RiFolderReceivedFill className='function-option-icon' />
                    <p>Receive</p>
                </Link>
            </div>
        </div>
    )
}

export default paymentFunctions;