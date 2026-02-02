
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_SUBJECTS, MOCK_RESOURCES } from '../constants';
import { ResourceType, Resource } from '../types';
import { FileText, Download, Share2, Eye, Calendar, User, FileDigit, Microscope, BookMarked } from 'lucide-react';

interface SubjectDetailProps {
  resources: Resource[];
}

const TABS: { label: ResourceType; icon: any }[] = [
  { label: 'Notes', icon: FileText },
  { label: 'Question Bank', icon: FileDigit },
  { label: 'PYQ', icon: Calendar },
  { label: 'Lab Manual', icon: Microscope },
  { label: 'Reference', icon: BookMarked },
];

const SubjectDetail: React.FC<SubjectDetailProps> = ({ resources }) => {
  const { subjectId } = useParams();
  const [activeTab, setActiveTab] = useState<ResourceType>('Notes');

  const subject = MOCK_SUBJECTS.find(s => s.id === subjectId);
  const filteredResources = resources.filter(r => 
    r.subject === subject?.name && r.type === activeTab && r.status === 'approved'
  );

  if (!subject) return <div>Subject not found</div>;

  return (
    <div className="space-y-8">
      {/* Subject Header */}
      <div className="bg-indigo-600 rounded-[2rem] p-8 md:p-12 text-white shadow-xl shadow-indigo-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
              {subject.code}
            </span>
            <h1 className="text-3xl md:text-5xl font-black mb-4">{subject.name}</h1>
            <div className="flex flex-wrap gap-4 text-indigo-100 text-sm">
              <span className="flex items-center"><User className="w-4 h-4 mr-1 opacity-60" /> Core Module</span>
              <span className="flex items-center"><Download className="w-4 h-4 mr-1 opacity-60" /> 1.2k Downloads</span>
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 opacity-60" /> Updated Jan 2024</span>
            </div>
          </div>
          <button className="flex items-center justify-center px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all active:scale-95">
            <Share2 className="w-4 h-4 mr-2" />
            Share Subject
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all ${
                isActive 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'bg-white text-slate-500 border border-slate-100 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Resource List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredResources.length > 0 ? (
          filteredResources.map(res => (
            <div 
              key={res.id} 
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl hover:border-indigo-200 hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-indigo-50 transition-colors">
                  <FileText className="w-7 h-7 text-slate-300 group-hover:text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{res.title}</h3>
                  <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {res.author}</span>
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {res.uploadDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 text-slate-600 font-bold hover:text-indigo-600 transition-colors">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </button>
                <a 
                  href={res.fileUrl}
                  className="flex-1 sm:flex-none flex items-center justify-center px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-100 transition-all"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <FileText className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No {activeTab} Yet</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-8">
              Be the first one to help your peers by uploading high-quality {activeTab.toLowerCase()}.
            </p>
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
              Upload {activeTab}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectDetail;
