import React from 'react';

export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface Goal {
    id: string;
    text: string;
    completed: boolean;
}

export enum AchievementCategory {
    INTERHOUSE = 'Inter-House',
    DISTRICT = 'District',
    STATE = 'State',
    NATIONAL = 'National',
    INTERNATIONAL = 'International',
}

export interface Achievement {
    id: string;
    description: string;
    category: AchievementCategory;
    points: number;
    date: string;
    certificateUrl?: string; // Base64 for demo
    status: 'pending' | 'approved' | 'rejected';
    rejectionReason?: string;
}

export interface User {
  id: string;
  username: string;
  class: string;
  section: string;
  admissionNumber: string;
  phone?: string;
  schoolEmail: string;
  personalEmail?: string;
  role: UserRole;
  points: number;
  earnedBadgeIds: string[];
  goals: Goal[];
  achievements: Achievement[];
}

export interface NewUser {
    username: string;
    class: string;
    section:string;
    admissionNumber: string;
    phone?: string;
    schoolEmail: string;
    personalEmail?: string;
    password?: string;
}

export interface Skill {
  name: string;
  level: number; // A percentage from 0 to 100
  category: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  registered: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  class: string;
}
