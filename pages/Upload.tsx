
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEPARTMENTS, YEARS, SEMESTERS, MOCK_SUBJECTS } from '../constants';
import { ResourceType, User, Resource } from '../types';
import { Upload as UploadIcon, CheckCircle2, AlertCircle, FileUp } from 'lucide-react';

interface UploadProps {
  onUpload: (res: Resource) => void;
  user: User;
}

const Upload: React.FC<UploadProps> = ({ onUpload, user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: 'Notes' as ResourceType,
    year: 1,
    department: 'cse',
    semester: 1,
    subject: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredSubjects = MOCK_SUBJECTS.filter(s => 
    s.department === formData.department && s.semester === formData.semester
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newResource: Resource = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        author: user.name,
        uploadDate: new Date().toISOString().split('T')[0],
        downloadCount: 0,
        fileUrl: '#',
        status: 'pending'
      };
      
      onUpload(newResource);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">Submission Received!</h2>
        <p className="text-slate-500 mb-10 text-lg leading-relaxed">
          Thank you for contributing to the community. Your file has been sent for admin review and will be live once approved.
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold"
          >
            Back to Home
          </button>
          <button 
            onClick={() => setIsSuccess(false)}
            className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50"
          >
            Upload More
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mr-4">
            <UploadIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Share Resource</h1>
            <p className="text-slate-500">Contribute your PDFs to help fellow scholars</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Document Title</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Unit 3: Graph Theory"
                className="w-full px-5 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Resource Type</label>
              <select 
                className="w-full px-5 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as ResourceType})}
              >
                <option>Notes</option>
                <option>Question Bank</option>
                <option>PYQ</option>
                <option>Lab Manual</option>
                <option>Reference</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Year</label>
              <div className="flex gap-2">
                {YEARS.map(y => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setFormData({...formData, year: y})}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${formData.year === y ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Department</label>
              <select 
                className="w-full px-5 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                value={formData.department}
                onChange={e => setFormData({...formData, department: e.target.value})}
              >
                {DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Semester</label>
              <select 
                className="w-full px-5 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                value={formData.semester}
                onChange={e => setFormData({...formData, semester: parseInt(e.target.value)})}
              >
                {SEMESTERS.map(s => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Subject</label>
              <select 
                required
                className="w-full px-5 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
              >
                <option value="">Select a Subject</option>
                {filteredSubjects.map(s => (
                  <option key={s.id} value={s.name}>{s.name} ({s.code})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700">Upload PDF</label>
            <div className="relative group">
              <input 
                required
                type="file" 
                accept=".pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center group-hover:border-indigo-400 group-hover:bg-indigo-50/30 transition-all">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FileUp className="w-8 h-8 text-slate-300 group-hover:text-indigo-600" />
                </div>
                <p className="text-slate-500 font-medium">Click to upload or drag and drop</p>
                <p className="text-slate-300 text-sm mt-1">PDF format only (Max 50MB)</p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Publish Resource'
              )}
            </button>
          </div>
          
          <div className="flex items-center space-x-2 p-4 bg-indigo-50 rounded-xl">
            <AlertCircle className="w-5 h-5 text-indigo-500" />
            <p className="text-xs text-indigo-700">
              Note: Every upload is reviewed by moderators to maintain academic integrity.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
