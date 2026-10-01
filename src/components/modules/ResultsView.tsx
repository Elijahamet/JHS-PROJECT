import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Save,
  CheckCircle2,
  Award,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const ResultsView: React.FC = () => {
  const {
    classes,
    assessments,
    updateAssessment,
    setIsReportCardModalOpen,
  } = useApp();

  const [selectedClassId, setSelectedClassId] = useState('cls_jhs2a');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedTerm, setSelectedTerm] = useState('Term 2');
  const [isSaved, setIsSaved] = useState(false);

  const selectedClass =
    classes.find((c) => c.id === selectedClassId) || classes[0];

  const currentAssessments = assessments.filter(
    (a) => a.subjectName === selectedSubject
  );

  const handleScoreChange = (
    id: string,
    field: 'classworkScore' | 'homeworkScore' | 'examScore',
    value: number
  ) => {
    updateAssessment(id, { [field]: value });
    setIsSaved(false);
  };

  const handleCommentChange = (id: string, comment: string) => {
    updateAssessment(id, { teacherComment: comment });
    setIsSaved(false);
  };

  const handleSaveMarks = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Academic Results & Continuous Assessment
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter marks once: SchoolOS automatically computes totals, NaCCA/WAEC grades, and terminal positions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={FileSpreadsheet}
            onClick={() => setIsReportCardModalOpen(true)}
          >
            Preview Terminal Report Card
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={Save}
            onClick={handleSaveMarks}
          >
            Save Assessment Marks
          </Button>
        </div>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-800">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Marks and calculated grades for {selectedSubject} ({selectedClass.name}) successfully saved.
          </span>
          <span className="text-[11px] text-emerald-600">Sync complete</span>
        </div>
      )}

      {/* Filter Controls Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Class
            </label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} ({cls.stage})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white font-medium"
            >
              {selectedClass.subjects.map((sub, idx) => (
                <option key={idx} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Academic Term
            </label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              <option value="Term 1">Term 1 (First Term)</option>
              <option value="Term 2">Term 2 (Mid-Year)</option>
              <option value="Term 3">Term 3 (Promotional)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Academic Year
            </label>
            <input
              type="text"
              readOnly
              value="2024 / 2025"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-600"
            />
          </div>
        </div>
      </div>

      {/* Marks Spreadsheet Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {selectedSubject} — Continuous Assessment Sheet
            </h3>
            <p className="text-[11px] text-slate-500">
              Grading Scheme: Classwork (20) + Homework (10) + Terminal Exam (70) = Total (100)
            </p>
          </div>
          <button
            onClick={() => setIsReportCardModalOpen(true)}
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
          >
            <span>Open Report Card</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Student Name</th>
                <th className="py-3 px-3 font-semibold text-center w-28">
                  Classwork (20)
                </th>
                <th className="py-3 px-3 font-semibold text-center w-28">
                  Homework (10)
                </th>
                <th className="py-3 px-3 font-semibold text-center w-28">
                  Exam (70)
                </th>
                <th className="py-3 px-3 font-bold text-center w-24">
                  Total (100)
                </th>
                <th className="py-3 px-3 font-semibold text-center w-36">
                  Grade Scale
                </th>
                <th className="py-3 px-3 font-semibold text-center w-20">
                  Pos.
                </th>
                <th className="py-3 px-4 font-semibold">Teacher&apos;s Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentAssessments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No assessment records entered yet for {selectedSubject}.
                  </td>
                </tr>
              ) : (
                currentAssessments.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {a.studentName}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={a.classworkScore}
                        onChange={(e) =>
                          handleScoreChange(
                            a.id,
                            'classworkScore',
                            Number(e.target.value)
                          )
                        }
                        className="w-16 px-2 py-1 text-center border border-slate-200 rounded font-mono font-medium focus:ring-1 focus:ring-slate-900"
                      />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={a.homeworkScore}
                        onChange={(e) =>
                          handleScoreChange(
                            a.id,
                            'homeworkScore',
                            Number(e.target.value)
                          )
                        }
                        className="w-16 px-2 py-1 text-center border border-slate-200 rounded font-mono font-medium focus:ring-1 focus:ring-slate-900"
                      />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="70"
                        value={a.examScore}
                        onChange={(e) =>
                          handleScoreChange(
                            a.id,
                            'examScore',
                            Number(e.target.value)
                          )
                        }
                        className="w-16 px-2 py-1 text-center border border-slate-200 rounded font-mono font-medium focus:ring-1 focus:ring-slate-900"
                      />
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-900 text-sm font-mono bg-slate-50/60">
                      {a.totalScore}
                    </td>
                    <td className="py-3 px-3 text-center font-semibold text-blue-700">
                      {a.grade}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-700">
                      {a.position ? `${a.position}th` : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={a.teacherComment}
                        onChange={(e) =>
                          handleCommentChange(a.id, e.target.value)
                        }
                        placeholder="Add student remark..."
                        className="w-full px-2 py-1 border border-slate-200 rounded text-slate-700 focus:ring-1 focus:ring-slate-900 text-xs"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
