import React from 'react';
import { User, UserRole, Skill, Event, LeaderboardEntry, Badge, Goal, Achievement, AchievementCategory } from './types';

export const ADMIN_EMAIL = 'admin@apsjodhpur.com';
export const ADMIN_PASSWORD = 'admin123';

export const ACHIEVEMENT_POINT_MAP: Record<AchievementCategory, { base: number }> = {
    [AchievementCategory.INTERHOUSE]: { base: 10 },
    [AchievementCategory.DISTRICT]: { base: 20 },
    [AchievementCategory.STATE]: { base: 40 },
    [AchievementCategory.NATIONAL]: { base: 80 },
    [AchievementCategory.INTERNATIONAL]: { base: 120 },
};

export const MOCK_GOALS: Goal[] = [
    { id: 'g1', text: 'Complete Python project', completed: true },
    { id: 'g2', text: 'Score 90% in next Math test', completed: false },
    { id: 'g3', text: 'Read 2 new books this month', completed: false },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
    { id: 'a1', description: 'Won 1st place in Inter-House Debate', category: AchievementCategory.INTERHOUSE, points: 15, date: '2024-05-20', status: 'approved' },
    { id: 'a2', description: 'Participated in District Science Fair', category: AchievementCategory.DISTRICT, points: 20, date: '2024-04-10', status: 'approved' },
    { id: 'a3', description: 'National Robotics Competition', category: AchievementCategory.NATIONAL, points: 80, date: '2024-06-11', status: 'pending', certificateUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' },
    { id: 'a4', description: 'State Level Swimming Championship', category: AchievementCategory.STATE, points: 40, date: '2024-03-22', status: 'rejected', rejectionReason: 'Certificate does not state the year.' },
];

export const MOCK_STUDENT_USER: User = {
  id: 'stu_123',
  username: 'Alex Doe',
  class: '10',
  section: 'A',
  admissionNumber: 'S12345',
  schoolEmail: 'S12345@apsjodhpur.com',
  phone: '9876543210',
  personalEmail: 'alex.doe@example.com',
  role: UserRole.STUDENT,
  points: 1250,
  earnedBadgeIds: ['py_novice', 'hack_participant', 'creative_mind', 'team_player'],
  goals: MOCK_GOALS,
  achievements: MOCK_ACHIEVEMENTS,
};

export const MOCK_ADMIN_USER: User = {
    id: 'adm_001',
    username: 'Dr. Evelyn Reed',
    class: 'N/A',
    section: 'N/A',
    admissionNumber: 'A00001',
    schoolEmail: 'admin@apsjodhpur.com',
    role: UserRole.ADMIN,
    points: 0,
    earnedBadgeIds: [],
    goals: [],
    achievements: [],
};


export const MOCK_SKILLS: Skill[] = [
  { name: 'Python Programming', level: 85, category: 'Tech' },
  { name: 'Public Speaking', level: 70, category: 'Soft Skills' },
  { name: 'React & TypeScript', level: 90, category: 'Tech' },
  { name: 'Creative Writing', level: 65, category: 'Arts' },
  { name: 'Data Analysis', level: 75, category: 'Tech' },
  { name: 'Leadership', level: 80, category: 'Soft Skills' },
];

export const MOCK_EVENTS: Event[] = [
  { id: 'evt_1', title: 'Annual Hackathon 2024', date: '2024-10-26', description: 'A 24-hour coding competition to build innovative solutions.', registered: true },
  { id: 'evt_2', title: 'Science Olympiad', date: '2024-11-15', description: 'Test your knowledge in various scientific disciplines.', registered: false },
  { id: 'evt_3', title: 'Debate Championship', date: '2024-11-22', description: 'Showcase your argumentation and public speaking skills.', registered: false },
  { id: 'evt_4', title: 'Art & Design Expo', date: '2024-12-05', description: 'Display your creative talents to the whole school.', registered: true },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Jessica Wong', points: 1580, class: '11B' },
  { rank: 2, name: 'Alex Doe', points: 1250, class: '10A' },
  { rank: 3, name: 'Michael Chen', points: 1190, class: '12C' },
  { rank: 4, name: 'Priya Sharma', points: 1150, class: '10A' },
  { rank: 5, name: 'David Lee', points: 1080, class: '11A' },
  { rank: 6, name: 'Sophia Rodriguez', points: 990, class: '9B' },
  { rank: 7, name: 'James Kim', points: 950, class: '12A' },
];


export const ICONS = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    skills: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    leaderboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    events: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    profile: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    badges: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    logout: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
    crown: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M11.05 3.001a1 1 0 00-2.1 0L6.402 10h7.196l-2.548-6.999z" /><path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M5 12a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1zM15 12a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1z" /></svg>,
    badgeCode: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    badgeTrophy: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>,
    badgePaint: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
    badgeTeam: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    verification: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};


export const MOCK_BADGES: Badge[] = [
    { id: 'py_novice', name: 'Python Novice', description: 'Awarded for completing the introductory Python course.', icon: ICONS.badgeCode },
    { id: 'hack_participant', name: 'Hackathon Participant', description: 'For participating in the Annual Hackathon.', icon: ICONS.badgeTrophy },
    { id: 'creative_mind', name: 'Creative Mind', description: 'For outstanding work in the Art & Design Expo.', icon: ICONS.badgePaint },
    { id: 'team_player', name: 'Team Player', description: 'Recognized for excellent collaboration in a group project.', icon: ICONS.badgeTeam },
];
