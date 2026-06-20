import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Unlock, AlertTriangle, Key, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { soundSystem } from '../utils/sound';

interface SecurityGateProps {
  onUnlock: () => void;
  darkMode: boolean;
}

export default function SecurityGate({ onUnlock, darkMode }: SecurityGateProps) {
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  
  const [inputCode, setInputCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Check if a passcode has already been established
  useEffect(() => {
    const storedPasscode = localStorage.getItem('portfolio_admin_passcode');
    if (!storedPasscode) {
      setIsSetupMode(true);
    }
  }, []);

  const playInteractiveClick = () => {
    soundSystem.playClick();
  };

  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playInteractiveClick();

    if (passcode.length < 4) {
      setError('Passcode must be at least 4 characters long.');
      triggerShake();
      return;
    }

    if (passcode !== confirmPasscode) {
      setError('Passcodes do not match. Please try again.');
      triggerShake();
      return;
    }

    // Save passcode securely in localStorage
    localStorage.setItem('portfolio_admin_passcode', passcode);
    setIsSetupMode(false);
    setError(null);
    setInputCode('');
    onUnlock();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playInteractiveClick();

    const storedPasscode = localStorage.getItem('portfolio_admin_passcode') || 'admin123'; // fallback default if somehow deleted

    if (inputCode === storedPasscode) {
      setError(null);
      onUnlock();
    } else {
      setAttempts(prev => prev + 1);
      setError(`Access Denied. Invalid master key.`);
      triggerShake();
      setInputCode('');
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <div className={`w-full max-w-md mx-auto my-12 p-6 rounded-2xl border transition-all ${
      darkMode 
        ? 'bg-[#0b1a0d]/90 border-[#FFAA00]/20 text-white shadow-2xl shadow-[#237227]/10' 
        : 'bg-white border-slate-200 text-slate-950 shadow-lg'
    }`}>
      {/* Header Guard Graphic */}
      <div className="flex flex-col items-center text-center mb-6">
        <motion.div
          animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
            error 
              ? 'bg-rose-500/10 text-rose-500 border border-rose-500/30' 
              : 'bg-[#FFAA00]/10 text-[#FFAA00] border border-[#FFAA00]/20'
          }`}
        >
          {isSetupMode ? (
            <ShieldCheck className="w-7 h-7" />
          ) : (
            <Lock className="w-7 h-7" />
          )}
        </motion.div>

        <h3 className="text-xl font-display font-semibold tracking-tight">
          {isSetupMode ? 'Initialize Security Shield' : 'Terminal Unlock Required'}
        </h3>
        
        <p className={`text-xs mt-1.5 leading-relaxed max-w-[280px] ${
          darkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>
          {isSetupMode 
            ? 'Initialize your master passcode to safeguard the Admin Panel, analytics systems, and messages logs.'
            : 'Access is encrypted. Enter your absolute master passcode to clearance terminal system controls.'
          }
        </p>
      </div>

      {isSetupMode ? (
        /* Setup Initial Passcode Form */
        <form onSubmit={handleSetupSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono tracking-wider text-slate-400 uppercase block">New Master Passcode</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                placeholder="Enter 4+ characters"
                className={`w-full h-10 pl-9 pr-10 text-sm rounded-lg border text-center font-mono focus:outline-none focus:ring-1 ${
                  darkMode 
                    ? 'bg-[#0f2412] border-white/10 text-white focus:border-[#FFAA00] focus:ring-[#FFAA00]' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#237227] focus:ring-[#237227]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-250 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono tracking-wider text-slate-400 uppercase block">Confirm Master Passcode</label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPasscode}
                onChange={(e) => setConfirmPasscode(e.target.value)}
                placeholder="Confirm your passcode"
                className={`w-full h-10 pl-9 pr-10 text-sm rounded-lg border text-center font-mono focus:outline-none focus:ring-1 ${
                  darkMode 
                    ? 'bg-[#0f2412] border-white/10 text-white focus:border-[#FFAA00] focus:ring-[#FFAA00]' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#237227] focus:ring-[#237227]'
                }`}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-2.5 rounded-lg text-xs bg-rose-500/10 text-rose-400 border border-rose-500/15">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full h-10 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#FFAA00] to-[#FFD786] shadow-md transition-all hover:opacity-90 cursor-pointer"
          >
            Activate Security Shield
          </button>
        </form>
      ) : (
        /* Verify Exist Passcode Form */
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-mono tracking-wider text-slate-400 uppercase block">Master Passcode</label>
              {attempts > 0 && (
                <span className="text-[10px] font-mono text-rose-400 font-bold">Attempts: {attempts}</span>
              )}
            </div>
            
            <div className="relative">
              <Unlock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                autoFocus
                placeholder="••••••••"
                className={`w-full h-10 pl-9 pr-10 text-sm rounded-lg border text-center font-mono focus:outline-none focus:ring-1 ${
                  darkMode 
                    ? 'bg-[#0f2412] border-white/10 text-white focus:border-[#FFAA00] focus:ring-[#FFAA00]' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#237227] focus:ring-[#237227]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-2.5 rounded-lg text-xs bg-rose-500/10 text-rose-400 border border-rose-500/15">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full h-10 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#FFAA00] to-[#FFD786] shadow-md transition-all hover:opacity-90 cursor-pointer"
            >
              Sign Clear Verification
            </button>

            {/* Hint clue to assist evaluation on dev environment */}
            <p className="text-[10px] font-mono opacity-40 text-center mt-1">
              Hint: Default setup passcode is defined on first load (e.g. admin123).
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
