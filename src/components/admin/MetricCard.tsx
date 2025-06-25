import React from 'react';

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  subtitleColor?: 'green' | 'red' | 'gray' | 'yellow';
};

const MetricCard: React.FC<Props> = ({ title, value, subtitle, subtitleColor = 'gray' }) => {
  const colorClass = {
    green: 'text-green-500',
    red: 'text-red-500',
    gray: 'text-gray-700',
    yellow: 'text-yellow-500' 
  }[subtitleColor];
  return (
    <div className="p-3 sm:p-4 bg-white rounded-xl shadow-md min-h-[100px] flex flex-col justify-center">
      <p className="text-xs sm:text-sm text-gray-700 mb-1">{title}</p>
      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-700 break-words">{value}</p>
      {subtitle && <p className={`text-xs sm:text-sm mt-1 ${colorClass}`}>{subtitle}</p>}
    </div>
  );
};


export default MetricCard;
