import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  ChevronRight, 
  Mail, 
  CreditCard, 
  Building2, 
  User, 
  Wallet, 
  History, 
  MapPin, 
  Package, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Clock,
  Navigation,
  PhoneCall,
  ExternalLink,
  Star,
  ShieldCheck,
  Bell,
  Camera,
  Upload,
  Siren,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Search,
  IndianRupee,
  FileText,
  Lock,
  Unlock,
  Image as ImageIcon,
  MoreVertical
} from 'lucide-react';

// --- Types ---
type Screen = 'LOGIN' | 'OTP' | 'PROFILE_SETUP' | 'KYC' | 'BANK_DETAILS' | 'TERMS' | 'DASHBOARD' | 'ORDER_FLOW' | 'SUPPORT' | 'EARNINGS' | 'HISTORY' | 'PROFILE';
type OrderStatus = 'ASSIGNING' | 'PICKING_UP' | 'DELIVERING' | 'COMPLETED';
type Platform = 'Swiggy' | 'Zomato' | 'ONDC (Adlogs)';

// --- Components ---

const Logo = () => (
  <div className="flex items-center gap-2 mb-8">
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-red to-brand-pink flex items-center justify-center shadow-lg">
      <Navigation className="text-white w-7 h-7" />
    </div>
    <div className="flex flex-col">
      <h1 className="text-xl font-black tracking-tighter leading-none">
        SWIFT<span className="text-brand-pink">MAILES</span>
      </h1>
      <p className="text-[10px] font-bold tracking-widest text-white/60 uppercase">Logistics</p>
    </div>
  </div>
);

const SwipeButton = ({ 
  onComplete, 
  text, 
  colorClass, 
  icon: Icon, 
  disabled = false, 
  error = "" 
}: { 
  onComplete: () => void, 
  text: string, 
  colorClass: string, 
  icon?: React.ElementType,
  disabled?: boolean,
  error?: string
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const [dragX, setDragX] = useState(0);
  const threshold = 220;

  return (
    <div className="space-y-2">
      <div className={`relative w-full h-18 bg-white/10 backdrop-blur-md rounded-[1.5rem] overflow-hidden border p-1.5 transition-colors ${disabled ? 'border-white/5 opacity-50' : 'border-white/20'}`}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.span 
            animate={{ opacity: disabled ? 0.3 : [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 font-bold text-sm tracking-wide uppercase"
          >
            {disabled ? 'Locked' : text}
          </motion.span>
        </div>
        
        {!disabled && (
          <motion.div 
            className={`absolute left-0 top-0 bottom-0 ${colorClass} opacity-20`}
            style={{ width: dragX + 64 }}
          />
        )}

        <motion.div
          drag={disabled ? false : "x"}
          dragConstraints={{ left: 0, right: threshold }}
          dragElastic={0.05}
          onDrag={(_, info) => setDragX(info.offset.x)}
          onDragEnd={() => {
            if (dragX >= threshold - 10) {
              setIsComplete(true);
              setTimeout(onComplete, 400);
            } else {
              setDragX(0);
            }
          }}
          animate={{ x: isComplete ? threshold : dragX }}
          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg z-10 transition-all ${disabled ? 'bg-white/10 cursor-not-allowed' : `${colorClass} cursor-grab active:cursor-grabbing hover:shadow-xl`}`}
        >
          {isComplete ? (
            <CheckCircle2 className="text-white w-7 h-7" />
          ) : (
            disabled ? <Lock className="text-white/40 w-6 h-6" /> : (Icon ? <Icon className="text-white w-7 h-7" /> : <ArrowRight className="text-white w-7 h-7" />)
          )}
        </motion.div>
      </div>
      {disabled && error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-brand-red font-bold text-center uppercase tracking-wider"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

const StatusSwipeButton = ({ isOnline, onToggle }: { isOnline: boolean, onToggle: () => void }) => {
  const [dragX, setDragX] = useState(0);
  const threshold = 180;

  return (
    <div className={`relative w-full h-16 rounded-2xl overflow-hidden border transition-colors duration-500 ${isOnline ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-brand-red/10 border-brand-red/20'}`}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className={`font-black text-xs uppercase tracking-widest ${isOnline ? 'text-emerald-500' : 'text-brand-red'}`}>
          {isOnline ? 'You are Online' : 'Swipe to Go Online'}
        </span>
      </div>
      
      <motion.div
        drag={isOnline ? false : "x"}
        dragConstraints={{ left: 0, right: threshold }}
        dragElastic={0.05}
        onDrag={(_, info) => setDragX(info.offset.x)}
        onDragEnd={() => {
          if (dragX >= threshold - 10) {
            onToggle();
            setDragX(0);
          } else {
            setDragX(0);
          }
        }}
        animate={{ x: isOnline ? threshold : dragX }}
        onClick={() => isOnline && onToggle()}
        className={`relative w-14 h-14 m-1 rounded-xl flex items-center justify-center shadow-lg z-10 cursor-pointer transition-colors duration-500 ${isOnline ? 'bg-emerald-500' : 'bg-brand-red'}`}
      >
        {isOnline ? (
          <CheckCircle2 className="text-white w-6 h-6" />
        ) : (
          <ArrowRight className="text-white w-6 h-6" />
        )}
      </motion.div>

      {/* Progress Fill */}
      {!isOnline && (
        <motion.div 
          className="absolute left-0 top-0 bottom-0 bg-brand-red opacity-20"
          style={{ width: dragX + 60 }}
        />
      )}
    </div>
  );
};

const WeeklyGraph = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const data = [400, 700, 500, 900, 600, 1200, 800];
  const max = Math.max(...data);

  return (
    <div className="flex items-end justify-between h-32 gap-2 px-2">
      {data.map((val, i) => (
        <div key={i} className="flex flex-col items-center flex-1 gap-2">
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: `${(val / max) * 100}%` }}
            transition={{ duration: 1, delay: i * 0.1 }}
            className={`w-full rounded-t-lg bg-gradient-to-t ${i === 5 ? 'from-brand-pink to-brand-red' : 'from-brand-purple to-brand-pink'}`}
          />
          <span className="text-[10px] font-bold text-white/40">{days[i]}</span>
        </div>
      ))}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('LOGIN');
  const [activeTab, setActiveTab] = useState<'HOME' | 'HISTORY' | 'PROFILE'>('HOME');
  const [isOnline, setIsOnline] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('ASSIGNING');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [bankDetails, setBankDetails] = useState({ account: '', ifsc: '' });
  const [ifscValid, setIfscValid] = useState<boolean | null>(null);
  const [distance, setDistance] = useState(500); // Mock distance in meters
  const [isArrived, setIsArrived] = useState(false);
  const [aadhaarDoc, setAadhaarDoc] = useState<string | null>(null);
  const [panDoc, setPanDoc] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [notificationAudio] = useState(new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'));

  useEffect(() => {
    notificationAudio.loop = true;
  }, [notificationAudio]);

  useEffect(() => {
    if (isRinging) {
      notificationAudio.play().catch(e => console.log("Audio play blocked:", e));
    } else {
      notificationAudio.pause();
      notificationAudio.currentTime = 0;
    }
  }, [isRinging, notificationAudio]);

  useEffect(() => {
    // Simulate incoming order after 5 seconds of being online
    let timeout: NodeJS.Timeout;
    if (isOnline && currentScreen === 'DASHBOARD' && !showNewOrder) {
      timeout = setTimeout(() => {
        setShowNewOrder(true);
        setIsRinging(true);
      }, 8000);
    }
    return () => clearTimeout(timeout);
  }, [isOnline, currentScreen, showNewOrder]);

  useEffect(() => {
    // Real-time distance simulation for demo purposes
    // In a real app, this would use navigator.geolocation.watchPosition
    let interval: NodeJS.Timeout;
    if (currentScreen === 'ORDER_FLOW' && distance > 0) {
      interval = setInterval(() => {
        setDistance(prev => Math.max(0, prev - 10));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentScreen, distance]);

  useEffect(() => {
    if (distance <= 100) {
      setIsArrived(true);
    } else {
      setIsArrived(false);
    }
  }, [distance]);

  const handleLogin = () => setCurrentScreen('OTP');
  const handleVerifyOtp = () => setCurrentScreen('PROFILE_SETUP');
  const handleProfileSubmit = () => setCurrentScreen('KYC');
  const handleKycSubmit = () => setCurrentScreen('BANK_DETAILS');
  const handleBankSubmit = () => {
    setCurrentScreen('TERMS');
  };

  const handleTermsSubmit = () => {
    if (agreedToTerms) {
      setCurrentScreen('DASHBOARD');
      setActiveTab('HOME');
    }
  };

  const handleAcceptOrder = () => {
    setIsRinging(false);
    setShowNewOrder(false);
    handleStartOrder();
  };

  const handleIgnoreOrder = () => {
    setIsRinging(false);
    setShowNewOrder(false);
  };

  const handleEmergencyCall = () => {
    // Dial 112
    window.location.href = 'tel:112';
    
    // Simulate sending SOS message with Google Maps link
    // In a real app, we'd use navigator.geolocation to get actual coords
    const mapsLink = "https://www.google.com/maps?q=28.5355,77.3910"; // Mock Noida coords
    console.log(`SOS Message sent to 7899467758: EMERGENCY! Rider Rahul Sharma needs immediate assistance. Location: ${mapsLink}`);
    
    // Visual feedback
    // Note: window.alert is discouraged in iframes, but for emergency confirmation it's often used.
    // However, I'll use a console log and the dialer will take over.
  };
  
  const handleStartOrder = () => {
    if (!isOnline) {
      alert('Action Denied: You must be Online to process orders');
      return;
    }
    setOrderStatus('ASSIGNING');
    setDistance(500); // Reset distance for new order
    setCurrentScreen('ORDER_FLOW');
    // Simulate assigning
    setTimeout(() => setOrderStatus('PICKING_UP'), 2000);
  };

  const validateIFSC = (code: string) => {
    // Mock IFSC validation: 11 characters, starts with 4 letters
    const isValid = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(code.toUpperCase());
    setIfscValid(isValid);
    setBankDetails({ ...bankDetails, ifsc: code.toUpperCase() });
  };

  return (
    <div className="min-h-screen bg-brand-purple flex flex-col items-center justify-center p-4 font-sans text-white">
      <AnimatePresence>
        {/* New Order Notification Overlay */}
        {showNewOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-brand-purple/90 backdrop-blur-2xl" />
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
            >
              {/* Top Section: Pulsing Bell */}
              <div className="p-8 pb-4 flex flex-col items-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-brand-red/20 flex items-center justify-center mb-4"
                >
                  <Bell className="w-10 h-10 text-brand-red fill-brand-red" />
                </motion.div>
                <h2 className="text-2xl font-black text-brand-red tracking-tighter animate-pulse">NEW ORDER!</h2>
              </div>

              {/* Center: Payout */}
              <div className="px-8 py-6 text-center bg-white/5 border-y border-white/5">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Estimated Payout</p>
                <h3 className="text-6xl font-black text-emerald-400 tracking-tighter">₹180</h3>
              </div>

              {/* Middle: Locations */}
              <div className="p-8 space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Pickup</p>
                    <p className="font-bold text-sm">Burger King, Sector 18, Noida</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-pink/10 flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-5 h-5 text-brand-pink" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Delivery</p>
                    <p className="font-bold text-sm">Tower A, Advant Navis, Noida</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-8 pt-0 space-y-4">
                <button 
                  onClick={handleAcceptOrder}
                  className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <CheckCircle2 className="w-6 h-6" /> ACCEPT ORDER
                </button>
                <button 
                  onClick={handleIgnoreOrder}
                  className="w-full py-3 text-white/40 hover:text-white/60 font-bold text-sm uppercase tracking-widest transition-colors"
                >
                  Ignore
                </button>
              </div>

              {/* Sound Simulation Indicator */}
              {isRinging && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <div className="w-1 h-3 bg-brand-red animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-1 h-5 bg-brand-red animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1 h-4 bg-brand-red animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="text-[8px] font-bold text-brand-red uppercase">Ringing...</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md bg-brand-purple min-h-[800px] rounded-[3rem] shadow-2xl overflow-hidden relative border-8 border-white/10">
        {/* Status Bar Mockup */}
        <div className="h-8 bg-black/20 flex justify-between items-center px-8 text-white text-xs">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-2 bg-white/40 rounded-full" />
            <div className="w-4 h-2 bg-white rounded-full" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentScreen === 'LOGIN' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 pt-16 h-full flex flex-col"
            >
              <Logo />
              <h2 className="text-3xl font-bold mb-2">Partner Login</h2>
              <p className="text-white/60 mb-8">Enter your mobile number to join SwiftMailes Logistics</p>
              
              <div className="space-y-4 mb-8">
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input 
                    type="tel" 
                    placeholder="Mobile Number" 
                    className="input-field pl-12"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <button onClick={handleLogin} className="btn-primary w-full">
                Get OTP <ChevronRight className="w-5 h-5" />
              </button>
              
              <div className="mt-auto text-center text-xs text-white/40">
                By continuing, you agree to SwiftMailes <span className="text-brand-pink font-medium underline">Terms & Privacy Policy</span>
              </div>
            </motion.div>
          )}

          {currentScreen === 'OTP' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 pt-16 h-full flex flex-col"
            >
              <button onClick={() => setCurrentScreen('LOGIN')} className="mb-8 text-brand-pink font-medium flex items-center gap-1">
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <h2 className="text-3xl font-bold mb-2">Verify OTP</h2>
              <p className="text-white/60 mb-8">Verification code sent to {phoneNumber || '+91 78994 67758'}</p>
              
              <div className="flex justify-between gap-4 mb-8">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    className="w-16 h-16 text-center text-2xl font-bold bg-white/10 border-2 border-white/10 rounded-2xl focus:border-brand-pink focus:outline-none transition-all"
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                  />
                ))}
              </div>

              <button onClick={handleVerifyOtp} className="btn-primary w-full">
                Verify OTP
              </button>
              
              <p className="mt-6 text-center text-sm text-white/60">
                Didn't receive code? <span className="text-brand-pink font-semibold cursor-pointer">Resend</span>
              </p>
            </motion.div>
          )}

          {currentScreen === 'PROFILE_SETUP' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 pt-12 h-full flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-2">Profile Setup</h2>
              <p className="text-white/60 mb-8">Upload your profile photo</p>
              
              <div className="flex flex-col items-center mb-12">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-white/10 border-4 border-brand-pink/30 flex items-center justify-center overflow-hidden">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-white/20" />
                    )}
                  </div>
                  <button 
                    onClick={() => setProfilePhoto('https://picsum.photos/seed/rider/200/200')}
                    className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-brand-red flex items-center justify-center border-4 border-brand-purple shadow-lg"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                <p className="mt-4 text-xs text-white/40">Clear face photo required</p>
              </div>

              <div className="space-y-4 mb-8">
                <input type="text" placeholder="Full Name" className="input-field" />
                <input type="email" placeholder="Email Address" className="input-field" />
              </div>

              <button onClick={handleProfileSubmit} className="btn-primary w-full mt-auto">
                Continue
              </button>
            </motion.div>
          )}

          {currentScreen === 'KYC' && (
            <motion.div
              key="kyc"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 pt-12 h-full flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-2">KYC Documents</h2>
              <p className="text-white/60 mb-8">Upload Aadhaar and PAN card</p>
              
              <div className="space-y-6 mb-8">
                <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-pink/20 flex items-center justify-center">
                    <CreditCard className="text-brand-pink w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold">Aadhaar Card</p>
                    <p className="text-xs text-white/40">Front & Back required</p>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-bold text-brand-pink bg-brand-pink/10 px-4 py-2 rounded-full">
                    <Upload className="w-4 h-4" /> Upload Photo
                  </button>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-red/20 flex items-center justify-center">
                    <FileText className="text-brand-red w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold">PAN Card</p>
                    <p className="text-xs text-white/40">Clear front photo</p>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-bold text-brand-red bg-brand-red/10 px-4 py-2 rounded-full">
                    <Upload className="w-4 h-4" /> Upload Photo
                  </button>
                </div>
              </div>

              <button onClick={handleKycSubmit} className="btn-primary w-full mt-auto">
                Verify Documents
              </button>
            </motion.div>
          )}

          {currentScreen === 'BANK_DETAILS' && (
            <motion.div
              key="bank"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 pt-12 h-full flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-2">Bank Details</h2>
              <p className="text-white/60 mb-8">For weekly payout processing</p>
              
              <div className="space-y-6 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase ml-1">Account Number</label>
                  <input 
                    type="password" 
                    placeholder="Enter Account Number" 
                    className="input-field"
                    value={bankDetails.account}
                    onChange={(e) => setBankDetails({ ...bankDetails, account: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase ml-1">Confirm Account Number</label>
                  <input type="text" placeholder="Re-enter Account Number" className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase ml-1">IFSC Code</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="SBIN0001234" 
                      className={`input-field pr-12 ${ifscValid === false ? 'border-brand-red' : ifscValid === true ? 'border-emerald-500' : ''}`}
                      value={bankDetails.ifsc}
                      onChange={(e) => validateIFSC(e.target.value)}
                    />
                    {ifscValid === true && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />}
                  </div>
                  {ifscValid === false && <p className="text-[10px] text-brand-red font-bold ml-1">Invalid IFSC format</p>}
                </div>
              </div>

              <button onClick={handleBankSubmit} className="btn-primary w-full mt-auto">
                Complete Registration
              </button>
            </motion.div>
          )}

          {currentScreen === 'TERMS' && (
            <motion.div
              key="terms"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 pt-12 h-full flex flex-col bg-brand-purple"
            >
              <h2 className="text-3xl font-bold mb-2">Terms & <span className="text-brand-pink">Conditions</span></h2>
              <p className="text-white/60 mb-8">Please review our policies carefully</p>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-6 mb-8 custom-scrollbar">
                <section>
                  <h3 className="text-brand-pink font-bold mb-3 uppercase tracking-widest text-xs">1. Rider Conduct</h3>
                  <ul className="space-y-3 text-sm text-white/70">
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-1.5 flex-shrink-0" />
                      Maintain professional behavior with customers and merchants at all times.
                    </li>
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-1.5 flex-shrink-0" />
                      Strictly follow traffic rules and safety guidelines during deliveries.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-brand-pink font-bold mb-3 uppercase tracking-widest text-xs">2. Delivery Standards</h3>
                  <ul className="space-y-3 text-sm text-white/70">
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-1.5 flex-shrink-0" />
                      Ensure food/packages are handled with care to prevent damage.
                    </li>
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-1.5 flex-shrink-0" />
                      Deliver orders within the estimated time frame whenever possible.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-brand-pink font-bold mb-3 uppercase tracking-widest text-xs">3. Payouts & Earnings</h3>
                  <ul className="space-y-3 text-sm text-white/70">
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-1.5 flex-shrink-0" />
                      Earnings are calculated based on distance, time, and incentives.
                    </li>
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-1.5 flex-shrink-0" />
                      Weekly payouts will be credited to your registered bank account.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-brand-pink font-bold mb-3 uppercase tracking-widest text-xs">4. Privacy Policy</h3>
                  <ul className="space-y-3 text-sm text-white/70">
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-1.5 flex-shrink-0" />
                      We collect location data to provide accurate delivery tracking.
                    </li>
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-1.5 flex-shrink-0" />
                      Your personal information is stored securely and never shared.
                    </li>
                  </ul>
                </section>
              </div>

              <div className="space-y-6">
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div 
                    onClick={() => setAgreedToTerms(!agreedToTerms)}
                    className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${agreedToTerms ? 'bg-brand-pink border-brand-pink' : 'border-white/20 group-hover:border-brand-pink/50'}`}
                  >
                    {agreedToTerms && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </div>
                  <span className="text-sm font-medium text-white/80">I agree to the Terms & Conditions</span>
                </label>

                <button 
                  disabled={!agreedToTerms}
                  onClick={handleTermsSubmit}
                  className={`w-full py-5 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${agreedToTerms ? 'bg-brand-pink hover:bg-brand-red text-white shadow-brand-pink/20 active:scale-95' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
                >
                  Continue to Dashboard <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {currentScreen === 'DASHBOARD' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col"
            >
              {/* Header */}
              <div className="p-8 pb-12 rounded-b-[3rem] bg-white/5 border-b border-white/10">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-red to-brand-pink flex items-center justify-center overflow-hidden border-2 border-white/20">
                      <img src="https://picsum.photos/seed/rider/100/100" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Swift Partner</p>
                      <h3 className="text-lg font-bold">Rahul Sharma</h3>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setCurrentScreen('SUPPORT')} className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Bell className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-brand-red to-brand-pink p-4 rounded-3xl shadow-lg">
                    <p className="text-white/70 text-[10px] font-bold uppercase mb-1">Today's Earnings</p>
                    <h4 className="text-2xl font-black">₹1,240</h4>
                  </div>
                  <div className="bg-white/10 p-4 rounded-3xl border border-white/10">
                    <p className="text-white/40 text-[10px] font-bold uppercase mb-1">Weekly Total</p>
                    <h4 className="text-2xl font-black">₹8,450</h4>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 -mt-6 flex-1 overflow-y-auto space-y-6 pb-24">
                {/* Online Status Switch */}
                <div className="space-y-2">
                  <StatusSwipeButton isOnline={isOnline} onToggle={() => setIsOnline(!isOnline)} />
                  {!isOnline && (
                    <p className="text-[10px] text-brand-red font-bold text-center uppercase tracking-widest">
                      Go Online to receive new orders
                    </p>
                  )}
                </div>

                <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <ShieldCheck className="w-24 h-24" />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="font-bold">Active Order</h5>
                    <div className="flex items-center gap-1 bg-brand-pink/20 px-2 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 bg-brand-pink rounded-full animate-ping" />
                      <span className="text-brand-pink text-[9px] font-black uppercase">Zomato</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Package className="text-brand-pink w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Order #ZM-9921</p>
                      <p className="text-xs text-white/40">Burger King • 1.2 km</p>
                    </div>
                  </div>
                  <button onClick={handleStartOrder} className="btn-primary w-full py-3 text-sm">
                    Start Delivery Flow
                  </button>
                </div>

                <div onClick={() => setCurrentScreen('EARNINGS')} className="cursor-pointer">
                  <div className="flex justify-between items-center mb-4 ml-2">
                    <h5 className="font-bold">Earnings Overview</h5>
                    <ChevronRight className="w-4 h-4 text-brand-pink" />
                  </div>
                  <div className="bg-white/5 p-5 rounded-[2rem] border border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-xs text-white/40 font-bold uppercase">This Week</p>
                      <p className="text-sm font-black text-brand-pink">₹8,450</p>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        className="h-full bg-gradient-to-r from-brand-purple to-brand-pink"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold mb-4 ml-2">Payout History</h5>
                  <div className="space-y-3">
                    {[
                      { date: '08 Mar', amt: '₹7,200', status: 'Paid' },
                      { date: '01 Mar', amt: '₹6,850', status: 'Paid' },
                    ].map((p, i) => (
                      <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <IndianRupee className="text-white/40 w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold">Weekly Settlement</p>
                            <p className="text-[10px] text-white/40">{p.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-emerald-500">{p.amt}</p>
                          <p className="text-[10px] text-emerald-500/60 font-bold uppercase">{p.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="bg-brand-purple/80 backdrop-blur-xl border-t border-white/10 p-4 px-8 flex justify-between items-center fixed bottom-0 left-0 right-0 z-50 rounded-t-[2.5rem]">
                <button 
                  onClick={() => { setActiveTab('HOME'); setCurrentScreen('DASHBOARD'); }}
                  className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'HOME' && currentScreen === 'DASHBOARD' ? 'text-brand-pink' : 'text-white/20'}`}
                >
                  <Wallet className="w-6 h-6" />
                  <span className="text-[10px] font-bold">Home</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('HISTORY'); setCurrentScreen('HISTORY'); }}
                  className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'HISTORY' ? 'text-brand-pink' : 'text-white/20'}`}
                >
                  <History className="w-6 h-6" />
                  <span className="text-[10px] font-bold">History</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('PROFILE'); setCurrentScreen('PROFILE'); }}
                  className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'PROFILE' ? 'text-brand-pink' : 'text-white/20'}`}
                >
                  <User className="w-6 h-6" />
                  <span className="text-[10px] font-bold">Profile</span>
                </button>
              </div>
            </motion.div>
          )}

          {currentScreen === 'HISTORY' && (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col bg-brand-purple"
            >
              <div className="p-8 pt-12">
                <h2 className="text-3xl font-black mb-2">Order History</h2>
                <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Your past deliveries</p>
              </div>

              <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-24">
                {[
                  { id: '#ZM-9921', plat: 'Zomato', amt: '₹120', date: 'Today, 08:30 PM', status: 'Delivered' },
                  { id: '#SW-4412', plat: 'Swiggy', amt: '₹85', date: 'Today, 07:15 PM', status: 'Delivered' },
                  { id: '#ON-1102', plat: 'ONDC', amt: '₹150', date: 'Yesterday, 06:00 PM', status: 'Delivered' },
                  { id: '#ZM-8812', plat: 'Zomato', amt: '₹95', date: 'Yesterday, 04:45 PM', status: 'Delivered' },
                  { id: '#SW-3321', plat: 'Swiggy', amt: '₹110', date: '08 Mar, 09:20 PM', status: 'Delivered' },
                  { id: '#ZM-7712', plat: 'Zomato', amt: '₹130', date: '08 Mar, 01:15 PM', status: 'Delivered' },
                  { id: '#ON-0092', plat: 'ONDC', amt: '₹140', date: '07 Mar, 08:45 PM', status: 'Delivered' },
                ].map((order, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${order.plat === 'Zomato' ? 'bg-brand-red/20 text-brand-red' : order.plat === 'Swiggy' ? 'bg-orange-500/20 text-orange-500' : 'bg-brand-purple/20 text-brand-purple'}`}>
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{order.id}</p>
                        <p className="text-[10px] text-white/40 font-bold uppercase">{order.plat} • {order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-brand-pink">{order.amt}</p>
                      <p className="text-[10px] text-emerald-500 font-bold uppercase">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Nav */}
              <div className="bg-brand-purple/80 backdrop-blur-xl border-t border-white/10 p-4 px-8 flex justify-between items-center fixed bottom-0 left-0 right-0 z-50 rounded-t-[2.5rem]">
                <button 
                  onClick={() => { setActiveTab('HOME'); setCurrentScreen('DASHBOARD'); }}
                  className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'HOME' && currentScreen === 'DASHBOARD' ? 'text-brand-pink' : 'text-white/20'}`}
                >
                  <Wallet className="w-6 h-6" />
                  <span className="text-[10px] font-bold">Home</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('HISTORY'); setCurrentScreen('HISTORY'); }}
                  className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'HISTORY' ? 'text-brand-pink' : 'text-white/20'}`}
                >
                  <History className="w-6 h-6" />
                  <span className="text-[10px] font-bold">History</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('PROFILE'); setCurrentScreen('PROFILE'); }}
                  className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'PROFILE' ? 'text-brand-pink' : 'text-white/20'}`}
                >
                  <User className="w-6 h-6" />
                  <span className="text-[10px] font-bold">Profile</span>
                </button>
              </div>
            </motion.div>
          )}

          {currentScreen === 'PROFILE' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col bg-brand-purple relative"
            >
              <div className="p-8 pt-12 flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-28 h-28 rounded-full bg-white/10 border-4 border-brand-pink/30 flex items-center justify-center overflow-hidden">
                    <img src={profilePhoto || "https://picsum.photos/seed/rider/200/200"} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <button 
                    onClick={() => setShowProfileMenu(true)}
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-red flex items-center justify-center border-2 border-brand-purple shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </button>

                  {/* Profile Photo Menu */}
                  <AnimatePresence>
                    {showProfileMenu && (
                      <>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setShowProfileMenu(false)}
                          className="fixed inset-0 bg-black/60 z-[60]"
                        />
                        <motion.div 
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 20, scale: 0.9 }}
                          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-brand-purple border border-white/10 rounded-2xl p-2 w-40 z-[70] shadow-2xl"
                        >
                          <button 
                            onClick={() => { setProfilePhoto(`https://picsum.photos/seed/cam${Math.random()}/200/200`); setShowProfileMenu(false); }}
                            className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors text-sm font-bold"
                          >
                            <Camera className="w-4 h-4 text-brand-pink" /> Camera
                          </button>
                          <button 
                            onClick={() => { setProfilePhoto(`https://picsum.photos/seed/gal${Math.random()}/200/200`); setShowProfileMenu(false); }}
                            className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors text-sm font-bold"
                          >
                            <ImageIcon className="w-4 h-4 text-brand-pink" /> Gallery
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
                <h2 className="text-2xl font-black">Rahul Sharma</h2>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Swift Partner #4421</p>
              </div>

              <div className="flex-1 overflow-y-auto px-6 space-y-6 pb-24">
                {/* Bank Details Section */}
                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="font-bold flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-brand-pink" /> Bank Account
                    </h5>
                    <button className="text-brand-pink text-[10px] font-bold uppercase">Edit</button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-white/40 font-bold uppercase">Account Number</p>
                      <p className="font-bold tracking-widest">•••• •••• 8821</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 font-bold uppercase">IFSC Code</p>
                      <p className="font-bold uppercase">{bankDetails.ifsc || 'SBIN0001234'}</p>
                    </div>
                  </div>
                </div>

                {/* Document Management Section */}
                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
                  <h5 className="font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-pink" /> Document Management
                  </h5>
                  <div className="space-y-4">
                    {/* Aadhaar */}
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-white/40" />
                          <span className="text-sm font-bold">Aadhaar Card</span>
                        </div>
                        {aadhaarDoc ? (
                          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase rounded-full">Uploaded</span>
                        ) : (
                          <span className="px-3 py-1 bg-brand-red/20 text-brand-red text-[9px] font-black uppercase rounded-full">Missing</span>
                        )}
                      </div>
                      <label className="w-full flex items-center justify-center gap-2 py-2 bg-brand-pink/10 border border-brand-pink/20 rounded-xl text-[10px] font-black uppercase text-brand-pink cursor-pointer active:scale-95 transition-transform">
                        <Upload className="w-3 h-3" /> {aadhaarDoc ? 'Change Aadhaar' : 'Upload Aadhaar'}
                        <input 
                          type="file" 
                          accept="image/*,application/pdf" 
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files?.[0]) setAadhaarDoc(e.target.files[0].name);
                          }}
                        />
                      </label>
                    </div>

                    {/* PAN */}
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <FileText className="text-white/40 w-5 h-5" />
                          <span className="text-sm font-bold">PAN Card</span>
                        </div>
                        {panDoc ? (
                          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase rounded-full">Uploaded</span>
                        ) : (
                          <span className="px-3 py-1 bg-brand-red/20 text-brand-red text-[9px] font-black uppercase rounded-full">Missing</span>
                        )}
                      </div>
                      <label className="w-full flex items-center justify-center gap-2 py-2 bg-brand-pink/10 border border-brand-pink/20 rounded-xl text-[10px] font-black uppercase text-brand-pink cursor-pointer active:scale-95 transition-transform">
                        <Upload className="w-3 h-3" /> {panDoc ? 'Change PAN' : 'Upload PAN'}
                        <input 
                          type="file" 
                          accept="image/*,application/pdf" 
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files?.[0]) setPanDoc(e.target.files[0].name);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Support & Logout */}
                <div className="space-y-3">
                  <button onClick={() => setCurrentScreen('SUPPORT')} className="w-full p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-white/40" />
                      <span className="text-sm font-bold">Help & Support</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20" />
                  </button>
                  <button onClick={() => setCurrentScreen('LOGIN')} className="w-full p-4 bg-brand-red/10 rounded-2xl border border-brand-red/20 flex items-center justify-between text-brand-red">
                    <div className="flex items-center gap-3">
                      <LogOut className="w-5 h-5" />
                      <span className="text-sm font-bold">Logout</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="bg-brand-purple/80 backdrop-blur-xl border-t border-white/10 p-4 px-8 flex justify-between items-center fixed bottom-0 left-0 right-0 z-50 rounded-t-[2.5rem]">
                <button 
                  onClick={() => { setActiveTab('HOME'); setCurrentScreen('DASHBOARD'); }}
                  className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'HOME' && currentScreen === 'DASHBOARD' ? 'text-brand-pink' : 'text-white/20'}`}
                >
                  <Wallet className="w-6 h-6" />
                  <span className="text-[10px] font-bold">Home</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('HISTORY'); setCurrentScreen('HISTORY'); }}
                  className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'HISTORY' ? 'text-brand-pink' : 'text-white/20'}`}
                >
                  <History className="w-6 h-6" />
                  <span className="text-[10px] font-bold">History</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('PROFILE'); setCurrentScreen('PROFILE'); }}
                  className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'PROFILE' ? 'text-brand-pink' : 'text-white/20'}`}
                >
                  <User className="w-6 h-6" />
                  <span className="text-[10px] font-bold">Profile</span>
                </button>
              </div>
            </motion.div>
          )}

          {currentScreen === 'EARNINGS' && (
            <motion.div
              key="earnings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col bg-brand-purple"
            >
              <div className="p-8 pt-12">
                <button onClick={() => setCurrentScreen('DASHBOARD')} className="mb-8 text-brand-pink font-bold flex items-center gap-1">
                  <ChevronLeft className="w-5 h-5" /> Dashboard
                </button>
                <h2 className="text-3xl font-black mb-2">Earnings</h2>
                <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Performance Analysis</p>
              </div>

              <div className="flex-1 overflow-y-auto px-6 space-y-8 pb-12">
                {/* Today's Total */}
                <div className="bg-gradient-to-br from-brand-purple to-brand-accent p-8 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <TrendingUp className="w-24 h-24" />
                  </div>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Today's Total</p>
                  <h3 className="text-5xl font-black tracking-tighter">₹1,240</h3>
                  <div className="mt-6 flex items-center gap-2 text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-bold">+12% from yesterday</span>
                  </div>
                </div>

                {/* Weekly Graph */}
                <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10">
                  <h5 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 px-2">Weekly Payout Graph</h5>
                  <WeeklyGraph />
                </div>

                {/* Order Wise Split */}
                <div>
                  <h5 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 ml-2">Order Wise Split</h5>
                  <div className="space-y-3">
                    {[
                      { id: '#ZM-9921', plat: 'Zomato', amt: '₹120', time: '08:30 PM' },
                      { id: '#SW-4412', plat: 'Swiggy', amt: '₹85', time: '07:15 PM' },
                      { id: '#ON-1102', plat: 'ONDC', amt: '₹150', time: '06:00 PM' },
                      { id: '#ZM-8812', plat: 'Zomato', amt: '₹95', time: '04:45 PM' },
                    ].map((order, i) => (
                      <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div className="flex gap-3 items-center">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${order.plat === 'Zomato' ? 'bg-brand-red/20 text-brand-red' : order.plat === 'Swiggy' ? 'bg-orange-500/20 text-orange-500' : 'bg-brand-purple/20 text-brand-purple'}`}>
                            <Package className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold">{order.id}</p>
                            <p className="text-[10px] text-white/40 font-bold uppercase">{order.plat} • {order.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-brand-pink">{order.amt}</p>
                          <p className="text-[10px] text-emerald-500 font-bold uppercase">Success</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentScreen === 'ORDER_FLOW' && (
            <motion.div
              key="order-flow"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col"
            >
              <div className="h-80 bg-black/20 relative">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map-dark/800/600')] bg-cover bg-center opacity-40 grayscale" />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/40 via-transparent to-brand-purple" />
                
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 320">
                  <motion.path
                    d="M 100 250 Q 200 150 300 100"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="4"
                    strokeDasharray="8,8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <circle cx="100" cy="250" r="6" fill="#ef4444" />
                  <circle cx="300" cy="100" r="6" fill="#ec4899" />
                </svg>

                <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
                  <button 
                    onClick={() => setCurrentScreen('DASHBOARD')}
                    className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex flex-col items-end gap-2">
                    <div className={`${isOnline ? 'bg-brand-red/20 border-brand-red/30' : 'bg-white/5 border-white/10'} backdrop-blur-md px-4 py-2 rounded-xl border flex items-center gap-2 transition-colors`}>
                      <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-brand-red animate-ping' : 'bg-white/20'}`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isOnline ? 'text-brand-red' : 'text-white/40'}`}>
                        {isOnline ? 'Live: Zomato' : 'Offline'}
                      </span>
                    </div>
                    <div className={`px-3 py-1 rounded-lg backdrop-blur-md border flex items-center gap-2 ${isArrived && isOnline ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-500' : 'bg-white/10 border-white/20 text-white/60'}`}>
                      {isArrived && isOnline ? <CheckCircle2 className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      <span className="text-[9px] font-bold uppercase tracking-tighter">
                        {!isOnline ? 'Offline' : (isArrived ? 'Arrived' : `${distance}m away`)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Denied Persistent Notification */}
                {!isOnline && (
                  <motion.div 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute top-24 left-8 right-8 z-[100]"
                  >
                    <div className="bg-brand-red p-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20">
                      <ShieldCheck className="w-5 h-5 text-white" />
                      <p className="text-[10px] font-black uppercase tracking-tight text-white">
                        Action Denied: You must be Online to process orders
                      </p>
                    </div>
                  </motion.div>
                )}

                <div className="absolute bottom-4 left-8 right-8 space-y-4">
                  <div className="bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center">
                        <Clock className="text-brand-pink w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">ETA</p>
                        <p className="text-lg font-bold">12 Mins</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          const dest = orderStatus === 'PICKING_UP' ? 'Burger+King,Sector+18,Noida' : 'Tower+A,Advant+Navis,Noida';
                          window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest}`, '_blank');
                        }}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-pink hover:bg-white/10 transition-colors"
                        title="Navigate"
                      >
                        <Navigation className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-pink hover:bg-white/10 transition-colors">
                        <PhoneCall className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  {orderStatus === 'ASSIGNING' && (
                    <motion.div 
                      key="assigning"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex-1 flex flex-col items-center justify-center text-center"
                    >
                      <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-full border-4 border-brand-pink/20 border-t-brand-pink animate-spin" />
                        <Package className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-brand-pink" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Assigning Order...</h3>
                      <p className="text-white/60 text-sm">Please wait while we sync with Zomato</p>
                    </motion.div>
                  )}

                  {(orderStatus === 'PICKING_UP' || orderStatus === 'DELIVERING') && (
                    <motion.div 
                      key="active"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="mb-8">
                        <div className="flex justify-between items-end mb-8">
                          <div>
                            <h3 className="text-2xl font-black">#ZM-9921</h3>
                            <p className="text-sm text-white/60 font-medium">Burger King • 3 Items</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Customer</p>
                              <p className="font-bold">Anjali M.</p>
                            </div>
                            <button 
                              onClick={() => window.location.href = 'tel:+919876543210'}
                              className="w-10 h-10 rounded-full bg-brand-pink/20 border border-brand-pink/30 flex items-center justify-center text-brand-pink active:scale-90 transition-transform shadow-lg shadow-brand-pink/10"
                              title="Call Customer"
                            >
                              <PhoneCall className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-10 relative">
                          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/5" />
                          
                          <div className="flex gap-4 relative">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors duration-500 ${orderStatus !== 'PICKING_UP' ? 'bg-emerald-500 text-white' : 'bg-brand-red text-white shadow-lg shadow-brand-red/20'}`}>
                              {orderStatus !== 'PICKING_UP' ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Pickup</p>
                              <p className="font-bold leading-tight">Burger King, Sector 18</p>
                            </div>
                          </div>

                          <div className="flex gap-4 relative">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors duration-500 ${orderStatus === 'COMPLETED' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/20'}`}>
                              {orderStatus === 'COMPLETED' ? <CheckCircle2 className="w-5 h-5" /> : <MapPin className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Deliver</p>
                              <p className="font-bold leading-tight">Tower A, Advant Navis</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto">
                        {orderStatus === 'PICKING_UP' ? (
                          <SwipeButton 
                            text="Swipe to Pickup" 
                            colorClass={isArrived && isOnline ? "bg-gradient-to-r from-brand-red to-brand-pink" : "bg-white/10"}
                            icon={Package}
                            disabled={!isArrived || !isOnline}
                            error={!isOnline ? "Action Denied: Go Online" : "You must be at the pickup location"}
                            onComplete={() => {
                              setOrderStatus('DELIVERING');
                              setDistance(500); // Reset for delivery point
                            }}
                          />
                        ) : (
                          <SwipeButton 
                            text="Swipe to Deliver" 
                            colorClass={isArrived && isOnline ? "bg-gradient-to-r from-brand-pink to-brand-accent" : "bg-white/10"}
                            icon={Navigation}
                            disabled={!isArrived || !isOnline}
                            error={!isOnline ? "Action Denied: Go Online" : "You haven't reached the delivery point"}
                            onComplete={() => setOrderStatus('COMPLETED')}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}

                  {orderStatus === 'COMPLETED' && (
                    <motion.div
                      key="completed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex-1 flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 text-white shadow-2xl shadow-emerald-500/20">
                        <CheckCircle2 className="w-14 h-14" />
                      </div>
                      <h4 className="text-3xl font-black mb-2">DELIVERED!</h4>
                      <p className="text-white/60 text-sm mb-8">₹120 added to your wallet.<br/>Great job, Rahul!</p>
                      <button onClick={() => setCurrentScreen('DASHBOARD')} className="btn-primary w-full py-4">
                        Back to Dashboard
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {currentScreen === 'SUPPORT' && (
            <motion.div
              key="support"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 pt-12 h-full flex flex-col"
            >
              <button onClick={() => setCurrentScreen('DASHBOARD')} className="mb-8 text-brand-pink font-medium flex items-center gap-1">
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <h2 className="text-3xl font-bold mb-2">Help & Support</h2>
              <p className="text-white/60 mb-8">We're here to help you 24/7</p>
              
              <div className="space-y-4 mb-12">
                <a href="mailto:swiftmaileslogisticsdelivery@gmail.com" className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex items-center gap-4 active:scale-95 transition-transform">
                  <div className="w-12 h-12 rounded-2xl bg-brand-pink/20 flex items-center justify-center">
                    <Mail className="text-brand-pink w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Email Support</p>
                    <p className="text-xs text-white/40">swiftmaileslogisticsdelivery@gmail.com</p>
                  </div>
                </a>

                <a href="tel:7899467758" className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex items-center gap-4 active:scale-95 transition-transform">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red/20 flex items-center justify-center">
                    <PhoneCall className="text-brand-red w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Call Support</p>
                    <p className="text-xs text-white/40">+91 78994 67758</p>
                  </div>
                </a>
              </div>

              {/* Emergency Police Call Section */}
              <div className="flex flex-col items-center justify-center py-8 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEmergencyCall}
                  className="w-32 h-32 rounded-full bg-brand-red flex flex-col items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.5)] relative group overflow-hidden"
                >
                  <motion.div 
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-white/20"
                  />
                  <Siren className="w-12 h-12 text-white relative z-10" />
                  <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
                </motion.button>
                <p className="mt-4 text-brand-red font-black text-center uppercase tracking-tighter text-lg">
                  EMERGENCY POLICE CALL
                </p>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Dials 112 & Sends SOS</p>
              </div>

              <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
                <h5 className="font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-pink" /> Safety Center
                </h5>
                <p className="text-xs text-white/60 leading-relaxed mb-4">
                  In case of emergency or accident, please use the SOS button in your profile or call our 24/7 helpline immediately.
                </p>
                <button className="w-full py-2 bg-brand-red/20 text-brand-red font-bold rounded-xl text-xs">
                  Emergency SOS
                </button>
              </div>

              <button onClick={() => setCurrentScreen('LOGIN')} className="mt-auto flex items-center justify-center gap-2 text-white/40 font-bold text-sm py-4">
                <LogOut className="w-5 h-5" /> Logout Account
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background Decoration */}
      <div className="fixed -z-10 top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-red/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-pink/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
