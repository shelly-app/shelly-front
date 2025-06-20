import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Image } from '@/components/ui/image';

interface TiltImageProps {
  src: string;
  alt: string;
  className?: string;
  maxTilt?: number; // degrees
}

export const TiltImage = ({
  src,
  alt,
  className,
  maxTilt = 18,
}: TiltImageProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    const rotateX = deltaY * maxTilt;
    const rotateY = -deltaX * maxTilt;

    lastTransform.current = { rotateX, rotateY };

    if (animationFrameId.current === null) {
      animationFrameId.current = requestAnimationFrame(() => {
        if (lastTransform.current) {
          el.style.transform = `perspective(700px) rotateX(${lastTransform.current.rotateX}deg) rotateY(${lastTransform.current.rotateY}deg) scale(1.04)`;
          el.style.transition = 'transform 0.1s cubic-bezier(.03,.98,.52,.99)';
        }
        animationFrameId.current = null;
      });
    }
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    el.style.transition = 'transform 0.5s cubic-bezier(.03,.98,.52,.99)';
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-transform duration-300 will-change-transform',
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      <Image
        src={src}
        alt={alt}
        className="pointer-events-none block h-auto w-full select-none"
      />
    </div>
  );
};
