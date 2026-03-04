import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Globe, ArrowRight } from 'lucide-react';

const StoryOnboarding = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    const stories = [
        {
            title: "The Earth is Calling",
            text: "Our planet is at a tipping point. But in the Global Eco-Credit Network, every action you take becomes a ripple of hope.",
            icon: Globe,
            color: "text-blue-400"
        },
        {
            title: "Habits are Currency",
            text: "Using advanced AI and IoT sensors, we verify your real-world eco-friendly habits and record them forever on the blockchain.",
            icon: Zap,
            color: "text-emerald-400"
        },
        {
            title: "Become an Eco-Champion",
            text: "Earn credits, climb leaderboards, and redeem rewards. Your journey to save the planet starts now.",
            icon: Shield,
            color: "text-purple-400"
        }
    ];

    const next = () => {
        if (step < stories.length - 1) {
            setStep(step + 1);
        } else {
            onComplete();
        }
    };

    const current = stories[step];

    return (
        <div className="fixed inset-0 z-[100] bg-bg-dark flex items-center justify-center p-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -30 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl w-full glass-card p-16 text-center relative overflow-hidden flex flex-col items-center"
                >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                        <motion.div
                            className="h-full bg-linear-to-r from-primary-emerald to-secondary-azure"
                            initial={{ width: `${(step / stories.length) * 100}%` }}
                            animate={{ width: `${((step + 1) / stories.length) * 100}%` }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                        />
                    </div>

                    <div className={`inline-flex p-6 rounded-[2rem] bg-white/5 mb-10 ${current.color} shadow-2xl`}>
                        <current.icon size={56} className="animate-float" />
                    </div>

                    <h2 className="text-4xl font-extrabold mb-6 tracking-tight leading-tight">{current.title}</h2>
                    <p className="text-xl text-slate-400 leading-relaxed mb-12 max-w-lg mx-auto font-medium">
                        {current.text}
                    </p>

                    <button
                        onClick={next}
                        className="w-full py-5 rounded-2xl bg-linear-to-r from-primary-emerald to-emerald-600 font-bold text-xl flex items-center justify-center gap-3 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-emerald-950/40"
                    >
                        {step === stories.length - 1 ? "Begin Your Mission" : "Continue Journey"}
                        <ArrowRight size={24} />
                    </button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default StoryOnboarding;
