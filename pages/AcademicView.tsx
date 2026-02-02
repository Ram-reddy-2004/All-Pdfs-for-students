
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DEPARTMENTS, MOCK_SUBJECTS, SEMESTERS } from '../constants';
import { Resource } from '../types';
import { BookOpen, ChevronRight } from 'lucide-react';

interface AcademicViewProps {
  resources: Resource[];
}

const AcademicView: React.FC<AcademicViewProps> = ({ resources }) => {
  const { yearId, deptId, semId } = useParams();
  const navigate = useNavigate();

  const currentYear = parseInt(yearId || '1');
  const availableSems = [currentYear * 2 - 1, currentYear * 2];

  // Logic to determine what to show
  const showDepts = !deptId;
  const showSems = deptId && !semId;
  const showSubjects = deptId && semId;

  const currentDept = DEPARTMENTS.find(d => d.id === deptId);
  const filteredSubjects = MOCK_SUBJECTS.filter(s => 
    s.department === deptId && s.semester === parseInt(semId || '0')
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Year {yearId} Academic Portal
        </h1>
        <p className="text-slate-500">
          {currentDept ? `${currentDept.fullName} branch resources` : 'Select your department to continue'}
        </p>
      </div>

      {showDepts && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map(dept => (
            <button
              key={dept.id}
              onClick={() => navigate(`/year/${yearId}/dept/${dept.id}`)}
              className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl hover:shadow-md hover:border-indigo-100 transition-all group"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mr-4 text-indigo-600 font-bold">
                  {dept.name.charAt(0)}
                </div>
                <span className="font-bold text-slate-800">{dept.fullName}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
            </button>
          ))}
        </div>
      )}

      {showSems && (
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-bold mb-8 text-slate-800">Select Semester</h2>
          <div className="flex gap-6">
            {availableSems.map(sem => (
              <button
                key={sem}
                onClick={() => navigate(`/year/${yearId}/dept/${deptId}/sem/${sem}`)}
                className="w-40 h-40 bg-white border-2 border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center transition-all hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-50 group"
              >
                <span className="text-4xl font-black text-slate-200 group-hover:text-indigo-100 mb-2 transition-colors">0{sem}</span>
                <span className="font-bold text-slate-700">Semester {sem}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {showSubjects && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Available Subjects</h2>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-widest">
              SEM {semId}
            </span>
          </div>
          
          {filteredSubjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSubjects.map(subject => (
                <button
                  key={subject.id}
                  onClick={() => navigate(`/subject/${subject.id}`)}
                  className="flex items-center p-6 bg-white border border-slate-100 rounded-2xl hover:shadow-lg hover:border-indigo-200 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-indigo-100">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{subject.name}</h3>
                    <p className="text-sm text-slate-400 font-medium">{subject.code}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">No subjects indexed for this semester yet.</p>
              <button className="mt-4 text-indigo-600 font-bold hover:underline">Request additions</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AcademicView;
