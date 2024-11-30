import BalanceCard from "../../Components/BalanceCard/BalanceCard";
import Navbar from "../../Components/Navbar/Navbar";
import SavingsCircle from "../../Components/SavingsCircle/SavingsCircle";
import DashboardHeading from "../../Components/dashboardHeading/dashboardHeading";
import PaymentFunctions from "../../Components/paymentFunctions/paymentFunctions";
import TransactionHistory from "../../Components/TransactionHistory/TransactionHistory";

const Dashboard = () => {
  return (
    <div className="dashboard">
        <DashboardHeading />
        <Navbar />
        <BalanceCard />
        <PaymentFunctions />
        <SavingsCircle />
        <TransactionHistory />
    </div>
  )
}

export default Dashboard;