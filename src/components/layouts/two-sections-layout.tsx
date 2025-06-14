import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type TwoSectionsLayoutProps = {
  firstSectionContent: React.ReactNode;
  secondSectionContent: React.ReactNode;
  firstRatio?: number;
  secondRatio?: number;
  className?: string;
  firstClassName?: string;
  secondClassName?: string;
};

export const TwoSectionsLayout = ({
  firstSectionContent,
  secondSectionContent,
  className = '',
}: TwoSectionsLayoutProps) => {
  if (!firstSectionContent || !secondSectionContent) {
    throw new Error('Both firstContent and secondContent must be provided');
  }

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col gap-4 px-8 py-4 md:flex-row md:px-12 md:py-8',
        className,
      )}
    >
      {firstSectionContent}
      {secondSectionContent}
    </div>
  );
};

const SectionContent = ({
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
    <section style={{ flex: ratio }} className={cn('h-full w-full', className)}>
      {children}
    </section>
  );
};

TwoSectionsLayout.SectionContent = SectionContent;
