import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
}

const ProfileField: React.FC<{ label: string; value: string; isEditing: boolean; type?: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; isEditable?: boolean }> = ({ label, value, isEditing, type = 'text', onChange, isEditable = true }) => (
    <div className="grid grid-cols-3 gap-4 items-center">
        <label className="text-gray-500 font-medium">{label}</label>
        {(isEditing && isEditable) ? (
            <input 
                type={type}
                defaultValue={value}
                onChange={onChange}
                className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
            />
        ) : (
            <p className="col-span-2 text-gray-900">{value || 'N/A'}</p>
        )}
    </div>
);


const Profile: React.FC<ProfileProps> = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleInputChange = (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: e.target.value as any });
    };

    const handleSave = () => {
        // In a real app, you would send this data to a server and likely update the parent state
        console.log("Saving data:", formData);
        localStorage.setItem('skillera_currentUser', JSON.stringify(formData));
        setIsEditing(false);
        // Note: To see changes reflected everywhere, the setCurrentUser from App.tsx would be needed here.
        // For now, we save to local storage and the profile will reflect it.
    };

    const handleCancel = () => {
        setFormData(user);
        setIsEditing(false);
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-600 mt-1">View and manage your personal information.</p>
                </div>
                {isEditing ? (
                    <div className="flex gap-4">
                        <button onClick={handleCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                            Cancel
                        </button>
                        <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 max-w-2xl mx-auto">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white mb-4">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
                    <p className="text-gray-600 capitalize">{user.role}</p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Personal Information</h3>
                    <ProfileField label="Username" value={formData.username} isEditing={isEditing} onChange={handleInputChange('username')} />
                    <ProfileField label="Phone Number" value={formData.phone || ''} isEditing={isEditing} type="tel" onChange={handleInputChange('phone')} />
                    <ProfileField label="Personal Email" value={formData.personalEmail || ''} isEditing={isEditing} type="email" onChange={handleInputChange('personalEmail')} />
                    
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 pt-4">School Details</h3>
                    <ProfileField label="Admission Number" value={formData.admissionNumber} isEditing={false} onChange={() => {}} isEditable={false} />
                    <ProfileField label="School Email" value={formData.schoolEmail} isEditing={false} onChange={() => {}} isEditable={false} />
                    <ProfileField label="Class" value={formData.class} isEditing={isEditing} onChange={handleInputChange('class')} />
                    <ProfileField label="Section" value={formData.section} isEditing={isEditing} onChange={handleInputChange('section')} />
                    
                    <div className="grid grid-cols-3 gap-4 items-center pt-4 border-t border-gray-200 mt-4">
                         <label className="text-gray-500 font-medium">Total Points</label>
                         <p className="col-span-2 text-indigo-600 font-semibold text-lg">{user.points.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;