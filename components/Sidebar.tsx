
import React from 'react';
import { ICONS } from '../constants';
import { User, UserRole } from '../types';

interface SidebarProps {
  user: User;
  activePage: string;
  setActivePage: (page: string) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full h-12 px-3 mt-2 rounded transition-all duration-200 ${
      isActive
        ? 'bg-indigo-600 text-white shadow-lg'
        : 'text-gray-500 hover:bg-gray-100 hover:text-indigo-600'
    }`}
  >
    {icon}
    <span className="ml-4 hidden md:block">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ user, activePage, setActivePage, onLogout }) => {
  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ICONS.dashboard },
    { id: 'my-skills', label: 'My Skills', icon: ICONS.skills },
    { id: 'badges-and-levels', label: 'Badges & Levels', icon: ICONS.badges },
    { id: 'leaderboard', label: 'Leaderboard', icon: ICONS.leaderboard },
    { id: 'events', label: 'Events', icon: ICONS.events },
    { id: 'profile', label: 'Profile', icon: ICONS.profile },
  ];

  const adminNavItems = [
    { id: 'verification', label: 'Verification', icon: ICONS.verification },
    { id: 'profile', label: 'Profile', icon: ICONS.profile },
  ];

  const navItems = user.role === UserRole.ADMIN ? adminNavItems : studentNavItems;

  return (
    <aside className="fixed top-0 left-0 h-full w-16 md:w-64 bg-white border-r border-gray-200 flex flex-col justify-between transition-width duration-300 z-30">
      <div>
        <div className="flex items-center justify-center md:justify-start md:pl-4 h-16 border-b border-gray-200">
          <span className="text-2xl font-bold text-gray-900">SE</span>
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 ml-2 hidden md:block">
            SkillEra
          </h1>
        </div>
        <nav className="p-2">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              isActive={activePage === item.id}
              onClick={() => setActivePage(item.id)}
            />
          ))}
        </nav>
      </div>
      <div className="p-2 border-t border-gray-200">
        <NavItem
            label="Logout"
            icon={ICONS.logout}
            isActive={false}
            onClick={onLogout}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
