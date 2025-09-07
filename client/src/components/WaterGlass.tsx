import { motion } from "framer-motion";

interface WaterGlassProps {
  index: number;
  isFull: boolean;
  onClick: () => void;
}

export default function WaterGlass({ index, isFull, onClick }: WaterGlassProps) {
  return (
    <motion.div 
      className="glass-item flex flex-col items-center space-y-2 p-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-16 h-20 cursor-pointer" onClick={onClick}>
        <svg
          width="64"
          height="80"
          viewBox="0 0 64 80"
          className="drop-shadow-md"
        >
          {/* Glass body */}
          <path
            d="M12 8 L52 8 L50 72 L14 72 Z"
            fill="url(#glassGradient)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
          />
          
          {/* Glass rim */}
          <ellipse
            cx="32"
            cy="8"
            rx="20"
            ry="3"
            fill="url(#rimGradient)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.5"
          />
          
          {/* Water fill */}
          <path
            d={`M${12 + (isFull ? 0 : 38)} ${8 + (isFull ? 8 : 64)} L${52 - (isFull ? 0 : 38)} ${8 + (isFull ? 8 : 64)} L${50 - (isFull ? 0 : 36)} 72 L${14 + (isFull ? 0 : 36)} 72 Z`}
            fill="url(#waterGradient)"
            opacity={isFull ? 0.85 : 0}
            className="transition-all duration-700 ease-in-out"
          />
          
          {/* Water surface */}
          {isFull && (
            <ellipse
              cx="32"
              cy="16"
              rx="18"
              ry="2"
              fill="url(#waterSurfaceGradient)"
              opacity="0.8"
            />
          )}
          
          {/* Left glass highlight */}
          <path
            d="M16 12 L18 12 L17 65 L15 65 Z"
            fill="url(#highlightGradient)"
            opacity="0.6"
          />
          
          {/* Right glass shadow */}
          <path
            d="M46 12 L48 12 L47 65 L45 65 Z"
            fill="url(#shadowGradient)"
            opacity="0.3"
          />
          
          {/* Glass bottom reflection */}
          <ellipse
            cx="32"
            cy="70"
            rx="18"
            ry="2"
            fill="rgba(255,255,255,0.2)"
          />
          
          <defs>
            <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(200,200,200,0.2)" />
            </linearGradient>
            
            <linearGradient id="rimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(200,200,200,0.3)" />
            </linearGradient>
            
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(199, 89%, 65%)" />
              <stop offset="50%" stopColor="hsl(217, 91%, 60%)" />
              <stop offset="100%" stopColor="hsl(224, 76%, 48%)" />
            </linearGradient>
            
            <linearGradient id="waterSurfaceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
            </linearGradient>
            
            <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
            </linearGradient>
            
            <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <span className="text-xs text-slate-600 font-medium">{index + 1}</span>
    </motion.div>
  );
}
