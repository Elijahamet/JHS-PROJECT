import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  highlight?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  highlight = false,
  className = '',
}) => {
  return (
    <div
      className={`p-5 rounded-xl border transition-all ${
        highlight
          ? 'bg-slate-900 text-white border-slate-800 shadow-sm'
          : 'bg-white text-slate-900 border-slate-200/80 shadow-sm'
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <p
          className={`text-xs font-medium uppercase tracking-wider ${
            highlight ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {title}
        </p>
        {Icon && (
          <div
            className={`p-2 rounded-lg ${
              highlight
                ? 'bg-slate-800 text-slate-300'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3">
        <div
          className={`text-2xl font-bold tracking-tight ${
            highlight ? 'text-white' : 'text-slate-900'
          }`}
        >
          {value}
        </div>

        {(subtitle || trend) && (
          <div className="mt-1.5 flex items-center gap-2 text-xs">
            {trend && (
              <span
                className={`font-medium ${
                  trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {trend.value}
              </span>
            )}
            {subtitle && (
              <span className={highlight ? 'text-slate-400' : 'text-slate-500'}>
                {subtitle}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
