import React, { useState } from 'react';
import { evaluate } from 'mathjs';

const Calculator = ({ orderDetails }) => {
    const [inputAmount, setInputAmount] = useState('');
    const [change, setChange] = useState(0);

    const handleCalculatorInput = (value) => {
        if (value === 'C') {
            setInputAmount('');
            setChange(0);
        } else if (value === '=') {
            try {
                const result = evaluate(inputAmount);
                setInputAmount(String(result));
                const total = orderDetails ? orderDetails.Total : 0;
                setChange(result - total);
            } catch (error) {
                alert('Invalid expression');
                setInputAmount('');
            }
        } else {
            setInputAmount((prev) => prev + value);
        }
    };

    const autoFillTotalAmount = () => {
        if (orderDetails) {
            setInputAmount(String(orderDetails.Total));
        }
    };

    return (
        <div className='calculator'>
            <input
                className='amount-charged'
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                placeholder="Enter amount"
            />
            <div className="text-space-between change">
                <p>找零:</p>
                <p>${change}</p>
            </div>
            <button className='same' onClick={autoFillTotalAmount}>Auto Fill</button>
            <div className="key-boards">
                {['C', '7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '+', '-', '*', '/', '='].map((key) => (
                    <button className="key-board" key={key} onClick={() => handleCalculatorInput(key)}>{key}</button>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
