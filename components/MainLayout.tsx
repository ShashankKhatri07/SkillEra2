import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import MySkills from './MySkills';
import Leaderboard from './Leaderboard';
import Events from './Events';
import Profile from './Profile';
import BadgesAndLevels from './BadgesAndLevels';
import AdminDashboard from './AdminDashboard';
import { User, UserRole } from '../types';

interface MainLayoutProps {
  user: User;
  onLogout: () => void;
  updateUser: (user: User) => void;
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const MainLayout: React.FC<MainLayoutProps> = ({ user, onLogout, updateUser, allUsers, setAllUsers }) => {
  const [activePage, setActivePage] = useState(user.role === UserRole.ADMIN ? 'verification' : 'dashboard');

  const renderStudentContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard user={user} updateUser={updateUser} />;
      case 'my-skills':
        return <MySkills />;
      case 'badges-and-levels':
        return <BadgesAndLevels user={user} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'events':
        return <Events />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return <Dashboard user={user} updateUser={updateUser} />;
    }
  };

  const renderAdminContent = () => {
    switch(activePage) {
        case 'verification':
            return <AdminDashboard allUsers={allUsers} setAllUsers={setAllUsers} />;
        case 'profile':
            return <Profile user={user} />;
        default:
            return <AdminDashboard allUsers={allUsers} setAllUsers={setAllUsers} />;
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <Sidebar user={user} activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />
      <main className="flex-1 p-6 md:p-10 ml-16 md:ml-64 transition-all duration-300">
        {user.role === UserRole.ADMIN ? renderAdminContent() : renderStudentContent()}
      </main>
    </div>
  );
};

export default MainLayout;
