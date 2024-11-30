import './BalanceCard.css';
import { useEffect, useState } from 'react';
import { IoMdEyeOff } from "react-icons/io";
import { AuthService } from '../../utils/authService.ts';
import { SuiService } from '../../utils/suiService.ts';

const BalanceCard = () => {
  const [balance, setBalance] = useState({ naira: 0, usdc: 0 });

  useEffect(() => {
    const fetchBalance = async () => {
      const suiService = new SuiService();
      const walletAddress = AuthService.walletAddress();

      if (walletAddress) {
        try {
          console.log(walletAddress)
          const fetchedBalance = await suiService.getBalance(walletAddress);
          setBalance(fetchedBalance || { naira: 0, usdc: 0 });
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      } else {
        console.error('No wallet address found');
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="balance-card">
      <div className="balance-display">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h2>Total Balance</h2>
            <IoMdEyeOff />
          </div>
          <h2 className="balance-in-naira">₦{balance.naira}</h2>
        </div>
        <small className="balance-in-dollar">${balance.usdc}</small>
      </div>
    </div>
  );
};

export default BalanceCard;
