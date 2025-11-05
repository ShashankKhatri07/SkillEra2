import React, { useState, useCallback, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import MainLayout from './components/MainLayout';
import { User, UserRole, NewUser } from './types';
import { MOCK_STUDENT_USER, MOCK_ADMIN_USER, ADMIN_EMAIL, ADMIN_PASSWORD } from './constants';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    // On initial load, check for all users "database" in local storage
    const savedUsers = localStorage.getItem('skillera_allUsers');
    if (savedUsers) {
      setAllUsers(JSON.parse(savedUsers));
    } else {
      // If it doesn't exist, initialize with mock data
      const initialUsers = [MOCK_STUDENT_USER, MOCK_ADMIN_USER];
      localStorage.setItem('skillera_allUsers', JSON.stringify(initialUsers));
      setAllUsers(initialUsers);
    }

    // Check for a logged-in user session
    const savedSession = localStorage.getItem('skillera_currentUser');
    if (savedSession) {
      const user: User = JSON.parse(savedSession);
      setCurrentUser(user);
      setUserRole(user.role);
    }
  }, []);
  
  const updateUser = useCallback((updatedUser: User) => {
    // This function updates a user's data in the main list and saves it
    const updatedUsers = allUsers.map(u => u.id === updatedUser.id ? updatedUser : u);
    setAllUsers(updatedUsers);
    localStorage.setItem('skillera_allUsers', JSON.stringify(updatedUsers));

    // If the updated user is the one currently logged in, update their session state too
    if (currentUser?.id === updatedUser.id) {
      setCurrentUser(updatedUser);
      localStorage.setItem('skillera_currentUser', JSON.stringify(updatedUser));
    }
  }, [allUsers, currentUser]);

  const handleLogin = useCallback((admissionNumber: string) => {
    const user = allUsers.find(u => u.admissionNumber.toLowerCase() === admissionNumber.toLowerCase() && u.role === UserRole.STUDENT);
    
    if (user) {
      setCurrentUser(user);
      setUserRole(user.role);
      localStorage.setItem('skillera_currentUser', JSON.stringify(user));
    } else {
      alert("Invalid credentials. Please check your admission number or sign up.");
    }
  }, [allUsers]);

  const handleAdminLogin = useCallback((email:string, pass: string) => {
    if (email.toLowerCase() === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
        const adminUser = allUsers.find(u => u.role === UserRole.ADMIN) || MOCK_ADMIN_USER;
        setCurrentUser(adminUser);
        setUserRole(UserRole.ADMIN);
        localStorage.setItem('skillera_currentUser', JSON.stringify(adminUser));
    } else {
        alert("Invalid admin credentials.");
    }
  }, [allUsers]);

  const handleSignUp = useCallback((newUserData: NewUser) => {
    const newUser: User = {
      ...newUserData,
      id: `user_${Date.now()}`,
      role: UserRole.STUDENT,
      points: 0,
      earnedBadgeIds: [],
      goals: [],
      achievements: [],
    };
    const updatedUsers = [...allUsers, newUser];
    setAllUsers(updatedUsers);
    localStorage.setItem('skillera_allUsers', JSON.stringify(updatedUsers));
    
    setCurrentUser(newUser);
    setUserRole(UserRole.STUDENT);
    localStorage.setItem('skillera_currentUser', JSON.stringify(newUser));
  }, [allUsers]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('skillera_currentUser');
    setCurrentUser(null);
    setUserRole(null);
  }, []);

  const handleSelectRole = useCallback((role: UserRole) => {
    setUserRole(role);
  }, []);

  if (!userRole) {
    return <LandingPage onSelectRole={handleSelectRole} />;
  }

  if (!currentUser) {
    return <AuthPage role={userRole} onLogin={handleLogin} onSignUp={handleSignUp} onAdminLogin={handleAdminLogin} />;
  }

  return <MainLayout user={currentUser} onLogout={handleLogout} updateUser={updateUser} allUsers={allUsers} setAllUsers={setAllUsers} />;
};

export default App;
