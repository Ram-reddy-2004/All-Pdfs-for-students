
import React from 'react';
import { Resource } from '../types';
import { Check, X, AlertCircle, FileText, Download, User, ExternalLink } from 'lucide-react';

interface AdminPanelProps {
  resources: Resource[];
  onUpdateStatus: (id: string, status: 'approved' | 'rejected') => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ resources, onUpdateStatus }) => {
  const pending = resources.filter(r => r.status === 'pending');
  const history = resources.filter(r => r.status !== 'pending');

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Admin Command Center</h1>
          <p className="text-slate-500">Moderating academic contributions from students</p>
        </div>
        <div className="flex space-x-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center min-w-[120px]">
            <span className="block text-2xl font-black text-indigo-600">{pending.length}</span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Pending</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center min-w-[120px]">
            <span className="block text-2xl font-black text-slate-900">{resources.reduce((acc, r) => acc + r.downloadCount, 0)}</span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Total Downloads</span>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
          Awaiting Review
        </h2>
        
        {pending.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {pending.map(res => (
              <div key={res.id} className="bg-white border-2 border-slate-100 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-200 transition-all">
                <div className="flex items-start">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                    <FileText className="w-7 h-7 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{res.title}</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-500">
                      <p><span className="font-bold text-slate-400">Dept:</span> {res.department.toUpperCase()}</p>
                      <p><span className="font-bold text-slate-400">Subject:</span> {res.subject}</p>
                      <p><span className="font-bold text-slate-400">Contributor:</span> {res.author}</p>
                      <p><span className="font-bold text-slate-400">Type:</span> {res.type}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="p-3 text-slate-400 hover:text-indigo-600 transition-colors" title="View Source">
                    <ExternalLink className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => onUpdateStatus(res.id, 'rejected')}
                    className="p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-all flex items-center space-x-2 font-bold"
                  >
                    <X className="w-5 h-5" />
                    <span>Reject</span>
                  </button>
                  <button 
                    onClick={() => onUpdateStatus(res.id, 'approved')}
                    className="p-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all flex items-center space-x-2 font-bold"
                  >
                    <Check className="w-5 h-5" />
                    <span>Approve</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
            <Check className="w-12 h-12 text-slate-100 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">No pending submissions. All caught up!</p>
          </div>
        )}
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Document</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Downloads</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {history.map(res => (
                <tr key={res.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mr-3">
                        <FileText className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{res.title}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{res.subject}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      res.status === 'approved' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-slate-500 text-sm">
                      <Download className="w-3 h-3 mr-1" />
                      {res.downloadCount}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
