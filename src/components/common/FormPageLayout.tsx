import React, { useEffect } from 'react';
import { ArrowLeft, ChevronRight, Sparkles, LucideIcon } from 'lucide-react';
import { Button } from './Button';
import { Badge, BadgeVariant } from './Badge';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface FormPageLayoutProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconBg?: string;
  badgeText?: string;
  badgeVariant?: BadgeVariant;
  onBack: () => void;
  backLabel?: string;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
  footerSubmitLabel?: string;
  footerSubmitIcon?: LucideIcon;
  onSubmit?: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  maxWidth?: string;
  actions?: React.ReactNode;
}

export const FormPageLayout: React.FC<FormPageLayoutProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconBg = 'from-blue-600 to-indigo-600',
  badgeText,
  badgeVariant = 'info',
  onBack,
  backLabel = 'Back',
  breadcrumbs,
  children,
  footerSubmitLabel = 'Save Changes',
  footerSubmitIcon,
  onSubmit,
  isSubmitting = false,
  maxWidth = 'max-w-4xl',
  actions,
}) => {
  // Allow Esc key to navigate back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  return (
    <div className={`mx-auto ${maxWidth} space-y-6 pb-12 animate-fadeIn`}>
      {/* Top Navigation & Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100/80 border border-slate-200/90 rounded-lg shadow-xs hover:border-slate-300 transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>{backLabel}</span>
          </button>

          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="hidden sm:flex items-center gap-1 text-xs text-slate-400">
              <ChevronRight className="w-3.5 h-3.5" />
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={crumb.label}>
                    {crumb.onClick && !isLast ? (
                      <button
                        type="button"
                        onClick={crumb.onClick}
                        className="hover:text-slate-700 transition-colors cursor-pointer"
                      >
                        {crumb.label}
                      </button>
                    ) : (
                      <span className={isLast ? 'text-slate-900 font-semibold' : ''}>
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && <ChevronRight className="w-3 h-3 text-slate-300" />}
                  </React.Fragment>
                );
              })}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          {badgeText && (
            <Badge variant={badgeVariant} size="sm">
              <Sparkles className="w-3 h-3 mr-1 inline" />
              {badgeText}
            </Badge>
          )}
          <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
            Esc to cancel
          </span>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 sm:p-7">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50/70 via-indigo-50/30 to-transparent rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${iconBg} text-white flex items-center justify-center shadow-md shadow-blue-500/15 shrink-0`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>
          </div>

          {actions && (
            <div className="flex items-center gap-2 shrink-0 sm:self-center">
              {actions}
            </div>
          )}
        </div>
      </div>

      {/* Main Form Body & Sections */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-8 space-y-6">
        {children}

        {/* Form Action Footer */}
        {onSubmit && (
          <div className="pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onBack}
              disabled={isSubmitting}
            >
              Cancel & Return
            </Button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={onSubmit}
                icon={footerSubmitIcon}
                disabled={isSubmitting}
                className="w-full sm:w-auto shadow-sm shadow-blue-600/20"
              >
                {isSubmitting ? 'Saving...' : footerSubmitLabel}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
