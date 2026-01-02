"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Download,
  FileText,
  Calendar,
  GraduationCap,
  ExternalLink,
  BookOpen,
  LogOut,
  User,
  Lock,
  AlertCircle,
  Sparkles,
  Filter,
  Clock,
  Star,
  Timer,
  Shield,
  ChevronRight,
  BookOpenCheck,
  FileCheck,
  Target,
  Trophy,
  Layers,
  Grid3X3,
  List,
  AlertTriangle,
  Menu,
  X,
  Bell,
  Zap,
  Award,
  BarChart3,
  FolderOpen,
  Eye,
  ChevronDown,
  TrendingUp,
  CalendarDays,
  FileQuestion,
  Flame,
  ArrowRight,
  CheckCircle2,
  Info,
} from "lucide-react";

interface Exam {
  id: number;
  title: string;
  subject: string;
  term: string;
  year: string;
  examType: "opener" | "midterm" | "endterm" | "mock";
  googleDriveLink: string;
  duration?: string;
  totalMarks?: number;
  difficulty?: "Easy" | "Medium" | "Hard";
}

interface DownloadHistory {
  examId: number;
  examTitle: string;
  downloadedAt: Date;
}

interface GradeData {
  id: string;
  label: string;
  description: string;
  color: string;
  exams: Exam[];
}

interface Student {
  admissionNumber: string;
  code: string;
  name: string;
  grade: string;
}

interface ExamTypeConfig {
  id: "opener" | "midterm" | "endterm" | "mock";
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
}

const examTypes: ExamTypeConfig[] = [
  {
    id: "opener",
    label: "Opener Exams",
    icon: <BookOpenCheck className="w-5 h-5" />,
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.1)",
    description: "Beginning of term assessments",
  },
  {
    id: "midterm",
    label: "Mid-Term Exams",
    icon: <Target className="w-5 h-5" />,
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.1)",
    description: "Mid-term evaluations",
  },
  {
    id: "endterm",
    label: "End-Term Exams",
    icon: <FileCheck className="w-5 h-5" />,
    color: "#8b5cf6",
    bgColor: "rgba(139, 92, 246, 0.1)",
    description: "Final term examinations",
  },
  {
    id: "mock",
    label: "Mock Exams",
    icon: <Trophy className="w-5 h-5" />,
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)",
    description: "Practice examinations",
  },
];

const validStudents: Student[] = [
  {
    admissionNumber: "2024001",
    code: "ABC123",
    name: "Emmanuel Otieno",
    grade: "grade7",
  },
  {
    admissionNumber: "2024002",
    code: "DEF456",
    name: "Jane Smith",
    grade: "grade8",
  },
  {
    admissionNumber: "2024003",
    code: "GHI789",
    name: "Peter Wilson",
    grade: "grade9",
  },
  {
    admissionNumber: "2024004",
    code: "JKL012",
    name: "Mary Johnson",
    grade: "grade10",
  },
  {
    admissionNumber: "2024005",
    code: "MNO345",
    name: "David Brown",
    grade: "form3",
  },
  {
    admissionNumber: "2024006",
    code: "PQR678",
    name: "Sarah Davis",
    grade: "form4",
  },
];

const gradesData: GradeData[] = [
  {
    id: "grade7",
    label: "Grade 7",
    description: "Junior Secondary",
    color: "#8b5cf6",
    exams: [
      {
        id: 1,
        title: "Mathematics Opener",
        subject: "Mathematics",
        term: "Term 1",
        year: "2024",
        examType: "opener",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2 hours",
        totalMarks: 100,
        difficulty: "Medium",
      },
      {
        id: 2,
        title: "English Language Mid-Term",
        subject: "English",
        term: "Term 1",
        year: "2024",
        examType: "midterm",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2.5 hours",
        totalMarks: 100,
        difficulty: "Medium",
      },
      {
        id: 3,
        title: "Science End-Term",
        subject: "Science",
        term: "Term 2",
        year: "2024",
        examType: "endterm",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2 hours",
        totalMarks: 100,
        difficulty: "Hard",
      },
      {
        id: 22,
        title: "Mathematics Mid-Term",
        subject: "Mathematics",
        term: "Term 1",
        year: "2024",
        examType: "midterm",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2 hours",
        totalMarks: 100,
        difficulty: "Medium",
      },
      {
        id: 23,
        title: "Science Opener",
        subject: "Science",
        term: "Term 1",
        year: "2024",
        examType: "opener",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "1.5 hours",
        totalMarks: 80,
        difficulty: "Easy",
      },
    ],
  },
  {
    id: "grade8",
    label: "Grade 8",
    description: "Junior Secondary",
    color: "#06b6d4",
    exams: [
      {
        id: 4,
        title: "Mathematics Final Mock",
        subject: "Mathematics",
        term: "Term 3",
        year: "2024",
        examType: "mock",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "3 hours",
        totalMarks: 100,
        difficulty: "Hard",
      },
      {
        id: 5,
        title: "Integrated Science Mid-Term",
        subject: "Science",
        term: "Term 2",
        year: "2024",
        examType: "midterm",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2 hours",
        totalMarks: 100,
        difficulty: "Medium",
      },
      {
        id: 6,
        title: "Social Studies Opener",
        subject: "Social Studies",
        term: "Term 1",
        year: "2024",
        examType: "opener",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "1.5 hours",
        totalMarks: 80,
        difficulty: "Easy",
      },
    ],
  },
  {
    id: "grade9",
    label: "Grade 9",
    description: "Junior Secondary",
    color: "#10b981",
    exams: [
      {
        id: 7,
        title: "Physics Opener",
        subject: "Physics",
        term: "Term 1",
        year: "2024",
        examType: "opener",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2 hours",
        totalMarks: 100,
        difficulty: "Medium",
      },
      {
        id: 8,
        title: "Chemistry Mid-Term Practical",
        subject: "Chemistry",
        term: "Term 2",
        year: "2024",
        examType: "midterm",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2.5 hours",
        totalMarks: 100,
        difficulty: "Hard",
      },
      {
        id: 9,
        title: "Biology End-Term",
        subject: "Biology",
        term: "Term 3",
        year: "2024",
        examType: "endterm",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2 hours",
        totalMarks: 100,
        difficulty: "Medium",
      },
    ],
  },
  {
    id: "grade10",
    label: "Grade 10",
    description: "Senior Secondary",
    color: "#f59e0b",
    exams: [
      {
        id: 10,
        title: "Advanced Mathematics Opener",
        subject: "Mathematics",
        term: "Term 1",
        year: "2026",
        examType: "opener",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2.5 hours",
        totalMarks: 100,
        difficulty: "Hard",
      },
      {
        id: 11,
        title: "English Composition Mid-Term",
        subject: "English",
        term: "Term 1",
        year: "2026",
        examType: "midterm",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2 hours",
        totalMarks: 100,
        difficulty: "Medium",
      },
      {
        id: 12,
        title: "Geography End-Term",
        subject: "Geography",
        term: "Term 1",
        year: "2026",
        examType: "endterm",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2 hours",
        totalMarks: 100,
        difficulty: "Medium",
      },
      {
        id: 13,
        title: "Computer Science Mock",
        subject: "Computer",
        term: "Term 1",
        year: "2026",
        examType: "mock",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2.5 hours",
        totalMarks: 100,
        difficulty: "Hard",
      },
    ],
  },
  {
    id: "form3",
    label: "Form 3",
    description: "High School",
    color: "#ec4899",
    exams: [
      {
        id: 14,
        title: "Physics Theory Opener",
        subject: "Physics",
        term: "Term 1",
        year: "2024",
        examType: "opener",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2.5 hours",
        totalMarks: 100,
        difficulty: "Hard",
      },
      {
        id: 15,
        title: "Chemistry Paper 1 & 2 Mid-Term",
        subject: "Chemistry",
        term: "Term 2",
        year: "2024",
        examType: "midterm",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "3 hours",
        totalMarks: 100,
        difficulty: "Hard",
      },
      {
        id: 16,
        title: "Biology End-Term",
        subject: "Biology",
        term: "Term 2",
        year: "2024",
        examType: "endterm",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2 hours",
        totalMarks: 100,
        difficulty: "Medium",
      },
      {
        id: 17,
        title: "Mathematics Mock Paper",
        subject: "Mathematics",
        term: "Term 3",
        year: "2024",
        examType: "mock",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "3 hours",
        totalMarks: 100,
        difficulty: "Hard",
      },
    ],
  },
  {
    id: "form4",
    label: "Form 4",
    description: "High School Final",
    color: "#ef4444",
    exams: [
      {
        id: 18,
        title: "KCSE Mathematics Mock",
        subject: "Mathematics",
        term: "Mock",
        year: "2024",
        examType: "mock",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "3 hours",
        totalMarks: 100,
        difficulty: "Hard",
      },
      {
        id: 19,
        title: "KCSE English Paper 1-3 Mock",
        subject: "English",
        term: "Mock",
        year: "2024",
        examType: "mock",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "3 hours",
        totalMarks: 100,
        difficulty: "Hard",
      },
      {
        id: 20,
        title: "KCSE Physics Mock",
        subject: "Physics",
        term: "Mock",
        year: "2024",
        examType: "mock",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2.5 hours",
        totalMarks: 100,
        difficulty: "Hard",
      },
      {
        id: 21,
        title: "KCSE Chemistry End-Term",
        subject: "Chemistry",
        term: "Term 3",
        year: "2024",
        examType: "endterm",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
        duration: "2.5 hours",
        totalMarks: 100,
        difficulty: "Hard",
      },
    ],
  },
];

const SESSION_TIMEOUT_MS = 15 * 60 * 1000;
const WARNING_BEFORE_LOGOUT_MS = 2 * 60 * 1000;

const SessionWarningModal = ({
  timeRemaining,
  onExtendSession,
}: {
  timeRemaining: number;
  onExtendSession: () => void;
}) => {
  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 animate-scale-in">
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-slate-200 dark:text-slate-700"
              />
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray="276.5"
                strokeDashoffset={
                  276.5 - (timeRemaining / WARNING_BEFORE_LOGOUT_MS) * 276.5
                }
                className="text-red-500 transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-500 animate-bounce-subtle" />
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
          Session Expiring
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-center mb-6">
          Your session will expire in{" "}
          <span className="font-bold text-red-500 text-lg">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        </p>
        <button
          onClick={onExtendSession}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2"
        >
          <Shield className="w-5 h-5" />
          Continue Session
        </button>
      </div>
    </div>
  );
};

const ExamPreviewModal = ({
  exam,
  gradeColor,
  examTypeConfig,
  onClose,
  onDownload,
  isFavorite,
  onToggleFavorite,
}: {
  exam: Exam;
  gradeColor: string;
  examTypeConfig: ExamTypeConfig;
  onClose: () => void;
  onDownload: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) => {
  const difficultyColors = {
    Easy: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30",
    Medium:
      "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30",
    Hard: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30",
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-700 animate-scale-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 pb-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>

          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: examTypeConfig.bgColor }}
            >
              <FileText
                className="w-7 h-7"
                style={{ color: examTypeConfig.color }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="px-3 py-1 rounded-lg text-xs font-semibold"
                  style={{
                    backgroundColor: `${gradeColor}20`,
                    color: gradeColor,
                  }}
                >
                  {exam.subject}
                </span>
                <span
                  className="px-2 py-1 rounded-md text-xs font-medium"
                  style={{
                    backgroundColor: examTypeConfig.bgColor,
                    color: examTypeConfig.color,
                  }}
                >
                  {examTypeConfig.label.split(" ")[0]}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {exam.title}
              </h2>
            </div>
          </div>
        </div>

        <div className="p-6 pt-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-100 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
                <CalendarDays className="w-4 h-4" />
                <span className="text-xs font-medium">Term & Year</span>
              </div>
              <p className="text-slate-900 dark:text-white font-semibold">
                {exam.term} • {exam.year}
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">Duration</span>
              </div>
              <p className="text-slate-900 dark:text-white font-semibold">
                {exam.duration || "2 hours"}
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-xs font-medium">Total Marks</span>
              </div>
              <p className="text-slate-900 dark:text-white font-semibold">
                {exam.totalMarks || 100} marks
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs font-medium">Difficulty</span>
              </div>
              <span
                className={`inline-flex px-2 py-0.5 rounded-md text-xs font-bold ${
                  difficultyColors[exam.difficulty || "Medium"]
                }`}
              >
                {exam.difficulty || "Medium"}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-900 dark:text-white font-medium mb-1">
                  Exam Guidelines
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Read all instructions carefully before starting. Answer all
                  questions. Show your working where applicable.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onToggleFavorite}
              className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                isFavorite
                  ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20"
                  : "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-amber-400"
              }`}
            >
              <Star
                className="w-5 h-5 text-amber-500"
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>
            <button
              onClick={onDownload}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white font-semibold transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: examTypeConfig.color,
                boxShadow: `0 8px 25px ${examTypeConfig.color}40`,
              }}
            >
              <Download className="w-5 h-5" />
              Download Exam
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({
  isOpen,
  onClose,
  student,
  gradeData,
  favorites,
  downloadHistory,
  onLogout,
  activeSection,
  setActiveSection,
  allExams,
}: {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  gradeData: GradeData | undefined;
  favorites: number[];
  downloadHistory: DownloadHistory[];
  onLogout: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  allExams: Exam[];
}) => {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      id: "exams",
      label: "All Exams",
      icon: <FolderOpen className="w-5 h-5" />,
      badge: allExams.length,
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: <Star className="w-5 h-5" />,
      badge: favorites.length,
    },
    {
      id: "history",
      label: "Download History",
      icon: <Clock className="w-5 h-5" />,
      badge: downloadHistory.length,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900 z-50 flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:z-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-sm">
                St. Mary's School
              </h1>
              <p className="text-xs text-slate-400">Exam Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-800/60 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-lg"
                style={{ backgroundColor: gradeData?.color }}
              >
                {student?.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-sm truncate">
                  {student?.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {student?.admissionNumber}
                </p>
              </div>
            </div>
            <div
              className="px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5"
              style={{
                backgroundColor: `${gradeData?.color}25`,
                color: gradeData?.color,
              }}
            >
              <Award className="w-3.5 h-3.5" />
              {gradeData?.label} • {gradeData?.description}
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-2 overflow-y-auto scrollbar-hide">
          <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Menu
          </p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeSection === item.id ? "bg-white/20" : "bg-slate-800"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <p className="px-3 py-2 mt-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Exam Types
          </p>
          <div className="space-y-1">
            {examTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setActiveSection("exams");
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-slate-800 transition-all"
              >
                <span
                  className="p-1.5 rounded-lg"
                  style={{ backgroundColor: type.bgColor, color: type.color }}
                >
                  {type.icon}
                </span>
                <span className="flex-1 text-left text-xs">{type.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 bg-red-900/20 hover:bg-red-900/30 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

const Header = ({
  onMenuClick,
  student,
  gradeData,
  timeRemaining,
  onExtendSession,
}: {
  onMenuClick: () => void;
  student: Student | null;
  gradeData: GradeData | undefined;
  timeRemaining: number;
  onExtendSession: () => void;
}) => {
  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);
  const isLow = timeRemaining < 5 * 60 * 1000;

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5 text-slate-900 dark:text-white" />
          </button>
          <div className="hidden md:block">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Welcome back, {student?.name?.split(" ")[0]}!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Ready to ace your exams?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onExtendSession}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              isLow
                ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800 animate-pulse"
                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            }`}
          >
            <Timer className="w-4 h-4" />
            <span className="hidden sm:inline">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </button>

          <button className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500"></span>
          </button>

          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-lg md:hidden"
            style={{ backgroundColor: gradeData?.color }}
          >
            {student?.name?.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

const StatsCard = ({
  icon,
  label,
  value,
  color,
  trend,
  subtitle,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  trend?: string;
  subtitle?: string;
}) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-start justify-between mb-3">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}15` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </span>
      )}
    </div>
    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
      {value}
    </div>
    <div className="text-sm text-slate-600 dark:text-slate-300">{label}</div>
    {subtitle && (
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {subtitle}
      </div>
    )}
  </div>
);

const QuickAccessCard = ({
  title,
  description,
  icon,
  color,
  count,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  count: number;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all text-left group w-full"
  >
    <div className="flex items-center justify-between mb-3">
      <div
        className="p-2.5 rounded-xl"
        style={{ backgroundColor: `${color}15` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <span className="text-2xl font-bold text-slate-900 dark:text-white">
        {count}
      </span>
    </div>
    <h4 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
      {title}
    </h4>
    <p className="text-xs text-slate-600 dark:text-slate-400">{description}</p>
    <div
      className="flex items-center gap-1 mt-3 text-xs font-medium"
      style={{ color }}
    >
      View All <ArrowRight className="w-3 h-3" />
    </div>
  </button>
);

const FeaturedExamCard = ({
  exam,
  gradeColor,
  examTypeConfig,
  onPreview,
  onDownload,
}: {
  exam: Exam;
  gradeColor: string;
  examTypeConfig: ExamTypeConfig;
  onPreview: () => void;
  onDownload: () => void;
}) => (
  <div
    className="relative bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group overflow-hidden"
    style={{ borderLeft: `4px solid ${examTypeConfig.color}` }}
  >
    <div className="absolute top-3 right-3">
      <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
        <Flame className="w-3 h-3" />
        Popular
      </span>
    </div>

    <div className="flex items-start gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: examTypeConfig.bgColor }}
      >
        {examTypeConfig.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className="px-2 py-0.5 rounded-md text-xs font-medium"
            style={{ backgroundColor: `${gradeColor}15`, color: gradeColor }}
          >
            {exam.subject}
          </span>
          <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
            {exam.year}
          </span>
        </div>
        <h4 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {exam.title}
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          {exam.term}
          <span className="w-1 h-1 rounded-full bg-slate-400"></span>
          <Clock className="w-3 h-3" />
          {exam.duration || "2 hrs"}
        </p>
      </div>
    </div>

    <div className="flex gap-2 mt-4">
      <button
        onClick={onPreview}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
      >
        <Eye className="w-3.5 h-3.5" />
        Preview
      </button>
      <button
        onClick={onDownload}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium text-white transition-all"
        style={{ backgroundColor: examTypeConfig.color }}
      >
        <Download className="w-3.5 h-3.5" />
        Download
      </button>
    </div>
  </div>
);

const SkeletonCard = ({ index }: { index: number }) => (
  <div
    className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm opacity-0 animate-fade-in-up"
    style={{
      animationDelay: `${0.05 * index}s`,
      animationFillMode: "forwards",
    }}
  >
    <div className="flex justify-between mb-4">
      <div className="relative w-24 h-7 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 dark:via-slate-600/60 to-transparent animate-shimmer" />
      </div>
      <div className="relative w-20 h-6 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 dark:via-slate-600/60 to-transparent animate-shimmer" />
      </div>
    </div>
    <div className="relative w-4/5 h-5 bg-slate-200 dark:bg-slate-700 rounded mb-3 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 dark:via-slate-600/60 to-transparent animate-shimmer" />
    </div>
    <div className="relative w-3/5 h-4 bg-slate-200 dark:bg-slate-700 rounded mb-5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 dark:via-slate-600/60 to-transparent animate-shimmer" />
    </div>
    <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex justify-between items-center">
      <div className="relative w-24 h-6 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 dark:via-slate-600/60 to-transparent animate-shimmer" />
      </div>
      <div className="relative w-28 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 dark:via-slate-600/60 to-transparent animate-shimmer" />
      </div>
    </div>
  </div>
);

const ExamCard = ({
  exam,
  gradeColor,
  isFavorite,
  onPreview,
  onDownload,
  onToggleFavorite,
  examTypeConfig,
  index,
  viewMode,
}: {
  exam: Exam;
  gradeColor: string;
  isFavorite: boolean;
  onPreview: () => void;
  onDownload: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
  examTypeConfig: ExamTypeConfig;
  index: number;
  viewMode: "grid" | "list";
}) => (
  <article
    className={`bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group opacity-0 animate-fade-in-up ${
      viewMode === "list"
        ? "grid grid-cols-[auto_1fr_auto] items-center gap-5"
        : ""
    }`}
    style={{
      animationDelay: `${0.03 * index}s`,
      animationFillMode: "forwards",
    }}
    onClick={onPreview}
  >
    {viewMode === "list" && (
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: examTypeConfig.bgColor }}
      >
        <FileText className="w-6 h-6" style={{ color: examTypeConfig.color }} />
      </div>
    )}

    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <span
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
          style={{ backgroundColor: `${gradeColor}15`, color: gradeColor }}
        >
          {exam.subject}
        </span>
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium"
            style={{
              backgroundColor: examTypeConfig.bgColor,
              color: examTypeConfig.color,
            }}
          >
            {examTypeConfig.icon}
          </span>
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
            {exam.year}
          </span>
        </div>
      </div>

      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {exam.title}
      </h3>

      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {exam.term}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {exam.duration || "2 hrs"}
        </span>
      </div>
    </div>

    <div
      className={`flex gap-2 ${
        viewMode === "grid"
          ? "border-t border-slate-200 dark:border-slate-700 pt-4 mt-4 justify-between items-center"
          : "shrink-0"
      }`}
    >
      <button
        onClick={onToggleFavorite}
        className={`p-2.5 rounded-xl border-2 transition-all hover:scale-105 ${
          isFavorite
            ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20"
            : "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-amber-400"
        }`}
      >
        <Star
          className="w-5 h-5 text-amber-500"
          fill={isFavorite ? "currentColor" : "none"}
        />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPreview();
        }}
        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
      >
        <Eye className="w-4 h-4" />
        <span className="hidden sm:inline">Preview</span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDownload();
        }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
        style={{
          backgroundColor: examTypeConfig.color,
          boxShadow: `0 4px 15px ${examTypeConfig.color}30`,
        }}
      >
        <Download className="w-4 h-4" />
      </button>
    </div>
  </article>
);

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) => (
  <div>
    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full py-2.5 px-3 text-sm border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none cursor-pointer transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
          className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
        >
          {option === "all" ? `All ${label}s` : option}
        </option>
      ))}
    </select>
  </div>
);

export default function ExamDownloads() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingExams, setLoadingExams] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [previewExam, setPreviewExam] = useState<Exam | null>(null);

  const [selectedExamType, setSelectedExamType] = useState<
    "all" | "opener" | "midterm" | "endterm" | "mock"
  >("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedTerm, setSelectedTerm] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistory[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [lastActivity, setLastActivity] = useState(Date.now());
  const [timeRemaining, setTimeRemaining] = useState(SESSION_TIMEOUT_MS);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const updateActivity = useCallback(() => {
    setLastActivity(Date.now());
    setShowWarning(false);
  }, []);

  const handleExtendSession = useCallback(() => {
    updateActivity();
    setShowWarning(false);
  }, [updateActivity]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const checkSession = () => {
      const now = Date.now();
      const elapsed = now - lastActivity;
      const remaining = SESSION_TIMEOUT_MS - elapsed;

      if (remaining <= 0) {
        handleLogout();
      } else if (remaining <= WARNING_BEFORE_LOGOUT_MS) {
        setShowWarning(true);
        setTimeRemaining(remaining);
      } else {
        setTimeRemaining(remaining);
        setShowWarning(false);
      }
    };

    const interval = setInterval(checkSession, 1000);
    const events = ["mousedown", "keydown", "scroll", "touchstart", "click"];
    events.forEach((event) =>
      window.addEventListener(event, updateActivity, { passive: true })
    );

    return () => {
      clearInterval(interval);
      events.forEach((event) =>
        window.removeEventListener(event, updateActivity)
      );
    };
  }, [isAuthenticated, lastActivity, updateActivity]);

  useEffect(() => {
    const savedAuth = localStorage.getItem("examAuth");
    const savedHistory = localStorage.getItem("downloadHistory");
    const savedFavorites = localStorage.getItem("favorites");
    const savedLastActivity = localStorage.getItem("lastActivity");

    if (savedAuth) {
      const lastActivityTime = savedLastActivity
        ? parseInt(savedLastActivity)
        : Date.now();
      const elapsed = Date.now() - lastActivityTime;

      if (elapsed < SESSION_TIMEOUT_MS) {
        const student = JSON.parse(savedAuth);
        setCurrentStudent(student);
        setIsAuthenticated(true);
        setLastActivity(lastActivityTime);
        setLoadingExams(true);
        setTimeout(() => setLoadingExams(false), 800);
      } else {
        localStorage.removeItem("examAuth");
        localStorage.removeItem("lastActivity");
      }
    }

    if (savedHistory) setDownloadHistory(JSON.parse(savedHistory));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("lastActivity", lastActivity.toString());
    }
  }, [lastActivity, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const student = validStudents.find(
        (s) =>
          s.admissionNumber === admissionNumber.trim() && s.code === code.trim()
      );

      if (student) {
        setCurrentStudent(student);
        setIsAuthenticated(true);
        setLastActivity(Date.now());
        localStorage.setItem("examAuth", JSON.stringify(student));
        localStorage.setItem("lastActivity", Date.now().toString());
        setLoadingExams(true);
        setTimeout(() => setLoadingExams(false), 1000);
      } else {
        setError("Invalid admission number or code. Please try again.");
      }
      setIsLoading(false);
    }, 1200);
  };

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentStudent(null);
    setAdmissionNumber("");
    setCode("");
    setLoadingExams(false);
    setShowWarning(false);
    setSidebarOpen(false);
    localStorage.removeItem("examAuth");
    localStorage.removeItem("lastActivity");
  }, []);

  const handleDownload = (exam: Exam) => {
    updateActivity();
    const newDownload: DownloadHistory = {
      examId: exam.id,
      examTitle: exam.title,
      downloadedAt: new Date(),
    };
    const updatedHistory = [newDownload, ...downloadHistory].slice(0, 20);
    setDownloadHistory(updatedHistory);
    localStorage.setItem("downloadHistory", JSON.stringify(updatedHistory));
    window.open(exam.googleDriveLink, "_blank");
  };

  const toggleFavorite = (examId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    updateActivity();
    const updatedFavorites = favorites.includes(examId)
      ? favorites.filter((id) => id !== examId)
      : [...favorites, examId];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const studentGrade = gradesData.find((g) => g.id === currentStudent?.grade);
  const allExams = studentGrade?.exams || [];

  const examCounts = {
    all: allExams.length,
    opener: allExams.filter((e) => e.examType === "opener").length,
    midterm: allExams.filter((e) => e.examType === "midterm").length,
    endterm: allExams.filter((e) => e.examType === "endterm").length,
    mock: allExams.filter((e) => e.examType === "mock").length,
  };

  const filteredExams = allExams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExamType =
      selectedExamType === "all" || exam.examType === selectedExamType;
    const matchesSubject =
      selectedSubject === "all" || exam.subject === selectedSubject;
    const matchesTerm = selectedTerm === "all" || exam.term === selectedTerm;
    const matchesYear = selectedYear === "all" || exam.year === selectedYear;

    return (
      matchesSearch &&
      matchesExamType &&
      matchesSubject &&
      matchesTerm &&
      matchesYear
    );
  });

  const favoriteExams = allExams.filter((exam) => favorites.includes(exam.id));
  const subjects = ["all", ...new Set(allExams.map((e) => e.subject))];
  const terms = ["all", ...new Set(allExams.map((e) => e.term))];
  const years = ["all", ...new Set(allExams.map((e) => e.year))];

  const getExamTypeConfig = (type: string) =>
    examTypes.find((t) => t.id === type) || examTypes[0];

  if (!isAuthenticated) {
    return (
      <>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
          .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        `}</style>

        <div className="min-h-screen flex items-center justify-center p-5 bg-slate-950 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(71, 85, 105, 0.3) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="absolute top-[10%] left-[10%] w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border border-blue-500/20 animate-float" />
          <div
            className="absolute top-[60%] left-[5%] w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-[20%] right-[10%] w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/20 animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-[20%] right-[15%] w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 animate-float"
            style={{ animationDelay: "0.5s" }}
          />

          <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[80px] animate-pulse-glow" />
          <div
            className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[100px] animate-pulse-glow"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative w-full max-w-[440px] bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-10 border border-slate-800 shadow-2xl">
            <div className="absolute -top-px left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full" />

            <div className="text-center mb-8">
              <div className="relative w-20 h-20 mx-auto mb-5">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 animate-spin-slow opacity-70 blur-sm" />
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                St. Mary's School
              </h1>
              <p className="text-sm text-slate-400">
                Access your exam papers securely
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <User className="w-4 h-4 text-blue-400" />
                  Admission Number
                </label>
                <input
                  type="text"
                  value={admissionNumber}
                  onChange={(e) => setAdmissionNumber(e.target.value)}
                  placeholder="Enter your admission number"
                  className="w-full px-4 py-4 text-base border border-slate-700 rounded-xl bg-slate-800/50 text-white placeholder:text-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <Lock className="w-4 h-4 text-blue-400" />
                  Access Code
                </label>
                <input
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter your unique access code"
                  className="w-full px-4 py-4 text-base border border-slate-700 rounded-xl bg-slate-800/50 text-white placeholder:text-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              {error && (
                <div className="flex items-center gap-2.5 p-3.5 bg-red-900/30 border border-red-800 rounded-xl text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-4 px-6 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 border-none rounded-xl cursor-pointer transition-all mt-2 overflow-hidden shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Access Portal
                  </span>
                )}
              </button>
            </form>

            <p className="text-center mt-6 text-xs text-slate-500">
              Contact your school administrator for access credentials.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
        {showWarning && (
          <SessionWarningModal
            timeRemaining={timeRemaining}
            onExtendSession={handleExtendSession}
          />
        )}

        {previewExam && (
          <ExamPreviewModal
            exam={previewExam}
            gradeColor={studentGrade?.color || "#6366f1"}
            examTypeConfig={getExamTypeConfig(previewExam.examType)}
            onClose={() => setPreviewExam(null)}
            onDownload={() => {
              handleDownload(previewExam);
              setPreviewExam(null);
            }}
            isFavorite={favorites.includes(previewExam.id)}
            onToggleFavorite={() => toggleFavorite(previewExam.id)}
          />
        )}

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          student={currentStudent}
          gradeData={studentGrade}
          favorites={favorites}
          downloadHistory={downloadHistory}
          onLogout={handleLogout}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          allExams={allExams}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            student={currentStudent}
            gradeData={studentGrade}
            timeRemaining={timeRemaining}
            onExtendSession={handleExtendSession}
          />

          <main className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
              {activeSection === "dashboard" && (
                <>
                  <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 rounded-3xl p-6 lg:p-8 border border-blue-500/20">
                    <div className="absolute -top-24 -right-12 w-64 h-64 rounded-full blur-[80px] bg-cyan-500/30" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-[60px] bg-blue-400/20" />

                    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 border bg-white/10 border-white/20 text-white backdrop-blur-sm">
                          <Zap className="w-4 h-4" />
                          {studentGrade?.label} • {studentGrade?.description}
                        </div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                          Your Learning Dashboard
                        </h1>
                        <p className="text-blue-100 max-w-lg">
                          Track your progress, download exams, and prepare for
                          success. You have access to {allExams.length} exam
                          papers.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setActiveSection("exams")}
                          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-blue-700 font-semibold shadow-lg hover:scale-105 transition-all"
                        >
                          <BookOpen className="w-5 h-5" />
                          Browse Exams
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                      icon={<FileText className="w-6 h-6" />}
                      label="Total Exams"
                      value={allExams.length}
                      color={studentGrade?.color || "#6366f1"}
                      subtitle="Available for download"
                    />
                    <StatsCard
                      icon={<Download className="w-6 h-6" />}
                      label="Downloads"
                      value={downloadHistory.length}
                      color="#10b981"
                      trend="+12%"
                      subtitle="This semester"
                    />
                    <StatsCard
                      icon={<Star className="w-6 h-6" />}
                      label="Favorites"
                      value={favorites.length}
                      color="#f59e0b"
                      subtitle="Saved exams"
                    />
                    <StatsCard
                      icon={<CheckCircle2 className="w-6 h-6" />}
                      label="Completion"
                      value={`${Math.round(
                        (downloadHistory.length /
                          Math.max(allExams.length, 1)) *
                          100
                      )}%`}
                      color="#3b82f6"
                      subtitle="Download rate"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Quick Access
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {examTypes.map((type) => (
                        <QuickAccessCard
                          key={type.id}
                          title={type.label}
                          description={type.description}
                          icon={type.icon}
                          color={type.color}
                          count={examCounts[type.id]}
                          onClick={() => {
                            setSelectedExamType(type.id);
                            setActiveSection("exams");
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Flame className="w-5 h-5 text-orange-500" />
                        Featured Exams
                      </h2>
                      <button
                        onClick={() => setActiveSection("exams")}
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                      >
                        View All <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {allExams.slice(0, 3).map((exam) => (
                        <FeaturedExamCard
                          key={exam.id}
                          exam={exam}
                          gradeColor={studentGrade?.color || "#6366f1"}
                          examTypeConfig={getExamTypeConfig(exam.examType)}
                          onPreview={() => setPreviewExam(exam)}
                          onDownload={() => handleDownload(exam)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-500" />
                          Recent Activity
                        </h3>
                        {downloadHistory.length > 0 && (
                          <button
                            onClick={() => setActiveSection("history")}
                            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            View All
                          </button>
                        )}
                      </div>
                      {downloadHistory.length === 0 ? (
                        <div className="text-center py-8">
                          <FileQuestion className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto mb-2" />
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            No downloads yet
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {downloadHistory.slice(0, 4).map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                            >
                              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                  {item.examTitle}
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                  {new Date(
                                    item.downloadedAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                          <Star className="w-5 h-5 text-amber-500" />
                          Your Favorites
                        </h3>
                        {favoriteExams.length > 0 && (
                          <button
                            onClick={() => setActiveSection("favorites")}
                            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            View All
                          </button>
                        )}
                      </div>
                      {favoriteExams.length === 0 ? (
                        <div className="text-center py-8">
                          <Star className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto mb-2" />
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            No favorites yet
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                            Star exams to save them here
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {favoriteExams.slice(0, 4).map((exam) => {
                            const typeConfig = getExamTypeConfig(exam.examType);
                            return (
                              <div
                                key={exam.id}
                                onClick={() => setPreviewExam(exam)}
                                className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                              >
                                <div
                                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                                  style={{
                                    backgroundColor: typeConfig.bgColor,
                                  }}
                                >
                                  <FileText
                                    className="w-5 h-5"
                                    style={{ color: typeConfig.color }}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                    {exam.title}
                                  </p>
                                  <p className="text-xs text-slate-600 dark:text-slate-400">
                                    {exam.subject}
                                  </p>
                                </div>
                                <Star
                                  className="w-5 h-5 text-amber-500"
                                  fill="currentColor"
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeSection === "exams" && (
                <>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                        <input
                          type="text"
                          placeholder="Search exams by title or subject..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full py-3 pl-12 pr-4 text-base border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowFilters(!showFilters)}
                          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                            showFilters
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                          }`}
                        >
                          <Filter className="w-4 h-4" />
                          Filters
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              showFilters ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <button
                          onClick={() =>
                            setViewMode(viewMode === "grid" ? "list" : "grid")
                          }
                          className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                        >
                          {viewMode === "grid" ? (
                            <List className="w-4 h-4" />
                          ) : (
                            <Grid3X3 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {showFilters && (
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 animate-fade-in-up">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <FilterSelect
                            label="Subject"
                            value={selectedSubject}
                            options={subjects}
                            onChange={setSelectedSubject}
                          />
                          <FilterSelect
                            label="Term"
                            value={selectedTerm}
                            options={terms}
                            onChange={setSelectedTerm}
                          />
                          <FilterSelect
                            label="Year"
                            value={selectedYear}
                            options={years}
                            onChange={setSelectedYear}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                      onClick={() => setSelectedExamType("all")}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap text-sm ${
                        selectedExamType === "all"
                          ? "text-white shadow-lg"
                          : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                      }`}
                      style={
                        selectedExamType === "all"
                          ? { backgroundColor: studentGrade?.color }
                          : {}
                      }
                    >
                      <Layers className="w-4 h-4" />
                      All
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          selectedExamType === "all"
                            ? "bg-white/20"
                            : "bg-slate-100 dark:bg-slate-700"
                        }`}
                      >
                        {examCounts.all}
                      </span>
                    </button>

                    {examTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedExamType(type.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap text-sm ${
                          selectedExamType === type.id
                            ? "text-white shadow-lg"
                            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                        }`}
                        style={
                          selectedExamType === type.id
                            ? { backgroundColor: type.color }
                            : {}
                        }
                      >
                        <span
                          className={
                            selectedExamType !== type.id ? "p-1 rounded-md" : ""
                          }
                          style={
                            selectedExamType !== type.id
                              ? {
                                  backgroundColor: type.bgColor,
                                  color: type.color,
                                }
                              : {}
                          }
                        >
                          {type.icon}
                        </span>
                        <span className="hidden sm:inline">
                          {type.label.split(" ")[0]}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            selectedExamType === type.id
                              ? "bg-white/20"
                              : "bg-slate-100 dark:bg-slate-700"
                          }`}
                        >
                          {examCounts[type.id]}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Showing{" "}
                      <strong className="text-slate-900 dark:text-white">
                        {filteredExams.length}
                      </strong>{" "}
                      of {allExams.length} exams
                    </p>
                  </div>

                  {loadingExams ? (
                    <div
                      className={
                        viewMode === "grid"
                          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                          : "flex flex-col gap-4"
                      }
                    >
                      {[...Array(6)].map((_, i) => (
                        <SkeletonCard key={i} index={i} />
                      ))}
                    </div>
                  ) : filteredExams.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <BookOpen className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        No exams found
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  ) : (
                    <div
                      className={
                        viewMode === "grid"
                          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                          : "flex flex-col gap-4"
                      }
                    >
                      {filteredExams.map((exam, index) => (
                        <ExamCard
                          key={exam.id}
                          exam={exam}
                          gradeColor={studentGrade?.color || "#6366f1"}
                          isFavorite={favorites.includes(exam.id)}
                          onPreview={() => setPreviewExam(exam)}
                          onDownload={() => handleDownload(exam)}
                          onToggleFavorite={(e) => toggleFavorite(exam.id, e)}
                          examTypeConfig={getExamTypeConfig(exam.examType)}
                          index={index}
                          viewMode={viewMode}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeSection === "favorites" && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Star className="w-6 h-6 text-amber-500" />
                        Your Favorites
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Exams you've saved for quick access
                      </p>
                    </div>
                  </div>

                  {favoriteExams.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <Star className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        No favorites yet
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        Star exams to add them to your favorites
                      </p>
                      <button
                        onClick={() => setActiveSection("exams")}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium"
                      >
                        Browse Exams
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      {favoriteExams.map((exam, index) => (
                        <ExamCard
                          key={exam.id}
                          exam={exam}
                          gradeColor={studentGrade?.color || "#6366f1"}
                          isFavorite={true}
                          onPreview={() => setPreviewExam(exam)}
                          onDownload={() => handleDownload(exam)}
                          onToggleFavorite={(e) => toggleFavorite(exam.id, e)}
                          examTypeConfig={getExamTypeConfig(exam.examType)}
                          index={index}
                          viewMode="grid"
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeSection === "history" && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Clock className="w-6 h-6 text-blue-500" />
                        Download History
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Your recently downloaded exams
                      </p>
                    </div>
                  </div>

                  {downloadHistory.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <Clock className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        No downloads yet
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        Start downloading exams to see your history
                      </p>
                      <button
                        onClick={() => setActiveSection("exams")}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium"
                      >
                        Browse Exams
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                      <div className="divide-y divide-slate-200 dark:divide-slate-700">
                        {downloadHistory.map((item, index) => {
                          const exam = allExams.find(
                            (e) => e.id === item.examId
                          );
                          const typeConfig = exam
                            ? getExamTypeConfig(exam.examType)
                            : examTypes[0];
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                              onClick={() => exam && setPreviewExam(exam)}
                            >
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: typeConfig.bgColor }}
                              >
                                <FileText
                                  className="w-6 h-6"
                                  style={{ color: typeConfig.color }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-900 dark:text-white truncate">
                                  {item.examTitle}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  Downloaded on{" "}
                                  {new Date(
                                    item.downloadedAt
                                  ).toLocaleDateString()}{" "}
                                  at{" "}
                                  {new Date(
                                    item.downloadedAt
                                  ).toLocaleTimeString()}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>

          <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-5 text-center text-sm text-slate-600 dark:text-slate-400">
              <p>
                © {new Date().getFullYear()} St. Mary's School Bomet • Exam
                Portal • Developed by Manuwebdesigns
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
