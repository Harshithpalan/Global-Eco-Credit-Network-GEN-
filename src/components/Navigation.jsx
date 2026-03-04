import { Link, useLocation } from 'react-router-dom';
import { Leaf, Award, BarChart3, Users } from 'lucide-react';

const NavItem = ({ icon: Icon, label, path }) => {
    const location = useLocation();
    const active = location.pathname === path;

    return (
        <Link to={path} className={`flex items-center gap-2 px-5 py-2.5 cursor-pointer transition-all duration-300 rounded-full ${active ? 'bg-primary-emerald text-white pulse-emerald' : 'text-slate-400 hover:text-primary-emerald hover:bg-white/5'
            }`}>
            <Icon size={20} />
            <span className="font-bold text-sm">{label}</span>
        </Link>
    );
};

const Navigation = () => {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl glass px-8 py-4 flex items-center justify-between rounded-full">
            <Link to="/" className="flex items-center gap-3 text-primary-emerald hover:scale-105 transition-transform">
                <Leaf className="animate-float" fill="currentColor" size={28} />
                <span className="text-2xl font-black tracking-tighter glow-text-emerald">GEN</span>
            </Link>

            <div className="hidden md:flex items-center gap-2">
                <NavItem icon={BarChart3} label="Dashboard" path="/dashboard" />
                <NavItem icon={Users} label="Community" path="/community" />
                <NavItem icon={Award} label="Achievements" path="/achievements" />
            </div>

            <div className="flex items-center gap-5">
                <div className="flex flex-col items-end leading-none">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">Impact Credits</span>
                    <span className="text-primary-emerald font-black text-lg glow-text-emerald">1,250 GEN</span>
                </div>
                <div className="w-11 h-11 rounded-full bg-linear-to-tr from-primary-emerald to-secondary-azure p-[2px] shadow-lg shadow-emerald-500/20">
                    <div className="w-full h-full rounded-full bg-bg-dark flex items-center justify-center overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Eco" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
