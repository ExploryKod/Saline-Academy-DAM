import React, { useState, useEffect } from 'react';

const FlashMessage = ({ message, center = true, duration = 4000 }) => {
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowMessage(false);
        }, duration);

        return () => clearTimeout(timeout);
    }, [duration]);

    if (!showMessage) return null;

    return (
        <div className={`output-message ${center ? "x-center-position" : ""}`}>
            {message}
        </div>
    );
};

export default FlashMessage;
