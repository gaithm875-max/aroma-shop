'use client';

import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'gold' | 'blue' | 'green' | 'red' | 'purple';
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const colorClasses = {
  gold: {
    bg: 'bg-gold/10',
    iconBg: 'bg-gold',
    iconText: 'text-white',
    text: 'text-gold',
  },
  blue: {
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-500',
    iconText: 'text-white',
    text: 'text-blue-500',
  },
  green: {
    bg: 'bg-green-50',
    iconBg: 'bg-green-500',
    iconText: 'text-white',
    text: 'text-green-500',
  },
  red: {
    bg: 'bg-red-50',
    iconBg: 'bg-red-500',
    iconText: 'text-white',
    text: 'text-red-500',
  },
  purple: {
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-500',
    iconText: 'text-white',
    text: 'text-purple-500',
  },
};

export default function StatsCard({ title, value, icon: Icon, color, trend }: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <div className={`p-2 rounded-lg ${colors.iconBg}`}>
            <Icon className={`w-6 h-6 ${colors.iconText}`} />
          </div>
        </div>
        
        {trend && (
          <div className={`text-sm font-semibold ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </div>
        )}
      </div>

      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className={`text-3xl font-bold ${colors.text} font-playfair`}>{value}</p>
    </div>
  );
}
