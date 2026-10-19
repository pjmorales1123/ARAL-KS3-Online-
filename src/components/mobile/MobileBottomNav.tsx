import React from 'react';
import { BookOpen, Edit3, BarChart3, UserCheck } from 'lucide-react';

export type MobileTab = 'sessions' | 'activity' | 'tracker' | 'profile';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onChangeTab: (tab: MobileTab) => void;
  hasUnreviewedFeedback?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onChangeTab,
  hasUnreviewedFeedback = false,
}) => {
  const tabs = [
    { id: 'sessions' as MobileTab, label: 'Workbook', icon: BookOpen },
    { id: 'activity' as MobileTab, label: 'Worksheet', icon: Edit3 },
    { id: 'tracker' as MobileTab, label: 'Progress', icon: BarChart3, badge: hasUnreviewedFeedback },
    { id: 'profile' as MobileTab, label: 'Learner', icon: UserCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg max-w-md mx-auto">
      <div className="grid grid-cols-4 items-center h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center min-h-[44px] min-w-[44px] rounded-xl transition-all ${
                isActive
                  ? 'text-rose-600 font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${isActive ? 'font-bold' : 'font-normal'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-4 h-0.5 bg-rose-600 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
