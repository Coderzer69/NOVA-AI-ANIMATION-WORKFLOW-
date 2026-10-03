import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li';
};

export function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const Tag = as;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const revealStyle: CSSProperties = { transitionDelay: `${delay}ms` };
  const revealState = isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0';

  return (
    <Tag
      ref={elementRef as never}
      style={revealStyle}
      className={`will-change-transform transition-all duration-[700ms] ease-out ${revealState} ${className}`}
    >
      {children}
    </Tag>
  );
}
