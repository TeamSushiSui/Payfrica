import './Scan.css';
import QRScanner from '../../Components/QRScanner';
import { useGlobalState } from '../../Components/GlobalStateProvider';

const Scan = () => {
  const globalState = useGlobalState();
  const { qrData, setQrData } = globalState;

  const handleScan = (data) => {
    console.log('QR Data:', data);
    setQrData(data);
  };

  return (
    <div className="scanner-container">
      <div className="scanner-overlay">
        <QRScanner onScan={handleScan}/>
        {/* <div className="scan-frame">
          <div className="scan-line"></div>
        </div> */}
      </div>

      <div className="controls">
        <button className="control-btn">Flash</button>
        <button className="control-btn">History</button>
        <button className="control-btn">Gallery</button>
      </div>

      <div className="bottom-nav">
        <button className="nav-btn">Generate</button>
        <button className="nav-btn active">Scan</button>
        <button className="nav-btn">History</button>
      </div>

      {qrData && (
        <div className="qr-data">
          <h1>QR Data: {qrData.data}</h1>
        </div>
      )}
    </div>
  );
};

export default Scan;


