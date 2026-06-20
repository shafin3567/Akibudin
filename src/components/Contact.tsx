import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, Facebook, Twitter, ShieldAlert } from 'lucide-react';
import { Message } from '../types';
import AnimatedHeading from './AnimatedHeading';
import MagneticElement from './MagneticElement';

interface ContactProps {
  darkMode: boolean;
  onNewMessage: (msg: Omit<Message, 'id' | 'date' | 'status'>) => void;
}

export default function Contact({ darkMode, onNewMessage }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    // Basic sanitizing validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorText('Please populate name, email, and message lines.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorText('Please supply a valid email direction.');
      return;
    }

    setLoading(true);

    try {
      // Simulate EmailJS network relay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Propagate message payload to local lists
      onNewMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'General Consulting Enquiry',
        message: formData.message.trim()
      });

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Auto-clear success message modal after delay
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setErrorText('relay failure. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactData = [
    {
      icon: <Mail className="w-5 h-5 text-accent-cyan" />,
      title: 'Email Direct',
      value: 'shafin.bd.d@gmail.com',
      href: 'mailto:shafin.bd.d@gmail.com'
    },
    {
      icon: <Phone className="w-5 h-5 text-accent-cyan" />,
      title: 'Call / WhatsApp',
      value: '+880 1781-844158',
      href: 'tel:+8801781844158'
    },
    {
      icon: <MapPin className="w-5 h-5 text-accent-cyan" />,
      title: 'Primary Location',
      value: 'Dhaka, Bangladesh',
      href: 'https://maps.google.com/?q=Dhaka,Bangladesh'
    }
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/akibsatej', color: 'hover:text-white hover:bg-slate-800' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com', color: 'hover:text-blue-400 hover:bg-blue-900/20' },
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com', color: 'hover:text-blue-500 hover:bg-blue-900/20' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com', color: 'hover:text-sky-400 hover:bg-sky-900/20' }
  ];

  return (
    <section
      id="contact"
      className={`py-20 md:py-28 relative border-b ${
        darkMode ? 'bg-[#0b1a0d] text-white border-white/5' : 'bg-slate-50 text-slate-1500 border-slate-200'
      }`}
    >
      <div className="absolute top-[30%] left-[2%] w-[250px] h-[250px] bg-primary-blue/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedHeading
            text="Let's Collaborate"
            tag="h2"
            className="text-xs font-mono font-bold tracking-widest text-primary-blue uppercase"
          />
          <p className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight mt-2.5">
            Contact Me
          </p>
          <div className="w-16 h-1 bg-primary-blue mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-display">
                Get In Touch
              </h3>
              <p className={`text-sm sm:text-base leading-relaxed ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Have an ambitious product concept, feature request, or scaling bottleneck? Send me an instant inquiry line or trigger a calendar invite. I usually reply within 12 operating hours.
              </p>
            </div>

            {/* Micro details panel */}
            <div className="space-y-4">
              {contactData.map((d, id) => (
                <a
                  key={id}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-2xl border flex items-center gap-4 transition-all hover:scale-[1.01] ${
                    darkMode ? 'bg-slate-900/40 border-white/5 hover:bg-slate-900' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center shrink-0">
                    {d.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-mono tracking-wider opacity-50 uppercase">{d.title}</p>
                    <p className="text-sm sm:text-base font-semibold mt-0.5">{d.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social handles block */}
            <div className="space-y-3.5">
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-primary-blue">Social Channels</p>
              <div className="flex gap-3">
                {socialLinks.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl border text-slate-400 transition-all ${
                      darkMode ? 'border-white/10 bg-slate-900/60' : 'border-slate-250 bg-white hover:-translate-y-1'
                    } ${s.color}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Fill Column */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-3xl border ${
              darkMode ? 'bg-slate-900/60 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              
              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                {/* Two inputs grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase opacity-70">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Akib Satej"
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none ${
                        darkMode 
                          ? 'border-white/10 bg-slate-950/50 text-white focus:border-accent-cyan focus:bg-slate-950' 
                          : 'border-slate-250 bg-slate-50 text-slate-900 focus:border-primary-blue focus:bg-white'
                      }`}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase opacity-70">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="client@company.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none ${
                        darkMode 
                          ? 'border-white/10 bg-slate-950/50 text-white focus:border-accent-cyan focus:bg-slate-950' 
                          : 'border-slate-250 bg-slate-50 text-slate-900 focus:border-primary-blue focus:bg-white'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase opacity-70">Enquiry Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="E-Commerce Redesign Project"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none ${
                      darkMode 
                        ? 'border-white/10 bg-slate-950/50 text-white focus:border-accent-cyan focus:bg-slate-950' 
                        : 'border-slate-250 bg-slate-50 text-slate-900 focus:border-primary-blue focus:bg-white'
                      }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase opacity-70">Your Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Hi Akib. We loved your SaaS Observatory dashboard. We would love to discuss restructuring our cloud containers latency graphics..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none resize-none ${
                      darkMode 
                        ? 'border-white/10 bg-slate-950/50 text-white focus:border-accent-cyan focus:bg-slate-950' 
                        : 'border-slate-250 bg-slate-50 text-slate-900 focus:border-primary-blue focus:bg-white'
                    }`}
                    required
                  />
                </div>

                {/* Validation Warnings */}
                <AnimatePresence>
                  {errorText && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono"
                    >
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{errorText}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <MagneticElement className="w-full">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary-blue to-accent-cyan disabled:opacity-50 text-white p-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-blue/20 hover:opacity-95 transition-all text-sm cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Transmit Secure Message
                      </>
                    )}
                  </button>
                </MagneticElement>

              </form>

            </div>
          </div>

        </div>
      </div>

      {/* Instant validation positive feedback */}
      <AnimatePresence>
        {success && (
          <div className="fixed bottom-6 right-6 z-100 max-w-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/20 shadow-2xl flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1 text-sm text-white">
                <h4 className="font-bold font-display">Relay Transmitter Successful!</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Your inquiry has been relayed and buffered into the local state. Inspect details inside the Admin Panel under Message Logs immediately!
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
