import React from 'react';
import { User } from '../types';
import { calculateLevelInfo } from '../utils';
import { MOCK_BADGES } from '../constants';

interface BadgesAndLevelsProps {
  user: User;
}

const BadgesAndLevels: React.FC<BadgesAndLevelsProps> = ({ user }) => {
  const levelInfo = calculateLevelInfo(user.points);
  const earnedBadgeIds = new Set(user.earnedBadgeIds);

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Badges & Levels</h1>
      <p className="text-gray-600 mb-8">Track your progress and celebrate your achievements.</p>

      {/* Level Progress Section */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Current Level</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative flex items-center justify-center">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle cx="80" cy="80" r="70" strokeWidth="12" stroke="currentColor" className="text-gray-200" fill="transparent" />
              <circle
                cx="80"
                cy="80"
                r="70"
                strokeWidth="12"
                stroke="currentColor"
                className="text-indigo-600"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 70}
                strokeDashoffset={2 * Math.PI * 70 * (1 - levelInfo.progressPercentage / 100)}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-5xl font-bold text-gray-900">{levelInfo.level}</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-800">Level {levelInfo.level}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">Keep up the great work!</p>
            <p className="text-gray-600">You are making fantastic progress on your journey to mastery.</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full" style={{ width: `${levelInfo.progressPercentage}%` }}></div>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                <span>Progress</span>
                <span>{levelInfo.currentLevelProgressXp.toLocaleString()} / {levelInfo.xpForNextLevel.toLocaleString()} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Collection Section */}
      <div className="bg-white p-8 rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Badge Collection</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {MOCK_BADGES.map(badge => {
                const isEarned = earnedBadgeIds.has(badge.id);
                return (
                    <div key={badge.id} className="group relative flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                        <div className={`w-24 h-24 p-5 bg-gray-200 rounded-full flex items-center justify-center text-5xl mb-3 transition-all duration-300 ${isEarned ? 'text-indigo-600' : 'text-gray-400 grayscale'}`}>
                            {badge.icon}
                        </div>
                        <p className={`text-sm font-semibold ${isEarned ? 'text-gray-800' : 'text-gray-400'}`}>{badge.name}</p>
                         <div className="absolute bottom-full mb-2 w-48 p-2 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            <p className="font-bold">{badge.name}</p>
                            <p className="text-gray-300">{badge.description}</p>
                            {!isEarned && <p className="text-yellow-400 mt-1">Not yet earned</p>}
                        </div>
                    </div>
                )
            })}
          </div>
      </div>

    </div>
  );
};

export default BadgesAndLevels;