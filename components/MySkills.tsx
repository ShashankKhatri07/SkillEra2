
import React, { useState, useEffect } from 'react';
import { MOCK_SKILLS } from '../constants';
import { Skill } from '../types';

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
    const getCategoryColor = (category: string) => {
        switch(category.toLowerCase()) {
            case 'tech': return 'bg-blue-500 text-blue-100';
            case 'soft skills': return 'bg-green-500 text-green-100';
            case 'arts': return 'bg-purple-500 text-purple-100';
            default: return 'bg-gray-500 text-gray-100';
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 transform hover:-translate-y-1 transition-transform duration-200">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900">{skill.name}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(skill.category)}`}>{skill.category}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Mastery Level: {skill.level}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
            </div>
        </div>
    );
};

const MySkills: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSkills, setFilteredSkills] = useState<Skill[]>(MOCK_SKILLS);

    useEffect(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const newFilteredSkills = MOCK_SKILLS.filter(skill =>
            skill.name.toLowerCase().includes(lowercasedFilter) ||
            skill.category.toLowerCase().includes(lowercasedFilter)
        );
        setFilteredSkills(newFilteredSkills);
    }, [searchTerm]);

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">My Skills</h1>
                    <p className="text-gray-600 mt-1">Your personal skill development tracker.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                         <input
                            type="text"
                            placeholder="Search skills..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full md:w-64 p-2.5 pl-10 placeholder-gray-500"
                        />
                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 whitespace-nowrap">
                        Add New Skill
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.length > 0 ? (
                    filteredSkills.map((skill, index) => (
                        <SkillCard key={index} skill={skill} />
                    ))
                ) : (
                    <div className="md:col-span-2 lg:col-span-3 text-center py-12 bg-white rounded-xl border border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-700">No Skills Found</h3>
                        <p className="text-gray-500 mt-2">Your search for "{searchTerm}" did not match any skills.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MySkills;