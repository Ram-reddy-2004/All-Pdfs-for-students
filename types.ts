
export type ResourceType = 'Notes' | 'Question Bank' | 'PYQ' | 'Lab Manual' | 'Reference';

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  year: number;
  department: string;
  semester: number;
  subject: string;
  author: string;
  uploadDate: string;
  downloadCount: number;
  fileUrl: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  semester: number;
  department: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  fullName: string;
}
