"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  X,
  Upload,
  Video,
  ImageIcon,
  Play,
  MoreVertical,
  Share,
  Filter,
  Search,
  Plus,
  Shield,
  AlertTriangle,
} from "lucide-react"
import PrivacyCard from "../components/PrivacyCard"

interface MediaItem {
  id: number
  type: "image" | "video"
  src: string
  thumbnail: string
  alt: string
  category: string
  title: string
  description: string
  uploadDate: string
  uploadedBy: string
  duration?: string
}

const Gallery: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [mediaType, setMediaType] = useState("All")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [uploadType, setUploadType] = useState<"photo" | "video">("photo")
  const [searchTerm, setSearchTerm] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [verificationError, setVerificationError] = useState("")
  const [showSecurityWarning, setShowSecurityWarning] = useState(false)
  const [securityThreatLevel, setSecurityThreatLevel] = useState(0)
  const [contentVisible, setContentVisible] = useState(true)
  const [watermarkPosition, setWatermarkPosition] = useState({ x: 0, y: 0 })
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    category: "School",
    file: null as File | null,
  })

  // Enhanced Security System with Form Exceptions
  const lastActivityRef = useRef<number>(Date.now())
  const watermarkAnimationRef = useRef<number>(0)

  // Check if user is currently interacting with forms
  const isInFormMode = showUploadModal || showVerificationModal

  // Advanced Screenshot & Content Protection with Form Flexibility
  useEffect(() => {
    let devToolsOpen = false

    // Smart protection system that respects form interactions
    const initializeSmartProtection = () => {
      // 1. ADVANCED SCREENSHOT DETECTION (but allow form interactions)
      const detectScreenshot = () => {
        const handleVisibilityChange = () => {
          if (document.hidden && !isInFormMode) {
            setContentVisible(false)
            setShowSecurityWarning(true)
            setSecurityThreatLevel((prev) => Math.min(prev + 1, 5))

            setTimeout(() => {
              setContentVisible(true)
              setShowSecurityWarning(false)
            }, 2000)
          }
        }

        const handleFocusChange = () => {
          if (!document.hasFocus() && !isInFormMode) {
            setContentVisible(false)
            setTimeout(() => setContentVisible(true), 1000)
          }
        }

        // Smart print screen detection - less aggressive during form interactions
        const handlePrintScreen = (e: KeyboardEvent) => {
          if (e.key === "PrintScreen" || e.keyCode === 44) {
            if (!isInFormMode) {
              e.preventDefault()
              setShowSecurityWarning(true)
              setSecurityThreatLevel((prev) => Math.min(prev + 2, 5))
              setContentVisible(false)

              setTimeout(() => {
                setShowSecurityWarning(false)
                setContentVisible(true)
              }, 3000)

              console.warn("Screenshot attempt detected and blocked")
              return false
            } else {
              // Just warn but don't block during form interactions
              console.warn("Screenshot detected during form interaction")
            }
          }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)
        window.addEventListener("focus", handleFocusChange)
        window.addEventListener("blur", handleFocusChange)
        document.addEventListener("keydown", handlePrintScreen)

        return () => {
          document.removeEventListener("visibilitychange", handleVisibilityChange)
          window.removeEventListener("focus", handleFocusChange)
          window.removeEventListener("blur", handleFocusChange)
          document.removeEventListener("keydown", handlePrintScreen)
        }
      }

      // 2. DEVELOPER TOOLS DETECTION (less aggressive during forms)
      const detectDevTools = () => {
        const checkDevTools = () => {
          const widthThreshold = window.outerWidth - window.innerWidth > 160
          const heightThreshold = window.outerHeight - window.innerHeight > 160

          if (widthThreshold || heightThreshold) {
            if (!devToolsOpen && !isInFormMode) {
              devToolsOpen = true
              setShowSecurityWarning(true)
              setSecurityThreatLevel(5)
              setContentVisible(false)

              setTimeout(() => {
                window.location.reload()
              }, 2000)
            } else if (isInFormMode) {
              // Just log during form interactions
              console.warn("Developer tools detected during form interaction")
            }
          } else {
            devToolsOpen = false
          }
        }

        setInterval(checkDevTools, 1000) // Less frequent checking

        console.log(
          "%c⚠️ SECURITY WARNING: This is a secure gallery. Unauthorized access attempts are logged.",
          "color: red; font-size: 20px; font-weight: bold;",
        )
      }

      // 3. SMART KEYBOARD BLOCKING (allows form interactions)
      const blockKeyboardShortcuts = (e: KeyboardEvent) => {
        const target = e.target as HTMLElement
        const isFormElement = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT"

        // Allow all typing in form elements
        if (isFormElement || isInFormMode) {
          // Only block the most critical shortcuts in forms
          const criticalBlocked = [
            123, // F12
          ]

          const isCtrlPressed = e.ctrlKey || e.metaKey
          const isShiftPressed = e.shiftKey

          // Only block developer tools shortcuts in forms
          if (
            criticalBlocked.includes(e.keyCode) ||
            (isCtrlPressed && isShiftPressed && e.keyCode === 73) || // Ctrl+Shift+I
            (isCtrlPressed && isShiftPressed && e.keyCode === 74) || // Ctrl+Shift+J
            (isCtrlPressed && isShiftPressed && e.keyCode === 67) || // Ctrl+Shift+C
            (isCtrlPressed && isShiftPressed && e.keyCode === 75) // Ctrl+Shift+K
          ) {
            e.preventDefault()
            setShowSecurityWarning(true)
            setTimeout(() => setShowSecurityWarning(false), 1000)
            return false
          }

          // Allow normal form interactions
          return true
        }

        // Full blocking for non-form areas
        const blockedKeys = [
          44, // Print Screen
          123, // F12
          82, // F5 (Refresh)
          116, // F5
          67, // Ctrl+C
          83, // Ctrl+S
          65, // Ctrl+A
          85, // Ctrl+U
          73, // Ctrl+Shift+I
          74, // Ctrl+Shift+J
          187, // Ctrl++
          189, // Ctrl+-
          48, // Ctrl+0
        ]

        const isCtrlPressed = e.ctrlKey || e.metaKey
        const isShiftPressed = e.shiftKey
        const isAltPressed = e.altKey

        if (
          blockedKeys.includes(e.keyCode) ||
          (isCtrlPressed && e.keyCode === 85) || // Ctrl+U
          (isCtrlPressed && e.keyCode === 83) || // Ctrl+S
          (isCtrlPressed && e.keyCode === 65) || // Ctrl+A
          (isCtrlPressed && e.keyCode === 67) || // Ctrl+C
          (isCtrlPressed && e.keyCode === 86) || // Ctrl+V
          (isCtrlPressed && isShiftPressed && e.keyCode === 73) || // Ctrl+Shift+I
          (isCtrlPressed && isShiftPressed && e.keyCode === 74) || // Ctrl+Shift+J
          (isCtrlPressed && isShiftPressed && e.keyCode === 67) || // Ctrl+Shift+C
          (isCtrlPressed && isShiftPressed && e.keyCode === 75) || // Ctrl+Shift+K
          (isAltPressed && e.keyCode === 115) || // Alt+F4
          (e.keyCode >= 112 && e.keyCode <= 123) // F1-F12
        ) {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()

          setShowSecurityWarning(true)
          setSecurityThreatLevel((prev) => Math.min(prev + 1, 5))

          setTimeout(() => setShowSecurityWarning(false), 1500)

          return false
        }
      }

      // 4. SMART MOUSE PROTECTION (allows form interactions)
      const blockMouseActions = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const isFormElement =
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.tagName === "BUTTON"

        // Allow right-click in form elements for context menus (paste, etc.)
        if (isFormElement || isInFormMode) {
          return true
        }

        // Block right-click on media content
        if (e.button === 2) {
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          setShowSecurityWarning(true)
          setTimeout(() => setShowSecurityWarning(false), 1000)
          return false
        }

        // Block middle-click
        if (e.button === 1) {
          e.preventDefault()
          return false
        }
      }

      // 5. SMART SELECTION PROTECTION (allows form text selection)
      const blockSelection = (e: Event) => {
        const target = e.target as HTMLElement
        const isFormElement = target.tagName === "INPUT" || target.tagName === "TEXTAREA"

        if (isFormElement || isInFormMode) {
          return true // Allow selection in forms
        }

        e.preventDefault()
        e.stopPropagation()
        return false
      }

      const blockDrag = (e: DragEvent) => {
        const target = e.target as HTMLElement
        const isFormElement = target.tagName === "INPUT" || target.tagName === "TEXTAREA"

        if (isFormElement || isInFormMode) {
          return true // Allow drag in forms
        }

        e.preventDefault()
        e.dataTransfer?.clearData()
        return false
      }

      // 6. PRINT PROTECTION
      const blockPrint = (e: Event) => {
        e.preventDefault()
        setShowSecurityWarning(true)
        setSecurityThreatLevel((prev) => Math.min(prev + 2, 5))
        setTimeout(() => setShowSecurityWarning(false), 2000)
        return false
      }

      // 7. SMART CLIPBOARD PROTECTION (allows form copy/paste)
      const blockClipboard = (e: ClipboardEvent) => {
        const target = e.target as HTMLElement
        const isFormElement = target.tagName === "INPUT" || target.tagName === "TEXTAREA"

        if (isFormElement || isInFormMode) {
          return true // Allow clipboard operations in forms
        }

        e.preventDefault()
        e.clipboardData?.clearData()
        return false
      }

      // Apply smart protections
      const cleanupScreenshot = detectScreenshot()
      detectDevTools()

      document.addEventListener("keydown", blockKeyboardShortcuts, { capture: true })
      document.addEventListener("mousedown", blockMouseActions, { capture: true })
      document.addEventListener("contextmenu", blockSelection, { capture: true })
      document.addEventListener("selectstart", blockSelection, { capture: true })
      document.addEventListener("dragstart", blockDrag, { capture: true })
      document.addEventListener("drop", blockDrag, { capture: true })
      window.addEventListener("beforeprint", blockPrint, { capture: true })
      document.addEventListener("copy", blockClipboard, { capture: true })
      document.addEventListener("cut", blockClipboard, { capture: true })
      document.addEventListener("paste", blockClipboard, { capture: true })

      return () => {
        cleanupScreenshot()
        document.removeEventListener("keydown", blockKeyboardShortcuts, { capture: true })
        document.removeEventListener("mousedown", blockMouseActions, { capture: true })
        document.removeEventListener("contextmenu", blockSelection, { capture: true })
        document.removeEventListener("selectstart", blockSelection, { capture: true })
        document.removeEventListener("dragstart", blockDrag, { capture: true })
        document.removeEventListener("drop", blockDrag, { capture: true })
        window.removeEventListener("beforeprint", blockPrint, { capture: true })
        document.removeEventListener("copy", blockClipboard, { capture: true })
        document.removeEventListener("cut", blockClipboard, { capture: true })
        document.removeEventListener("paste", blockClipboard, { capture: true })
      }
    }

    const cleanup: () => void = initializeSmartProtection()
    return cleanup
  }, [isInFormMode]) // Re-run when form mode changes

  // Dynamic Watermark Animation
  useEffect(() => {
    const animateWatermark = () => {
      setWatermarkPosition({
        x: Math.random() * (window.innerWidth - 200),
        y: Math.random() * (window.innerHeight - 50),
      })
    }

    watermarkAnimationRef.current = window.setInterval(animateWatermark, 3000) as unknown as number
    return () => clearInterval(watermarkAnimationRef.current)
  }, [])

  // Smart CSS Protection with Form Exceptions
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      /* Smart protection styles that allow form interactions */
      .gallery-content * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      /* Allow selection and interaction in form elements */
      input, textarea, select, button {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
        -webkit-touch-callout: default !important;
      }
      
      /* Allow selection in modal content */
      .modal-content input,
      .modal-content textarea,
      .modal-content select,
      .modal-content button,
      .modal-content label {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
        -webkit-touch-callout: default !important;
      }
      
      img, video, canvas {
        pointer-events: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        user-select: none !important;
        -webkit-user-drag: none !important;
        -moz-user-drag: none !important;
        user-drag: none !important;
      }
      
      /* Anti-screenshot overlay */
      .security-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 2px,
          rgba(255, 255, 255, 0.05) 2px,
          rgba(255, 255, 255, 0.05) 4px
        );
        pointer-events: none;
        z-index: 9999;
      }
      
      /* Print protection */
      @media print {
        * {
          display: none !important;
          visibility: hidden !important;
        }
        body::before {
          content: "⚠️ SECURITY PROTECTED CONTENT - PRINTING NOT ALLOWED" !important;
          display: block !important;
          font-size: 24px !important;
          color: red !important;
          text-align: center !important;
          margin: 50px !important;
          visibility: visible !important;
        }
      }
      
      /* Blur effect for security */
      .security-blur {
        filter: blur(10px) !important;
        opacity: 0.3 !important;
        transition: all 0.3s ease !important;
      }
      
      /* Moving watermark */
      .floating-watermark {
        position: fixed;
        color: rgba(255, 255, 255, 0.1);
        font-size: 24px;
        font-weight: bold;
        pointer-events: none;
        z-index: 10000;
        transform: rotate(-45deg);
        transition: all 1s ease;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Security monitoring
  useEffect(() => {
    const monitorSecurity = () => {
      lastActivityRef.current = Date.now()

      // Auto-reduce threat level over time
      if (securityThreatLevel > 0) {
        setTimeout(() => {
          setSecurityThreatLevel((prev) => Math.max(prev - 1, 0))
        }, 5000)
      }
    }

    document.addEventListener("mousemove", monitorSecurity)
    document.addEventListener("keypress", monitorSecurity)

    return () => {
      document.removeEventListener("mousemove", monitorSecurity)
      document.removeEventListener("keypress", monitorSecurity)
    }
  }, [securityThreatLevel])

  const galleryMedia: MediaItem[] = [
    {
      id: 1,
      type: "image",
      src: "https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=600",
      thumbnail: "https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "School building exterior",
      category: "School",
      title: "Main School Building",
      description: "Our beautiful main building houses modern classrooms and administrative offices.",
      uploadDate: "2024-03-15",
      uploadedBy: "Admin",
    },
    {
      id: 2,
      type: "video",
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail:
        "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Virtual school tour",
      category: "School",
      title: "Virtual School Tour",
      description: "Take a virtual tour of our campus facilities and see what makes St. Mary's special.",
      duration: "3:45",
      uploadDate: "2024-03-14",
      uploadedBy: "Marketing Team",
    },
    {
      id: 3,
      type: "image",
      src: "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=600",
      thumbnail:
        "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Modern classroom",
      category: "Facilities",
      title: "Modern Classroom",
      description: "State-of-the-art classrooms equipped with interactive whiteboards and modern technology.",
      uploadDate: "2024-03-13",
      uploadedBy: "Admin",
    },
    {
      id: 4,
      type: "video",
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      thumbnail: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Students learning",
      category: "Academic",
      title: "Interactive Learning Session",
      description: "Watch our students engage in collaborative learning activities and group discussions.",
      duration: "2:30",
      uploadDate: "2024-03-12",
      uploadedBy: "Academic Department",
    },
    {
      id: 5,
      type: "image",
      src: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=600",
      thumbnail: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Students in classroom",
      category: "Academic",
      title: "Students Learning",
      description: "Our students actively participating in classroom discussions and collaborative learning.",
      uploadDate: "2024-03-11",
      uploadedBy: "Teacher",
    },
    {
      id: 6,
      type: "video",
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Science experiment",
      category: "Facilities",
      title: "Science Lab Experiments",
      description: "Students conducting exciting experiments in our well-equipped science laboratory.",
      duration: "4:15",
      uploadDate: "2024-03-10",
      uploadedBy: "Science Department",
    },
    {
      id: 7,
      type: "image",
      src: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600",
      thumbnail: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Science laboratory",
      category: "Facilities",
      title: "Science Laboratory",
      description: "Our modern science laboratory with advanced equipment for hands-on learning.",
      uploadDate: "2024-03-09",
      uploadedBy: "Admin",
    },
    {
      id: 8,
      type: "video",
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      thumbnail: "https://images.pexels.com/photos/2105028/pexels-photo-2105028.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Sports activities",
      category: "Sports",
      title: "Annual Sports Day Highlights",
      description: "Exciting moments from our annual sports day featuring various athletic competitions.",
      duration: "5:20",
      uploadDate: "2024-03-08",
      uploadedBy: "Sports Department",
    },
    {
      id: 9,
      type: "image",
      src: "https://images.pexels.com/photos/2105028/pexels-photo-2105028.jpeg?auto=compress&cs=tinysrgb&w=600",
      thumbnail: "https://images.pexels.com/photos/2105028/pexels-photo-2105028.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Sports activities",
      category: "Sports",
      title: "Athletic Training",
      description: "Students participating in various sports and athletic training sessions.",
      uploadDate: "2024-03-07",
      uploadedBy: "Sports Coach",
    },
    {
      id: 10,
      type: "video",
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Graduation ceremony",
      category: "Events",
      title: "Graduation Ceremony 2024",
      description: "Celebrating our graduating class and their achievements in this memorable ceremony.",
      duration: "8:45",
      uploadDate: "2024-03-06",
      uploadedBy: "Admin",
    },
  ]

  const categories = ["All", "School", "Facilities", "Academic", "Sports", "Events"]
  const mediaTypes = ["All", "Photos", "Videos"]

  const filteredMedia = galleryMedia.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesType =
      mediaType === "All" ||
      (mediaType === "Photos" && item.type === "image") ||
      (mediaType === "Videos" && item.type === "video")
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesType && matchesSearch
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const isImage = file.type.startsWith("image/")
      const isVideo = file.type.startsWith("video/")

      if ((uploadType === "photo" && !isImage) || (uploadType === "video" && !isVideo)) {
        alert(`Please select a valid ${uploadType} file.`)
        return
      }

      const maxSize = uploadType === "video" ? 50 * 1024 * 1024 : 10 * 1024 * 1024 // 50MB for videos, 10MB for photos
      if (file.size > maxSize) {
        alert(`File size must be less than ${uploadType === "video" ? "50MB" : "10MB"}.`)
        return
      }

      setUploadForm({ ...uploadForm, file })
    }
  }

  const handleUploadSubmit = () => {
    if (!isVerified) {
      alert("Please verify your authorization first.")
      return
    }

    if (!uploadForm.title || !uploadForm.file) {
      alert("Please fill in all required fields and select a file.")
      return
    }

    console.log("Uploading:", uploadForm)
    alert(`${uploadType === "photo" ? "Photo" : "Video"} uploaded successfully!`)

    setUploadForm({ title: "", description: "", category: "School", file: null })
    setShowUploadModal(false)
  }

  const handleUploadClick = () => {
    if (!isVerified) {
      setShowVerificationModal(true)
    } else {
      setShowUploadModal(true)
    }
  }

  const handleVerification = () => {
    const validCodes = ["2138", "714749123", "796971413", "STAFF123"]

    if (validCodes.includes(verificationCode.toUpperCase())) {
      setIsVerified(true)
      setShowVerificationModal(false)
      setShowUploadModal(true)
      setVerificationCode("")
      setVerificationError("")
      alert("Verification successful! You can now upload media.")
    } else {
      setVerificationError("Invalid verification code. Please contact the school administration.")
    }
  }

  const handleShare = (media: MediaItem) => {
    if (navigator.share) {
      navigator.share({
        title: media.title,
        text: media.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  // Ultra-Secure Image Component
  const UltraSecureImage: React.FC<{ src: string; alt: string; className?: string; onClick?: () => void }> = ({
    src,
    alt,
    className,
    onClick,
  }) => {
    const [secureDataUrl, setSecureDataUrl] = useState<string>("")
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      const img = new window.Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const canvas = canvasRef.current
        if (canvas) {
          const ctx = canvas.getContext("2d")
          if (ctx) {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)

            // Multiple security layers
            // 1. Watermark overlay
            ctx.fillStyle = "rgba(255, 255, 255, 0.15)"
            ctx.font = "bold 24px Arial"
            ctx.textAlign = "center"
            ctx.fillText("ST. MARY'S SCHOOL", canvas.width / 2, 50)
            ctx.fillText("PROTECTED CONTENT", canvas.width / 2, canvas.height - 50)

            // 2. Corner watermarks
            ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
            ctx.font = "14px Arial"
            ctx.textAlign = "left"
            ctx.fillText("© St. Mary's School", 20, 30)
            ctx.fillText("© St. Mary's School", canvas.width - 150, canvas.height - 20)

            // 3. Diagonal watermarks
            ctx.save()
            ctx.translate(canvas.width / 2, canvas.height / 2)
            ctx.rotate(-Math.PI / 4)
            ctx.fillStyle = "rgba(255, 255, 255, 0.08)"
            ctx.font = "bold 48px Arial"
            ctx.textAlign = "center"
            ctx.fillText("SECURE GALLERY", 0, 0)
            ctx.restore()

            // 4. Protective noise pattern
            ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
            for (let i = 0; i < canvas.width; i += 25) {
              for (let j = 0; j < canvas.height; j += 25) {
                ctx.fillRect(i, j, 1, 1)
              }
            }

            // 5. Security markers
            ctx.fillStyle = "rgba(255, 0, 0, 0.1)"
            ctx.fillRect(0, 0, 20, 20)
            ctx.fillRect(canvas.width - 20, 0, 20, 20)
            ctx.fillRect(0, canvas.height - 20, 20, 20)
            ctx.fillRect(canvas.width - 20, canvas.height - 20, 20, 20)

            setSecureDataUrl(canvas.toDataURL("image/jpeg", 0.85))
          }
        }
      }
      img.onerror = () => {
        console.error("Failed to load image:", src)
      }
      img.src = src
    }, [src])

    return (
      <div className="relative">
        <canvas ref={canvasRef} className="hidden" />
        {secureDataUrl && (
          <div className="relative">
            <img
              src={secureDataUrl || "/placeholder.svg"}
              alt={alt}
              className={`${className} ${!contentVisible ? "security-blur" : ""}`}
              onClick={onClick}
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                userSelect: "none",
                pointerEvents: onClick ? "auto" : "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
              }}
            />

            {/* Multiple protection overlays */}
            <div
              className="absolute inset-0 bg-transparent"
              onClick={onClick}
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                userSelect: "none",
                pointerEvents: onClick ? "auto" : "none",
                background:
                  "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 12px)",
              }}
            />

            {/* Dynamic watermark overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                background:
                  "repeating-conic-gradient(from 0deg, transparent, transparent 85deg, rgba(255,255,255,0.03) 85deg, rgba(255,255,255,0.03) 95deg)",
              }}
            >
              <div
                className="text-white text-opacity-10 text-4xl font-bold transform rotate-12"
                style={{ textShadow: "0 0 20px rgba(255,255,255,0.5)" }}
              >
                SECURE
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Ultra-Secure Video Component
  const UltraSecureVideo: React.FC<{ media: MediaItem }> = ({ media }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const video = videoRef.current
      if (video) {
        video.addEventListener("contextmenu", (e) => e.preventDefault())
        video.setAttribute("controlsList", "nodownload noremoteplayback noplaybackrate")
        video.setAttribute("disablePictureInPicture", "true")
        video.setAttribute("disableRemotePlayback", "true")

        // Add security event listeners
        video.addEventListener("loadstart", () => {
          console.log("Video loading protected")
        })

        video.addEventListener("play", () => {
          // Add dynamic watermark during playback
          if (overlayRef.current) {
            overlayRef.current.style.opacity = "0.3"
          }
        })

        video.addEventListener("pause", () => {
          if (overlayRef.current) {
            overlayRef.current.style.opacity = "0.1"
          }
        })
      }
    }, [])

    return (
      <div className={`relative bg-black rounded-lg overflow-hidden ${!contentVisible ? "security-blur" : ""}`}>
        <video
          ref={videoRef}
          className="w-full h-auto max-h-96"
          controls
          poster={media.thumbnail}
          preload="metadata"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
          }}
        >
          <source src={media.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Multi-layer security overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-transparent pointer-events-none"
          style={{
            userSelect: "none",
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 22px)",
            opacity: 0.1,
          }}
        />

        {/* Dynamic watermark system */}
        <div className="absolute top-4 left-4 text-white text-opacity-20 text-sm font-bold pointer-events-none">
          ST. MARY'S SCHOOL - SECURE VIDEO
        </div>

        <div className="absolute bottom-4 right-4 text-white text-opacity-20 text-sm font-bold pointer-events-none">
          PROTECTED CONTENT
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="text-white text-opacity-5 text-6xl font-bold transform rotate-12"
            style={{ textShadow: "0 0 30px rgba(255,255,255,0.1)" }}
          >
            SECURE
          </div>
        </div>

        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 pointer-events-none">
          <h3 className="text-white font-semibold text-lg">{media.title}</h3>
          <p className="text-gray-300 text-sm">{media.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-400 text-xs">Duration: {media.duration}</span>
            <span className="text-gray-400 text-xs">Uploaded: {media.uploadDate}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="gallery-content">
      {/* Ultra-Protection Security Overlays */}
      <div className="security-overlay" />

      {/* Dynamic Floating Watermark */}
      <div
        className="floating-watermark"
        style={{
          left: watermarkPosition.x,
          top: watermarkPosition.y,
        }}
      >
        ST. MARY'S SCHOOL - SECURE GALLERY
      </div>

      {/* Security Warning Modal */}
      {showSecurityWarning && (
        <div className="fixed inset-0 bg-red-900 bg-opacity-95 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="text-red-600 mb-4">
              <AlertTriangle className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-4">SECURITY WARNING</h3>
            <p className="text-gray-700 mb-4">Unauthorized access attempt detected. This action has been logged.</p>
            <p className="text-sm text-gray-600">Security Level: {securityThreatLevel}/5</p>
            <div className="mt-4 bg-red-100 border border-red-400 rounded p-3">
              <p className="text-red-700 text-sm">Screenshots, developer tools, and content copying are prohibited.</p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Protection Section */}
      <section className={`py-8 bg-gray-50 ${!contentVisible ? "security-blur" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PrivacyCard />
        </div>
      </section>

      {/* Hero Section */}
      <section
        className={`bg-gradient-to-r from-teal-800 to-teal-600 text-white py-20 ${!contentVisible ? "security-blur" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Smart-Secure Media Gallery</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Explore our vibrant school community through intelligently-protected photos and videos that capture the
              essence of learning, growth, and memorable moments at St. Mary's School.
            </p>
            <div className="mt-4 flex items-center justify-center">
              <Shield className="h-6 w-6 mr-2 text-yellow-400" />
              <span className="text-sm text-yellow-200">Content Protected by Smart Security System</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Upload */}
      <section className={`py-8 bg-gray-50 ${!contentVisible ? "security-blur" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <select
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {mediaTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                onClick={handleUploadClick}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center ${
                  isVerified ? "bg-teal-600 text-white hover:bg-teal-700" : "bg-gray-400 text-white hover:bg-gray-500"
                }`}
              >
                {isVerified ? (
                  <>
                    <Plus className="h-5 w-5 mr-2" />
                    Upload Media
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Verify to Upload
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category ? "bg-teal-600 text-white" : "bg-white text-gray-700 hover:bg-teal-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className={`py-20 ${!contentVisible ? "security-blur" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((media, index) => (
              <div
                key={media.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                <div className="relative h-64 overflow-hidden" onClick={() => setSelectedMedia(index)}>
                  <UltraSecureImage
                    src={media.thumbnail}
                    alt={media.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute top-2 left-2 pointer-events-none">
                    {media.type === "video" ? (
                      <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded flex items-center text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        {media.duration}
                      </div>
                    ) : (
                      <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded flex items-center text-xs">
                        <ImageIcon className="h-3 w-3 mr-1" />
                        Photo
                      </div>
                    )}
                  </div>
                  {media.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-white bg-opacity-90 rounded-full p-3">
                        <Play className="h-8 w-8 text-teal-600" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{media.title}</h3>
                    <div className="relative">
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2">{media.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded">{media.category}</span>
                    <span>{media.uploadDate}</span>
                  </div>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleShare(media)
                      }}
                      className="bg-white bg-opacity-90 text-gray-700 p-2 rounded-full hover:bg-opacity-100 transition-colors"
                      title="Share"
                    >
                      <Share className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredMedia.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                {mediaType === "Videos" ? (
                  <Video className="h-16 w-16 mx-auto" />
                ) : (
                  <ImageIcon className="h-16 w-16 mx-auto" />
                )}
              </div>
              <p className="text-gray-500 text-lg">No {mediaType.toLowerCase()} found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                  setMediaType("All")
                }}
                className="mt-4 text-teal-600 hover:text-teal-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Media Modal */}
      {selectedMedia !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-6xl max-h-full w-full">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <X className="h-6 w-6" />
            </button>

            {filteredMedia[selectedMedia].type === "video" ? (
              <UltraSecureVideo media={filteredMedia[selectedMedia]} />
            ) : (
              <div className="relative">
                <UltraSecureImage
                  src={filteredMedia[selectedMedia].src}
                  alt={filteredMedia[selectedMedia].alt}
                  className="max-w-full max-h-screen object-contain rounded-lg"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                  <h3 className="text-xl font-semibold mb-2">{filteredMedia[selectedMedia].title}</h3>
                  <p className="text-gray-300">{filteredMedia[selectedMedia].description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-400 text-sm">{filteredMedia[selectedMedia].category}</span>
                    <span className="text-gray-400 text-sm">Uploaded: {filteredMedia[selectedMedia].uploadDate}</span>
                  </div>
                </div>
              </div>
            )}
            {selectedMedia > 0 && (
              <button
                onClick={() => setSelectedMedia(selectedMedia - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-3xl bg-black bg-opacity-50 rounded-full p-2"
              >
                ‹
              </button>
            )}

            {selectedMedia < filteredMedia.length - 1 && (
              <button
                onClick={() => setSelectedMedia(selectedMedia + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-3xl bg-black bg-opacity-50 rounded-full p-2"
              >
                ›
              </button>
            )}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={() => handleShare(filteredMedia[selectedMedia])}
                className="bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition-colors"
                title="Share"
              >
                <Share className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 modal-content">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium flex items-center">
                <Shield className="h-5 w-5 mr-2 text-teal-600" />
                Upload Verification Required
              </h3>
              <button
                onClick={() => {
                  setShowVerificationModal(false)
                  setVerificationCode("")
                  setVerificationError("")
                }}
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">Authorization Required</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      To maintain content quality and prevent spam, uploading requires a verification code. Contact the
                      school administration to obtain an upload code.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value)
                    setVerificationError("")
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter verification code"
                  onKeyPress={(e) => e.key === "Enter" && handleVerification()}
                />
                {verificationError && <p className="text-red-600 text-sm mt-1">{verificationError}</p>}
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">
                  <strong>Need a verification code?</strong>
                  <br />
                  Contact the school office at: <br />📧 admin@stmarysschool.edu
                  <br />📞 (555) 123-4567
                </p>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleVerification}
                  disabled={!verificationCode.trim()}
                  className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Verify & Continue
                </button>
                <button
                  onClick={() => {
                    setShowVerificationModal(false)
                    setVerificationCode("")
                    setVerificationError("")
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 modal-content">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium flex items-center">
                <Upload className="h-5 w-5 mr-2 text-teal-600" />
                Upload Media
              </h3>
              <button onClick={() => setShowUploadModal(false)}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            {isVerified && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-green-800 font-medium">Verified - Upload authorized</span>
                </div>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setUploadType("photo")}
                    className={`flex-1 p-3 border-2 rounded-lg flex items-center justify-center ${
                      uploadType === "photo" ? "border-teal-500 bg-teal-50" : "border-gray-300"
                    }`}
                  >
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Photo
                  </button>
                  <button
                    onClick={() => setUploadType("video")}
                    className={`flex-1 p-3 border-2 rounded-lg flex items-center justify-center ${
                      uploadType === "video" ? "border-teal-500 bg-teal-50" : "border-gray-300"
                    }`}
                  >
                    <Video className="h-5 w-5 mr-2" />
                    Video
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select {uploadType === "photo" ? "Image" : "Video"} File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept={uploadType === "photo" ? "image/*" : "video/*"}
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {uploadType === "photo" ? "PNG, JPG, GIF up to 10MB" : "MP4, MOV, AVI up to 50MB"}
                    </p>
                  </label>
                  {uploadForm.file && <p className="text-sm text-teal-600 mt-2">Selected: {uploadForm.file.name}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter media title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter media description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {categories
                    .filter((cat) => cat !== "All")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleUploadSubmit}
                  className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
                >
                  Upload {uploadType === "photo" ? "Photo" : "Video"}
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Virtual Tour CTA */}
      <section className={`py-20 bg-teal-900 text-white ${!contentVisible ? "security-blur" : ""}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to See More?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Schedule a visit to experience our facilities firsthand and meet our dedicated team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200">
              Schedule Campus Tour
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-900 transition-colors duration-200">
              Contact Admissions
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Gallery
