import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Shield, Sparkles, Star } from 'lucide-react';

const Achievements = () => {
    const badges = [
        { id: 1, title: "Seedling", desc: "Your first eco-action verified.", icon: Zap, color: "text-emerald-400", unlocked: true },
        { id: 2, title: "Plastic Banisher", desc: "Recycle 10kg of plastic.", icon: Shield, color: "text-blue-400", unlocked: true },
        { id: 3, title: "Carbon Neutral", desc: "Offset your first month's footprint.", icon: Sparkles, color: "text-purple-400", unlocked: false },
        { id: 4, title: "Eco King", desc: "Rank #1 on your city leaderboard.", icon: Star, color: "text-yellow-400", unlocked: false },
    ];

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h1 className="text-5xl font-black mb-4 tracking-tighter">Hall of Heroes</h1>
                <p className="text-xl text-slate-400 font-medium">Your legacy in the fight for Earth.</p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {badges.map((badge, index) => (
                    <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`glass-card p-8 text-center flex flex-col items-center ${!badge.unlocked ? 'opacity-40 grayscale' : 'hover:scale-105 transition-transform cursor-pointer'}`}
                    >
                        <div className={`p-6 rounded-[2.5rem] bg-white/5 mb-6 ${badge.color} group-hover:scale-110 transition-transform shadow-2xl relative`}>
                            <badge.icon size={48} />
                            {badge.unlocked && (
                                <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1 border-4 border-bg-dark">
                                    <Award size={14} className="text-white" />
                                </div>
                            )}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{badge.title}</h3>
                        <p className="text-sm text-slate-500 font-medium">{badge.desc}</p>

                        {!badge.unlocked && (
                            <div className="mt-6 px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                                Locked
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;
