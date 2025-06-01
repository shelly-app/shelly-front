import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type TwoSectionsLayoutProps = {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  firstRatio?: number;
  secondRatio?: number;
  className?: string;
  firstClassName?: string;
  secondClassName?: string;
};

const TwoSectionsLayout = ({
  firstContent,
  secondContent,
  className = '',
}: TwoSectionsLayoutProps) => {
  if (!firstContent || !secondContent) {
    throw new Error('Both firstContent and secondContent must be provided');
  }

  return (
    <section
      className={cn('flex flex-col gap-4 px-12 py-8 md:flex-row', className)}
    >
      {firstContent}
      {secondContent}
    </section>
  );
};

const LayoutSection = ({
  children,
  ratio = 1,
  className = '',
}: {
  children: ReactNode;
  ratio?: number;
  className?: string;
}) => {
  if (ratio <= 0) {
    throw new Error('Ratio must be greater than 0');
  }

  return (
    <div style={{ flex: ratio }} className={cn(className)}>
      {children}
    </div>
  );
};

TwoSectionsLayout.FirstSection = LayoutSection;
TwoSectionsLayout.SecondSection = LayoutSection;

export default TwoSectionsLayout;
