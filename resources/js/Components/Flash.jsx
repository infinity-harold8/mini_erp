import React, { useEffect, useState } from 'react';

const colorMap = {
    success: 'border-emerald-500 bg-emerald-100 text-emerald-700',
    error:   'border-red-500    bg-red-100    text-red-700',
};

export default function FlashMessage({ type = '', message='' }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!message) return;          // nothing to show
        setShow(true);                 // fade / slide in

        const timer = setTimeout(() => setShow(false), 5000); // auto-close
        return () => {
            message='';
            clearTimeout(timer);
            
        };
    }, [message]);

    // if (!show) return null;

    return (
        <div
            className={`
                fixed top-4 right-4 z-50
                max-w-xs sm:max-w-sm      /* grows with text but stays reasonable */
                border rounded-xl shadow-lg px-5 py-4
                ${colorMap[type] ?? colorMap.success}

                /* Animation */
                transition
                transform-gpu duration-300 
                ${show ? 'opacity-100 translate-x-0 ease-in ' : 'opacity-0 translate-x-4 ease-out'}
            `}
        >
            <p className="text-lg font-medium leading-snug">{message}</p>
        </div>
    );
}
