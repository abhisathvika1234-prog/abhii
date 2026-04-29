import React, { useState, useEffect, useRef, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Heart, 
  Gift, 
  Stars, 
  Moon,
  CloudMoon,
  Star as StarIcon,
  Sparkles,
  Calendar,
  Smile,
  Cake,
  Clock,
  Camera,
  ArrowRight,
  Pause,
  Play,
  Volume2,
  Utensils,
  Flower,
  Music,
  ClipboardList,
  Check,
  X,
  Flame,
  ChevronLeft,
  ChevronRight,
  SkipBack,
  SkipForward,
  RotateCcw,
  VolumeX
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { IMAGES } from './assets/images';
import { AUDIO } from './assets/audio';
import { VIDEOS } from './assets/videos';

// --- Types ---
interface Task {
  id: string;
  text: string;
  status: 'pending' | 'done';
}

// --- Components ---

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-white to-purple-400 z-[100] origin-left"
    />
  );
};

const SectionReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const PhotoGallery = () => {
  const photos = IMAGES.GALLERY;

  return (
    <div className="grid grid-cols-1 gap-32 w-full max-w-7xl mx-auto px-4 mt-20">
      {photos.map((photo, i) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 40 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="group relative cursor-pointer w-full"
        >
          <div className="overflow-hidden rounded-[2.5rem] aspect-[16/9] relative shadow-3xl border border-white/10 transition-all duration-700 group-hover:shadow-[0_0_80px_rgba(251,191,36,0.15)] group-hover:border-white/20">
            <img 
              src={photo.url} 
              alt={photo.caption}
              className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-70 transition-opacity"></div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-24">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700"
              >
                <span className="text-xs uppercase tracking-[0.5em] text-amber-200/60 font-bold mb-4 block">{photo.date}</span>
                <h4 className="text-4xl md:text-7xl font-serif italic text-white leading-tight">{photo.caption}</h4>
              </motion.div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </div>

          <div className="mt-8 flex justify-between items-center px-4">
             <div className="h-px bg-white/10 flex-1 mr-8"></div>
             <div className="text-[10px] uppercase tracking-[0.3em] text-white/20 whitespace-nowrap">Chapter {i + 1}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// --- Cinematic Video Component ---
const CinematicVideo = () => {
  return (
    <SectionReveal className="w-full max-w-7xl mx-auto px-4 mb-48 relative group">
      <div className="text-center mb-20">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="h-px w-12 bg-amber-200/30"></div>
          <span className="text-[10px] uppercase tracking-[0.8em] text-slate-400 font-bold">The Main Event</span>
          <div className="h-px w-12 bg-amber-200/30"></div>
        </div>
        <h2 className="text-6xl md:text-8xl font-serif italic text-white tracking-tight">The Cinematic Story</h2>
      </div>
      
      <div className="relative aspect-[19/7] w-full rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.9)] bg-slate-950 group-hover:shadow-[0_0_100px_rgba(255,255,255,0.05)] transition-shadow duration-1000">
        <iframe 
          className="absolute inset-0 w-full h-full"
          src={VIDEOS.CINEMATIC_STORY} 
          title="Birthday Celebration Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          style={{ border: 0 }}
        ></iframe>
        
        <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-slate-950 to-transparent pointer-events-none opacity-80" />
        <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-slate-950 to-transparent pointer-events-none opacity-80" />
        <div className="absolute inset-0 border border-white/5 rounded-[2rem] md:rounded-[4rem] pointer-events-none" />
      </div>

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-200/5 rounded-full blur-[150px] pointer-events-none -z-10" />
    </SectionReveal>
  );
};

// --- Tooltip Component ---
const Tooltip = ({ children, text }: { children: React.ReactNode; text: string }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex items-center justify-center" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute z-[100] px-3 py-1.5 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-xl border border-white/10 whitespace-nowrap pointer-events-none"
          >
            {text}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 border-r border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InteractiveStar = ({ star, onHover, intensity }: { star: any; onHover: () => void; intensity: number; key?: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
      <Tooltip text="Celestial Twinkle">
        <motion.div
          onMouseEnter={() => {
            setIsHovered(true);
            onHover();
          }}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : [0, 0.4 * intensity, 0],
            scale: isHovered ? 1.5 : 1 * intensity,
            backgroundColor: isHovered ? "#fff" : "rgba(255, 255, 255, 0.8)",
            boxShadow: isHovered ? "0 0 15px 2px rgba(255, 255, 255, 0.8)" : "none"
          }}
          transition={{ 
            opacity: isHovered ? { duration: 0.2 } : { duration: 3 + Math.random() * 4, repeat: Infinity, delay: star.delay },
            scale: { duration: 0.2 },
            backgroundColor: { duration: 0.2 }
          }}
          style={{ 
            left: `${star.left}%`, 
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}
          className="absolute rounded-full cursor-pointer z-50 pointer-events-auto"
        />
      </Tooltip>
  );
};

const StarField = ({ mousePos }: { mousePos?: { x: number, y: number } }) => {
  const [stars, setStars] = useState<{ id: number; left: number; top: number; size: number; delay: number }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, -150]);
  
  useEffect(() => {
    const newStars = [...Array(120)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5
    }));
    setStars(newStars);
  }, []);

  const playTwinkle = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.05;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <motion.div style={{ y }} className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <audio ref={audioRef} src={AUDIO.TWINKLE} preload="auto" />
      {stars.map((star) => {
        let intensity = 1;
        if (mousePos) {
          const dx = (star.left / 100) * window.innerWidth - mousePos.x;
          const dy = (star.top / 100) * window.innerHeight - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          intensity = Math.max(1, 4 - dist / 150);
        }
        
        return <InteractiveStar key={star.id} star={star} onHover={playTwinkle} intensity={intensity} />;
      })}
    </motion.div>
  );
};

const DynamicBackground = () => {
  const { scrollYProgress } = useScroll();
  const [time, setTime] = useState(new Date().getHours());
  
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.2]);
  const auroraScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date().getHours()), 60000);
    return () => clearInterval(interval);
  }, []);

  const getBaseColors = () => {
    if (time >= 6 && time < 18) {
      return ['#1e1b4b', '#4c1d95', '#831843']; 
    }
    return ['#030712', '#1e1b4b', '#2e1065'];
  };

  const colors = getBaseColors();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-slate-950">
      <motion.div 
        animate={{ 
          background: [
            `radial-gradient(circle at 20% 30%, ${colors[1]} 0%, transparent 70%)`,
            `radial-gradient(circle at 80% 70%, ${colors[1]} 0%, transparent 70%)`,
            `radial-gradient(circle at 20% 30%, ${colors[1]} 0%, transparent 70%)`,
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-40"
      />
      
      <motion.div 
        style={{ opacity: auroraOpacity, scale: auroraScale }}
        className="aurora-layer bg-purple-900/10" 
      />
      
      <motion.div 
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 0]),
          y: useTransform(scrollYProgress, [0, 1], [0, -200]) 
        }}
        className="absolute inset-0 bg-lavender-900/10 mix-blend-overlay"
      />
    </div>
  );
};

const MoonBackground = ({ onWish }: { onWish?: () => void }) => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 3000], [0, 400]);
  const [isWished, setIsWished] = useState(false);

  const handleWish = () => {
    setIsWished(true);
    if (onWish) onWish();
    setTimeout(() => setIsWished(false), 2000);
  };

  return (
    <motion.div style={{ y: yParallax }} className="fixed -top-60 -right-60 z-0">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="relative"
      >
        <div className="w-[800px] h-[800px] bg-slate-500 rounded-full blur-[200px] opacity-10"></div>
          <Tooltip text="Make a Lunar Wish">
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 1, 0],
                boxShadow: isWished 
                  ? ["0 0 100px rgba(255,255,255,0.1)", "0 0 200px rgba(255,255,255,0.6)", "0 0 100px rgba(255,255,255,0.1)"]
                  : "0 0 100px rgba(255,255,255,0.1)"
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 150px rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWish}
              transition={{ 
                y: { duration: 30, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 30, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 2 } 
              }}
              className="absolute top-80 right-80 w-96 h-96 rounded-full flex items-center justify-center overflow-hidden mix-blend-screen cursor-pointer pointer-events-auto shadow-[0_0_100px_rgba(255,255,255,0.1)]"
              style={{ clipPath: 'circle(50% at 50% 50%)' }}
            >
              <motion.img 
                src={IMAGES.HERO_BG} 
                alt="Moon" 
                animate={{ 
                  filter: isWished ? "brightness(2) contrast(1.2)" : "brightness(1) contrast(1)",
                  opacity: isWished ? 1 : 0.4
                }}
                className="w-full h-full object-cover scale-150 saturate-0 hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
              
              {/* Shimmer Overlay on Wish */}
              <AnimatePresence>
                {isWished && (
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-10"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </Tooltip>
      </motion.div>
    </motion.div>
  );
};

const Cinematic3DTimer = ({ onComplete }: { onComplete: () => void; key?: any }) => {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds === 0) {
      setTimeout(onComplete, 1000);
      return;
    }
    const timer = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black overflow-hidden"
      style={{ perspective: 1000 }}
    >
      <StarField />
      
      <motion.div
        initial={{ rotateX: 45, opacity: 0, scale: 0.5 }}
        animate={{ rotateX: 0, opacity: 1, scale: 1 }}
        exit={{ scale: 5, opacity: 0, filter: "blur(20px)" }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="relative z-10 text-center"
      >
        <div className="text-[12px] uppercase tracking-[0.8em] text-white/30 mb-8 font-bold">Initiating Sequence</div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={seconds}
            initial={{ y: 100, opacity: 0, rotateY: 90 }}
            animate={{ y: 0, opacity: 1, rotateY: 0 }}
            exit={{ y: -100, opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="text-[12rem] md:text-[18rem] font-serif italic text-white flex items-center justify-center leading-none"
          >
            {seconds > 0 ? seconds : <Sparkles className="w-32 h-32 text-amber-100" />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 overflow-hidden h-px w-64 bg-white/10 mx-auto relative">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="absolute inset-0 bg-white"
          />
        </div>
      </motion.div>

      <motion.div 
        animate={{ opacity: [0, 0.1, 0, 0.2, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
        className="fixed inset-0 bg-white pointer-events-none"
      />
    </motion.div>
  );
};

const PasscodeGate = ({ onSuccess }: { onSuccess: () => void; key?: any }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '2026') {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 p-6"
    >
      <div className="fixed inset-0 vignette pointer-events-none"></div>
      <StarField />
      
      <div className="relative z-10 w-full max-sm text-center">
        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="mb-12">
          <div className="w-16 h-16 glass rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <StarIcon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif italic text-white mb-2">A Secret Celebration</h1>
          <p className="text-slate-500 text-sm tracking-widest uppercase">ENTER THE CODE TO BEGIN</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div animate={error ? { x: [-10, 10, -10, 10, 0] } : {}} className="relative">
            <input 
              type="password"
              placeholder="••••"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full glass bg-white/5 border-white/10 rounded-2xl py-4 px-6 text-center text-3xl tracking-[1em] text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
            />
          </motion.div>
          <button 
            type="submit"
            className="w-full py-4 glass bg-white/10 hover:bg-white/20 rounded-2xl text-white font-bold tracking-widest uppercase transition-all active:scale-95"
          >
            Unlock Magic
          </button>
        </form>
        <p className="mt-8 text-[10px] text-slate-600 uppercase tracking-widest leading-loose">
          Hint: The year she was born or a special year. <br/> (Code is 2026 for now)
        </p>
      </div>
    </motion.div>
  );
};

const FallingStar = ({ id, delay }: { id: number; delay: number; key?: any }) => {
  const [clicked, setClicked] = useState(false);
  if (clicked) return null;

  return (
      <motion.div
        key={id}
        initial={{ x: '120%', y: '-20%', opacity: 0 }}
        animate={{ x: '-20%', y: '120%', opacity: [0, 0.8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: delay, ease: "easeIn" }}
        onClick={() => {
          setClicked(true);
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#fef3c7', '#fff', '#94a3b8']
          });
        }}
        className="absolute w-40 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent rotate-[-45deg] cursor-pointer pointer-events-auto"
      />
  );
};

const FallingStars = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {[...Array(4)].map((_, i) => (
        <FallingStar key={i} id={i} delay={i * 8 + Math.random() * 5} />
      ))}
    </div>
  );
};

const MusicBlock3D = ({ isPlaying, onToggle }: { isPlaying: boolean; onToggle: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-lg mx-auto py-20 px-6"
    >
      <div className="relative group" style={{ perspective: '1000px' }}>
        <motion.div
          whileHover={{ rotateX: 5, rotateY: 10, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="glass rounded-[2.5rem] p-10 border-white/20 shadow-2xl relative overflow-hidden backdrop-blur-2xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-amber-200/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div 
              animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-white/20 cursor-pointer"
              onClick={onToggle}
            >
              {isPlaying ? <Pause className="w-12 h-12 text-amber-200" /> : <Play className="w-12 h-12 text-amber-200 ml-2" />}
            </motion.div>
            <h4 className="text-white/40 text-[10px] uppercase tracking-[0.6em] font-bold mb-3">Personalized Melody</h4>
            <h2 className="font-calligraphy text-5xl text-white mb-4">Sokka Thangamadi</h2>
            <p className="text-slate-400 text-sm font-light mb-10 max-w-xs leading-relaxed">
              This song is for you, Bhavya. Let the melody paint your special day in gold.
            </p>
            <button
              onClick={onToggle}
              className="w-full py-5 bg-white text-slate-950 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-amber-100 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)] active:scale-95 group"
            >
              {isPlaying ? "Pause Magic" : "Play Your Song"}
            </button>
          </div>
          <div className="flex justify-center items-center space-x-2 mt-10 h-6">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                animate={isPlaying ? { height: [4, 20, 6, 18, 4], opacity: [0.3, 1, 0.5, 1, 0.3] } : { height: 4, opacity: 0.2 }}
                transition={{ duration: 0.5 + Math.random(), repeat: Infinity, delay: i * 0.05 }}
                className="w-1 bg-white/40 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const GiftBox = ({ onOpen, onMemoryView }: { onOpen: () => void; onMemoryView: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      onOpen();
      setTimeout(() => onMemoryView(), 2000);
    }
  };

  return (
    <div className="relative group flex flex-col items-center" style={{ perspective: '1200px' }}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed-gift"
            whileHover={{ scale: 1.05, rotateY: 10, rotateX: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="cursor-pointer relative"
          >
            <div className="w-48 h-48 bg-slate-100 rounded-2xl relative shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex items-center justify-center overflow-hidden border-b-8 border-slate-300">
               <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/20 to-transparent"></div>
               <div className="absolute inset-y-0 w-10 bg-slate-500 left-1/2 -translate-x-1/2"></div>
               <div className="absolute inset-x-0 h-10 bg-slate-500 top-1/2 -translate-y-1/2"></div>
               <Gift className="text-slate-900 w-20 h-20 relative z-10" />
            </div>
          </motion.div>
        ) : (
          <motion.div key="revealed-gift" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex flex-col items-center">
            <motion.div 
              animate={{ y: [0, -20, 0] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-80 h-[500px] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] border border-slate-500/30"
            >
              <div className="absolute inset-0 bg-slate-950">
                <img src={IMAGES.MEMORY} alt="Memory" className="w-full h-full object-cover grayscale-[0.2]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 opacity-90"></div>
              </div>
              <div className="absolute bottom-12 left-0 right-0 px-8 text-center">
                <h4 className="text-white font-calligraphy text-4xl mb-3">Pure Radiance</h4>
                <p className="text-slate-300 text-[10px] uppercase tracking-[0.6em] font-bold">Golden Hours</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-16 text-center max-w-lg px-8">
              <h3 className="font-serif italic text-4xl text-white mb-6">A Symphony of Souls</h3>
              <p className="text-slate-200 font-light leading-relaxed text-xl">"Bhavya, your life is a beautiful collage of kindness, strength, and shimmering joy."</p>
              <button onClick={() => setIsOpen(false)} className="mt-16 text-[10px] uppercase tracking-[0.6em] text-white/30 hover:text-white transition-all">Close the Box</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MessageReveal = ({ text, from }: { text: string; from: string }) => {
  const [show, setShow] = useState(false);
  return (
    <motion.div 
      layout
      whileHover={{ y: -10, borderColor: "rgba(251,191,36,0.3)" }} 
      className="glass p-8 rounded-[2.5rem] cursor-pointer relative overflow-hidden group transition-colors duration-500" 
      onClick={() => setShow(!show)}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Moon className="w-5 h-5 text-amber-200" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-amber-200/40 font-bold">{from}</span>
        </div>
        <motion.div animate={{ rotate: show ? 180 : 0 }}>
          <ChevronRight className="w-4 h-4 text-white/20" />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {!show ? (
          <motion.h3 
            key="hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xl font-serif italic text-white/60"
          >
            Whisper from the stars...
          </motion.h3>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl md:text-3xl font-serif text-white leading-relaxed italic"
            >
              "{text}"
            </motion.p>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-px w-full bg-gradient-to-r from-amber-200/20 via-white/10 to-transparent origin-left"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="relative aspect-video rounded-2xl overflow-hidden group/img"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200/10 to-transparent mix-blend-overlay z-10" />
              <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                <Sparkles className="w-12 h-12 text-amber-200/20 animate-pulse" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glossy edge reflection */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.div>
  );
};

const LunarCalendar = ({ onExplore }: { onExplore: () => void }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const specialDates: any = { 28: { title: "Bhavya Day", message: "The most special day in the universe. Happy Birthday!", type: "birthday" } };
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <section className="w-full max-w-4xl mx-auto px-4 mb-32">
      <div className="glass rounded-[3rem] p-10 border-white/5 backdrop-blur-3xl shadow-2xl">
        <h3 className="text-2xl font-serif text-white italic mb-12 text-center">April 2026</h3>
        <div className="grid grid-cols-7 gap-3">
          {days.map(day => (
            <div key={day} onClick={() => { setSelectedDate(day); if(specialDates[day]) onExplore(); }} className={`aspect-square rounded-2xl flex items-center justify-center cursor-pointer border transition-all ${selectedDate === day ? 'bg-lavender-500/20 border-white' : 'bg-white/5 border-transparent hover:bg-white/10'}`}>
              <span className={`text-sm font-mono ${specialDates[day] ? 'text-amber-200' : 'text-slate-400'}`}>{day}</span>
            </div>
          ))}
        </div>
        {selectedDate && specialDates[selectedDate] && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 border-t border-white/10 text-center">
            <h4 className="text-white font-serif italic text-xl mb-2">{specialDates[selectedDate].title}</h4>
            <p className="text-slate-300 italic">"{specialDates[selectedDate].message}"</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const PartyTasks = ({ tasks }: { tasks: Task[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-8 left-8 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="mb-6 w-72 glass p-6 rounded-3xl shadow-2xl">
            <h3 className="font-serif italic text-xl text-white mb-6">Party Checklist</h3>
            <div className="space-y-4">
              {tasks.map(t => (
                <div key={t.id} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${t.status === 'done' ? 'bg-amber-100 border-amber-100' : 'border-white/20'}`}>
                    {t.status === 'done' && <Check className="w-3 text-slate-950" />}
                  </div>
                  <span className={`text-sm ${t.status === 'done' ? 'line-through text-slate-500' : 'text-slate-200'}`}>{t.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 glass bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10 shadow-xl">
        <ClipboardList className="w-6 h-6" />
      </button>
    </div>
  );
};

const InteractiveCake = ({ onCut }: { onCut: () => void }) => {
  const [candlesOut, setCandlesOut] = useState(false);
  const [isCut, setIsCut] = useState(false);
  return (
    <div className="flex flex-col items-center py-20 px-6">
      <h2 className="text-4xl font-serif italic text-white mb-12">The Ritual</h2>
      <div 
        onClick={() => { if(candlesOut) { if(!isCut) { setIsCut(true); onCut(); } } else setCandlesOut(true); }} 
        className="relative cursor-pointer group"
      >
        <div className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-56 h-48 bg-[#FFF9F0] rounded-3xl border-b-8 border-[#F5E6D3] relative z-10">
          {isCut && <div className="absolute top-0 right-0 w-1/2 h-full bg-[#fce4ec]/30 border-l-2 border-black/5" />}
        </div>
        {!isCut && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
            {!candlesOut && <Flame className="w-6 h-6 text-amber-300 animate-pulse mb-1" />}
            <div className={`w-2 h-16 rounded-full ${candlesOut ? 'bg-slate-800' : 'bg-indigo-100'}`} />
          </div>
        )}
      </div>
      <button 
        onClick={() => { if(candlesOut) { if(!isCut) { setIsCut(true); onCut(); } } else setCandlesOut(true); }}
        className="mt-12 px-8 py-3 glass rounded-full text-white uppercase tracking-widest text-xs font-bold"
      >
        {!candlesOut ? "Blow Candles" : isCut ? "Delicious!" : "Cut the Cake"}
      </button>
    </div>
  );
};

const PhotoSquareSlides = ({ onExplore }: { onExplore: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const photoData = IMAGES.SQUARE_SLIDES;
  return (
    <div className="flex flex-col items-center py-32 px-6">
      <h2 className="text-4xl font-serif italic text-white mb-12">The Lunar Gallery</h2>
      <div className="relative aspect-square w-64 md:w-80 glass rounded-[3rem] p-6 shadow-2xl">
         <AnimatePresence mode="wait">
           <motion.img 
             key={currentIndex}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 1.1 }}
             src={photoData[currentIndex].url} 
             className="w-full h-full object-cover rounded-[2rem]" 
           />
         </AnimatePresence>
      </div>
      <div className="flex space-x-12 mt-12 items-center">
         <button onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} className="text-white hover:scale-110 disabled:opacity-30" disabled={currentIndex === 0}><ChevronLeft /></button>
         <div className="text-white/40 font-mono text-sm">{currentIndex + 1} / {photoData.length}</div>
         <button onClick={() => { setCurrentIndex(Math.min(photoData.length - 1, currentIndex + 1)); onExplore(); }} className="text-white hover:scale-110 disabled:opacity-30" disabled={currentIndex === photoData.length - 1}><ChevronRight /></button>
      </div>
    </div>
  );
};

const MusicToolbar = ({ 
  isPlaying, 
  onToggle, 
  volume, 
  onVolumeChange, 
  isMuted, 
  onMuteToggle 
}: { 
  isPlaying: boolean; 
  onToggle: () => void; 
  volume: number; 
  onVolumeChange: (v: number) => void;
  isMuted: boolean;
  onMuteToggle: () => void;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-8 right-8 z-[60] flex items-center space-x-4 h-14 pr-6 pl-4 glass rounded-full shadow-2xl border-white/10"
    >
      <Tooltip text={isPlaying ? "Pause Music" : "Play Music"}>
        <button onClick={onToggle} className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors">
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
        </button>
      </Tooltip>

      <div className="h-4 w-px bg-white/10"></div>

      <Tooltip text={isMuted ? "Unmute" : "Mute"}>
        <button onClick={onMuteToggle} className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors">
          {isMuted ? <VolumeX className="w-5 h-5 text-amber-200" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </Tooltip>

      <div className="group relative flex items-center w-24">
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={isMuted ? 0 : volume} 
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-white hover:accent-amber-200 transition-all"
        />
      </div>
    </motion.div>
  );
};

// --- Golden Memories Component ---
const GoldenMemories = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const memories = [
    { url: IMAGES.GALLERY[0].url, title: "Pure Joy", message: "That laugh that lights up the entire room. Never let it fade." },
    { url: IMAGES.GALLERY[1].url, title: "The Dreamer", message: "Watching you chase your dreams is our greatest inspiration." },
    { url: IMAGES.GALLERY[2].url, title: "Grace & Elegance", message: "You carry yourself with a kindness that touches everyone you meet." },
    { url: IMAGES.GALLERY[0].url, title: "Eternal Bond", message: "Through every high and low, you are the heart of this family." },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] overflow-y-auto bg-slate-950/95 backdrop-blur-2xl px-6 py-20"
        >
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClose}
            className="fixed top-8 right-8 w-14 h-14 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all z-[210]"
          >
            <RotateCcw className="w-6 h-6" />
          </motion.button>

          <div className="max-w-4xl mx-auto space-y-32">
            <div className="text-center">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-amber-200/60 uppercase tracking-[1em] text-xs font-bold block mb-6"
              >
                Archive of Love
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-serif italic text-white"
              >
                Golden Memories
              </motion.h2>
            </div>

            {memories.map((memory, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
              >
                <div className="flex-1 w-full group">
                  <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
                    <img src={memory.url} alt={memory.title} className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left space-y-6">
                  <span className="text-[10px] text-amber-200/40 uppercase tracking-[0.5em]">Memory {i + 1}</span>
                  <h3 className="text-4xl font-serif italic text-white">{memory.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-light">{memory.message}</p>
                  <div className="h-px w-24 bg-gradient-to-r from-amber-200/30 to-transparent mx-auto md:mx-0 pt-4"></div>
                </div>
              </motion.div>
            ))}

            <div className="py-20 text-center">
              <p className="font-calligraphy text-4xl text-amber-100/60 italic">To many more chapters...</p>
              <button 
                onClick={onClose}
                className="mt-12 px-10 py-4 glass rounded-full text-white uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
              >
                Return to Celebration
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [step, setStep] = useState<'GATED' | 'TIMER' | 'REVEALED'>('GATED');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [isMemoriesOpen, setIsMemoriesOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'cake', text: "Cut the celestial cake", status: 'pending' },
    { id: 'slides', text: "Browse the lunar gallery", status: 'pending' },
    { id: 'gift', text: "Open the surprise gift", status: 'pending' },
    { id: 'music', text: "Start the celestial melody", status: 'pending' },
    { id: 'calendar', text: "Consult the celestial calendar", status: 'pending' },
    { id: 'memories', text: "Discover the golden memories", status: 'pending' },
    { id: 'wish', text: "Make a lunar wish", status: 'pending' }
  ]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) audioRef.current.play().catch(() => setIsMusicPlaying(false));
      else audioRef.current.pause();
    }
  }, [isMusicPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const completeTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'done' } : t));
    confetti({ particleCount: 20, origin: { x: 0.1, y: 0.9 } });
  };

  const [hoverProgress, setHoverProgress] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hoverProgress >= 100 && !showEasterEgg) {
      setShowEasterEgg(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.3 },
        colors: ['#A855F7', '#D8B4FE', '#FFFFFF']
      });
    }
  }, [hoverProgress, showEasterEgg]);

  const startHoverTimer = () => {
    if (showEasterEgg) return;
    const startTime = Date.now();
    hoverTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / 5000) * 100, 100);
      setHoverProgress(progress);
    }, 50);
  };

  const stopHoverTimer = () => {
    if (hoverTimerRef.current) clearInterval(hoverTimerRef.current);
    if (!showEasterEgg) setHoverProgress(0);
  };

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <div className="min-h-screen relative selection:bg-slate-500 selection:text-white bg-slate-950 font-sans">
      <AnimatePresence mode="wait">
        {step === 'GATED' && <PasscodeGate onSuccess={() => setStep('TIMER')} />}
        {step === 'TIMER' && <Cinematic3DTimer onComplete={() => setStep('REVEALED')} />}
        {step === 'REVEALED' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            <ScrollProgress />
            <DynamicBackground />
            <StarField mousePos={mousePos} />
            <FallingStars />
            <PartyTasks tasks={tasks} />
            <MusicToolbar 
              isPlaying={isMusicPlaying} 
              onToggle={() => {
                setIsMusicPlaying(!isMusicPlaying);
                if (!isMusicPlaying) completeTask('music');
              }}
              volume={volume}
              onVolumeChange={(v) => {
                setVolume(v);
                if (isMuted) setIsMuted(false);
              }}
              isMuted={isMuted}
              onMuteToggle={() => setIsMuted(!isMuted)}
            />
            <MoonBackground onWish={() => completeTask('wish')} />
            <main className="relative z-30 container mx-auto px-6 py-20 flex flex-col items-center">
              <motion.div className="text-center min-h-[90vh] flex flex-col justify-center items-center">
                 <motion.div style={{ y: y1 }} className="mb-4">
                   <h1 className="text-4xl md:text-8xl font-serif italic text-white animate-neon leading-tight">
                     Happy Birthday
                   </h1>
                 </motion.div>
                 <motion.div 
                   style={{ y: y2 }}
                   onMouseEnter={startHoverTimer}
                   onMouseLeave={stopHoverTimer}
                   className="relative group cursor-help"
                 >
                   <h1 className="text-4xl md:text-8xl font-serif italic text-white/40 leading-tight">
                     Bhavya Reddy
                   </h1>
                   
                   {/* Hidden Progress Glow */}
                   {hoverProgress > 0 && hoverProgress < 100 && (
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div 
                          className="w-full h-1 bg-white/20 absolute bottom-0 rounded-full overflow-hidden"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                        >
                          <motion.div 
                            className="h-full bg-amber-200" 
                            style={{ width: `${hoverProgress}%` }}
                          />
                        </motion.div>
                     </div>
                   )}

                   <AnimatePresence>
                     {showEasterEgg && (
                       <motion.div
                         initial={{ opacity: 0, scale: 0.5, y: 20 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         className="absolute top-full mt-12 left-1/2 -translate-x-1/2 w-max z-50"
                       >
                         <div className="glass px-10 py-5 rounded-full border-amber-200/30 flex items-center space-x-4 shadow-[0_0_80px_rgba(255,255,255,0.15)]">
                           <Sparkles className="w-6 h-6 text-amber-200 animate-pulse" />
                           <span className="font-calligraphy text-3xl text-amber-100 italic">
                             Eternal Star of Our Lives
                           </span>
                           <Sparkles className="w-6 h-6 text-amber-200 animate-pulse" />
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </motion.div>
                 
                 <SectionReveal delay={0.8}>
                    <MusicBlock3D isPlaying={isMusicPlaying} onToggle={() => { setIsMusicPlaying(!isMusicPlaying); completeTask('music'); }} />
                 </SectionReveal>
                 
                 <motion.div 
                   animate={{ y: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="text-white/20 uppercase tracking-[0.4em] text-[10px] mt-24"
                 >
                   Scroll for Magic
                 </motion.div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full max-w-6xl mt-40">
                <SectionReveal delay={0.2}>
                  <GiftBox 
                    onOpen={() => completeTask('gift')} 
                    onMemoryView={() => { 
                      completeTask('memories');
                      setIsMemoriesOpen(true);
                    }} 
                  />
                </SectionReveal>
                <SectionReveal delay={0.4}>
                  <InteractiveCake onCut={() => completeTask('cake')} />
                </SectionReveal>
              </div>

              <SectionReveal>
                <PhotoSquareSlides onExplore={() => completeTask('slides')} />
              </SectionReveal>

              <div className="w-full flex justify-center mt-32 mb-10">
                <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => setIsMemoriesOpen(true)}
                   className="glass px-12 py-5 rounded-full text-white flex items-center space-x-6 border-amber-200/20 group hover:border-amber-200/50 transition-all shadow-[0_0_50px_rgba(251,191,36,0.1)]"
                >
                  <span className="text-[10px] uppercase tracking-[0.6em] font-bold">Open Golden Archive</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-200 group-hover:text-slate-950 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.button>
              </div>

              <PhotoGallery />
              
              <SectionReveal>
                <LunarCalendar onExplore={() => completeTask('calendar')} />
              </SectionReveal>
              
              <CinematicVideo />
              
              <SectionReveal className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 py-32">
                 <MessageReveal from="Bestie" text="You make every day brighter, Bhavya!" />
                 <MessageReveal from="Family" text="So proud of who you've become." />
                 <MessageReveal from="The Stars" text="Your shine is eternal." />
              </SectionReveal>
            </main>
            <GoldenMemories isOpen={isMemoriesOpen} onClose={() => setIsMemoriesOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      <audio ref={audioRef} src={AUDIO.CELESTIAL_BEATS} loop />
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<StrictMode><App /></StrictMode>);
