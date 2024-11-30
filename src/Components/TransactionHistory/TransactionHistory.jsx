import './TransactionHistory.css';
import { FaMoneyCheckAlt } from "react-icons/fa";

const TransactionHistory = () => {
    return (
        <div className='transaction-history'>
            <div className='transaction-heading'>
                <h2>Transactions</h2>
                <p>See all</p>
            </div>
            <div className='transactions'>
                <div className="transaction">
                    <FaMoneyCheckAlt style={{backgroundColor:'#f3f3f3', padding: '10px', borderRadius: '50%', fontSize: '20px'}}/>
                    <div className='tranx-details'>
                        <h3>Purchase of $USDC</h3>
                        <p>30/11/2024</p>
                    </div>
                    <p className='tranx-amount'>$-32</p>
                </div>
                <div className="transaction">
                    <FaMoneyCheckAlt style={{backgroundColor:'#f3f3f3', padding: '10px', borderRadius: '50%', fontSize: '20px'}}/>
                    <div className='tranx-details'>
                        <h3>Purchase of $USDC</h3>
                        <p>30/11/2024</p>
                    </div>
                    <p className='tranx-amount'>$-32</p>
                </div>
                <div className="transaction">
                    <FaMoneyCheckAlt style={{backgroundColor:'#f3f3f3', padding: '10px', borderRadius: '50%', fontSize: '20px'}}/>
                    <div className='tranx-details'>
                        <h3>Purchase of $USDC</h3>
                        <p>30/11/2024</p>
                    </div>
                    <p className='tranx-amount'>$-32</p>
                </div>
                <div className="transaction">
                    <FaMoneyCheckAlt style={{backgroundColor:'#f3f3f3', padding: '10px', borderRadius: '50%', fontSize: '20px'}}/>
                    <div className='tranx-details'>
                        <h3>Purchase of $USDC</h3>
                        <p>30/11/2024</p>
                    </div>
                    <p className='tranx-amount'>$-32</p>
                </div>
            </div>
        </div>
    )
}

export default TransactionHistory;