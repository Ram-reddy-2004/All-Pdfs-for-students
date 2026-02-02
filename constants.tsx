
import React from 'react';
import { BookOpen, Cpu, Zap, Settings, Building2, Monitor, BrainCircuit } from 'lucide-react';
import { Department, Subject, Resource } from './types';

export const DEPARTMENTS: Department[] = [
  { id: 'cse', name: 'CSE', fullName: 'Computer Science & Engineering', icon: 'Monitor' },
  { id: 'ece', name: 'ECE', fullName: 'Electronics & Communication', icon: 'Cpu' },
  { id: 'eee', name: 'EEE', fullName: 'Electrical & Electronics', icon: 'Zap' },
  { id: 'mech', name: 'MECH', fullName: 'Mechanical Engineering', icon: 'Settings' },
  { id: 'civil', name: 'CIVIL', fullName: 'Civil Engineering', icon: 'Building2' },
  { id: 'it', name: 'IT', fullName: 'Information Technology', icon: 'BookOpen' },
  { id: 'aids', name: 'AI & DS', fullName: 'Artificial Intelligence & Data Science', icon: 'BrainCircuit' },
];

export const YEARS = [1, 2, 3, 4];
export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export const MOCK_SUBJECTS: Subject[] = [
  { id: 'ds1', name: 'Data Structures', code: 'CS301', semester: 3, department: 'cse' },
  { id: 'os1', name: 'Operating Systems', code: 'CS401', semester: 4, department: 'cse' },
  { id: 'dbms1', name: 'Database Management', code: 'CS501', semester: 5, department: 'cse' },
  { id: 'edc1', name: 'Electronic Devices', code: 'EC301', semester: 3, department: 'ece' },
  { id: 'na1', name: 'Network Analysis', code: 'EE301', semester: 3, department: 'eee' },
  { id: 'tm1', name: 'Thermodynamics', code: 'ME301', semester: 3, department: 'mech' },
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 'res1',
    title: 'Unit 1: Linked Lists and Arrays',
    type: 'Notes',
    year: 2,
    department: 'cse',
    semester: 3,
    subject: 'Data Structures',
    author: 'Prof. Sharma',
    uploadDate: '2023-10-15',
    downloadCount: 145,
    fileUrl: '#',
    status: 'approved'
  },
  {
    id: 'res2',
    title: 'DS Previous Year Papers (2020-2022)',
    type: 'PYQ',
    year: 2,
    department: 'cse',
    semester: 3,
    subject: 'Data Structures',
    author: 'Student Admin',
    uploadDate: '2023-11-02',
    downloadCount: 890,
    fileUrl: '#',
    status: 'approved'
  },
  {
    id: 'res3',
    title: 'OS Lab Manual (Batch 2024)',
    type: 'Lab Manual',
    year: 2,
    department: 'cse',
    semester: 4,
    subject: 'Operating Systems',
    author: 'Lab Coordinator',
    uploadDate: '2024-01-20',
    downloadCount: 320,
    fileUrl: '#',
    status: 'pending'
  }
];
