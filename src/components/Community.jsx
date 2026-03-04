import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, MessageSquare, TrendingUp, Award } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const Community = () => {
    const [leaderboard, setLeaderboard] = useState([
        { id: 1, name: "EcoWarrior_99", credits: 2450, city: "Neo-Tokyo" },
        { id: 2, name: "GreenQueen", credits: 2100, city: "Eco-London" },
        { id: 3, name: "SolarSam", credits: 1850, city: "Biolite-Sydney" }
    ]);

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h1 className="text-5xl font-black mb-4 tracking-tighter">Global Community</h1>
                <p className="text-xl text-slate-400 font-medium">Connect with eco-champions across the planet.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Leaderboard */}
                <div className="lg:col-span-2">
                    <div className="glass-card p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <TrendingUp className="text-primary-emerald" />
                            <h2 className="text-2xl font-bold">World Leaderboard</h2>
                        </div>

                        <div className="space-y-4">
                            {leaderboard.map((user, index) => (
                                <motion.div
                                    key={user.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-primary-emerald/20 transition-all group"
                                >
                                    <div className="flex items-center gap-5">
                                        <span className={`text-2xl font-black italic ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-slate-300' : 'text-orange-500'}`}>#{index + 1}</span>
                                        <div className="w-12 h-12 rounded-full bg-linear-to-tr from-slate-100/10 to-transparent p-[1px]">
                                            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{user.name}</h3>
                                            <span className="text-xs text-slate-500 uppercase font-black tracking-widest">{user.city}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xl font-black text-primary-emerald glow-text-emerald">{user.credits}</span>
                                        <span className="text-[10px] text-slate-500 font-bold uppercase">Eco-Credits</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-8">
                    <div className="glass-card p-8">
                        <Globe className="text-secondary-azure mb-4" size={32} />
                        <h3 className="text-xl font-bold mb-2">Global Impact</h3>
                        <p className="text-sm text-slate-400 font-medium mb-6">45.2M verifiable actions taken this month by the GEN community.</p>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "75%" }}
                                className="h-full bg-secondary-azure"
                            />
                        </div>
                    </div>

                    <div className="glass-card p-8">
                        <MessageSquare className="text-purple-400 mb-4" size={32} />
                        <h3 className="text-xl font-bold mb-2">Guild Chat</h3>
                        <p className="text-slate-500 font-medium text-sm mb-6 italic">"Just composted 5kg of waste! Verification pending..." - @EcoHero</p>
                        <button className="w-full py-3 bg-white/5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">Join Conversation</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
