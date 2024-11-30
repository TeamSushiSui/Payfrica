import './BalanceCard.css';
import { IoMdEyeOff } from "react-icons/io";

const BalanaceCard = () => {
  return (
    <div className="balance-card">
      <div className='balance-display'>
        <div>
          <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
            <h2>Total Balance</h2>
            <IoMdEyeOff />
          </div>
          <h2 className='balance-in-naira'>₦100,000,000</h2>
        </div>
        <small className='balance-in-dollar'>$25,000.40</small>
      </div>
    </div>
  )
}

export default BalanaceCard