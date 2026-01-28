'use client';
import { useRef, useEffect, useState, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function AnimatedSection({ children, className, as: Tag = 'section', ...props }: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(
        'opacity-0',
        isVisible && 'animate-fade-in-up',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
