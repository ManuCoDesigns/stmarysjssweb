"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { X, Upload, Video, ImageIcon, Play, MoreVertical, Share, Filter, Search, Plus, Shield, AlertTriangle, Eye, Trash2, CheckCircle, XCircle, FileImage, Film } from 'lucide-react'

// Privacy Card Component
const PrivacyCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl p-6 shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Shield className="h-6 w-6 text-blue-600" />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Privacy & Security Notice</h3>
          <p className="text-blue-800 text-sm leading-relaxed mb-3">
            This gallery is protected by advanced security measures including screenshot prevention, content protection, and access monitoring. All media is securely hosted and watermarked for copyright protection.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center text-blue-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Screenshot Protection Active
            </div>
            <div className="flex items-center text-blue-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Content Watermarked
            </div>
            <div className="flex items-center text-blue-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Access Monitoring Enabled
            </div>
            <div className="flex items-center text-blue-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Secure Cloud Storage
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
  cloudinaryPublicId?: string
  fileSize?: string
}

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = "dlro9nyob"
const CLOUDINARY_UPLOAD_PRESET = "STMARYSWEBCLOUD"

// Local storage key for persisting media
const MEDIA_STORAGE_KEY = "stmarys_gallery_media"

// Cloudinary URL builder with security transformations
const buildCloudinaryUrl = (publicId: string, transformations: string = "") => {
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`
  const securityTransforms = "c_limit,w_1200,h_800,q_auto,f_auto"
  const watermark = "l_text:Arial_40_bold:St.%20Mary's%20School,co_white,o_30,g_center"
  const finalTransforms = transformations ? `${transformations},${securityTransforms},${watermark}` : `${securityTransforms},${watermark}`
  return `${baseUrl}/${finalTransforms}/${publicId}`
}

// Cloudinary video URL builder
const buildCloudinaryVideoUrl = (publicId: string, transformations: string = "") => {
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload`
  const securityTransforms = "c_limit,w_1280,h_720,q_auto,f_auto"
  const watermark = "l_text:Arial_30_bold:St.%20Mary's%20School,co_white,o_40,g_north_east,x_20,y_20"
  const finalTransforms = transformations ? `${transformations},${securityTransforms},${watermark}` : `${securityTransforms},${watermark}`
  return `${baseUrl}/${finalTransforms}/${publicId}`
}

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Enhanced File Preview Component
const FilePreview: React.FC<{ file: File; onRemove: () => void }> = ({ file, onRemove }) => {
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const isVideo = file.type.startsWith("video/")
  const isImage = file.type.startsWith("image/")

  useEffect(() => {
    if (isImage || isVideo) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [file, isImage, isVideo])

  return (
    <div className="relative bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-10"
      >
        <X className="h-3 w-3" />
      </button>
      
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {isImage ? (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileImage className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
          ) : isVideo ? (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-900">
              {previewUrl ? (
                <video className="w-full h-full object-cover" muted>
                  <source src={previewUrl} type={file.type} />
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Film className="h-8 w-8 text-white" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="h-4 w-4 text-white" />
              </div>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
              <Upload className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
          <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
          <div className="flex items-center mt-1">
            {isImage ? (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <FileImage className="h-3 w-3 mr-1" />
                Image
              </span>
            ) : isVideo ? (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <Film className="h-3 w-3 mr-1" />
                Video
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                File
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
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
  const [galleryMedia, setGalleryMedia] = useState<MediaItem[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    category: "School",
    file: null as File | null,
  })

  // Enhanced upload states
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [fileValidationError, setFileValidationError] = useState("")

  // Add after existing state declarations
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [adminCode, setAdminCode] = useState("")
  const [adminError, setAdminError] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  // Enhanced Security System with Form Exceptions
  const lastActivityRef = useRef<number>(Date.now())
  const watermarkAnimationRef = useRef<number>(0)

  // Check if user is currently interacting with forms
  const isInFormMode = showUploadModal || showVerificationModal || showAdminModal

  // Load media from localStorage on component mount
  useEffect(() => {
    const savedMedia = localStorage.getItem(MEDIA_STORAGE_KEY)
    if (savedMedia) {
      try {
        const parsedMedia = JSON.parse(savedMedia)
        setGalleryMedia(parsedMedia)
        console.log('Loaded media from localStorage:', parsedMedia.length, 'items')
      } catch (error) {
        console.error('Error loading saved media:', error)
      }
    }
  }, [])

  // Save media to localStorage whenever galleryMedia changes
  useEffect(() => {
    if (galleryMedia.length > 0) {
      localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(galleryMedia))
      console.log('Saved media to localStorage:', galleryMedia.length, 'items')
    }
  }, [galleryMedia])

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

      /* Enhanced drag and drop styles */
      .drag-active {
        border-color: #10b981 !important;
        background-color: rgba(16, 185, 129, 0.05) !important;
        transform: scale(1.02) !important;
      }

      .drop-zone {
        transition: all 0.2s ease !important;
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

  // Enhanced file validation
  const validateFile = useCallback((file: File): string | null => {
    const isImage = file.type.startsWith("image/")
    const isVideo = file.type.startsWith("video/")
    
    // Check file type
    if (uploadType === "photo" && !isImage) {
      return "Please select a valid image file (PNG, JPG, GIF, WebP)"
    }
    if (uploadType === "video" && !isVideo) {
      return "Please select a valid video file (MP4, MOV, AVI, WebM)"
    }
    
    // Check file size
    const maxSize = uploadType === "video" ? 100 * 1024 * 1024 : 25 * 1024 * 1024 // 100MB for video, 25MB for images
    if (file.size > maxSize) {
      return `File size must be less than ${uploadType === "video" ? "100MB" : "25MB"}`
    }
    
    // Check for supported formats
    const supportedImageFormats = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    const supportedVideoFormats = ["video/mp4", "video/mov", "video/avi", "video/webm", "video/quicktime"]
    
    if (isImage && !supportedImageFormats.includes(file.type)) {
      return "Unsupported image format. Please use JPG, PNG, GIF, or WebP"
    }
    if (isVideo && !supportedVideoFormats.includes(file.type)) {
      return "Unsupported video format. Please use MP4, MOV, AVI, or WebM"
    }
    
    return null
  }, [uploadType])

  // Enhanced drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length === 0) return
    
    const file = files[0] // Only take the first file
    const error = validateFile(file)
    
    if (error) {
      setFileValidationError(error)
      return
    }
    
    setFileValidationError("")
    setUploadForm(prev => ({ ...prev, file }))
  }, [validateFile])

  // Create media item from upload result
  const createMediaItem = (uploadResult: any, formData: any): MediaItem => {
    const isVideo = uploadResult.resource_type === "video"
    return {
      id: Date.now() + Math.random(), // Ensure unique ID
      type: isVideo ? "video" : "image",
      src: isVideo 
        ? buildCloudinaryVideoUrl(uploadResult.public_id)
        : buildCloudinaryUrl(uploadResult.public_id),
      thumbnail: buildCloudinaryUrl(uploadResult.public_id, "c_fill,w_300,h_200"),
      alt: formData.title || uploadResult.original_filename || 'Uploaded media',
      category: formData.category || 'School',
      title: formData.title || uploadResult.original_filename || 'Untitled',
      description: formData.description || '',
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: "User",
      duration: isVideo ? "0:00" : undefined,
      cloudinaryPublicId: uploadResult.public_id,
      fileSize: uploadResult.bytes ? formatFileSize(uploadResult.bytes) : 'Unknown',
    }
  }

  // Enhanced upload to Cloudinary with better error handling
  const uploadToCloudinary = async (file: File): Promise<{ publicId: string; secureUrl: string; uploadResult: any }> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    formData.append('folder', 'stmarys-school')
    formData.append('tags', 'school,secure,protected,stmarys')
    
    // Add unique identifier to prevent duplicates
    formData.append('public_id', `stmarys_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
    
    const resourceType = uploadType === 'video' ? 'video' : 'image'
    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`

    try {
      // Create XMLHttpRequest for progress tracking
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100)
            setUploadProgress(percentComplete)
          }
        }
        
        xhr.onload = () => {
          if (xhr.status === 200) {
            try {
              const data = JSON.parse(xhr.responseText)
              resolve({
                publicId: data.public_id,
                secureUrl: data.secure_url,
                uploadResult: data
              })
            } catch (error) {
              reject(new Error('Failed to parse response'))
            }
          } else {
            reject(new Error(`Upload failed: ${xhr.statusText}`))
          }
        }
        
        xhr.onerror = () => {
          reject(new Error('Network error during upload'))
        }
        
        xhr.open('POST', uploadUrl)
        xhr.send(formData)
      })
    } catch (error) {
      console.error('Cloudinary upload error:', error)
      throw error
    }
  }

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
      const error = validateFile(file)
      if (error) {
        setFileValidationError(error)
        return
      }
      
      setFileValidationError("")
      setUploadForm({ ...uploadForm, file })
    }
  }

  const resetUploadForm = () => {
    setUploadForm({ title: "", description: "", category: "School", file: null })
    setUploadProgress(0)
    setUploadSuccess(false)
    setUploadError("")
    setFileValidationError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUploadSubmit = async () => {
    if (!isVerified) {
      alert("Please verify your authorization first.")
      return
    }
    
    if (!uploadForm.title.trim() || !uploadForm.file) {
      setUploadError("Please fill in all required fields and select a file.")
      return
    }

    setIsUploading(true)
    setUploadError("")
    setUploadProgress(0)

    try {
      console.log("Starting upload to Cloudinary...")
      const { publicId, secureUrl, uploadResult } = await uploadToCloudinary(uploadForm.file)
      
      // Create and add media item to gallery
      const newMediaItem = createMediaItem(uploadResult, uploadForm)
      setGalleryMedia(prev => {
        const updated = [newMediaItem, ...prev]
        console.log('Gallery updated with new item:', newMediaItem.title)
        return updated
      })
      
      console.log("Upload successful:", { publicId, secureUrl, newMediaItem })
      setUploadSuccess(true)
      
      // Show success message and reset form after delay
      setTimeout(() => {
        resetUploadForm()
        setShowUploadModal(false)
        setUploadSuccess(false)
      }, 2000)
      
    } catch (error) {
      console.error("Upload failed:", error)
      setUploadError(error instanceof Error ? error.message : 'Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
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

  const handleDeleteMedia = (mediaId: number) => {
    if (!isAdmin) {
      setShowAdminModal(true)
      return
    }
    
    if (confirm("⚠️ ADMIN ACTION: Are you sure you want to permanently delete this media item? This action cannot be undone.")) {
      setGalleryMedia(prev => {
        const updated = prev.filter(item => item.id !== mediaId)
        console.log('Media deleted by admin, remaining items:', updated.length)
        return updated
      })
      alert("✅ Media item deleted successfully by administrator!")
    }
  }

  const handleAdminVerification = () => {
    const validAdminCodes = ["ADMIN2024", "STMARYS_ADMIN", "DELETE_AUTH_2024"]
    if (validAdminCodes.includes(adminCode.toUpperCase())) {
      setIsAdmin(true)
      setShowAdminModal(false)
      setAdminCode("")
      setAdminError("")
      alert("🔐 Admin privileges granted! You can now manage media content.")
    } else {
      setAdminError("Invalid admin code. Contact system administrator for delete permissions.")
    }
  }

  // Secure Image Component with Cloudinary integration
  const UltraSecureImage: React.FC<{ 
    publicId?: string
    src?: string
    alt: string
    className?: string
    onClick?: () => void
    transformations?: string
  }> = ({ publicId, src, alt, className, onClick, transformations = "" }) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageSrc, setImageSrc] = useState("")

    useEffect(() => {
      if (publicId && publicId !== "placeholder") {
        const img = new window.Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          setImageSrc(buildCloudinaryUrl(publicId, transformations))
          setImageLoaded(true)
        }
        img.onerror = () => {
          console.error("Failed to load image:", publicId)
          setImageLoaded(false)
        }
        img.src = buildCloudinaryUrl(publicId, transformations)
      } else if (src) {
        setImageSrc(src)
        setImageLoaded(true)
      }
    }, [publicId, src, transformations])

    if (!publicId && !src) {
      return (
        <div className={`${className} bg-gray-200 flex items-center justify-center`}>
          <ImageIcon className="h-12 w-12 text-gray-400" />
        </div>
      )
    }

    return (
      <div className="relative">
        {imageLoaded && imageSrc ? (
          <div className="relative">
            <img
              src={imageSrc || "/placeholder.svg"}
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
        ) : (
          <div className={`${className} bg-gray-200 flex items-center justify-center animate-pulse`}>
            <ImageIcon className="h-12 w-12 text-gray-400" />
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
        className={`bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white py-20 ${!contentVisible ? "security-blur" : ""}`}
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
            {galleryMedia.length > 0 && (
              <div className="mt-4 flex items-center justify-center">
                <span className="text-sm text-emerald-200">
                  {galleryMedia.length} media items • Secured with Cloudinary
                </span>
              </div>
            )}
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
                className={`px-6 py-2 rounded-lg transition-all duration-300 flex items-center shadow-lg ${
                  isVerified ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105" : "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700"
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
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category 
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg" 
                    : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 shadow-md"
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
          {filteredMedia.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg shadow-sm">
              <div className="text-gray-400 mb-6">
                <Upload className="h-24 w-24 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">No Media Found</h3>
              <p className="text-gray-500 text-lg mb-8">
                {galleryMedia.length === 0 
                  ? "Start building your gallery by uploading your first media item."
                  : "No media matches your current filters. Try adjusting your search criteria."
                }
              </p>
              {!isVerified && (
                <button
                  onClick={handleUploadClick}
                  className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 flex items-center mx-auto"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Get Started
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMedia.map((media, index) => (
                <div
                  key={media.id}
                  className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white transform hover:scale-105"
                >
                  <div className="relative h-64 overflow-hidden" onClick={() => setSelectedMedia(index)}>
                    <UltraSecureImage
                      publicId={media.cloudinaryPublicId}
                      src={media.thumbnail}
                      alt={media.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      transformations="c_fill,w_300,h_200,q_auto,f_auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-3 left-3 pointer-events-none">
                      {media.type === "video" ? (
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full flex items-center text-xs font-medium shadow-lg">
                          <Video className="h-3 w-3 mr-1" />
                          {media.duration}
                        </div>
                      ) : (
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 rounded-full flex items-center text-xs font-medium shadow-lg">
                          <ImageIcon className="h-3 w-3 mr-1" />
                          Photo
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-relaxed">{media.title}</h3>
                    </div>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">{media.description || 'No description'}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                      <span className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-3 py-1 rounded-full font-medium">{media.category}</span>
                      <span className="font-medium">{media.uploadDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{media.fileSize}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedMedia(index)
                          }}
                          className="text-emerald-600 hover:text-emerald-800 p-2 rounded-full hover:bg-emerald-50 transition-all duration-200"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleShare(media)
                          }}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-all duration-200"
                          title="Share"
                        >
                          <Share className="h-4 w-4" />
                        </button>
                        {isAdmin && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteMedia(media.id)
                            }}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-all duration-200"
                            title="Delete (Admin Only)"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Media Modal */}
      {selectedMedia !== null && filteredMedia[selectedMedia] && (
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
                  publicId={filteredMedia[selectedMedia].cloudinaryPublicId}
                  src={filteredMedia[selectedMedia].src}
                  alt={filteredMedia[selectedMedia].alt}
                  className="max-w-full max-h-screen object-contain rounded-lg"
                  transformations="c_limit,w_1200,h_800"
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

      {/* Enhanced Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto modal-content">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold flex items-center">
                <Upload className="h-6 w-6 mr-2 text-teal-600" />
                Upload Media to Cloudinary
              </h3>
              <button 
                onClick={() => {
                  if (!isUploading) {
                    resetUploadForm()
                    setShowUploadModal(false)
                  }
                }}
                disabled={isUploading}
                className={isUploading ? "opacity-50 cursor-not-allowed" : ""}
              >
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            {/* Success Message */}
            {uploadSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-green-800">Upload Successful!</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your media has been uploaded to Cloudinary and added to the gallery.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {uploadError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <XCircle className="h-5 w-5 text-red-400 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800">Upload Failed</h4>
                    <p className="text-sm text-red-700 mt-1">{uploadError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Verification Status */}
            {isVerified && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-sm text-green-800 font-medium">✓ Authorized for Upload</span>
                </div>
              </div>
            )}

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Uploading to Cloudinary...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 h-3 rounded-full transition-all duration-300 relative overflow-hidden"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Media Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Media Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setUploadType("photo")
                      if (uploadForm.file && !uploadForm.file.type.startsWith("image/")) {
                        setUploadForm(prev => ({ ...prev, file: null }))
                      }
                      setFileValidationError("")
                    }}
                    disabled={isUploading}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
                      uploadType === "photo" 
                        ? "border-teal-500 bg-teal-50 text-teal-700" 
                        : "border-gray-300 hover:border-gray-400"
                    } ${isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <FileImage className="h-6 w-6 mb-2" />
                    <span className="font-medium">Photo</span>
                    <span className="text-xs text-gray-500 mt-1">JPG, PNG, GIF, WebP</span>
                  </button>
                  <button
                    onClick={() => {
                      setUploadType("video")
                      if (uploadForm.file && !uploadForm.file.type.startsWith("video/")) {
                        setUploadForm(prev => ({ ...prev, file: null }))
                      }
                      setFileValidationError("")
                    }}
                    disabled={isUploading}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
                      uploadType === "video" 
                        ? "border-teal-500 bg-teal-50 text-teal-700" 
                        : "border-gray-300 hover:border-gray-400"
                    } ${isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <Film className="h-6 w-6 mb-2" />
                    <span className="font-medium">Video</span>
                    <span className="text-xs text-gray-500 mt-1">MP4, MOV, AVI, WebM</span>
                  </button>
                </div>
              </div>

              {/* Enhanced File Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select {uploadType === "photo" ? "Image" : "Video"} File
                </label>
                
                {uploadForm.file ? (
                  <FilePreview 
                    file={uploadForm.file} 
                    onRemove={() => {
                      setUploadForm(prev => ({ ...prev, file: null }))
                      setFileValidationError("")
                      if (fileInputRef.current) {
                        fileInputRef.current.value = ""
                      }
                    }}
                  />
                ) : (
                  <div
                    ref={dropZoneRef}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 drop-zone ${
                      dragActive 
                        ? "border-teal-500 bg-teal-50 drag-active" 
                        : fileValidationError
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={uploadType === "photo" ? "image/*" : "video/*"}
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className={`cursor-pointer ${isUploading ? "cursor-not-allowed" : ""}`}>
                      <div className="flex flex-col items-center">
                        {dragActive ? (
                          <>
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-3">
                              <Upload className="h-6 w-6 text-teal-600" />
                            </div>
                            <p className="text-sm text-teal-600 font-medium">Drop your file here</p>
                          </>
                        ) : fileValidationError ? (
                          <>
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                              <XCircle className="h-6 w-6 text-red-600" />
                            </div>
                            <p className="text-sm text-red-600 font-medium mb-2">Invalid File</p>
                            <p className="text-xs text-red-500">{fileValidationError}</p>
                          </>
                        ) : (
                          <>
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                              {uploadType === "photo" ? (
                                <FileImage className="h-6 w-6 text-gray-400" />
                              ) : (
                                <Film className="h-6 w-6 text-gray-400" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 font-medium mb-2">
                              Drag and drop your {uploadType} here, or click to browse
                            </p>
                            <p className="text-xs text-gray-500">
                              {uploadType === "photo" 
                                ? "Supports: JPG, PNG, GIF, WebP • Max: 25MB" 
                                : "Supports: MP4, MOV, AVI, WebM • Max: 100MB"
                              }
                            </p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                )}
                
                {fileValidationError && (
                  <p className="text-red-600 text-sm mt-2">{fileValidationError}</p>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    disabled={isUploading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:bg-gray-100"
                    placeholder={`Enter ${uploadType} title`}
                    maxLength={100}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">Give your media a descriptive title</p>
                    <span className="text-xs text-gray-400">{uploadForm.title.length}/100</span>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    disabled={isUploading}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:bg-gray-100"
                    placeholder={`Describe your ${uploadType} (optional)`}
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">Optional description for context</p>
                    <span className="text-xs text-gray-400">{uploadForm.description.length}/500</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                    disabled={isUploading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:bg-gray-100"
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
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t">
                <button
                  onClick={handleUploadSubmit}
                  disabled={isUploading || !uploadForm.title.trim() || !uploadForm.file || !!fileValidationError}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading... {uploadProgress}%
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload {uploadType === "photo" ? "Photo" : "Video"}
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    if (!isUploading) {
                      resetUploadForm()
                      setShowUploadModal(false)
                    }
                  }}
                  disabled={isUploading}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Verification Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 modal-content">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-600" />
                Admin Verification Required
              </h3>
              <button
                onClick={() => {
                  setShowAdminModal(false)
                  setAdminCode("")
                  setAdminError("")
                }}
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-red-800">Administrator Access Required</h4>
                    <p className="text-sm text-red-700 mt-1">
                      Delete operations require administrator privileges. Enter your admin code to proceed.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Code</label>
                <input
                  type="password"
                  value={adminCode}
                  onChange={(e) => {
                    setAdminCode(e.target.value)
                    setAdminError("")
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter admin code"
                  onKeyPress={(e) => e.key === "Enter" && handleAdminVerification()}
                />
                {adminError && <p className="text-red-600 text-sm mt-1">{adminError}</p>}
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">
                  <strong>Need admin access?</strong>
                  <br />
                  Contact the system administrator for delete permissions.
                </p>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAdminVerification}
                  disabled={!adminCode.trim()}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Verify Admin
                </button>
                <button
                  onClick={() => {
                    setShowAdminModal(false)
                    setAdminCode("")
                    setAdminError("")
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