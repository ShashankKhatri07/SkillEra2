
import React from 'react';
import { MOCK_LEADERBOARD } from '../constants';
import { LeaderboardEntry } from '../types';
import { ICONS } from '../constants';

const Leaderboard: React.FC = () => {

    const getRankColor = (rank: number) => {
        if (rank === 1) return 'text-yellow-500';
        if (rank === 2) return 'text-gray-500';
        if (rank === 3) return 'text-yellow-700';
        return 'text-gray-500';
    };

    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Leaderboard</h1>
            <p className="text-gray-600 mb-8">See who's at the top of their game.</p>
            
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 font-semibold text-sm text-gray-500 uppercase tracking-wider">Rank</th>
                            <th className="p-4 font-semibold text-sm text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="p-4 font-semibold text-sm text-gray-500 uppercase tracking-wider hidden md:table-cell">Class</th>
                            <th className="p-4 font-semibold text-sm text-gray-500 uppercase tracking-wider text-right">Points</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {MOCK_LEADERBOARD.map((entry: LeaderboardEntry) => (
                            <tr key={entry.rank} className={`transition-colors duration-200 ${entry.name === 'Alex Doe' ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}>
                                <td className="p-4 font-bold text-lg">
                                    <span className={`flex items-center ${getRankColor(entry.rank)}`}>
                                        {entry.rank <= 3 && <span className="mr-2">{ICONS.crown}</span>}
                                        {entry.rank}
                                    </span>
                                </td>
                                <td className="p-4 font-medium text-gray-900">{entry.name}</td>
                                <td className="p-4 text-gray-500 hidden md:table-cell">{entry.class}</td>
                                <td className="p-4 text-right font-semibold text-indigo-600">{entry.points.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;