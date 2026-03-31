'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}

export interface TeamMemberCardProps {
  position?: 'left' | 'right';
  jobPosition?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  description?: string;
  onCtaClick?: () => void;
  className?: string;
}

export default function TeamMemberCard({
  position = 'left',
  jobPosition = 'Founder & Lead Engineer',
  firstName = 'Pedro',
  lastName = 'Van-Lume',
  imageUrl,
  description = '',
  onCtaClick,
  className,
}: TeamMemberCardProps) {
  const fullName = `${firstName} ${lastName}`;
  const isRight = position === 'right';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative flex flex-col justify-center', className)}
    >
      {/* Job position label */}
      <motion.p
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          'mb-4 text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-accent-purple)]',
          isRight && 'text-right'
        )}
      >
        {jobPosition}
      </motion.p>

      {/* Portrait + overlapping info — stacks on mobile, overlaps on md+ */}
      <div className={cn('flex flex-col md:flex-row md:items-start', isRight && 'md:justify-end')}>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative h-[380px] w-[260px] shrink-0 overflow-hidden rounded-[var(--radius-md)] shadow-[var(--shadow-md)]',
            isRight ? 'md:order-1' : ''
          )}
        >
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          {imageUrl && (
            <img
              src={imageUrl}
              alt={fullName}
              className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105"
            />
          )}
        </motion.div>

        {/* Info block — overlaps portrait on md+ via negative margin */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative z-10 flex flex-col gap-10 pt-6',
            'md:-ml-8 md:pt-8',
            isRight && 'md:ml-0 md:-mr-8 md:items-end'
          )}
        >
          {/* Display name */}
          <div>
            <p className="text-[2.8rem] leading-[1.05] tracking-tight text-[var(--color-text-primary)]">
              <span className="font-extralight">{firstName}</span>
              <br />
              <span className="font-bold">{lastName}</span>
            </p>
          </div>

          {/* CTA + bio */}
          <div className={cn('flex items-start gap-6', isRight && 'flex-row-reverse')}>
            {/* Circular arrow CTA */}
            <motion.button
              type="button"
              onClick={onCtaClick}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Solicitar orçamento"
              className={cn(
                'group flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full',
                'border border-[var(--color-border)]',
                'transition-colors duration-300',
                'hover:border-[var(--color-accent-purple)] hover:bg-[var(--color-accent-purple)]'
              )}
            >
              <ArrowRight
                size={20}
                className={cn(
                  'text-[var(--color-text-secondary)] transition-all duration-300',
                  'group-hover:-rotate-45 group-hover:text-white',
                  isRight && 'rotate-180 group-hover:rotate-[225deg]'
                )}
              />
            </motion.button>

            {/* Bio */}
            <p
              className={cn(
                'text-sm leading-[1.8] text-[var(--color-text-secondary)] max-w-[260px]',
                isRight && 'text-right'
              )}
            >
              {description}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
