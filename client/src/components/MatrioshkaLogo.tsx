interface MatrioshkaLogoProps {
  size?: number;
}

export default function MatrioshkaLogo({ size = 40 }: MatrioshkaLogoProps) {
  return (
    <div className="relative" style={{ width: size, height: size * 1.2 }}>
      <svg 
        width={size} 
        height={size * 1.2} 
        viewBox="0 0 100 120" 
        className="drop-shadow-lg"
      >
        {/* Outer matrioshka layer - inverted water drop shape */}
        <path
          d="M50 110 C30 110, 15 95, 15 75 C15 50, 30 35, 50 10 C70 35, 85 50, 85 75 C85 95, 70 110, 50 110 Z"
          fill="url(#outerGradient)"
          stroke="hsl(199, 89%, 38%)"
          strokeWidth="2"
        />
        
        {/* Middle matrioshka layer */}
        <path
          d="M50 95 C35 95, 25 85, 25 70 C25 50, 35 40, 50 20 C65 40, 75 50, 75 70 C75 85, 65 95, 50 95 Z"
          fill="url(#middleGradient)"
          stroke="hsl(199, 89%, 48%)"
          strokeWidth="1.5"
        />
        
        {/* Inner matrioshka layer - face area */}
        <path
          d="M50 80 C40 80, 35 75, 35 65 C35 50, 40 45, 50 30 C60 45, 65 50, 65 65 C65 75, 60 80, 50 80 Z"
          fill="url(#innerGradient)"
          stroke="hsl(220, 60%, 95%)"
          strokeWidth="1"
        />
        
        {/* Face - eyes */}
        <circle cx="44" cy="55" r="2.5" fill="hsl(199, 89%, 48%)" />
        <circle cx="56" cy="55" r="2.5" fill="hsl(199, 89%, 48%)" />
        
        {/* Face - cheeks */}
        <circle cx="38" cy="60" r="3" fill="hsl(0, 60%, 80%)" opacity="0.6" />
        <circle cx="62" cy="60" r="3" fill="hsl(0, 60%, 80%)" opacity="0.6" />
        
        {/* Face - smile */}
        <path
          d="M45 65 Q50 70 55 65"
          stroke="hsl(199, 89%, 48%)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Traditional matrioshka patterns */}
        <path
          d="M25 40 Q50 35 75 40"
          stroke="hsl(43, 96%, 56%)"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M30 25 Q50 20 70 25"
          stroke="hsl(0, 73%, 41%)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
        
        {/* Shine effect */}
        <ellipse
          cx="42"
          cy="75"
          rx="4"
          ry="8"
          fill="white"
          opacity="0.4"
        />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(199, 89%, 58%)" />
            <stop offset="50%" stopColor="hsl(217, 91%, 60%)" />
            <stop offset="100%" stopColor="hsl(224, 76%, 48%)" />
          </linearGradient>
          
          <linearGradient id="middleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(199, 89%, 68%)" />
            <stop offset="100%" stopColor="hsl(217, 91%, 70%)" />
          </linearGradient>
          
          <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(220, 60%, 98%)" />
            <stop offset="100%" stopColor="hsl(220, 60%, 92%)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
