
import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { User, Goal, Achievement, AchievementCategory } from '../types';
import { MOCK_EVENTS, MOCK_SKILLS, MOCK_BADGES, ACHIEVEMENT_POINT_MAP } from '../constants';
import { calculateLevelInfo } from '../utils';

interface DashboardProps {
  user: User;
  updateUser: (user: User) => void;
}

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`bg-white p-6 rounded-xl border border-gray-200 ${className}`}>
        {children}
    </div>
);

const StatusBadge: React.FC<{ status: 'pending' | 'approved' | 'rejected' }> = ({ status }) => {
    const styleMap = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${styleMap[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

const Dashboard: React.FC<DashboardProps> = ({ user, updateUser }) => {
    const upcomingEvents = MOCK_EVENTS.filter(e => !e.registered).slice(0, 2);
    const skillData = MOCK_SKILLS.slice(0, 5).map(skill => ({ name: skill.name, level: skill.level }));
    const levelInfo = calculateLevelInfo(user.points);
    const recentBadges = MOCK_BADGES.filter(badge => user.earnedBadgeIds.includes(badge.id)).slice(0, 4);

    const [newGoalText, setNewGoalText] = useState('');
    const [achievementDescription, setAchievementDescription] = useState('');
    const [achievementCategory, setAchievementCategory] = useState(AchievementCategory.INTERHOUSE);
    const [achievementWon, setAchievementWon] = useState(false);
    const [certificateFile, setCertificateFile] = useState<File | null>(null);

    const handleToggleGoal = (goalId: string) => {
        const updatedGoals = user.goals.map(goal => 
            goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
        );
        updateUser({ ...user, goals: updatedGoals });
    };

    const handleAddGoal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGoalText.trim()) return;
        const newGoal: Goal = {
            id: `goal_${Date.now()}`,
            text: newGoalText,
            completed: false,
        };
        const updatedUser = { ...user, goals: [...user.goals, newGoal] };
        updateUser(updatedUser);
        setNewGoalText('');
    };
    
    const handleLogAchievement = (e: React.FormEvent) => {
        e.preventDefault();
        if(!achievementDescription.trim() || !certificateFile) {
            alert("Please provide a description and upload a certificate.");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(certificateFile);
        reader.onload = () => {
            const categoryInfo = ACHIEVEMENT_POINT_MAP[achievementCategory];
            let points = categoryInfo.base;
            if (achievementWon) {
                points += Math.floor(points * 0.5);
            }

            const newAchievement: Achievement = {
                id: `ach_${Date.now()}`,
                description: achievementDescription,
                category: achievementCategory,
                points: points,
                date: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD
                status: 'pending',
                certificateUrl: reader.result as string,
            };

            // Points are NOT added yet. Just submitted for review.
            const updatedUser = {
                ...user,
                achievements: [newAchievement, ...user.achievements],
            };
            updateUser(updatedUser);

            // Reset form
            setAchievementDescription('');
            setAchievementCategory(AchievementCategory.INTERHOUSE);
            setAchievementWon(false);
            setCertificateFile(null);
            const fileInput = document.getElementById('ach-cert') as HTMLInputElement;
            if(fileInput) fileInput.value = '';
            alert("Achievement submitted for verification!");
        };
        reader.onerror = (error) => {
            console.error("Error reading file:", error);
            alert("Sorry, there was an error uploading your certificate.");
        }
    };
  
    return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {user.username.split(' ')[0]}!</h1>
      <p className="text-gray-600 mb-8">Here's your progress summary.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <h3 className="text-lg font-semibold text-indigo-200">Total Points</h3>
            <p className="text-4xl font-bold">{user.points.toLocaleString()}</p>
        </Card>
        <Card>
            <h3 className="text-lg font-semibold text-gray-500">Skills Mastered</h3>
            <p className="text-4xl font-bold">{MOCK_SKILLS.filter(s => s.level > 80).length}</p>
        </Card>
        <Card>
            <h3 className="text-lg font-semibold text-gray-500">Events Registered</h3>
            <p className="text-4xl font-bold">{MOCK_EVENTS.filter(e => e.registered).length}</p>
        </Card>
        <Card>
            <h3 className="text-lg font-semibold text-gray-500">Current Level</h3>
            <p className="text-4xl font-bold text-indigo-600">{levelInfo.level}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: `${levelInfo.progressPercentage}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 text-right mt-1">{levelInfo.currentLevelProgressXp.toLocaleString()} / {levelInfo.xpForNextLevel.toLocaleString()} XP</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card>
                <h3 className="text-xl font-bold mb-4">Skill Progress</h3>
                <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={skillData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false}/>
                        <Tooltip
                            contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
                            labelStyle={{ color: '#1F2937' }}
                            itemStyle={{ color: '#6366F1' }}
                        />
                        <Legend wrapperStyle={{fontSize: "14px"}}/>
                        <Bar dataKey="level" fill="#6366F1" name="Skill Level" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                </div>
            </Card>
        </div>
        <div className="flex flex-col gap-6">
            <Card>
                <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                    {upcomingEvents.map(event => (
                        <div key={event.id} className="bg-gray-100 p-4 rounded-lg">
                            <p className="font-semibold text-gray-800">{event.title}</p>
                            <p className="text-sm text-gray-600">{event.date}</p>
                        </div>
                    ))}
                    {upcomingEvents.length === 0 && <p className="text-gray-500">No upcoming events.</p>}
                </div>
            </Card>
            <Card>
                <h3 className="text-xl font-bold mb-4">Recent Badges</h3>
                <div className="grid grid-cols-4 gap-4">
                    {recentBadges.map(badge => (
                         <div key={badge.id} className="group relative flex flex-col items-center text-center">
                            <div className="w-16 h-16 p-3 bg-gray-100/50 rounded-full flex items-center justify-center text-indigo-500 text-3xl transition-all duration-300 group-hover:bg-indigo-500 group-hover:text-white">
                                {badge.icon}
                            </div>
                            <div className="absolute bottom-full mb-2 w-32 p-2 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                {badge.name}
                                <p className="text-gray-300 text-xs">{badge.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card>
              <h3 className="text-xl font-bold mb-4">My Goals</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {user.goals.length > 0 ? user.goals.map(goal => (
                      <div key={goal.id} className="flex items-center bg-gray-100 p-3 rounded-lg">
                          <input
                              type="checkbox"
                              checked={goal.completed}
                              onChange={() => handleToggleGoal(goal.id)}
                              className="w-5 h-5 rounded text-indigo-600 bg-gray-200 border-gray-300 focus:ring-indigo-500"
                          />
                          <span className={`ml-3 ${goal.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{goal.text}</span>
                      </div>
                  )) : <p className="text-gray-500">No goals set yet. Add one below!</p>}
              </div>
              <form onSubmit={handleAddGoal} className="mt-4 flex gap-2">
                  <input
                      type="text"
                      value={newGoalText}
                      onChange={(e) => setNewGoalText(e.target.value)}
                      placeholder="Add a new goal..."
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 placeholder-gray-500"
                  />
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                      Add
                  </button>
              </form>
          </Card>
          <Card>
              <h3 className="text-xl font-bold mb-4">Log an Achievement</h3>
              <form onSubmit={handleLogAchievement} className="space-y-4">
                  <div>
                      <label htmlFor="ach-desc" className="block mb-2 text-sm font-medium text-gray-700">Achievement</label>
                      <input
                          type="text"
                          id="ach-desc"
                          value={achievementDescription}
                          onChange={(e) => setAchievementDescription(e.target.value)}
                          placeholder="e.g., Won 1st place in Science Olympiad"
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 placeholder-gray-500"
                          required
                      />
                  </div>
                  <div>
                      <label htmlFor="ach-category" className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                      <select
                          id="ach-category"
                          value={achievementCategory}
                          onChange={(e) => setAchievementCategory(e.target.value as AchievementCategory)}
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      >
                          {Object.values(AchievementCategory).map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                          ))}
                      </select>
                  </div>
                   <div>
                        <label htmlFor="ach-cert" className="block mb-2 text-sm font-medium text-gray-700">Upload Certificate/Proof</label>
                        <input
                            type="file"
                            id="ach-cert"
                            accept="image/*,.pdf"
                            onChange={(e) => setCertificateFile(e.target.files ? e.target.files[0] : null)}
                            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                            required
                        />
                   </div>
                  <div className="flex items-center">
                      <input
                          id="ach-won"
                          type="checkbox"
                          checked={achievementWon}
                          onChange={(e) => setAchievementWon(e.target.checked)}
                          className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="ach-won" className="ml-2 text-sm font-medium text-gray-700">I won this event (+50% points)</label>
                  </div>
                  <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors duration-300">
                      Submit for Verification
                  </button>
              </form>
          </Card>
      </div>
      <div className="mt-8">
            <Card>
              <h3 className="text-xl font-bold mb-4">Recent Achievements</h3>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                    {user.achievements.map(ach => (
                      <div key={ach.id} className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-3 rounded-lg relative group">
                          <div className="col-span-8">
                              <p className="font-semibold text-gray-800">{ach.description}</p>
                              <p className="text-xs text-gray-600">{ach.category} - {ach.date}</p>
                          </div>
                          <div className="col-span-2">
                              <StatusBadge status={ach.status} />
                          </div>
                          <div className="col-span-2 text-right">
                              <span className={`font-bold text-lg ${ach.status === 'approved' ? 'text-green-500' : 'text-gray-400'}`}>+{ach.points} XP</span>
                          </div>
                          {ach.status === 'rejected' && ach.rejectionReason && (
                              <div className="absolute top-0 right-0 -mt-8 w-max p-2 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                                  Reason: {ach.rejectionReason}
                              </div>
                          )}
                      </div>
                    ))}
                    {user.achievements.length === 0 && <p className="text-gray-500 text-center">No achievements logged yet.</p>}
              </div>
          </Card>
      </div>
    </div>
  );
};

export default Dashboard;