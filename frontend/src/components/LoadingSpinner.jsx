import { Hourglass } from '@phosphor-icons/react';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32,
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Hourglass 
        size={sizeMap[size]} 
        weight="light"
        className="text-white animate-spin duration-[3000ms]"
      />
    </div>
  );
};

export default LoadingSpinner;