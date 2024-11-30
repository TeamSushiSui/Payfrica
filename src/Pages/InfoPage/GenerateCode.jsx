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
            const res = await fetch("/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }), // Wrap address in an object
            });

            const data = await res.json();
            if (data.success) {
                setQrCode(data.qrCode);
            } else {
                console.error("QR Code generation failed:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div>
            <form>
                <label>Password</label>
                <input type="passsword" value={password} onChange={handleInput} />
            </form>
        </div>
    )
}

export default GenerateCode;