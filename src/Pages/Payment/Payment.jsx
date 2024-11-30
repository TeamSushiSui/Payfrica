import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";

const Payment = () => {
    const [amount, setAmount] = useState("0");
    const [currency, setCurrency] = useState("NGN");

    const [payerDetails, setPayerDetails] = useState({
        name: '404',
        email: '404payfrica@gmail.com',
        phone_number: '+4472672864',
        amount: ''
    });

    const [USDCEqv, setUSDCEqv] = useState(0);

    const config = {
        public_key: 'FLWPUBK_TEST-1c5e99d70134515275276a09b4b5820d-X',
        tx_ref: new Date().getTime(),
        amount: payerDetails.amount,
        currency: currency,
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: payerDetails.email,
            phone_number: payerDetails.phone_number,
            name: payerDetails.name,
        },
        customizations: {
            title: 'Token Payment ',
            description: 'Payment for token',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    const handleNumberClick = (number) => {
        setAmount((prev) => (prev === "0" ? number : prev + number));
    };

    useEffect(() => {
        setPayerDetails((prev) => ({ ...prev, amount: amount }));
    }, [amount])

    const handleClear = () => {
        setAmount("0");
    };

    const handlePayment = async (e) => {

        e.preventDefault();

        handleFlutterPayment({
            callback: (response) => {
                console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => { },
        });
        console.log("tx", config.tx_ref);
        try {
            const res = await fetch("http://localhost:3001/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ config }), // Wrap address in an object
            });

            const data = await res.json();

            if (data.success) {
                setUSDCEqv(data.amountSent);
                console.log(`Payment of ${USDCEqv} successful. Token has been sent`);

            } else {
                console.error("QR Code generation failed:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    const toggleCurrency = () => {
        const currencies = ["NGN", "KES", "ZAR", "GHS"];
        const currentIndex = currencies.indexOf(currency);
        const nextCurrency = currencies[(currentIndex + 1) % currencies.length];
        setCurrency(nextCurrency);
        config.currency = nextCurrency;
    };

    return (
        <div className="payment">
            <Navbar />
            <div className='send-heading'>
                <Link to={'/send'}>
                    <FaChevronLeft />
                </Link>
                <p style={{ fontFamily: 'SansationBold' }}>Buy Token</p>
                <FaChevronRight />
            </div>
            <div className="amount-container">
                <h1>{amount}</h1>
                <button className="currency-btn" onClick={toggleCurrency}>
                    {currency} ↓
                </button>
            </div>

            <div className="keypad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "␡"].map((key) => (
                    <button
                        key={key}
                        className="key"
                        onClick={() =>
                            key === "␡" ? handleClear() : handleNumberClick(key.toString())
                        }
                    >
                        {key}
                    </button>
                ))}
            </div>

            <button onClick={handlePayment} className="send-btn">Send</button>
        </div>
    );
};

export default Payment;