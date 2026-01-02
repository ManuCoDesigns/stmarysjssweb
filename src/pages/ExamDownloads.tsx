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
  BookMarked,
  CalendarDays,
  FileQuestion,
  Flame,
  ArrowRight,
  CheckCircle2,
  Info,
} from "lucide-react";

// ============================================
// TYPES
// ============================================
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

// ============================================
// EXAM TYPE CONFIGURATIONS
// ============================================
const examTypes: ExamTypeConfig[] = [
  {
    id: "opener",
    label: "Opener Exams",
    icon: <BookOpenCheck className="w-5 h-5" />,
    color: "hsl(142, 76%, 36%)",
    bgColor: "hsl(142, 76%, 36%, 0.1)",
    description: "Beginning of term assessments",
  },
  {
    id: "midterm",
    label: "Mid-Term Exams",
    icon: <Target className="w-5 h-5" />,
    color: "hsl(217, 91%, 60%)",
    bgColor: "hsl(217, 91%, 60%, 0.1)",
    description: "Mid-term evaluations",
  },
  {
    id: "endterm",
    label: "End-Term Exams",
    icon: <FileCheck className="w-5 h-5" />,
    color: "hsl(263, 70%, 58%)",
    bgColor: "hsl(263, 70%, 58%, 0.1)",
    description: "Final term examinations",
  },
  {
    id: "mock",
    label: "Mock Exams",
    icon: <Trophy className="w-5 h-5" />,
    color: "hsl(25, 95%, 53%)",
    bgColor: "hsl(25, 95%, 53%, 0.1)",
    description: "Practice examinations",
  },
];

// ============================================
// CONFIGURE YOUR STUDENTS HERE
// ============================================
const validStudents: Student[] = [
  { admissionNumber: "2024001", code: "ABC123", name: "Emmanuel Otieno", grade: "grade7" },
  { admissionNumber: "2024002", code: "DEF456", name: "Jane Smith", grade: "grade8" },
  { admissionNumber: "2024003", code: "GHI789", name: "Peter Wilson", grade: "grade9" },
  { admissionNumber: "2024004", code: "JKL012", name: "Mary Johnson", grade: "grade10" },
  { admissionNumber: "2024005", code: "MNO345", name: "David Brown", grade: "form3" },
  { admissionNumber: "2024006", code: "PQR678", name: "Sarah Davis", grade: "form4" },
];

// ============================================
// CONFIGURE YOUR EXAMS HERE
// ============================================
const gradesData: GradeData[] = [
  {
    id: "grade7",
    label: "Grade 7",
    description: "Junior Secondary",
    color: "#8b5cf6",
    exams: [
      { id: 1, title: "Mathematics Opener", subject: "Mathematics", term: "Term 1", year: "2024", examType: "opener", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2 hours", totalMarks: 100, difficulty: "Medium" },
      { id: 2, title: "English Language Mid-Term", subject: "English", term: "Term 1", year: "2024", examType: "midterm", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2.5 hours", totalMarks: 100, difficulty: "Medium" },
      { id: 3, title: "Science End-Term", subject: "Science", term: "Term 2", year: "2024", examType: "endterm", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2 hours", totalMarks: 100, difficulty: "Hard" },
      { id: 22, title: "Mathematics Mid-Term", subject: "Mathematics", term: "Term 1", year: "2024", examType: "midterm", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2 hours", totalMarks: 100, difficulty: "Medium" },
      { id: 23, title: "Science Opener", subject: "Science", term: "Term 1", year: "2024", examType: "opener", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "1.5 hours", totalMarks: 80, difficulty: "Easy" },
    ],
  },
  {
    id: "grade8",
    label: "Grade 8",
    description: "Junior Secondary",
    color: "#06b6d4",
    exams: [
      { id: 4, title: "Mathematics Final Mock", subject: "Mathematics", term: "Term 3", year: "2024", examType: "mock", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "3 hours", totalMarks: 100, difficulty: "Hard" },
      { id: 5, title: "Integrated Science Mid-Term", subject: "Science", term: "Term 2", year: "2024", examType: "midterm", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2 hours", totalMarks: 100, difficulty: "Medium" },
      { id: 6, title: "Social Studies Opener", subject: "Social Studies", term: "Term 1", year: "2024", examType: "opener", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "1.5 hours", totalMarks: 80, difficulty: "Easy" },
    ],
  },
  {
    id: "grade9",
    label: "Grade 9",
    description: "Junior Secondary",
    color: "#10b981",
    exams: [
      { id: 7, title: "Physics Opener", subject: "Physics", term: "Term 1", year: "2024", examType: "opener", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2 hours", totalMarks: 100, difficulty: "Medium" },
      { id: 8, title: "Chemistry Mid-Term Practical", subject: "Chemistry", term: "Term 2", year: "2024", examType: "midterm", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2.5 hours", totalMarks: 100, difficulty: "Hard" },
      { id: 9, title: "Biology End-Term", subject: "Biology", term: "Term 3", year: "2024", examType: "endterm", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2 hours", totalMarks: 100, difficulty: "Medium" },
    ],
  },
  {
    id: "grade10",
    label: "Grade 10",
    description: "Senior Secondary",
    color: "#f59e0b",
    exams: [
      { id: 10, title: "Advanced Mathematics Opener", subject: "Mathematics", term: "Term 1", year: "2026", examType: "opener", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2.5 hours", totalMarks: 100, difficulty: "Hard" },
      { id: 11, title: "English Composition Mid-Term", subject: "English", term: "Term 1", year: "2026", examType: "midterm", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2 hours", totalMarks: 100, difficulty: "Medium" },
      { id: 12, title: "Geography End-Term", subject: "Geography", term: "Term 1", year: "2026", examType: "endterm", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2 hours", totalMarks: 100, difficulty: "Medium" },
      { id: 13, title: "Computer Science Mock", subject: "Computer", term: "Term 1", year: "2026", examType: "mock", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2.5 hours", totalMarks: 100, difficulty: "Hard" },
    ],
  },
  {
    id: "form3",
    label: "Form 3",
    description: "High School",
    color: "#ec4899",
    exams: [
      { id: 14, title: "Physics Theory Opener", subject: "Physics", term: "Term 1", year: "2024", examType: "opener", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2.5 hours", totalMarks: 100, difficulty: "Hard" },
      { id: 15, title: "Chemistry Paper 1 & 2 Mid-Term", subject: "Chemistry", term: "Term 2", year: "2024", examType: "midterm", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "3 hours", totalMarks: 100, difficulty: "Hard" },
      { id: 16, title: "Biology End-Term", subject: "Biology", term: "Term 2", year: "2024", examType: "endterm", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2 hours", totalMarks: 100, difficulty: "Medium" },
      { id: 17, title: "Mathematics Mock Paper", subject: "Mathematics", term: "Term 3", year: "2024", examType: "mock", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "3 hours", totalMarks: 100, difficulty: "Hard" },
    ],
  },
  {
    id: "form4",
    label: "Form 4",
    description: "High School Final",
    color: "#ef4444",
    exams: [
      { id: 18, title: "KCSE Mathematics Mock", subject: "Mathematics", term: "Mock", year: "2024", examType: "mock", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "3 hours", totalMarks: 100, difficulty: "Hard" },
      { id: 19, title: "KCSE English Paper 1-3 Mock", subject: "English", term: "Mock", year: "2024", examType: "mock", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "3 hours", totalMarks: 100, difficulty: "Hard" },
      { id: 20, title: "KCSE Physics Mock", subject: "Physics", term: "Mock", year: "2024", examType: "mock", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2.5 hours", totalMarks: 100, difficulty: "Hard" },
      { id: 21, title: "KCSE Chemistry End-Term", subject: "Chemistry", term: "Term 3", year: "2024", examType: "endterm", googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view", duration: "2.5 hours", totalMarks: 100, difficulty: "Hard" },
    ],
  },
];

// ============================================
// SESSION TIMEOUT CONFIG
// ============================================
const SESSION_TIMEOUT_MS = 15 * 60 * 1000;
const WARNING_BEFORE_LOGOUT_MS = 2 * 60 * 1000;

// ============================================
// COMPONENTS
// ============================================

// Session Warning Modal
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
    <div className="fixed inset-0 bg-foreground/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl border border-border animate-scale-in">
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-muted" />
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray="276.5"
                strokeDashoffset={276.5 - (timeRemaining / WARNING_BEFORE_LOGOUT_MS) * 276.5}
                className="text-destructive transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-destructive animate-bounce-subtle" />
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground text-center mb-2">Session Expiring</h3>
        <p className="text-muted-foreground text-center mb-6">
          Your session will expire in{" "}
          <span className="font-bold text-destructive text-lg">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        </p>
        <button
          onClick={onExtendSession}
          className="w-full py-4 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-glow"
        >
          <Shield className="w-5 h-5" />
          Continue Session
        </button>
      </div>
    </div>
  );
};

// Exam Preview Modal
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
    Easy: "text-success bg-success/10",
    Medium: "text-warning bg-warning/10",
    Hard: "text-destructive bg-destructive/10",
  };

  return (
    <div className="fixed inset-0 bg-foreground/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div
        className="bg-card rounded-3xl max-w-lg w-full shadow-2xl border border-border animate-scale-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 pb-4" style={{ background: `linear-gradient(135deg, ${examTypeConfig.color}15, ${gradeColor}10)` }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-card/80 hover:bg-card transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: examTypeConfig.bgColor }}
            >
              <FileText className="w-7 h-7" style={{ color: examTypeConfig.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="px-3 py-1 rounded-lg text-xs font-semibold"
                  style={{ backgroundColor: `${gradeColor}20`, color: gradeColor }}
                >
                  {exam.subject}
                </span>
                <span
                  className="px-2 py-1 rounded-md text-xs font-medium"
                  style={{ backgroundColor: examTypeConfig.bgColor, color: examTypeConfig.color }}
                >
                  {examTypeConfig.label.split(" ")[0]}
                </span>
              </div>
              <h2 className="text-xl font-bold text-foreground">{exam.title}</h2>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-6 pt-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <CalendarDays className="w-4 h-4" />
                <span className="text-xs font-medium">Term & Year</span>
              </div>
              <p className="text-foreground font-semibold">{exam.term} • {exam.year}</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">Duration</span>
              </div>
              <p className="text-foreground font-semibold">{exam.duration || "2 hours"}</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Target className="w-4 h-4" />
                <span className="text-xs font-medium">Total Marks</span>
              </div>
              <p className="text-foreground font-semibold">{exam.totalMarks || 100} marks</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs font-medium">Difficulty</span>
              </div>
              <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-bold ${difficultyColors[exam.difficulty || "Medium"]}`}>
                {exam.difficulty || "Medium"}
              </span>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-medium mb-1">Exam Guidelines</p>
                <p className="text-xs text-muted-foreground">
                  Read all instructions carefully before starting. Answer all questions. Show your working where applicable.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onToggleFavorite}
              className={`p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                isFavorite ? "border-warning bg-warning/10" : "border-border bg-card hover:border-warning/50"
              }`}
            >
              <Star className="w-5 h-5 text-warning" fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button
              onClick={onDownload}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-primary-foreground font-semibold transition-all hover:scale-[1.02]"
              style={{ backgroundColor: examTypeConfig.color, boxShadow: `0 8px 25px ${examTypeConfig.color}40` }}
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

// Sidebar Component
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
    { id: "dashboard", label: "Dashboard", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "exams", label: "All Exams", icon: <FolderOpen className="w-5 h-5" />, badge: allExams.length },
    { id: "favorites", label: "Favorites", icon: <Star className="w-5 h-5" />, badge: favorites.length },
    { id: "history", label: "Download History", icon: <Clock className="w-5 h-5" />, badge: downloadHistory.length },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-sidebar z-50 flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:z-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-sidebar-foreground text-sm">St. Mary's School</h1>
              <p className="text-xs text-sidebar-muted">Exam Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-sidebar-accent/80 to-sidebar-accent/40 border border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-primary-foreground shadow-lg"
                style={{ backgroundColor: gradeData?.color }}
              >
                {student?.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sidebar-foreground text-sm truncate">{student?.name}</h3>
                <p className="text-xs text-sidebar-muted">{student?.admissionNumber}</p>
              </div>
            </div>
            <div
              className="px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5"
              style={{ backgroundColor: `${gradeData?.color}25`, color: gradeData?.color }}
            >
              <Award className="w-3.5 h-3.5" />
              {gradeData?.label} • {gradeData?.description}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto scrollbar-hide">
          <p className="px-3 py-2 text-xs font-semibold text-sidebar-muted uppercase tracking-wider">Menu</p>
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
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeSection === item.id ? "bg-sidebar-primary-foreground/20" : "bg-sidebar-accent"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Exam Types */}
          <p className="px-3 py-2 mt-6 text-xs font-semibold text-sidebar-muted uppercase tracking-wider">Exam Types</p>
          <div className="space-y-1">
            {examTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setActiveSection("exams");
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-all"
              >
                <span className="p-1.5 rounded-lg" style={{ backgroundColor: type.bgColor, color: type.color }}>
                  {type.icon}
                </span>
                <span className="flex-1 text-left text-xs">{type.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

// Header Component
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
    <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="p-2 rounded-xl bg-secondary hover:bg-muted transition-colors lg:hidden">
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <div className="hidden md:block">
            <h2 className="font-semibold text-foreground">Welcome back, {student?.name?.split(" ")[0]}!</h2>
            <p className="text-sm text-muted-foreground">Ready to ace your exams?</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onExtendSession}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              isLow ? "bg-destructive/10 text-destructive border border-destructive/30 animate-pulse" : "bg-secondary text-muted-foreground"
            }`}
          >
            <Timer className="w-4 h-4" />
            <span className="hidden sm:inline">{minutes}:{seconds.toString().padStart(2, "0")}</span>
          </button>

          <button className="relative p-2.5 rounded-xl bg-secondary hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent"></span>
          </button>

          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-primary-foreground shadow-lg md:hidden"
            style={{ backgroundColor: gradeData?.color }}
          >
            {student?.name?.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

// Stats Card
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
  <div className="bg-card rounded-2xl p-5 border border-border shadow-card hover:shadow-card-hover transition-all group">
    <div className="flex items-start justify-between mb-3">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}15` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-lg">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </span>
      )}
    </div>
    <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
    {subtitle && <div className="text-xs text-muted-foreground/70 mt-1">{subtitle}</div>}
  </div>
);

// Quick Access Card
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
    className="bg-card rounded-2xl p-5 border border-border shadow-card hover:shadow-card-hover transition-all text-left group w-full"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${color}15` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <span className="text-2xl font-bold text-foreground">{count}</span>
    </div>
    <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{title}</h4>
    <p className="text-xs text-muted-foreground">{description}</p>
    <div className="flex items-center gap-1 mt-3 text-xs font-medium" style={{ color }}>
      View All <ArrowRight className="w-3 h-3" />
    </div>
  </button>
);

// Featured Exam Card
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
    className="relative bg-card rounded-2xl p-5 border border-border shadow-card hover:shadow-card-hover transition-all group overflow-hidden"
    style={{ borderLeft: `4px solid ${examTypeConfig.color}` }}
  >
    <div className="absolute top-3 right-3">
      <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-accent/10 text-accent">
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
          <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground">
            {exam.year}
          </span>
        </div>
        <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {exam.title}
        </h4>
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          {exam.term}
          <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
          <Clock className="w-3 h-3" />
          {exam.duration || "2 hrs"}
        </p>
      </div>
    </div>
    
    <div className="flex gap-2 mt-4">
      <button
        onClick={onPreview}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium border border-border bg-secondary hover:bg-muted transition-all"
      >
        <Eye className="w-3.5 h-3.5" />
        Preview
      </button>
      <button
        onClick={onDownload}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium text-primary-foreground transition-all"
        style={{ backgroundColor: examTypeConfig.color }}
      >
        <Download className="w-3.5 h-3.5" />
        Download
      </button>
    </div>
  </div>
);

// Skeleton Card
const SkeletonCard = ({ index }: { index: number }) => (
  <div
    className="bg-card rounded-2xl p-6 border border-border shadow-sm opacity-0 animate-fade-in-up"
    style={{ animationDelay: `${0.05 * index}s`, animationFillMode: "forwards" }}
  >
    <div className="flex justify-between mb-4">
      <div className="relative w-24 h-7 bg-muted rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/60 to-transparent animate-shimmer" />
      </div>
      <div className="relative w-20 h-6 bg-muted rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/60 to-transparent animate-shimmer" />
      </div>
    </div>
    <div className="relative w-4/5 h-5 bg-muted rounded mb-3 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/60 to-transparent animate-shimmer" />
    </div>
    <div className="relative w-3/5 h-4 bg-muted rounded mb-5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/60 to-transparent animate-shimmer" />
    </div>
    <div className="border-t border-border pt-4 flex justify-between items-center">
      <div className="relative w-24 h-6 bg-muted rounded overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/60 to-transparent animate-shimmer" />
      </div>
      <div className="relative w-28 h-10 bg-muted rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/60 to-transparent animate-shimmer" />
      </div>
    </div>
  </div>
);

// Exam Card
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
    className={`bg-card rounded-2xl p-5 border border-border shadow-card cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover group opacity-0 animate-fade-in-up ${
      viewMode === "list" ? "grid grid-cols-[auto_1fr_auto] items-center gap-5" : ""
    }`}
    style={{ animationDelay: `${0.03 * index}s`, animationFillMode: "forwards" }}
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
            style={{ backgroundColor: examTypeConfig.bgColor, color: examTypeConfig.color }}
          >
            {examTypeConfig.icon}
          </span>
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">{exam.year}</span>
        </div>
      </div>

      <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {exam.title}
      </h3>

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
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

    <div className={`flex gap-2 ${viewMode === "grid" ? "border-t border-border pt-4 mt-4 justify-between items-center" : "shrink-0"}`}>
      <button
        onClick={onToggleFavorite}
        className={`p-2.5 rounded-xl border-2 transition-all hover:scale-105 ${
          isFavorite ? "border-warning bg-warning/10" : "border-border bg-card hover:border-warning/50"
        }`}
      >
        <Star className="w-5 h-5 text-warning" fill={isFavorite ? "currentColor" : "none"} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPreview();
        }}
        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium border border-border bg-secondary hover:bg-muted transition-all"
      >
        <Eye className="w-4 h-4" />
        <span className="hidden sm:inline">Preview</span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDownload();
        }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all hover:scale-105"
        style={{ backgroundColor: examTypeConfig.color, boxShadow: `0 4px 15px ${examTypeConfig.color}30` }}
      >
        <Download className="w-4 h-4" />
      </button>
    </div>
  </article>
);

// Filter Select
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
    <label className="block text-sm font-medium text-muted-foreground mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full py-2.5 px-3 text-sm border-2 border-border rounded-xl bg-card text-foreground outline-none cursor-pointer transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
    >
      {options.map((option) => (
        <option key={option} value={option} className="bg-popover text-popover-foreground">
          {option === "all" ? `All ${label}s` : option}
        </option>
      ))}
    </select>
  </div>
);

// ============================================
// MAIN COMPONENT
// ============================================
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

  const [selectedExamType, setSelectedExamType] = useState<"all" | "opener" | "midterm" | "endterm" | "mock">("all");
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

  // Theme - default dark
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

  // Session timeout
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
    events.forEach((event) => window.addEventListener(event, updateActivity, { passive: true }));

    return () => {
      clearInterval(interval);
      events.forEach((event) => window.removeEventListener(event, updateActivity));
    };
  }, [isAuthenticated, lastActivity, updateActivity]);

  // Load saved data
  useEffect(() => {
    const savedAuth = localStorage.getItem("examAuth");
    const savedHistory = localStorage.getItem("downloadHistory");
    const savedFavorites = localStorage.getItem("favorites");
    const savedLastActivity = localStorage.getItem("lastActivity");

    if (savedAuth) {
      const lastActivityTime = savedLastActivity ? parseInt(savedLastActivity) : Date.now();
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
        (s) => s.admissionNumber === admissionNumber.trim() && s.code === code.trim()
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
    const matchesExamType = selectedExamType === "all" || exam.examType === selectedExamType;
    const matchesSubject = selectedSubject === "all" || exam.subject === selectedSubject;
    const matchesTerm = selectedTerm === "all" || exam.term === selectedTerm;
    const matchesYear = selectedYear === "all" || exam.year === selectedYear;

    return matchesSearch && matchesExamType && matchesSubject && matchesTerm && matchesYear;
  });

  const favoriteExams = allExams.filter((exam) => favorites.includes(exam.id));
  const subjects = ["all", ...new Set(allExams.map((e) => e.subject))];
  const terms = ["all", ...new Set(allExams.map((e) => e.term))];
  const years = ["all", ...new Set(allExams.map((e) => e.year))];

  const getExamTypeConfig = (type: string) => examTypes.find((t) => t.id === type) || examTypes[0];

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-sidebar relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--sidebar-border)) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="absolute top-[10%] left-[10%] w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/20 animate-float" />
        <div className="absolute top-[60%] left-[5%] w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 border border-accent/20 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[20%] right-[10%] w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[20%] right-[15%] w-24 h-24 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 border border-accent/20 animate-float" style={{ animationDelay: "0.5s" }} />

        <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] bg-[radial-gradient(circle,hsl(var(--primary)/0.3),transparent_70%)] rounded-full blur-[60px] animate-pulse-glow" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,hsl(var(--accent)/0.25),transparent_70%)] rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

        <div className="relative w-full max-w-[440px] bg-sidebar-accent/30 backdrop-blur-2xl rounded-3xl p-10 border border-sidebar-border shadow-2xl">
          <div className="absolute -top-px left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />

          <div className="text-center mb-8">
            <div className="relative w-20 h-20 mx-auto mb-5">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary to-accent animate-spin-slow opacity-70 blur-sm" />
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-lg">
                <GraduationCap className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-sidebar-foreground mb-2">St. Mary's School</h1>
            <p className="text-sm text-sidebar-muted">Access your exam papers securely</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-sidebar-foreground/70">
                <User className="w-4 h-4 text-primary" />
                Admission Number
              </label>
              <input
                type="text"
                value={admissionNumber}
                onChange={(e) => setAdmissionNumber(e.target.value)}
                placeholder="Enter your admission number"
                className="w-full px-4 py-4 text-base border border-sidebar-border rounded-xl bg-sidebar-accent/50 text-sidebar-foreground placeholder:text-sidebar-muted outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-sidebar-foreground/70">
                <Lock className="w-4 h-4 text-primary" />
                Access Code
              </label>
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your unique access code"
                className="w-full px-4 py-4 text-base border border-sidebar-border rounded-xl bg-sidebar-accent/50 text-sidebar-foreground placeholder:text-sidebar-muted outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2.5 p-3.5 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full py-4 px-6 text-base font-semibold text-primary-foreground bg-gradient-to-r from-primary to-accent border-none rounded-xl cursor-pointer transition-all mt-2 overflow-hidden shadow-glow hover:shadow-glow-lg hover:scale-[1.02] disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
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

          <p className="text-center mt-6 text-xs text-sidebar-muted">
            Contact your school administrator for access credentials.
          </p>
        </div>
      </div>
    );
  }

  // Main Portal
  return (
    <div className="min-h-screen bg-background flex">
      {showWarning && <SessionWarningModal timeRemaining={timeRemaining} onExtendSession={handleExtendSession} />}

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
            
            {/* Dashboard Section */}
            {activeSection === "dashboard" && (
              <>
                {/* Welcome Hero */}
                <div className="relative overflow-hidden bg-gradient-to-br from-card via-card to-secondary/30 rounded-3xl p-6 lg:p-8 border border-border">
                  <div
                    className="absolute -top-24 -right-12 w-64 h-64 rounded-full blur-[80px] opacity-50"
                    style={{ background: `radial-gradient(circle, ${studentGrade?.color}40, transparent 70%)` }}
                  />
                  <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-[60px] opacity-30" style={{ background: `radial-gradient(circle, hsl(var(--accent)), transparent 70%)` }} />
                  
                  <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                      <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 border"
                        style={{ background: `${studentGrade?.color}15`, borderColor: `${studentGrade?.color}30`, color: studentGrade?.color }}
                      >
                        <Zap className="w-4 h-4" />
                        {studentGrade?.label} • {studentGrade?.description}
                      </div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Your Learning Dashboard</h1>
                      <p className="text-muted-foreground max-w-lg">
                        Track your progress, download exams, and prepare for success. You have access to {allExams.length} exam papers.
                      </p>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => setActiveSection("exams")}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-all"
                      >
                        <BookOpen className="w-5 h-5" />
                        Browse Exams
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard icon={<FileText className="w-6 h-6" />} label="Total Exams" value={allExams.length} color={studentGrade?.color || "#6366f1"} subtitle="Available for download" />
                  <StatsCard icon={<Download className="w-6 h-6" />} label="Downloads" value={downloadHistory.length} color="hsl(142, 76%, 36%)" trend="+12%" subtitle="This semester" />
                  <StatsCard icon={<Star className="w-6 h-6" />} label="Favorites" value={favorites.length} color="hsl(38, 92%, 50%)" subtitle="Saved exams" />
                  <StatsCard icon={<CheckCircle2 className="w-6 h-6" />} label="Completion" value={`${Math.round((downloadHistory.length / Math.max(allExams.length, 1)) * 100)}%`} color="hsl(217, 91%, 60%)" subtitle="Download rate" />
                </div>

                {/* Quick Access */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">Quick Access</h2>
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

                {/* Featured Exams */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Flame className="w-5 h-5 text-accent" />
                      Featured Exams
                    </h2>
                    <button
                      onClick={() => setActiveSection("exams")}
                      className="text-sm font-medium text-primary flex items-center gap-1 hover:underline"
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

                {/* Recent Activity & Favorites Row */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Recent Downloads */}
                  <div className="bg-card rounded-2xl p-5 border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Recent Activity
                      </h3>
                      {downloadHistory.length > 0 && (
                        <button onClick={() => setActiveSection("history")} className="text-xs font-medium text-primary hover:underline">
                          View All
                        </button>
                      )}
                    </div>
                    {downloadHistory.length === 0 ? (
                      <div className="text-center py-8">
                        <FileQuestion className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No downloads yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {downloadHistory.slice(0, 4).map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{item.examTitle}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(item.downloadedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Favorites */}
                  <div className="bg-card rounded-2xl p-5 border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Star className="w-5 h-5 text-warning" />
                        Your Favorites
                      </h3>
                      {favoriteExams.length > 0 && (
                        <button onClick={() => setActiveSection("favorites")} className="text-xs font-medium text-primary hover:underline">
                          View All
                        </button>
                      )}
                    </div>
                    {favoriteExams.length === 0 ? (
                      <div className="text-center py-8">
                        <Star className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No favorites yet</p>
                        <p className="text-xs text-muted-foreground mt-1">Star exams to save them here</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {favoriteExams.slice(0, 4).map((exam) => {
                          const typeConfig = getExamTypeConfig(exam.examType);
                          return (
                            <div
                              key={exam.id}
                              onClick={() => setPreviewExam(exam)}
                              className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl cursor-pointer hover:bg-muted transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: typeConfig.bgColor }}>
                                <FileText className="w-5 h-5" style={{ color: typeConfig.color }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{exam.title}</p>
                                <p className="text-xs text-muted-foreground">{exam.subject}</p>
                              </div>
                              <Star className="w-5 h-5 text-warning" fill="currentColor" />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Exams Section */}
            {activeSection === "exams" && (
              <>
                {/* Search Header */}
                <div className="bg-card rounded-2xl p-5 border border-border">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search exams by title or subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-3 pl-12 pr-4 text-base border-2 border-border rounded-xl bg-background outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                          showFilters ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <Filter className="w-4 h-4" />
                        Filters
                        <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                      </button>
                      <button
                        onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground bg-secondary rounded-xl hover:bg-muted transition-all"
                      >
                        {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {showFilters && (
                    <div className="mt-4 pt-4 border-t border-border animate-fade-in-up">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FilterSelect label="Subject" value={selectedSubject} options={subjects} onChange={setSelectedSubject} />
                        <FilterSelect label="Term" value={selectedTerm} options={terms} onChange={setSelectedTerm} />
                        <FilterSelect label="Year" value={selectedYear} options={years} onChange={setSelectedYear} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Exam Type Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <button
                    onClick={() => setSelectedExamType("all")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap text-sm ${
                      selectedExamType === "all"
                        ? "text-primary-foreground shadow-glow"
                        : "bg-card border border-border text-muted-foreground hover:bg-secondary"
                    }`}
                    style={selectedExamType === "all" ? { backgroundColor: studentGrade?.color } : {}}
                  >
                    <Layers className="w-4 h-4" />
                    All
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${selectedExamType === "all" ? "bg-primary-foreground/20" : "bg-muted"}`}>
                      {examCounts.all}
                    </span>
                  </button>

                  {examTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedExamType(type.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap text-sm ${
                        selectedExamType === type.id
                          ? "text-primary-foreground shadow-lg"
                          : "bg-card border border-border text-muted-foreground hover:bg-secondary"
                      }`}
                      style={selectedExamType === type.id ? { backgroundColor: type.color } : {}}
                    >
                      <span className={selectedExamType !== type.id ? "p-1 rounded-md" : ""} style={selectedExamType !== type.id ? { backgroundColor: type.bgColor, color: type.color } : {}}>
                        {type.icon}
                      </span>
                      <span className="hidden sm:inline">{type.label.split(" ")[0]}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${selectedExamType === type.id ? "bg-primary-foreground/20" : "bg-muted"}`}>
                        {examCounts[type.id]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Results Info */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing <strong className="text-foreground">{filteredExams.length}</strong> of {allExams.length} exams
                  </p>
                </div>

                {/* Exam Grid */}
                {loadingExams ? (
                  <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" : "flex flex-col gap-4"}>
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} index={i} />)}
                  </div>
                ) : filteredExams.length === 0 ? (
                  <div className="text-center py-16 bg-card rounded-2xl border border-border">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No exams found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" : "flex flex-col gap-4"}>
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

            {/* Favorites Section */}
            {activeSection === "favorites" && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <Star className="w-6 h-6 text-warning" />
                      Your Favorites
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Exams you've saved for quick access</p>
                  </div>
                </div>

                {favoriteExams.length === 0 ? (
                  <div className="text-center py-16 bg-card rounded-2xl border border-border">
                    <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No favorites yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">Star exams to add them to your favorites</p>
                    <button
                      onClick={() => setActiveSection("exams")}
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium"
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

            {/* History Section */}
            {activeSection === "history" && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <Clock className="w-6 h-6 text-primary" />
                      Download History
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Your recently downloaded exams</p>
                  </div>
                </div>

                {downloadHistory.length === 0 ? (
                  <div className="text-center py-16 bg-card rounded-2xl border border-border">
                    <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No downloads yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">Start downloading exams to see your history</p>
                    <button
                      onClick={() => setActiveSection("exams")}
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium"
                    >
                      Browse Exams
                    </button>
                  </div>
                ) : (
                  <div className="bg-card rounded-2xl border border-border overflow-hidden">
                    <div className="divide-y divide-border">
                      {downloadHistory.map((item, index) => {
                        const exam = allExams.find((e) => e.id === item.examId);
                        const typeConfig = exam ? getExamTypeConfig(exam.examType) : examTypes[0];
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={() => exam && setPreviewExam(exam)}
                          >
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: typeConfig.bgColor }}>
                              <FileText className="w-6 h-6" style={{ color: typeConfig.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">{item.examTitle}</p>
                              <p className="text-sm text-muted-foreground">
                                Downloaded on {new Date(item.downloadedAt).toLocaleDateString()} at{" "}
                                {new Date(item.downloadedAt).toLocaleTimeString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-success" />
                              <ChevronRight className="w-5 h-5 text-muted-foreground" />
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

        {/* Footer */}
        <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-5 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} St. Mary's School Bomet • Exam Portal • Developed by Manuwebdesigns</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
