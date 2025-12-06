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
} from "lucide-react";

interface Exam {
  id: number;
  title: string;
  subject: string;
  term: string;
  year: string;
  googleDriveLink: string;
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
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 11,
        title: "English Composition",
        subject: "English",
        term: "Term 2",
        year: "2024",
        googleDriveLink: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
      },
      {
        id: 12,
        title: "Geography Paper",
        subject: "Geography",
        term: "Term 3",
        year: "2024",
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
};

const ExamDownloads = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [code, setCode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isLoadingExams, setIsLoadingExams] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedSession = sessionStorage.getItem("examPortalSession");
    if (savedSession) {
      const student = JSON.parse(savedSession);
      setCurrentStudent(student);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoadingExams(true);
      const timer = setTimeout(() => setIsLoadingExams(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    setTimeout(() => {
      const student = validStudents.find(
        (s) =>
          s.admissionNumber === admissionNumber.trim() && s.code === code.trim()
      );

      if (student) {
        setCurrentStudent(student);
        setIsAuthenticated(true);
        sessionStorage.setItem("examPortalSession", JSON.stringify(student));
      } else {
        setLoginError(
          "Invalid admission number or access code. Please try again."
        );
      }
      setIsLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentStudent(null);
    setAdmissionNumber("");
    setCode("");
    sessionStorage.removeItem("examPortalSession");
  };

  const currentGrade =
    gradesData.find((g) => g.id === currentStudent?.grade) || gradesData[0];

  const filteredExams = currentGrade.exams.filter(
    (exam) =>
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

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
              animation: mounted ? "scaleIn 0.6s ease-out forwards" : "none",
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
              <h1 style={styles.loginTitle}>Exam Downloads Portal</h1>
              <p style={styles.loginSubtitle}>
                Enter your credentials to access examination papers
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

              {loginError && (
                <div style={styles.errorBox}>
                  <AlertCircle
                    style={{ width: 18, height: 18, flexShrink: 0 }}
                  />
                  <span>{loginError}</span>
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
                  background: `linear-gradient(135deg, ${currentGrade.color}, ${currentGrade.color}99)`,
                }}
              >
                {currentStudent?.name.charAt(0)}
              </div>
              <div>
                <h2 style={styles.userName}>{currentStudent?.name}</h2>
                <p style={styles.userInfo}>
                  {currentStudent?.admissionNumber} • {currentGrade.label}
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
              background: `radial-gradient(circle, ${currentGrade.color}30, transparent 70%)`,
            }}
          />
          <div
            style={{
              ...styles.heroOrb2,
              background: `radial-gradient(circle, ${currentGrade.color}20, transparent 70%)`,
            }}
          />

          <div style={styles.heroContent}>
            <div
              style={{
                ...styles.badge,
                background: `linear-gradient(135deg, ${currentGrade.color}15, ${currentGrade.color}05)`,
                borderColor: `${currentGrade.color}30`,
                animation: mounted ? "fadeInUp 0.5s ease-out forwards" : "none",
              }}
            >
              <FolderOpen
                style={{ width: 18, height: 18, color: currentGrade.color }}
              />
              <span style={{ color: currentGrade.color, fontWeight: 600 }}>
                {currentGrade.label}
              </span>
              <span style={{ color: "#64748b" }}>•</span>
              <span style={{ color: "#64748b" }}>
                {currentGrade.description}
              </span>
            </div>

            <h1
              style={{
                ...styles.title,
                animation: mounted
                  ? "fadeInUp 0.5s ease-out 0.1s forwards"
                  : "none",
                opacity: 0,
              }}
            >
              Your{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${currentGrade.color}, #3b82f6, ${currentGrade.color})`,
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradientMove 3s ease infinite",
                }}
              >
                Examination Papers
              </span>
            </h1>

            <p
              style={{
                ...styles.subtitle,
                animation: mounted
                  ? "fadeInUp 0.5s ease-out 0.2s forwards"
                  : "none",
                opacity: 0,
              }}
            >
              Download past papers to prepare for your upcoming exams. All files
              open in Google Drive.
            </p>

            <div
              style={{
                ...styles.searchContainer,
                animation: mounted
                  ? "fadeInUp 0.5s ease-out 0.3s forwards"
                  : "none",
                opacity: 0,
              }}
            >
              <Search style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search exams by title or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </div>
        </section>

        <main style={styles.mainContent}>
          <p style={styles.resultsCount}>
            {isLoadingExams ? (
              <span style={{ color: "#94a3b8" }}>Loading papers...</span>
            ) : (
              <>
                <span style={{ fontWeight: 700, color: currentGrade.color }}>
                  {filteredExams.length}
                </span>{" "}
                examination papers available
              </>
            )}
          </p>

          <div style={styles.grid}>
            {isLoadingExams
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard
                    key={index}
                    color={currentGrade.color}
                    index={index}
                  />
                ))
              : filteredExams.map((exam, index) => (
                  <article
                    key={exam.id}
                    style={{
                      ...styles.card,
                      animation: `fadeInUp 0.5s ease-out ${
                        0.1 * index
                      }s forwards`,
                      opacity: 0,
                      borderTop: `4px solid ${currentGrade.color}`,
                      ...(hoveredCard === exam.id
                        ? {
                            transform: "translateY(-8px) scale(1.02)",
                            boxShadow: `0 25px 50px -12px ${currentGrade.color}30, 0 0 0 1px ${currentGrade.color}20`,
                          }
                        : {}),
                    }}
                    onMouseEnter={() => setHoveredCard(exam.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={styles.cardHeader}>
                      <div
                        style={{
                          ...styles.subjectBadge,
                          background: `linear-gradient(135deg, ${currentGrade.color}15, ${currentGrade.color}05)`,
                          color: currentGrade.color,
                          border: `1px solid ${currentGrade.color}20`,
                        }}
                      >
                        <BookOpen style={{ width: 14, height: 14 }} />
                        {exam.subject}
                      </div>
                      <div style={styles.termBadge}>
                        <Calendar style={{ width: 12, height: 12 }} />
                        {exam.term} • {exam.year}
                      </div>
                    </div>

                    <h3 style={styles.cardTitle}>{exam.title}</h3>

                    <div style={styles.cardFooter}>
                      <div style={styles.driveIndicator}>
                        <img
                          src="https://www.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png"
                          alt="Google Drive"
                          style={{ width: 22, height: 22 }}
                        />
                        <span style={styles.driveText}>Google Drive</span>
                      </div>

                      <button
                        onClick={() => handleDownload(exam.googleDriveLink)}
                        style={{
                          ...styles.downloadButton,
                          background: `linear-gradient(135deg, ${currentGrade.color}, ${currentGrade.color}dd)`,
                          ...(hoveredCard === exam.id
                            ? {
                                boxShadow: `0 8px 25px ${currentGrade.color}40`,
                                transform: "scale(1.05)",
                              }
                            : {}),
                        }}
                      >
                        <Download style={{ width: 16, height: 16 }} />
                        Download
                        <ExternalLink
                          style={{ width: 14, height: 14, opacity: 0.7 }}
                        />
                      </button>
                    </div>
                  </article>
                ))}
          </div>

          {!isLoadingExams && filteredExams.length === 0 && (
            <div style={styles.emptyState}>
              <div
                style={{
                  ...styles.emptyIcon,
                  background: `linear-gradient(135deg, ${currentGrade.color}15, ${currentGrade.color}05)`,
                }}
              >
                <FileText
                  style={{ width: 36, height: 36, color: currentGrade.color }}
                />
              </div>
              <h3 style={styles.emptyTitle}>No exams found</h3>
              <p style={styles.emptyText}>
                Try adjusting your search criteria.
              </p>
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
};

export default ExamDownloads;
