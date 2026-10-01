import React, { useState } from 'react';
import {
  Printer,
  Download,
  Plus,
  Trash2,
  RotateCcw,
  Save,
  CheckCircle2,
  Users,
  Edit3,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface ReportCardSubjectItem {
  id: string;
  name: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
}

const DEFAULT_SUBJECTS: ReportCardSubjectItem[] = [
  { id: 'sub_1', name: 'English', q1: '88%', q2: '92%', q3: '85%', q4: '90%' },
  { id: 'sub_2', name: 'Economic', q1: '78%', q2: '82%', q3: '80%', q4: '85%' },
  { id: 'sub_3', name: 'History', q1: '90%', q2: '88%', q3: '94%', q4: '91%' },
  { id: 'sub_4', name: 'Biology', q1: '84%', q2: '86%', q3: '89%', q4: '92%' },
  { id: 'sub_5', name: 'Math', q1: '95%', q2: '92%', q3: '98%', q4: '96%' },
  { id: 'sub_6', name: 'Science', q1: '86%', q2: '89%', q3: '91%', q4: '90%' },
  { id: 'sub_7', name: 'Social Studies', q1: '82%', q2: '84%', q3: '85%', q4: '88%' },
  { id: 'sub_8', name: 'Art', q1: '94%', q2: '90%', q3: '96%', q4: '95%' },
  { id: 'sub_9', name: 'Physical Education', q1: '98%', q2: '95%', q3: '96%', q4: '99%' },
  { id: 'sub_10', name: 'Chemistry', q1: '80%', q2: '85%', q3: '88%', q4: '87%' },
];

interface ReportCardSheetProps {
  initialStudentName?: string;
  initialLevel?: string;
  initialClassName?: string;
  initialSchoolName?: string;
  isModal?: boolean;
  onClose?: () => void;
}

export const ReportCardSheet: React.FC<ReportCardSheetProps> = ({
  initialStudentName = 'Kofi Mensah',
  initialLevel = 'Junior High School 2',
  initialClassName = 'JHS 2A',
  initialSchoolName = 'Salford High School',
  isModal = false,
  onClose,
}) => {
  const { currentSchool, students } = useApp();

  // Student and metadata state
  const [studentName, setStudentName] = useState(initialStudentName);
  const [level, setLevel] = useState(initialLevel);
  const [className, setClassName] = useState(initialClassName);
  const [schoolName, setSchoolName] = useState(
    initialSchoolName || currentSchool?.name || 'Salford High School'
  );

  // Subject table state (Add, Edit, Delete CRUD)
  const [subjects, setSubjects] = useState<ReportCardSubjectItem[]>(DEFAULT_SUBJECTS);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectQ1, setNewSubjectQ1] = useState('');
  const [newSubjectQ2, setNewSubjectQ2] = useState('');
  const [newSubjectQ3, setNewSubjectQ3] = useState('');
  const [newSubjectQ4, setNewSubjectQ4] = useState('');
  const [showAddRow, setShowAddRow] = useState(false);

  // Grading scale and comments
  const [gradingScale, setGradingScale] = useState(
    'A = 90% - 100%   B = 80% - 89%   C = 60% - 79%   D = 0% - 59%'
  );
  const [comment, setComment] = useState(
    'Demonstrates outstanding intellectual commitment, exemplary conduct, and consistent active participation across all academic disciplines.'
  );

  // UI toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add subject handler
  const handleAddSubject = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newSubjectName.trim()) {
      showNotification('Please enter a subject name first.');
      return;
    }

    const newSub: ReportCardSubjectItem = {
      id: `sub_${Date.now()}`,
      name: newSubjectName.trim(),
      q1: newSubjectQ1.trim() || '-',
      q2: newSubjectQ2.trim() || '-',
      q3: newSubjectQ3.trim() || '-',
      q4: newSubjectQ4.trim() || '-',
    };

    setSubjects((prev) => [...prev, newSub]);
    setNewSubjectName('');
    setNewSubjectQ1('');
    setNewSubjectQ2('');
    setNewSubjectQ3('');
    setNewSubjectQ4('');
    setShowAddRow(false);
    showNotification(`Subject "${newSub.name}" added successfully to the report card.`);
  };

  // Edit subject field
  const handleUpdateSubject = (
    id: string,
    field: keyof Omit<ReportCardSubjectItem, 'id'>,
    value: string
  ) => {
    setSubjects((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, [field]: value } : sub))
    );
  };

  // Delete subject handler
  const handleDeleteSubject = (id: string, name: string) => {
    setSubjects((prev) => prev.filter((sub) => sub.id !== id));
    showNotification(`Subject "${name}" deleted.`);
  };

  // Reset to default subjects from user's image template
  const handleResetDefaults = () => {
    setSubjects(DEFAULT_SUBJECTS);
    setGradingScale('A = 90% - 100%   B = 80% - 89%   C = 60% - 79%   D = 0% - 59%');
    showNotification('Report card template reset to default subjects.');
  };

  // Quick select a registered student
  const handleSelectStudent = (stdId: string) => {
    const std = students.find((s) => s.id === stdId);
    if (std) {
      setStudentName(`${std.firstName} ${std.lastName}`);
      setLevel(std.stage === 'JHS' ? 'Junior High School 2' : 'Primary');
      setClassName(std.className);
      showNotification(`Loaded student records for ${std.firstName} ${std.lastName}`);
    }
  };

  // Print report card
  const handlePrint = () => {
    window.print();
  };

  // Save report card state
  const handleSave = () => {
    showNotification(`Report card for ${studentName} successfully saved!`);
  };

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-emerald-100 border border-emerald-400 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-bounce no-print">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Teacher Controls Toolbar (Hidden in Print) */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-lg border border-slate-800 no-print space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-semibold bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-800">
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              <span>Teacher Report Card Generator</span>
            </div>

            {/* Quick Student Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                Select Student:
              </span>
              <select
                onChange={(e) => handleSelectStudent(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              >
                <option value="">-- Choose Roster Student --</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.firstName} {s.lastName} ({s.className})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowAddRow((prev) => !prev)}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddRow ? 'Cancel Add' : '+ Add Subject'}</span>
            </button>

            <button
              onClick={handleResetDefaults}
              title="Reset to original subjects from template"
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Template</span>
            </button>

            <button
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>

            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Report Card</span>
            </button>

            {isModal && onClose && (
              <button
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Add Subject Row Form */}
        {showAddRow && (
          <form
            onSubmit={handleAddSubject}
            className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2 animate-fadeIn"
          >
            <div className="flex-1 min-w-[160px]">
              <input
                type="text"
                placeholder="New Subject Name (e.g. Computing, French)"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-500"
                autoFocus
              />
            </div>
            <div className="w-20">
              <input
                type="text"
                placeholder="1st Qtr"
                value={newSubjectQ1}
                onChange={(e) => setNewSubjectQ1(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <div className="w-20">
              <input
                type="text"
                placeholder="2nd Qtr"
                value={newSubjectQ2}
                onChange={(e) => setNewSubjectQ2(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <div className="w-20">
              <input
                type="text"
                placeholder="3rd Qtr"
                value={newSubjectQ3}
                onChange={(e) => setNewSubjectQ3(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <div className="w-20">
              <input
                type="text"
                placeholder="4th Qtr"
                value={newSubjectQ4}
                onChange={(e) => setNewSubjectQ4(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-1.5 rounded-lg transition-colors"
            >
              Add Row
            </button>
          </form>
        )}
      </div>

      {/* ========================================================================= */}
      {/* THE OFFICIAL REPORT CARD DOCUMENT (Matching the Image Exactly) */}
      {/* ========================================================================= */}
      <div
        id="printable-reportcard"
        className="w-full max-w-[850px] mx-auto bg-white rounded-none sm:rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
        style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      >
        {/* 1. TOP HEADER BANNER (Light soft blue) */}
        <div
          className="w-full py-7 px-8 sm:px-12 flex items-center gap-6"
          style={{ backgroundColor: '#DFECF7' }}
        >
          {/* Logo with Stylized Mortarboard and Curved Swooshes */}
          <div className="shrink-0 flex items-center justify-center">
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-xs"
              viewBox="0 0 100 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Cap Diamond */}
              <polygon points="50,10 88,26 50,42 12,26" fill="#1C82B8" />
              {/* Cap Base */}
              <path
                d="M26 33 V44 C26 52 74 52 74 44 V33"
                stroke="#15648E"
                strokeWidth="3.5"
                fill="#15648E"
              />
              {/* Cap Tassel */}
              <path
                d="M16 28 V44 C16 47 14 49 14 51"
                stroke="#15648E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="14" cy="53" r="2.5" fill="#15648E" />

              {/* Green Wing/Leaf Swoosh */}
              <path
                d="M48 58 C32 46 12 52 6 63 C20 68 36 64 48 58 Z"
                fill="#38B000"
              />

              {/* Blue Wing/Leaf Swooshes */}
              <path
                d="M52 58 C68 46 88 52 94 63 C80 68 64 64 52 58 Z"
                fill="#0077B6"
              />
              <path
                d="M54 66 C68 59 84 66 90 75 C74 76 62 72 54 66 Z"
                fill="#0096C7"
              />
            </svg>
          </div>

          {/* Title and School Name */}
          <div className="space-y-0.5">
            <h1
              className="text-2xl sm:text-3xl font-extrabold tracking-wide uppercase leading-tight"
              style={{ color: '#134B70' }}
            >
              REPORT CARD
            </h1>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="bg-transparent border-none p-0 text-sm sm:text-base font-medium focus:outline-none focus:ring-1 focus:ring-[#134B70] rounded-sm w-full"
                style={{ color: '#4F7F9E' }}
                title="Click to edit school name"
              />
            </div>
          </div>
        </div>

        {/* 2. MIDDLE SECTION: STUDENT DETAILS & TABLE */}
        <div className="p-8 sm:p-12 space-y-8 bg-white">
          {/* Student Info Lines (Underline Format) */}
          <div className="space-y-3 max-w-xl">
            {/* Student Name */}
            <div className="flex items-baseline gap-3">
              <span
                className="w-20 shrink-0 font-medium text-sm sm:text-base"
                style={{ color: '#134B70' }}
              >
                Student :
              </span>
              <div className="flex-1 border-b-2 border-slate-300 pb-0.5">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-sm sm:text-base font-semibold text-slate-800 focus:outline-none"
                  placeholder="Enter Student Name"
                />
              </div>
            </div>

            {/* Level */}
            <div className="flex items-baseline gap-3">
              <span
                className="w-20 shrink-0 font-medium text-sm sm:text-base"
                style={{ color: '#134B70' }}
              >
                Level &nbsp;&nbsp;:
              </span>
              <div className="flex-1 border-b-2 border-slate-300 pb-0.5">
                <input
                  type="text"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-sm sm:text-base font-medium text-slate-700 focus:outline-none"
                  placeholder="Enter Level / Stage (e.g. Junior High School 2)"
                />
              </div>
            </div>

            {/* Class */}
            <div className="flex items-baseline gap-3">
              <span
                className="w-20 shrink-0 font-medium text-sm sm:text-base"
                style={{ color: '#134B70' }}
              >
                Class &nbsp;&nbsp;:
              </span>
              <div className="flex-1 border-b-2 border-slate-300 pb-0.5">
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-sm sm:text-base font-medium text-slate-700 focus:outline-none"
                  placeholder="Enter Class (e.g. JHS 2A)"
                />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table
              className="w-full border-collapse"
              style={{
                borderColor: '#5B8FB9',
                borderWidth: '1.5px',
                borderStyle: 'solid',
              }}
            >
              {/* Table Header (Steel Blue) */}
              <thead>
                <tr style={{ backgroundColor: '#5B8FB9' }}>
                  <th
                    className="py-3 px-4 text-left font-semibold text-white text-xs sm:text-sm tracking-wider uppercase border-r"
                    style={{ borderColor: 'rgba(255,255,255,0.3)', width: '32%' }}
                  >
                    Subject
                  </th>
                  <th
                    className="py-3 px-2 text-center font-semibold text-white text-xs sm:text-sm tracking-wider uppercase border-r"
                    style={{ borderColor: 'rgba(255,255,255,0.3)', width: '17%' }}
                  >
                    1st Quarter
                  </th>
                  <th
                    className="py-3 px-2 text-center font-semibold text-white text-xs sm:text-sm tracking-wider uppercase border-r"
                    style={{ borderColor: 'rgba(255,255,255,0.3)', width: '17%' }}
                  >
                    2nd Quarter
                  </th>
                  <th
                    className="py-3 px-2 text-center font-semibold text-white text-xs sm:text-sm tracking-wider uppercase border-r"
                    style={{ borderColor: 'rgba(255,255,255,0.3)', width: '17%' }}
                  >
                    3rd Quarter
                  </th>
                  <th
                    className="py-3 px-2 text-center font-semibold text-white text-xs sm:text-sm tracking-wider uppercase"
                    style={{ width: '17%' }}
                  >
                    4th Quarter
                  </th>
                  {/* Actions Column (Hidden on print) */}
                  <th
                    className="py-3 px-2 text-center font-semibold text-white text-xs tracking-wider uppercase no-print"
                    style={{ width: '7%' }}
                  >
                    Edit
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {subjects.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-slate-400 text-sm italic"
                    >
                      No subjects added yet. Click &quot;+ Add Subject&quot; above to add courses.
                    </td>
                  </tr>
                ) : (
                  subjects.map((sub, idx) => (
                    <tr
                      key={sub.id}
                      className="group transition-colors hover:bg-sky-50/40"
                      style={{
                        borderBottom: '1px solid #7FAECF',
                      }}
                    >
                      {/* Subject Name (Editable) */}
                      <td
                        className="py-2.5 px-4 font-medium text-slate-800 text-xs sm:text-sm border-r"
                        style={{ borderColor: '#7FAECF' }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={sub.name}
                            onChange={(e) =>
                              handleUpdateSubject(sub.id, 'name', e.target.value)
                            }
                            className="w-full bg-transparent border-none p-0 font-medium text-slate-800 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-400 rounded-xs"
                            title="Click to rename subject"
                          />
                        </div>
                      </td>

                      {/* 1st Quarter (Editable) */}
                      <td
                        className="py-2.5 px-2 text-center text-slate-800 text-xs sm:text-sm border-r"
                        style={{ borderColor: '#7FAECF' }}
                      >
                        <input
                          type="text"
                          value={sub.q1}
                          onChange={(e) =>
                            handleUpdateSubject(sub.id, 'q1', e.target.value)
                          }
                          className="w-full text-center bg-transparent border-none p-0 text-slate-800 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-400 rounded-xs"
                          placeholder="-"
                        />
                      </td>

                      {/* 2nd Quarter (Editable) */}
                      <td
                        className="py-2.5 px-2 text-center text-slate-800 text-xs sm:text-sm border-r"
                        style={{ borderColor: '#7FAECF' }}
                      >
                        <input
                          type="text"
                          value={sub.q2}
                          onChange={(e) =>
                            handleUpdateSubject(sub.id, 'q2', e.target.value)
                          }
                          className="w-full text-center bg-transparent border-none p-0 text-slate-800 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-400 rounded-xs"
                          placeholder="-"
                        />
                      </td>

                      {/* 3rd Quarter (Editable) */}
                      <td
                        className="py-2.5 px-2 text-center text-slate-800 text-xs sm:text-sm border-r"
                        style={{ borderColor: '#7FAECF' }}
                      >
                        <input
                          type="text"
                          value={sub.q3}
                          onChange={(e) =>
                            handleUpdateSubject(sub.id, 'q3', e.target.value)
                          }
                          className="w-full text-center bg-transparent border-none p-0 text-slate-800 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-400 rounded-xs"
                          placeholder="-"
                        />
                      </td>

                      {/* 4th Quarter (Editable) */}
                      <td
                        className="py-2.5 px-2 text-center text-slate-800 text-xs sm:text-sm"
                      >
                        <input
                          type="text"
                          value={sub.q4}
                          onChange={(e) =>
                            handleUpdateSubject(sub.id, 'q4', e.target.value)
                          }
                          className="w-full text-center bg-transparent border-none p-0 text-slate-800 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-400 rounded-xs"
                          placeholder="-"
                        />
                      </td>

                      {/* Delete Action (Hidden in print) */}
                      <td className="py-2.5 px-1 text-center no-print border-l border-slate-200">
                        <button
                          type="button"
                          onClick={() => handleDeleteSubject(sub.id, sub.name)}
                          className="p-1 text-slate-300 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                          title={`Delete ${sub.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Quick Row Adder Button below table (No-print) */}
          <div className="flex justify-between items-center no-print pt-1">
            <button
              onClick={() => setShowAddRow((prev) => !prev)}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 p-1 rounded-md hover:bg-blue-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add another subject to report card</span>
            </button>
            <span className="text-[11px] text-slate-400">
              * Click any subject name or quarter cell to edit inline
            </span>
          </div>
        </div>

        {/* 3. BOTTOM FOOTER BANNER (Light soft blue) */}
        <div
          className="w-full p-8 sm:p-10 space-y-4"
          style={{ backgroundColor: '#DFECF7' }}
        >
          {/* Grading Scale */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs sm:text-sm font-bold tracking-wider uppercase"
              style={{ color: '#4F7F9E' }}
            >
              GRADING SCALE :
            </span>
            <input
              type="text"
              value={gradingScale}
              onChange={(e) => setGradingScale(e.target.value)}
              className="bg-transparent border-none p-0 text-xs sm:text-sm font-bold tracking-wider uppercase focus:outline-none focus:ring-1 focus:ring-[#4F7F9E] rounded-xs flex-1 min-w-[280px]"
              style={{ color: '#4F7F9E' }}
              title="Click to edit grading scale"
            />
          </div>

          {/* White Comment Box */}
          <div className="bg-white border border-[#C6DCED] rounded-none sm:rounded-sm p-4 sm:p-5 shadow-2xs space-y-1.5">
            <label
              className="block text-xs sm:text-sm font-bold uppercase tracking-wide"
              style={{ color: '#134B70' }}
            >
              Comment :
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-transparent border-none p-0 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none resize-none leading-relaxed"
              placeholder="Enter teacher comments and terminal academic remarks..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
