"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Search,
  Download,
  FileText,
  Calendar,
  GraduationCap,
  ExternalLink,
  BookOpen,
  FolderOpen,
  LogOut,
  User,
  Lock,
  AlertCircle,
  Sparkles,
  Filter,
  Clock,
  Star,
} from "lucide-react";

interface Exam {
  id: number;
  title: string;
  subject: string;
  term: string;
  year: string;
  googleDriveLink: string;
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

// ============================================
// CONFIGURE YOUR STUDENTS HERE
// ============================================
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
      {
        id: 1,
        title: "Mathematics Mid-Term",
        subject: "Mathematics",
        term: "Term 1",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 2,
        title: "English Language Paper",
        subject: "English",
        term: "Term 1",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 3,
        title: "Science End-Term",
        subject: "Science",
        term: "Term 2",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
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
        title: "Mathematics Final Exam",
        subject: "Mathematics",
        term: "Term 3",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 5,
        title: "Integrated Science",
        subject: "Science",
        term: "Term 2",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 6,
        title: "Social Studies Paper",
        subject: "Social Studies",
        term: "Term 1",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
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
        title: "Physics Paper 1",
        subject: "Physics",
        term: "Term 1",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 8,
        title: "Chemistry Practical",
        subject: "Chemistry",
        term: "Term 2",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 9,
        title: "Biology End-Term",
        subject: "Biology",
        term: "Term 3",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
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
        title: "Advanced Mathematics",
        subject: "Mathematics",
        term: "Term 1",
        year: "2026",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 11,
        title: "English Composition",
        subject: "English",
        term: "Term 1",
        year: "2026",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 12,
        title: "Geography Paper",
        subject: "Geography",
        term: "Term 1",
        year: "2026",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 12,
        title: "Computer Paper",
        subject: "Computer",
        term: "Term 1",
        year: "2026",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
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
        id: 13,
        title: "Physics Theory & Practical",
        subject: "Physics",
        term: "Term 1",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 14,
        title: "Chemistry Paper 1 & 2",
        subject: "Chemistry",
        term: "Term 2",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 15,
        title: "Biology Paper 1 & 2",
        subject: "Biology",
        term: "Term 2",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 16,
        title: "Mathematics Paper 1 & 2",
        subject: "Mathematics",
        term: "Term 3",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
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
        id: 17,
        title: "KCSE Mathematics",
        subject: "Mathematics",
        term: "Mock",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 18,
        title: "KCSE English Paper 1-3",
        subject: "English",
        term: "Mock",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 19,
        title: "KCSE Physics",
        subject: "Physics",
        term: "Mock",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 20,
        title: "KCSE Chemistry",
        subject: "Chemistry",
        term: "Mock",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 21,
        title: "KCSE Biology",
        subject: "Biology",
        term: "Mock",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
    ],
  },
];

const keyframes = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.1); }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const skeletonBase: React.CSSProperties = {
  position: "relative",
  backgroundColor: "#f1f5f9",
  overflow: "hidden",
};

const shimmerStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
  animation: "shimmer 1.5s infinite",
};

// Skeleton Card Component
const SkeletonCard = ({ color, index }: { color: string; index: number }) => (
  <div
    style={{
      backgroundColor: "#ffffff",
      borderRadius: 20,
      padding: 26,
      border: "1px solid #e2e8f0",
      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
      borderTop: `4px solid ${color}40`,
      animation: `fadeInUp 0.3s ease-out ${0.05 * index}s forwards`,
      opacity: 0,
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 16,
      }}
    >
      <div style={{ ...skeletonBase, width: 90, height: 32, borderRadius: 10 }}>
        <div style={shimmerStyle} />
      </div>
      <div style={{ ...skeletonBase, width: 80, height: 28, borderRadius: 8 }}>
        <div style={shimmerStyle} />
      </div>
    </div>
    <div
      style={{
        ...skeletonBase,
        width: "85%",
        height: 22,
        borderRadius: 6,
        marginBottom: 10,
      }}
    >
      <div style={shimmerStyle} />
    </div>
    <div
      style={{
        ...skeletonBase,
        width: "60%",
        height: 22,
        borderRadius: 6,
        marginBottom: 20,
      }}
    >
      <div style={shimmerStyle} />
    </div>
    <div
      style={{
        borderTop: "1px solid #f1f5f9",
        paddingTop: 18,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ ...skeletonBase, width: 100, height: 24, borderRadius: 6 }}>
        <div style={shimmerStyle} />
      </div>
      <div
        style={{
          ...skeletonBase,
          width: 110,
          height: 42,
          borderRadius: 12,
          backgroundColor: `${color}15`,
        }}
      >
        <div style={shimmerStyle} />
      </div>
    </div>
  </div>
);

const styles: { [key: string]: React.CSSProperties } = {
  loginContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    background:
      "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  bgPattern: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
    backgroundSize: "40px 40px",
  },
  floatingShape: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: "20%",
    background:
      "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1))",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    animation: "float 6s ease-in-out infinite",
  },
  glowOrb1: {
    position: "absolute",
    top: "20%",
    left: "15%",
    width: 300,
    height: 300,
    background:
      "radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent 70%)",
    borderRadius: "50%",
    filter: "blur(60px)",
    animation: "pulse-glow 4s ease-in-out infinite",
  },
  glowOrb2: {
    position: "absolute",
    bottom: "10%",
    right: "10%",
    width: 400,
    height: 400,
    background:
      "radial-gradient(circle, rgba(139, 92, 246, 0.25), transparent 70%)",
    borderRadius: "50%",
    filter: "blur(80px)",
    animation: "pulse-glow 5s ease-in-out infinite 1s",
  },
  glowOrb3: {
    position: "absolute",
    top: "50%",
    right: "30%",
    width: 200,
    height: 200,
    background:
      "radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent 70%)",
    borderRadius: "50%",
    filter: "blur(50px)",
    animation: "pulse-glow 6s ease-in-out infinite 2s",
  },
  loginCard: {
    position: "relative",
    width: "100%",
    maxWidth: 440,
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(20px)",
    borderRadius: 28,
    padding: "48px 36px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow:
      "0 25px 80px -20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
  },
  cardGlow: {
    position: "absolute",
    top: -1,
    left: "10%",
    right: "10%",
    height: 2,
    background:
      "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), rgba(139, 92, 246, 0.5), transparent)",
    borderRadius: "50%",
    filter: "blur(1px)",
  },
  loginHeader: {
    textAlign: "center",
    marginBottom: 36,
  },
  loginIconWrapper: {
    position: "relative",
    width: 80,
    height: 80,
    margin: "0 auto 24px",
  },
  loginIconRing: {
    position: "absolute",
    inset: -4,
    borderRadius: "50%",
    border: "2px solid transparent",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899) border-box",
    WebkitMask:
      "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
    animation: "pulse-glow 2s ease-in-out infinite",
  },
  loginIcon: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 40px rgba(99, 102, 241, 0.4)",
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: 700,
    background: "linear-gradient(135deg, #ffffff, #94a3b8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: 10,
    letterSpacing: "-0.5px",
  },
  loginSubtitle: {
    fontSize: 14,
    color: "rgba(148, 163, 184, 0.8)",
    lineHeight: 1.6,
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    gap: 22,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  inputLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    fontWeight: 600,
    color: "rgba(255, 255, 255, 0.7)",
    letterSpacing: "0.3px",
  },
  input: {
    width: "100%",
    padding: "16px 18px",
    fontSize: 15,
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#ffffff",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 18px",
    background: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: 12,
    color: "#f87171",
    fontSize: 13,
  },
  loginButton: {
    position: "relative",
    width: "100%",
    padding: "18px 24px",
    fontSize: 15,
    fontWeight: 600,
    color: "#ffffff",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    borderRadius: 14,
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: 8,
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(99, 102, 241, 0.3)",
    letterSpacing: "0.3px",
  },
  buttonShimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
    backgroundSize: "200% 100%",
    animation: "shimmer 2s infinite",
  },
  spinner: {
    width: 18,
    height: 18,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loginFooter: {
    textAlign: "center",
    marginTop: 28,
    fontSize: 12,
    color: "rgba(148, 163, 184, 0.5)",
  },
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  header: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 700,
    color: "#ffffff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  userName: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 3,
  },
  userInfo: {
    fontSize: 13,
    color: "#64748b",
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 20px",
    fontSize: 13,
    fontWeight: 600,
    color: "#64748b",
    backgroundColor: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  heroSection: {
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
  },
  heroBgPattern: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)",
    backgroundSize: "30px 30px",
  },
  heroOrb1: {
    position: "absolute",
    top: -100,
    right: -50,
    width: 400,
    height: 400,
    borderRadius: "50%",
    filter: "blur(60px)",
    transition: "background 0.5s ease",
  },
  heroOrb2: {
    position: "absolute",
    bottom: -50,
    left: -50,
    width: 300,
    height: 300,
    borderRadius: "50%",
    filter: "blur(50px)",
    transition: "background 0.5s ease",
  },
  heroContent: {
    position: "relative",
    maxWidth: 900,
    margin: "0 auto",
    padding: "48px 24px 44px",
    textAlign: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 22px",
    borderRadius: 50,
    fontSize: 14,
    marginBottom: 20,
    border: "1px solid",
    transition: "all 0.3s ease",
  },
  title: {
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 14,
    lineHeight: 1.15,
    letterSpacing: "-1px",
  },
  subtitle: {
    fontSize: "clamp(1rem, 2vw, 1.1rem)",
    color: "#64748b",
    maxWidth: 520,
    margin: "0 auto 28px",
    lineHeight: 1.7,
  },
  searchContainer: {
    position: "relative",
    maxWidth: 480,
    margin: "0 auto",
  },
  searchIcon: {
    position: "absolute",
    left: 18,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
    width: 20,
    height: 20,
  },
  searchInput: {
    width: "100%",
    padding: "16px 18px 16px 52px",
    fontSize: 15,
    border: "2px solid #e2e8f0",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },
  mainContent: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "32px 24px 80px",
  },
  resultsCount: {
    fontSize: 15,
    color: "#64748b",
    marginBottom: 24,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 26,
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 10,
  },
  subjectBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    padding: "8px 14px",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
  },
  termBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    color: "#64748b",
    backgroundColor: "#f1f5f9",
    padding: "6px 12px",
    borderRadius: 8,
    fontWeight: 500,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 20,
    lineHeight: 1.4,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 18,
    borderTop: "1px solid #f1f5f9",
  },
  driveIndicator: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  driveText: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: 500,
  },
  downloadButton: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "12px 18px",
    fontSize: 13,
    fontWeight: 600,
    color: "#ffffff",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
    border: "1px solid rgba(0,0,0,0.05)",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 10,
  },
  emptyText: {
    color: "#64748b",
    fontSize: 15,
  },
  footer: {
    borderTop: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
  },
  footerContent: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "28px 24px",
    textAlign: "center",
    fontSize: 13,
    color: "#94a3b8",
  },
  yearBadge: {
    //
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    color: "#64748b",
    backgroundColor: "#f1f5f9",
    padding: "6px 12px",
    borderRadius: 8,
    fontWeight: 500,
  },
  cardMeta: {
    //
    display: "flex",
    gap: 12,
    fontSize: 13,
    color: "#64748b",
    marginTop: 12,
  },
  metaItem: {
    //
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
};

export default function ExamDownloads() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(""); // Renamed loginError to error
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Renamed searchQuery to searchTerm
  const [loadingExams, setLoadingExams] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedTerm, setSelectedTerm] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistory[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const savedAuth = localStorage.getItem("examAuth");
    const savedHistory = localStorage.getItem("downloadHistory");
    const savedFavorites = localStorage.getItem("favorites");

    if (savedAuth) {
      const student = JSON.parse(savedAuth);
      setCurrentStudent(student);
      setIsAuthenticated(true);
      setLoadingExams(true);
      setTimeout(() => setLoadingExams(false), 800);
    }

    if (savedHistory) {
      setDownloadHistory(JSON.parse(savedHistory));
    }

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

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
        localStorage.setItem("examAuth", JSON.stringify(student));
        setLoadingExams(true);
        setTimeout(() => setLoadingExams(false), 1200);
      } else {
        setError("Invalid admission number or code. Please try again.");
      }
      setIsLoading(false);
    }, 1200);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentStudent(null);
    setAdmissionNumber("");
    setCode("");
    setLoadingExams(false);
    localStorage.removeItem("examAuth");
    localStorage.removeItem("downloadHistory"); // Clear other stored data on logout
    localStorage.removeItem("favorites");
  };

  const handleDownload = (exam: Exam) => {
    const newDownload: DownloadHistory = {
      examId: exam.id,
      examTitle: exam.title,
      downloadedAt: new Date(),
    };
    // Keep the last 10 downloads
    const updatedHistory = [newDownload, ...downloadHistory].slice(0, 10);
    setDownloadHistory(updatedHistory);
    localStorage.setItem("downloadHistory", JSON.stringify(updatedHistory));
    window.open(exam.googleDriveLink, "_blank");
  };

  const toggleFavorite = (examId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    const updatedFavorites = favorites.includes(examId)
      ? favorites.filter((id) => id !== examId)
      : [...favorites, examId];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Get the current student's grade data
  const studentGrade = gradesData.find((g) => g.id === currentStudent?.grade);
  const allExams = studentGrade?.exams || [];

  const filteredExams = allExams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" || exam.subject === selectedSubject;
    const matchesTerm = selectedTerm === "all" || exam.term === selectedTerm;
    const matchesYear = selectedYear === "all" || exam.year === selectedYear;

    return matchesSearch && matchesSubject && matchesTerm && matchesYear;
  });

  const subjects = ["all", ...new Set(allExams.map((e) => e.subject))];
  const terms = ["all", ...new Set(allExams.map((e) => e.term))];
  const years = ["all", ...new Set(allExams.map((e) => e.year))];

  // Get recent downloads (last 5)
  const recentDownloads = downloadHistory.slice(0, 5);

  // Login Screen
  if (!isAuthenticated) {
    return (
      <>
        <style>{keyframes}</style>
        <div style={styles.loginContainer}>
          <div style={styles.bgPattern} />
          <div
            style={{
              ...styles.floatingShape,
              top: "10%",
              left: "10%",
              animationDelay: "0s",
            }}
          />
          <div
            style={{
              ...styles.floatingShape,
              top: "60%",
              left: "5%",
              animationDelay: "1s",
              width: 80,
              height: 80,
            }}
          />
          <div
            style={{
              ...styles.floatingShape,
              top: "20%",
              right: "10%",
              animationDelay: "2s",
              width: 60,
              height: 60,
            }}
          />
          <div
            style={{
              ...styles.floatingShape,
              bottom: "20%",
              right: "15%",
              animationDelay: "0.5s",
              width: 100,
              height: 100,
            }}
          />

          <div style={styles.glowOrb1} />
          <div style={styles.glowOrb2} />
          <div style={styles.glowOrb3} />

          <div
            style={{
              ...styles.loginCard,
              // Removed animation for login screen, using hardcoded delay
              // animation: mounted ? "scaleIn 0.6s ease-out forwards" : "none",
            }}
          >
            <div style={styles.cardGlow} />

            <div style={styles.loginHeader}>
              <div style={styles.loginIconWrapper}>
                <div style={styles.loginIconRing} />
                <div style={styles.loginIcon}>
                  <GraduationCap
                    style={{ width: 36, height: 36, color: "#ffffff" }}
                  />
                </div>
              </div>
              <h1 style={styles.loginTitle}>St. Mary's School</h1>
              <p style={styles.loginSubtitle}>
                Access your exam papers and study materials securely
              </p>
            </div>

            <form onSubmit={handleLogin} style={styles.loginForm}>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>
                  <User style={{ width: 16, height: 16, color: "#6366f1" }} />
                  Admission Number
                </label>
                <input
                  type="text"
                  value={admissionNumber}
                  onChange={(e) => setAdmissionNumber(e.target.value)}
                  placeholder="Enter your admission number"
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>
                  <Lock style={{ width: 16, height: 16, color: "#6366f1" }} />
                  Access Code
                </label>
                <input
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter your unique access code"
                  style={styles.input}
                  required
                />
              </div>

              {error && (
                <div style={styles.errorBox}>
                  <AlertCircle
                    style={{ width: 18, height: 18, flexShrink: 0 }}
                  />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  ...styles.loginButton,
                  opacity: isLoading ? 0.8 : 1,
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                <span style={styles.buttonShimmer} />
                {isLoading ? (
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span style={styles.spinner} />
                    Verifying...
                  </span>
                ) : (
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Sparkles style={{ width: 18, height: 18 }} />
                    Access Portal
                  </span>
                )}
              </button>
            </form>

            <p style={styles.loginFooter}>
              Contact your school administrator if you don't have access
              credentials.
            </p>
          </div>
        </div>
      </>
    );
  }

  // Main Exam Portal (Authenticated)
  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerLeft}>
              <div
                style={{
                  ...styles.userAvatar,
                  background: studentGrade?.color || "#6366f1", // Use grade color or default
                }}
              >
                {currentStudent?.name.charAt(0)}
              </div>
              <div>
                <h2 style={styles.userName}>{currentStudent?.name}</h2>
                <p style={styles.userInfo}>
                  {studentGrade?.label} • {currentStudent?.admissionNumber}
                </p>
              </div>
            </div>
            <button onClick={handleLogout} style={styles.logoutButton}>
              <LogOut style={{ width: 18, height: 18 }} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <section style={styles.heroSection}>
          <div style={styles.heroBgPattern} />
          <div
            style={{
              ...styles.heroOrb1,
              background: `radial-gradient(circle, ${studentGrade?.color}30, transparent 70%)`,
            }}
          />
          <div
            style={{
              ...styles.heroOrb2,
              background: `radial-gradient(circle, ${studentGrade?.color}20, transparent 70%)`,
            }}
          />

          <div style={styles.heroContent}>
            <div
              style={{
                ...styles.badge,
                background: `linear-gradient(135deg, ${studentGrade?.color}15, ${studentGrade?.color}05)`,
                borderColor: `${studentGrade?.color}30`,
                // animation: mounted ? "fadeInUp 0.5s ease-out forwards" : "none", // Removed animation for consistency
                opacity: 1, // Ensure visible
              }}
            >
              <Sparkles // Changed icon
                style={{ width: 18, height: 18, color: studentGrade?.color }}
              />
              <span style={{ color: studentGrade?.color, fontWeight: 600 }}>
                {studentGrade?.description}
              </span>
              <span style={{ color: "#64748b" }}>•</span>
              <span style={{ color: "#64748b" }}>{studentGrade?.label}</span>
            </div>

            <h1
              style={{
                ...styles.title,
                // animation: mounted ? "fadeInUp 0.5s ease-out 0.1s forwards" : "none", // Removed animation
                opacity: 1, // Ensure visible
              }}
            >
              Exam Papers & Study Materials
            </h1>

            <p
              style={{
                ...styles.subtitle,
                // animation: mounted ? "fadeInUp 0.5s ease-out 0.2s forwards" : "none", // Removed animation
                opacity: 1, // Ensure visible
              }}
            >
              Access all your {studentGrade?.label} examination papers and
              practice materials in one place
            </p>

            <div
              style={{
                ...styles.searchContainer,
                // animation: mounted ? "fadeInUp 0.5s ease-out 0.3s forwards" : "none", // Removed animation
                opacity: 1, // Ensure visible
              }}
            >
              <Search style={styles.searchIcon as React.CSSProperties} />
              <input
                type="text"
                placeholder="Search by exam title or subject..."
                value={searchTerm} //
                onChange={(e) => setSearchTerm(e.target.value)} //
                style={styles.searchInput}
              />
            </div>

            <div
              style={{
                marginTop: 20,
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: showFilters ? "#ffffff" : "#64748b",
                  backgroundColor: showFilters
                    ? studentGrade?.color
                    : "#ffffff",
                  border: `2px solid ${
                    showFilters ? studentGrade?.color : "#e2e8f0"
                  }`,
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <Filter size={16} />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>

              <button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#64748b",
                  backgroundColor: "#ffffff",
                  border: "2px solid #e2e8f0",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                {viewMode === "grid" ? (
                  <FolderOpen size={16} />
                ) : (
                  <BookOpen size={16} />
                )}
                {viewMode === "grid" ? "List View" : "Grid View"}
              </button>
            </div>
          </div>
        </section>

        {showFilters && (
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "24px",
              animation: "fadeInUp 0.3s ease-out",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 16,
                padding: 24,
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
                  Filter Options
                </h3>
                <button
                  onClick={() => {
                    setSelectedSubject("all");
                    setSelectedTerm("all");
                    setSelectedYear("all");
                  }}
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: studentGrade?.color,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Clear All
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 16,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#64748b",
                      marginBottom: 8,
                    }}
                  >
                    Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: 14,
                      border: "2px solid #e2e8f0",
                      borderRadius: 10,
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject === "all" ? "All Subjects" : subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#64748b",
                      marginBottom: 8,
                    }}
                  >
                    Term
                  </label>
                  <select
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: 14,
                      border: "2px solid #e2e8f0",
                      borderRadius: 10,
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {terms.map((term) => (
                      <option key={term} value={term}>
                        {term === "all" ? "All Terms" : term}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#64748b",
                      marginBottom: 8,
                    }}
                  >
                    Year
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: 14,
                      border: "2px solid #e2e8f0",
                      borderRadius: 10,
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year === "all" ? "All Years" : year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main style={styles.mainContent}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 20,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 16,
                padding: 20,
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${studentGrade?.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FileText size={20} color={studentGrade?.color} />
                </div>
                <div>
                  <div
                    style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}
                  >
                    {allExams.length}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    Total Exams
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 16,
                padding: 20,
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#10b98115",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Download size={20} color="#10b981" />
                </div>
                <div>
                  <div
                    style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}
                  >
                    {downloadHistory.length}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    Downloads
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 16,
                padding: 20,
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#f59e0b15",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Star size={20} color="#f59e0b" />
                </div>
                <div>
                  <div
                    style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}
                  >
                    {favorites.length}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    Favorites
                  </div>
                </div>
              </div>
            </div>
          </div>

          {recentDownloads.length > 0 && (
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 16,
                padding: 24,
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <Clock size={20} color={studentGrade?.color} />
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
                  Recent Downloads
                </h3>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {recentDownloads.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 12,
                      backgroundColor: "#f8fafc",
                      borderRadius: 10,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <FileText size={16} color="#64748b" />
                      <span
                        style={{
                          fontSize: 14,
                          color: "#0f172a",
                          fontWeight: 500,
                        }}
                      >
                        {item.examTitle}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>
                      {new Date(item.downloadedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <p style={styles.resultsCount}>
              Showing <strong>{filteredExams.length}</strong> of{" "}
              {allExams.length} exams
            </p>
          </div>

          {loadingExams ? (
            <div
              style={
                viewMode === "grid"
                  ? styles.grid
                  : { display: "flex", flexDirection: "column", gap: 16 }
              }
            >
              {[...Array(6)].map((_, i) => (
                <SkeletonCard
                  key={i}
                  color={studentGrade?.color || "#6366f1"}
                  index={i}
                />
              ))}
            </div>
          ) : filteredExams.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                backgroundColor: "#ffffff",
                borderRadius: 20,
                border: "1px solid #e2e8f0",
              }}
            >
              <BookOpen
                size={48}
                color="#cbd5e1"
                style={{ marginBottom: 16 }}
              />
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#0f172a",
                  marginBottom: 8,
                }}
              >
                No exams found
              </h3>
              <p style={{ fontSize: 14, color: "#64748b" }}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div
              style={
                viewMode === "grid"
                  ? styles.grid
                  : { display: "flex", flexDirection: "column", gap: 16 }
              }
            >
              {filteredExams.map((exam, index) => {
                const isFavorite = favorites.includes(exam.id);

                return (
                  <article // Changed div to article for semantic correctness
                    key={exam.id}
                    onClick={() => handleDownload(exam)}
                    style={{
                      ...styles.card,
                      borderTop: `4px solid ${studentGrade?.color}40`,
                      animation: `fadeInUp 0.3s ease-out ${
                        0.05 * index
                      }s forwards`,
                      opacity: 0,
                      ...(viewMode === "list" && {
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        alignItems: "center",
                        gap: 20,
                      }),
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow = `0 20px 40px ${studentGrade?.color}20`;
                      e.currentTarget.style.borderColor = `${studentGrade?.color}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 20px rgba(0,0,0,0.03)";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                  >
                    {viewMode === "list" && (
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: `${studentGrade?.color}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FileText size={24} color={studentGrade?.color} />
                      </div>
                    )}

                    <div>
                      <div style={styles.cardHeader}>
                        <span
                          style={{
                            ...styles.subjectBadge,
                            backgroundColor: `${studentGrade?.color}15`,
                            color: studentGrade?.color,
                          }}
                        >
                          {exam.subject}
                        </span>
                        <span
                          style={{
                            ...styles.yearBadge, // Using the new style for year badge
                            backgroundColor: "#f1f5f9",
                            color: "#64748b",
                          }}
                        >
                          {exam.year}
                        </span>
                      </div>

                      <h3 style={styles.cardTitle}>{exam.title}</h3>

                      <div style={styles.cardMeta}>
                        {" "}
                        {/* Using new cardMeta style */}
                        <span style={styles.metaItem}>
                          {" "}
                          {/* Using new metaItem style */}
                          <Calendar size={15} />
                          {exam.term}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        ...(viewMode === "grid" && {
                          borderTop: "1px solid #f1f5f9",
                          paddingTop: 18,
                          justifyContent: "space-between",
                          alignItems: "center",
                        }),
                      }}
                    >
                      <button
                        onClick={(e) => toggleFavorite(exam.id, e)}
                        style={{
                          padding: "10px",
                          border: `2px solid ${
                            isFavorite ? "#f59e0b" : "#e2e8f0"
                          }`,
                          borderRadius: 12,
                          background: isFavorite ? "#f59e0b15" : "#ffffff",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Star
                          size={18}
                          color="#f59e0b"
                          fill={isFavorite ? "#f59e0b" : "none"}
                        />
                      </button>

                      <button
                        style={{
                          ...styles.downloadButton,
                          backgroundColor: `${studentGrade?.color}`,
                          flex: viewMode === "list" ? "0 0 auto" : 1,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow = `0 8px 25px ${studentGrade?.color}40`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = `0 4px 15px ${studentGrade?.color}25`;
                        }}
                      >
                        <Download size={18} />
                        <span>Download</span>
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>

        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <p>
              © {new Date().getFullYear()} St. Mary's School Bomet - Exam
              Downloads Portal • All papers are for educational purposes only •
              Developed by Manuwebdesigns
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
