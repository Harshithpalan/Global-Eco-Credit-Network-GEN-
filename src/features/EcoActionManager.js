import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { verifyActionWithAI } from '../lib/aiService';

const MOCK_USER_ID = "hero-ceo-001"; // Simulating a persistent user account

export const useEcoActionManager = () => {
    const [stats, setStats] = useState({ credits: 0, actionsCount: 0 });
    const [isVerifying, setIsVerifying] = useState(false);
    const [lastAction, setLastAction] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Real-time sync with Firestore
        const userRef = doc(db, "users", MOCK_USER_ID);
        const unsubscribe = onSnapshot(userRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setStats({
                    credits: data.credits || 0,
                    actionsCount: data.actions?.length || 0
                });
                setHistory(data.actions || []);
                if (data.actions?.length > 0) {
                    setLastAction(data.actions[data.actions.length - 1]);
                }
            } else {
                // Initialize user if not exists
                setDoc(userRef, {
                    name: "Eco Champion",
                    credits: 1250,
                    actions: [],
                    joinedAt: new Date().toISOString()
                });
            }
        });

        return () => unsubscribe();
    }, []);

    const processNewAction = async (description) => {
        setIsVerifying(true);
        const userRef = doc(db, "users", MOCK_USER_ID);

        // 1. Verify with Gemini AI
        const aiResult = await verifyActionWithAI(description);

        if (aiResult.valid) {
            const newAction = {
                action: description,
                reward: aiResult.reward,
                feedback: aiResult.feedback,
                timestamp: new Date().toLocaleTimeString(),
                txHash: '0x' + Math.random().toString(16).slice(2, 10).toUpperCase(),
                source: "AI_NODE_ALPHA"
            };

            // 2. Update Firestore (Atomic entry)
            await updateDoc(userRef, {
                credits: (stats.credits || 0) + aiResult.reward,
                actions: arrayUnion(newAction)
            });
        }

        setIsVerifying(false);
        return aiResult;
    };

    return { stats, isVerifying, lastAction, history, processNewAction };
};
