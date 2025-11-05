
import React from 'react';
import { UserRole } from '../types';

interface LandingPageProps {
  onSelectRole: (role: UserRole) => void;
}

const RoleCard: React.FC<{ title: string; description: string; onClick: () => void; icon: string; }> = ({ title, description, onClick, icon }) => (
    <div 
        className="bg-white/60 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 w-full md:w-96 transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer shadow-lg hover:shadow-indigo-500/20"
        onClick={onClick}
    >
        <div className="flex justify-center mb-4">
            <span className="text-6xl">{icon}</span>
        </div>
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-2">{title}</h3>
        <p className="text-center text-gray-600">{description}</p>
    </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole }) => {
  const backgroundImageUrl = 'https://www.apsjodhpur.com/webdata/slider/6bdb8d0d5f3b595d3b341654b2a03f28.png';

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
        <div className="text-center mb-12 z-10">
            <h1 className="text-6xl md:text-7xl font-extrabold text-white tracking-tight">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">SkillEra</span>
            </h1>
            <p className="text-gray-200 mt-4 text-lg max-w-2xl mx-auto">Your journey to mastery begins here. Choose your role to get started.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 z-10">
            <RoleCard 
                title="Student"
                description="Track your goals, showcase skills, and climb the leaderboard."
                icon="🎓"
                onClick={() => onSelectRole(UserRole.STUDENT)}
            />
            <RoleCard 
                title="Admin"
                description="Manage events, oversee progress, and empower students."
                icon="👑"
                onClick={() => onSelectRole(UserRole.ADMIN)}
            />
        </div>
    </div>
  );
};

export default LandingPage;