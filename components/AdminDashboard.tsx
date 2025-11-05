
import React from 'react';
import { User, Achievement, UserRole } from '../types';

interface AdminDashboardProps {
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`bg-white p-6 rounded-xl border border-gray-200 ${className}`}>
        {children}
    </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ allUsers, setAllUsers }) => {
    
    // Find all achievements across all students that are pending
    const pendingAchievements = allUsers.flatMap(user => 
        user.role === UserRole.STUDENT 
        ? user.achievements
            .filter(ach => ach.status === 'pending')
            .map(ach => ({ ...ach, studentId: user.id, studentName: user.username }))
        : []
    );

    const handleApprove = (studentId: string, achievementId: string) => {
        const updatedUsers = allUsers.map(user => {
            if (user.id === studentId) {
                let pointsToAdd = 0;
                const updatedAchievements = user.achievements.map(ach => {
                    if (ach.id === achievementId) {
                        pointsToAdd = ach.points;
                        return { ...ach, status: 'approved' as const };
                    }
                    return ach;
                });
                return { ...user, achievements: updatedAchievements, points: user.points + pointsToAdd };
            }
            return user;
        });
        setAllUsers(updatedUsers);
    };

    const handleReject = (studentId: string, achievementId: string) => {
        const reason = prompt("Please provide a reason for rejection:");
        if (reason === null) return; // User cancelled the prompt

        const updatedUsers = allUsers.map(user => {
            if (user.id === studentId) {
                const updatedAchievements = user.achievements.map(ach => {
                    if (ach.id === achievementId) {
                        return { ...ach, status: 'rejected' as const, rejectionReason: reason || 'No reason provided.' };
                    }
                    return ach;
                });
                return { ...user, achievements: updatedAchievements };
            }
            return user;
        });
        setAllUsers(updatedUsers);
    };

    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 mb-8">Review and verify student achievements.</p>

            <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Verifications ({pendingAchievements.length})</h2>
                {pendingAchievements.length > 0 ? (
                    <div className="space-y-4">
                        {pendingAchievements.map(ach => (
                            <div key={ach.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                                <div className="md:col-span-3">
                                    <p className="font-bold text-gray-800">{ach.studentName}</p>
                                    <p className="text-sm text-gray-600">{ach.description} ({ach.category})</p>
                                    <p className="text-xs text-gray-500">Points: {ach.points} | Submitted: {ach.date}</p>
                                </div>
                                <div className="md:col-span-2 flex flex-wrap gap-2 justify-start md:justify-end">
                                    {ach.certificateUrl && (
                                        <a href={ach.certificateUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors duration-300">
                                            View Certificate
                                        </a>
                                    )}
                                    <button onClick={() => handleApprove(ach.studentId, ach.id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors duration-300">
                                        Approve
                                    </button>
                                     <button onClick={() => handleReject(ach.studentId, ach.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors duration-300">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8">No pending verifications at this time.</p>
                )}
            </Card>
        </div>
    );
};

export default AdminDashboard;