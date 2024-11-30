import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import Savings from "./Pages/Savings/Savings";
import Send from "./Pages/Send/Send";
import InitiateSend from "./Pages/InitiateSend/InitiateSend";
import Payment from "./Pages/Payment/Payment";
import QrInitPage from "./Pages/QrInitPage/QrInitPage";
import Scan from "./Pages/Scan/scan";
import { GlobalStateProvider } from "./Components/GlobalStateProvider"; // Import the provider
import GenerateCode from "./Pages/InfoPage/GenerateCode";

function App() {
  return (
    <GlobalStateProvider> {/* Wrap your app with GlobalStateProvider */}
      <div className="payfricaapp">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/send" element={<Send />} />
            <Route path="/initiatesend" element={<InitiateSend />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/qrinitpage" element={<QrInitPage />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/generatecode" element={<GenerateCode />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GlobalStateProvider>
  );
}

export default App;
