import { useState, useEffect } from 'react';

export const useEcoCreditSimulator = () => {
    const [credits, setCredits] = useState(1250);
    const [isVerifying, setIsVerifying] = useState(false);
    const [lastAction, setLastAction] = useState(null);

    const actions = [
        { type: 'AI_VISION', action: 'Plastic Bottle Detected', reward: 10, source: 'Community Bin #42' },
        { type: 'IOT_SENSOR', action: 'Low-Carbon Transit Logged', reward: 15, source: 'Smart Bike-Share' },
        { type: 'PREDICTIVE', action: 'Energy Optimization Forecast', reward: 25, source: 'Home Grid AI' }
    ];

    const simulateVerification = () => {
        setIsVerifying(true);

        // Random delay for "AI processing"
        setTimeout(() => {
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            setLastAction({
                ...randomAction,
                timestamp: new Date().toLocaleTimeString(),
                txHash: '0x' + Math.random().toString(16).slice(2, 10) + '...'
            });
            setCredits(prev => prev + randomAction.reward);
            setIsVerifying(false);
        }, 3000);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isVerifying) simulateVerification();
        }, 12000);

        return () => clearInterval(interval);
    }, [isVerifying]);

    return { credits, isVerifying, lastAction };
};
