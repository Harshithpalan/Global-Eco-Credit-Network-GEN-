import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, TrendingUp, Users, ShieldCheck, Cpu, Send } from 'lucide-react';
import { useEcoActionManager } from '../features/EcoActionManager';

const Dashboard = () => {
    const { stats, isVerifying, lastAction, processNewAction } = useEcoActionManager();
    const [actionInput, setActionInput] = useState("");

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!actionInput.trim() || isVerifying) return;
        await processNewAction(actionInput);
        setActionInput("");
    };

    return (
        <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
            <div className="absolute top-[10%] left-[-5%] w-64 h-64 bg-primary-emerald/5 blur-[80px] rounded-full" />

            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h2 className="text-4xl font-black mb-3 tracking-tighter">Impact Command Center</h2>
                    <p className="text-lg text-slate-400 font-medium">Verified actions recorded on the Global Ledger.</p>
                </div>
                <div className="flex gap-4">
                    <div className="glass px-8 py-4 border-emerald-500/20 rounded-2xl relative overflow-hidden group min-w-[160px]">
                        <div className="absolute inset-0 bg-primary-emerald/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <span className="block text-[10px] uppercase text-slate-500 tracking-[0.2em] mb-2 font-black relative z-10">Carbon Offset</span>
                        <span className="text-3xl font-black text-primary-emerald glow-text-emerald relative z-10">{(stats.credits * 0.01).toFixed(1)} kg</span>
                    </div>
                    <div className="glass px-8 py-4 border-blue-500/20 rounded-2xl relative overflow-hidden group min-w-[160px]">
                        <div className="absolute inset-0 bg-secondary-azure/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <span className="block text-[10px] uppercase text-slate-500 tracking-[0.2em] mb-2 font-black relative z-10">Eco-Credits</span>
                        <span className="text-3xl font-black text-secondary-azure glow-text-azure relative z-10">{stats.credits}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Verification Hub */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-8 glass-card p-10"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-primary-emerald/10 rounded-2xl">
                                <Cpu className="text-primary-emerald" size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-extrabold tracking-tight">AI Verification</h3>
                                <p className="text-sm text-slate-500 font-medium">Submit your eco-action for AI scanning.</p>
                            </div>
                        </div>

                        <form onSubmit={handleVerify} className="flex-1 max-w-md relative group">
                            <input
                                type="text"
                                value={actionInput}
                                onChange={(e) => setActionInput(e.target.value)}
                                placeholder="I recycled 3 plastic bottles..."
                                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary-emerald/40 transition-colors placeholder:text-slate-600 font-medium pr-14"
                            />
                            <button
                                type="submit"
                                disabled={isVerifying}
                                className="absolute right-2 top-2 bottom-2 aspect-square bg-primary-emerald rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                            >
                                <Send size={20} className="text-white" />
                            </button>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <VerificationCard
                            icon={Leaf}
                            title={lastAction ? lastAction.action : "Waiting for scan..."}
                            status={isVerifying ? "Verifying" : "Verified"}
                            credits={isVerifying ? "--" : lastAction ? `+${lastAction.reward}` : "--"}
                            time={lastAction ? lastAction.timestamp : "Listening..."}
                            loading={isVerifying}
                        />
                        <div className="glass p-8 border-white/5 flex flex-col justify-center rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <ShieldCheck size={80} />
                            </div>
                            <span className="text-[10px] uppercase text-slate-500 tracking-[0.2em] mb-4 font-black">Blockchain Transparency</span>
                            <div className="font-mono text-sm overflow-hidden text-ellipsis text-primary-emerald mb-2 font-bold bg-black/20 p-3 rounded-xl border border-white/5">
                                {lastAction ? lastAction.txHash : '0x0000...0000'}
                            </div>
                            <div className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                {lastAction ? `Source Node: ${lastAction.source}` : 'Awaiting network ping...'}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Gamified Sidebar */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    {/* Streaks */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 group"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="text-orange-400" size={24} />
                                <h4 className="font-extrabold text-lg">Eco-Streak</h4>
                            </div>
                            <span className="text-xs font-black text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full border border-orange-400/20">🔥 HOT</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                                <svg className="w-full h-full rotate-[-90deg]">
                                    <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
                                    <motion.circle
                                        cx="40" cy="40" r="36" stroke="#f97316" strokeWidth="6" fill="transparent"
                                        strokeDasharray="226"
                                        initial={{ strokeDashoffset: 226 }}
                                        animate={{ strokeDashoffset: 45 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="absolute text-2xl font-black italic">12</span>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                You're in the <span className="text-white font-bold">top 5%</span>. Maintain for 3 more days for the <span className="text-primary-emerald">Eco-Guardian</span> role.
                            </p>
                        </div>
                    </motion.div>

                    {/* Social Proof */}
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Users className="text-secondary-azure" size={20} />
                            <h4 className="font-bold">City Leaderboard</h4>
                        </div>
                        <div className="space-y-4">
                            <LeaderboardRow rank={1} name="Neo-Singapore" impact="1.2M GEN" active />
                            <LeaderboardRow rank={2} name="Eden-Vancouver" impact="980K GEN" />
                            <LeaderboardRow rank={3} name="Green-Copenhagen" impact="850K GEN" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const VerificationCard = ({ icon: Icon, title, status, credits, time, loading = false }) => (
    <div className="glass p-6 border-white/5 hover:border-emerald-500/30 transition-all group rounded-3xl">
        <div className="flex items-center justify-between mb-6">
            <div className={`p-4 rounded-2xl ${loading ? 'bg-blue-500/10' : 'bg-emerald-500/10'}`}>
                <Icon size={24} className={loading ? 'text-secondary-azure' : 'text-primary-emerald'} />
            </div>
            <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">{time}</span>
        </div>
        <h4 className="text-lg font-bold mb-2 text-white">{title}</h4>
        <div className="flex items-center justify-between mt-6">
            <span className={`text-[10px] px-3 py-1 rounded-full border uppercase font-black tracking-widest ${loading ? 'border-blue-500/20 text-blue-400 bg-blue-500/5' : 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5'
                }`}>
                {status}
            </span>
            <span className="font-mono font-black text-xl text-white glow-text-emerald">{credits}</span>
        </div>
    </div>
);

const LeaderboardRow = ({ rank, name, impact, active = false }) => (
    <div className={`flex items-center justify-between p-4 rounded-2xl transition-all ${active ? 'bg-primary-emerald/10 border border-primary-emerald/20 shadow-lg shadow-emerald-500/5' : 'hover:bg-white/5 border border-transparent'}`}>
        <div className="flex items-center gap-4">
            <span className={`w-6 text-center font-black italic ${rank === 1 ? 'text-yellow-500' : 'text-slate-500'}`}>{rank}</span>
            <div className="flex flex-col">
                <span className={`text-sm font-bold ${active ? 'text-primary-emerald' : 'text-slate-200'}`}>{name}</span>
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Verified Region</span>
            </div>
        </div>
        <span className="text-xs font-black text-slate-400 bg-black/20 px-2 py-1 rounded-lg">{impact}</span>
    </div>
);

export default Dashboard;
