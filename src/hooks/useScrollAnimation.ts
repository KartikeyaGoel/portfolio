import { useEffect, useRef, useState } from 'react';

export type AnimationType = 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | 'bounce';

export const useScrollAnimation = (threshold = 0.1, animationType: AnimationType = 'fadeIn') => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
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
  }, [threshold]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-1000 ease-out';
    
    switch (animationType) {
      case 'fadeIn':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
      case 'slideUp':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`;
      case 'slideLeft':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`;
      case 'slideRight':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`;
      case 'scale':
        return `${baseClasses} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`;
      case 'rotate':
        return `${baseClasses} ${isVisible ? 'opacity-100 rotate-0' : 'opacity-0 rotate-12'}`;
      case 'bounce':
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`;
      default:
        return `${baseClasses} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
    }
  };

  return { ref, isVisible, getAnimationClasses };
};