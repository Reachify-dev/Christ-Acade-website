
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
}

const CTAButton = ({
  text,
  href,
  variant = 'primary',
  size = 'md',
  icon = <ArrowRight size={18} />,
  className = '',
}: CTAButtonProps) => {
  const baseClasses = "rounded-md font-medium inline-flex items-center justify-center transition-all duration-300 button-shine";
  
  const variantClasses = {
    primary: "bg-gold-500 hover:bg-gold-400 text-navy-900 shadow-md hover:shadow-lg",
    secondary: "bg-navy-700 hover:bg-navy-600 text-white shadow-md hover:shadow-lg",
    outline: "bg-transparent border-2 border-current text-navy-700 hover:bg-navy-50"
  };
  
  const sizeClasses = {
    sm: "text-sm px-4 py-2 space-x-1",
    md: "px-5 py-2.5 space-x-2",
    lg: "text-lg px-6 py-3 space-x-2"
  };
  
  return (
    <Link
      to={href}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      <span>{text}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        {icon}
      </span>
    </Link>
  );
};

export default CTAButton;
