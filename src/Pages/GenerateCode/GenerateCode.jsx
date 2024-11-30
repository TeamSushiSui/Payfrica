import './GenerateCode.css';
import { useState } from 'react';

const GenerateCode = () => {
    const [password, setPassword] = useState('');
    const [qrCode, setQrCode] = useState('');

    const handleInput = (e) => {
        setPassword(e.target.value);
};

    const generateQRCode = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3001/generate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ password }),
            });

            const data = await res.json();
            if (data.success) {
                setQrCode(data.qrCode); // Assuming backend sends QR code as a URL or Base64 string
            } else {
                console.error('QR Code generation failed:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="generate-container">
            <header className="header">
                <button className="back-button">←</button>
                <h1>QR Code</h1>
            </header>

            <div className="qr-details">
                <h2>20 Sui</h2>
                <p>{new Date().toLocaleString()}</p>
            </div>

            <div className="qr-display">
                {qrCode ? (
                    <img src={qrCode} alt="Your QR Code" className="qr-image" />
                ) : (
                    <div className="placeholder">Your QR Code will appear here</div>
                )}
            </div>

            <form className="qr-form" onSubmit={generateQRCode}>
                <input
                    type="password"
                    value={password}
                    onChange={handleInput}
                    placeholder="Input password to generate code"
                    className="password-input"
                />
                <button type="submit" className="generate-button">
                    Generate QR Code
                </button>
            </form>

            {qrCode && (
                <div className="actions">
                    <a href={qrCode} download="Your_QR_Code.png" className="action-btn">
                        Save
                    </a>
                    <button className="action-btn" onClick={() => navigator.share({ url: qrCode })}>
                        Share
                    </button>
                </div>
            )}
        </div>
    );
};

export default GenerateCode;
