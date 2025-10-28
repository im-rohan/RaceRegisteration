import React, { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import confetti from 'canvas-confetti';

interface DynamicDonutChartProps {
  value: number; // 0-100 percentage
  size?: number;
  strokeWidth?: number;
  onGoalReached?: () => void;
  className?: string;
}

export default function DynamicDonutChart({ 
  value, 
  size = 120, 
  strokeWidth = 12, 
  onGoalReached,
  className = "" 
}: DynamicDonutChartProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth animation to target value
    const duration = 1500; // 1.5 seconds
    const startTime = Date.now();
    const startValue = animatedValue;
    const targetValue = Math.min(value, 100);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (targetValue - startValue) * easeOutCubic;
      
      setAnimatedValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else if (targetValue >= 100 && !hasTriggeredConfetti) {
        // Trigger confetti when reaching 100%
        setHasTriggeredConfetti(true);
        triggerConfetti();
        onGoalReached?.();
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, onGoalReached, hasTriggeredConfetti, animatedValue]);

  const triggerConfetti = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Multiple bursts for dramatic effect
    const count = 200;
    const defaults = {
      origin: { x, y },
      colors: ['#FF4230', '#FFD700', '#00FF00', '#FF69B4', '#87CEEB']
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    // Sequential bursts
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const data = [
    { name: 'completed', value: animatedValue },
    { name: 'remaining', value: 100 - animatedValue }
  ];

  const getColor = (value: number) => {
    if (value >= 100) return '#FF4230'; // Brand red for completed
    if (value >= 70) return '#10B981'; // Green for on track
    if (value >= 40) return '#F59E0B'; // Amber for at risk
    return '#EF4444'; // Red for needs attention
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div style={{ width: size, height: size }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={size / 2 - strokeWidth}
              outerRadius={size / 2}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={getColor(animatedValue)} />
              <Cell fill="hsl(var(--muted))" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div 
              className="text-2xl font-bold transition-colors duration-300"
              style={{ color: getColor(animatedValue) }}
            >
              {Math.round(animatedValue)}%
            </div>
          </div>
        </div>

        {/* Goal reached overlay */}
        {animatedValue >= 100 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center animate-pulse">
              <div className="text-2xl">🎉</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}