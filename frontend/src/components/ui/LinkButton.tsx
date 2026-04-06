import { cn } from '@/shared/cn';
import { MdOpenInNew } from 'react-icons/md';

export type LinkButtonVariant = 'primary' | 'white';

interface LinkButtonProps {
  href: string;
  text: string;
  variant?: LinkButtonVariant;
}

const variantStyles: Record<LinkButtonVariant, string[]> = {
  primary: [
    'bg-primary-50 text-primary-700 border border-primary',
    'hover:bg-primary-200 hover:text-primary-700',
  ],
  white: [
    'bg-white text-fg border border-gray-300',
    'hover:bg-gray-50 hover:text-primary-700 hover:border-primary-300',
  ],
};

export default function LinkButton({
  href,
  text,
  variant = 'primary',
}: LinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'w-full flex items-center gap-2 font-medium',
        'px-6 py-4 rounded-lg shadow-sm',
        'transition-all duration-200 cursor-pointer',
        'hover:shadow-md hover:-translate-y-0.5',
        variantStyles[variant],
      )}
    >
      {text}
      <MdOpenInNew size={20} className="mb-0.5" />
    </a>
  );
}
