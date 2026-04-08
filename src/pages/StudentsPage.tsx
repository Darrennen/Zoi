import React, { useState } from 'react';
import { Plus, Edit3, ChevronRight, History, User, Trash2, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';
import { cn } from '@/src/lib/utils';

interface Student {
  id: number;
  name: string;
  age: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  strengths: string;
  weaknesses: string;
  trainingFocus: string;
  description: string;
  image?: string;
}

interface Session {
  id: number;
  studentName: string;
  title: string;
  date: string;
  duration: string;
  notes: string;
}

const inputClass = "w-full bg-surface-container-lowest border-none rounded-xl text-on-surface p-4 focus:ring-2 focus:ring-primary transition-all";
const labelClass = "font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant";

const StudentForm = ({ form, onChange }: { form: Omit<Student, 'id'>; onChange: (f: Omit<Student, 'id'>) => void }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2 col-span-2">
        <label className={labelClass}>Name</label>
        <input className={inputClass} type="text" placeholder="Student name" value={form.name} onChange={e => onChange({ ...form, name: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className={labelClass}>Age</label>
        <input className={inputClass} type="number" placeholder="Age" value={form.age} onChange={e => onChange({ ...form, age: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className={labelClass}>Level</label>
        <select className={inputClass} value={form.level} onChange={e => onChange({ ...form, level: e.target.value as Student['level'] })}>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className={labelClass}>Strengths</label>
        <input className={inputClass} type="text" placeholder="e.g. Net Accuracy" value={form.strengths} onChange={e => onChange({ ...form, strengths: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className={labelClass}>Weaknesses</label>
        <input className={inputClass} type="text" placeholder="e.g. Footwork" value={form.weaknesses} onChange={e => onChange({ ...form, weaknesses: e.target.value })} />
      </div>
      <div className="space-y-2 col-span-2">
        <label className={labelClass}>Training Focus</label>
        <input className={inputClass} type="text" placeholder="e.g. Smash Power" value={form.trainingFocus} onChange={e => onChange({ ...form, trainingFocus: e.target.value })} />
      </div>
      <div className="space-y-2 col-span-2">
        <label className={labelClass}>Description</label>
        <textarea className={cn(inputClass, "resize-none")} rows={2} placeholder="Notes about this student..." value={form.description} onChange={e => onChange({ ...form, description: e.target.value })} />
      </div>
    </div>
  </div>
);

const LEVEL_COLORS: Record<Student['level'], string> = {
  Beginner: 'bg-primary/10 text-primary',
  Intermediate: 'bg-primary/10 text-primary',
  Advanced: 'bg-tertiary-container/20 text-tertiary',
};

const emptyForm = (): Omit<Student, 'id'> => ({
  name: '',
  age: '',
  level: 'Beginner',
  strengths: '',
  weaknesses: '',
  trainingFocus: '',
  description: '',
});

export const StudentsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'Alex Chen',
      age: '19',
      level: 'Advanced',
      strengths: 'Vertical Leap, Net Accuracy',
      weaknesses: 'Footwork Under Pressure',
      trainingFocus: 'Stamina for championship play',
      description: 'Mastery of explosive backhand clears and cross-court netting. Currently refining stamina for championship play.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1QojyEg_xusaiSYgDz499sRa78vk58j1lr5RRNbegupRX-N1eSB701mURC477Nc_mRLH-z0UNs5L1MuGyqZEwKsrW-MDu1hp2g2fIfUoNJN3sMYFtKxnTirQZhJHo2i_eP1V8U5subwxGTU13J-0-iExpW5fteTWAWvK_xMPzrQoW1AbnCYinKI7wvA_BbB6OgfJzZi0A62RtbeDXzkiKw0JSCasvBQmTc9iS0iM3a5QALIEryYHZ3ZkttMyunVW6ebp-xxxVCDGc',
    },
    {
      id: 2,
      name: 'Sarah Jenkins',
      age: '24',
      level: 'Intermediate',
      strengths: 'Serve Consistency, Court Awareness',
      weaknesses: 'Smash Power',
      trainingFocus: 'Smash Power',
      description: 'Transitioning from recreational to competitive club level.',
    },
  ]);

  const [sessions, setSessions] = useState<Session[]>([
    { id: 1, studentName: 'Alex Chen', title: 'Alex Chen - Strategic Footwork', date: 'OCT 24', duration: '60 Mins', notes: 'Focus on lateral recovery and lunging depth. Showing 15% faster return time. Key drill: shadow footwork pattern A3.' },
    { id: 2, studentName: 'Sarah Jenkins', title: 'Sarah Jenkins - Service Consistency', date: 'OCT 22', duration: '45 Mins', notes: 'Worked on high serve placement. Accuracy is stabilizing at the baseline. Recommended 10 min daily solo drill.' },
  ]);

  // Enroll modal
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [enrollForm, setEnrollForm] = useState(emptyForm());

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editForm, setEditForm] = useState(emptyForm());

  // Delete confirm modal
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);

  // Session detail modal
  const [sessionModal, setSessionModal] = useState<Session | null>(null);

  // Profile modal
  const [profileStudent, setProfileStudent] = useState<Student | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEnroll = () => {
    if (!enrollForm.name.trim()) { toast('Please enter a student name', 'error'); return; }
    const newStudent: Student = { ...enrollForm, id: Date.now() };
    setStudents(prev => [...prev, newStudent]);
    setEnrollForm(emptyForm());
    setEnrollOpen(false);
    toast(`${newStudent.name} enrolled successfully!`);
  };

  const openEdit = (student: Student) => {
    setEditingStudent(student);
    setEditForm({
      name: student.name,
      age: student.age,
      level: student.level,
      strengths: student.strengths,
      weaknesses: student.weaknesses,
      trainingFocus: student.trainingFocus,
      description: student.description,
      image: student.image,
    });
    setEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editForm.name.trim()) { toast('Name cannot be empty', 'error'); return; }
    setStudents(prev => prev.map(s => s.id === editingStudent!.id ? { ...editForm, id: s.id } : s));
    setEditOpen(false);
    toast('Student updated successfully!');
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setStudents(prev => prev.filter(s => s.id !== deleteTarget.id));
    setSessions(prev => prev.filter(s => s.studentName !== deleteTarget.name));
    setDeleteTarget(null);
    toast(`${deleteTarget.name} removed from roster`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

      {/* Enroll Modal */}
      <Modal open={enrollOpen} onClose={() => setEnrollOpen(false)} title="Enroll New Student">
        <div className="space-y-5">
          <StudentForm form={enrollForm} onChange={setEnrollForm} />
          <button onClick={handleEnroll} className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl active:scale-95 transition-transform shadow-lg shadow-primary/20">
            Enroll Student
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title={`Edit — ${editingStudent?.name}`}>
        <div className="space-y-5">
          <StudentForm form={editForm} onChange={setEditForm} />
          <button onClick={handleSaveEdit} className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl active:scale-95 transition-transform shadow-lg shadow-primary/20">
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={deleteTarget !== null} onClose={() => setDeleteTarget(null)} title="Remove Student">
        <div className="space-y-6">
          <p className="text-on-surface-variant">Are you sure you want to remove <span className="text-on-surface font-bold">{deleteTarget?.name}</span> from the roster? This will also delete their session logs.</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)} className="flex-1 bg-surface-container-high py-3 rounded-xl font-bold border border-outline-variant/15 hover:bg-surface-bright transition-colors">
              Cancel
            </button>
            <button onClick={handleDelete} className="flex-1 bg-error text-white py-3 rounded-xl font-bold active:scale-95 transition-transform">
              Remove
            </button>
          </div>
        </div>
      </Modal>

      {/* Profile Modal */}
      <Modal open={profileStudent !== null} onClose={() => setProfileStudent(null)} title={`${profileStudent?.name} — Profile`}>
        {profileStudent && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {profileStudent.image ? (
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" src={profileStudent.image} alt={profileStudent.name} referrerPolicy="no-referrer" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-secondary-container/30 flex items-center justify-center shrink-0">
                  <User size={32} className="text-secondary" />
                </div>
              )}
              <div>
                <h4 className="font-headline font-bold text-2xl text-white">{profileStudent.name}</h4>
                <p className="text-on-surface-variant text-sm">Age: {profileStudent.age || '—'} · {profileStudent.level}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-xl">
                <span className="text-primary font-label text-[10px] uppercase tracking-widest font-bold block mb-2">Strengths</span>
                <p className="text-sm font-medium">{profileStudent.strengths || '—'}</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl">
                <span className="text-error font-label text-[10px] uppercase tracking-widest font-bold block mb-2">Weaknesses</span>
                <p className="text-sm font-medium">{profileStudent.weaknesses || '—'}</p>
              </div>
            </div>
            {profileStudent.description && (
              <div className="bg-surface-container-low p-4 rounded-xl">
                <span className="text-secondary font-label text-[10px] uppercase tracking-widest font-bold block mb-2">Notes</span>
                <p className="text-sm text-on-surface-variant leading-relaxed">{profileStudent.description}</p>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => { setProfileStudent(null); openEdit(profileStudent); }}
                className="flex-1 bg-primary/10 text-primary py-3 rounded-xl font-bold hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                <Edit3 size={16} /> Edit
              </button>
              <button onClick={() => { setProfileStudent(null); setDeleteTarget(profileStudent); }}
                className="flex-1 bg-error/10 text-error py-3 rounded-xl font-bold hover:bg-error/20 transition-colors flex items-center justify-center gap-2">
                <Trash2 size={16} /> Remove
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Session Detail Modal */}
      <Modal open={sessionModal !== null} onClose={() => setSessionModal(null)} title="Session Details">
        {sessionModal && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-center min-w-[60px]">
                <span className="block text-primary font-bold text-lg leading-tight">{sessionModal.date.split(' ')[0]}</span>
                <span className="block text-2xl font-black">{sessionModal.date.split(' ')[1]}</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">{sessionModal.title}</h4>
                <span className="text-xs bg-surface-container-highest px-2 py-1 rounded text-on-surface-variant uppercase tracking-tighter">{sessionModal.duration}</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl">
              <p className="text-sm text-on-surface-variant leading-relaxed">{sessionModal.notes}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Dashboard Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-secondary font-label text-[10px] uppercase tracking-widest font-bold bg-secondary-container/20 px-3 py-1 rounded-full">Roster Management</span>
          <h2 className="font-headline font-black text-5xl mt-4 tracking-tight">Badminton Students</h2>
          <p className="text-on-surface-variant mt-2 max-w-md">Orchestrate the development of your high-performance athletes through precision tracking and data-driven session notes.</p>
        </div>
        <button onClick={() => setEnrollOpen(true)}
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:translate-y-[-2px] transition-all active:scale-95 shadow-lg shadow-primary/20">
          <Plus size={20} />
          Enroll New Student
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
        <input
          type="text"
          placeholder="Search students by name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-surface-container border-none rounded-xl text-on-surface pl-12 pr-12 py-4 focus:ring-2 focus:ring-primary transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        <AnimatePresence>
          {filteredStudents.length === 0 && searchQuery ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-16 flex flex-col items-center gap-3 text-center text-on-surface-variant"
            >
              <Search size={36} className="opacity-30" />
              <p className="font-medium">No students found for "<span className="text-on-surface">{searchQuery}</span>"</p>
            </motion.div>
          ) : filteredStudents.map(student => (
            <motion.div key={student.id} layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="bg-surface-container rounded-xl overflow-hidden shadow-xl flex flex-col"
            >
              {/* Card top image or avatar */}
              <div className="h-40 relative overflow-hidden">
                {student.image ? (
                  <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    src={student.image} alt={student.name} referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                    <User size={48} className="text-on-surface-variant/40" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest", LEVEL_COLORS[student.level])}>
                    {student.level}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-headline font-extrabold text-xl text-white">{student.name}</h3>
                    {student.age && <span className="text-on-surface-variant text-xs">Age {student.age}</span>}
                  </div>
                  {student.description && (
                    <p className="text-on-surface-variant text-sm line-clamp-2">{student.description}</p>
                  )}
                </div>

                {(student.strengths || student.weaknesses) && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {student.strengths && (
                      <div className="bg-surface-container-low p-3 rounded-lg">
                        <span className="text-primary font-label text-[9px] uppercase tracking-widest font-bold block mb-1">Strengths</span>
                        <p className="text-xs font-medium line-clamp-2">{student.strengths}</p>
                      </div>
                    )}
                    {student.weaknesses && (
                      <div className="bg-surface-container-low p-3 rounded-lg">
                        <span className="text-error font-label text-[9px] uppercase tracking-widest font-bold block mb-1">Weaknesses</span>
                        <p className="text-xs font-medium line-clamp-2">{student.weaknesses}</p>
                      </div>
                    )}
                  </div>
                )}

                {student.trainingFocus && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-on-surface-variant">Training Focus</span>
                      <span className="font-bold">{student.trainingFocus}</span>
                    </div>
                    <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full w-[65%]" />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-2">
                  <button onClick={() => setProfileStudent(student)}
                    className="flex-1 bg-surface-container-high py-2.5 rounded-lg text-sm font-bold border border-outline-variant/15 hover:bg-surface-bright transition-colors">
                    View Profile
                  </button>
                  <button onClick={() => openEdit(student)}
                    className="px-3 bg-primary/10 text-primary py-2.5 rounded-lg hover:bg-primary/20 transition-colors">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => setDeleteTarget(student)}
                    className="px-3 bg-error/10 text-error py-2.5 rounded-lg hover:bg-error/20 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {students.length === 0 && !searchQuery && (
          <div className="col-span-full bg-surface-container-low rounded-xl p-16 flex flex-col items-center justify-center gap-4 border border-outline-variant/10">
            <User size={48} className="text-on-surface-variant/30" />
            <p className="text-on-surface-variant font-medium">No students enrolled yet.</p>
            <button onClick={() => setEnrollOpen(true)}
              className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 active:scale-95 transition-transform">
              <Plus size={18} /> Enroll First Student
            </button>
          </div>
        )}
      </div>

      {/* Session Log */}
      {sessions.length > 0 && (
        <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline font-black text-2xl uppercase tracking-tighter">Recent Session Log</h3>
            <button onClick={() => toast('Showing full history', 'info')}
              className="text-primary text-sm font-bold flex items-center gap-2">
              <History size={16} /> View All History
            </button>
          </div>
          <div className="space-y-4">
            <AnimatePresence>
              {sessions.map(session => (
                <motion.div key={session.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setSessionModal(session)}
                  className="bg-surface-container p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-center min-w-[60px]">
                      <span className="block text-primary font-bold text-lg leading-tight">{session.date.split(' ')[0]}</span>
                      <span className="block text-2xl font-black">{session.date.split(' ')[1]}</span>
                    </div>
                    <div className="h-10 w-[1px] bg-outline-variant/20 hidden md:block" />
                    <div>
                      <h4 className="font-bold text-white">{session.title}</h4>
                      <p className="text-on-surface-variant text-sm">{session.notes.substring(0, 70)}...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                    <span className="text-xs bg-surface-container-highest px-2 py-1 rounded text-on-surface-variant uppercase tracking-tighter">{session.duration}</span>
                    <ChevronRight size={20} className="text-on-surface-variant" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
};
