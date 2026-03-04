import { Link } from 'react-router-dom';
import heroImg from '../assets/hero_img.png';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe, Zap, Award } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-emerald/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-azure/20 blur-[120px] rounded-full" />

            {/* Hero Content & Visual */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-1/2 text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-glass-bg border border-glass-border mb-6">
                        <Zap size={14} className="text-primary-emerald fill-primary-emerald" />
                        <span className="text-xs font-bold tracking-widest uppercase text-primary-emerald">Mission: Earth Restoration</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tighter">
                        Eco-Action <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-primary-emerald via-emerald-400 to-secondary-azure drop-shadow-sm">
                            Redefined.
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl leading-relaxed font-medium">
                        Join the Global Eco-Credit Network. AI-verified actions, blockchain transparency, and real-world rewards for a greener planet.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                        <Link to="/dashboard" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-linear-to-r from-primary-emerald to-emerald-600 font-bold text-xl flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-2xl shadow-emerald-500/20 group">
                            Start Your Mission
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/community" className="w-full sm:w-auto px-10 py-5 rounded-2xl glass font-bold text-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                            View Live Impact
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="lg:w-5/12 relative group"
                >
                    <div className="absolute inset-0 bg-primary-emerald/30 blur-[60px] rounded-full group-hover:bg-primary-emerald/40 transition-colors" />
                    <div className="relative glass p-3 border border-primary-emerald/20 overflow-hidden rounded-[2.5rem]">
                        <img
                            src={heroImg}
                            alt="Eco Champion"
                            className="w-full h-auto rounded-[2rem] shadow-2xl transition-transform duration-1000 group-hover:scale-110"
                        />
                        {/* HUD Overlay Elements */}
                        <div className="absolute top-8 right-8 glass px-3 py-1 border-primary-emerald/30 animate-pulse rounded-full">
                            <span className="text-[9px] uppercase font-bold text-primary-emerald tracking-widest">GEN VERIFIED</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Hero Stats */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 z-10"
            >
                {[
                    { icon: ShieldCheck, label: 'Verified Actions', value: '2.4M+' },
                    { icon: Globe, label: 'Cities Connected', value: '142' },
                    { icon: Leaf, label: 'CO2 Offset', value: '450kT' },
                    { icon: Award, label: 'Active Heroes', value: '85k+' },
                ].map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                        <stat.icon className="text-primary-emerald mb-1" size={24} />
                        <span className="text-2xl font-bold">{stat.value}</span>
                        <span className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold">{stat.label}</span>
                    </div>
                ))}
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-glass-border rounded-full scale-110" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-glass-border rounded-full scale-[1.5]" />
            </div>
        </div>
    );
};

const Leaf = ({ className, size = 24 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C10.2 13.75 11 15 13 14c-1 2-2 4-5 4-2.8 0-4.5 1-6 3Z" /><path d="M7 14.5c.3-1 .5-3 2-4.5" />
    </svg>
);

export default Hero;
