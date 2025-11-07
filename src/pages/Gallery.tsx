import React, { useState, useEffect, useCallback } from "react";
import {
  Camera,
  Image as ImageIcon,
  Video,
  Music,
  Book,
  Globe,
  FolderOpen,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Heart,
  Share2,
  Eye,
  Calendar,
  MapPin,
  User,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Grid3X3,
  Filter,
  SortAsc,
  Clock,
  Award,
  Users,
} from "lucide-react";

interface Album {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  location: string;
  photographer: string;
  views: number;
  likes: number;
  imageCount: number;
  tags: string[];
}

const SchoolGallery: React.FC = () => {
  // Enhanced albums data with more details
  const albums: Album[] = [
    {
      id: "Thanksgiving-Day-2024",
      title: "Thanks giving day celebrations for 2024 KCSE results",
      description:
        "Exciting moments from our annual sports competitions featuring track and field events, team sports, and award ceremonies",
      image: "/public/images/band1.jpg",
      category: "Sports",
      date: "2024-03-15",
      location: "Main Athletic Field",
      photographer: "John Smith",
      views: 1247,
      likes: 89,
      imageCount: 42,
      tags: ["sports", "athletics", "competition", "students"],
    },
    {
      id: "cultural-fest-2024",
      title: "Cultural Festival 2024",
      description:
        "A vibrant celebration of music, dance, art, and diversity featuring performances from students across all grades",
      image: " ",
      category: "Culture",
      date: "2024-02-28",
      location: "Main Auditorium",
      photographer: "Sarah Johnson",
      views: 2156,
      likes: 167,
      imageCount: 78,
      tags: ["culture", "performance", "music", "dance", "art"],
    },
    {
      id: "classroom-life-spring",
      title: "Spring Classroom Activities",
      description:
        "Capturing daily learning moments, collaborative projects, and interactive learning sessions",
      image: " ",
      category: "Academics",
      date: "2024-04-10",
      location: "Various Classrooms",
      photographer: "Mike Chen",
      views: 892,
      likes: 54,
      imageCount: 35,
      tags: ["academics", "learning", "classroom", "education"],
    },
    {
      id: "science-museum-trip",
      title: "Science Museum Field Trip",
      description:
        "An educational adventure exploring interactive exhibits and hands-on science demonstrations",
      image: " ",
      category: "Trips",
      date: "2024-03-22",
      location: "City Science Museum",
      photographer: "Lisa Brown",
      views: 1543,
      likes: 112,
      imageCount: 64,
      tags: ["field trip", "science", "museum", "learning", "exploration"],
    },
    {
      id: "graduation-ceremony",
      title: "Graduation Ceremony 2024",
      description:
        "A memorable day celebrating our graduating class with speeches, awards, and family moments",
      image: " ",
      category: "Events",
      date: "2024-05-18",
      location: "Main Hall",
      photographer: "David Wilson",
      views: 3421,
      likes: 298,
      imageCount: 156,
      tags: ["graduation", "ceremony", "celebration", "achievement"],
    },
    {
      id: "art-exhibition",
      title: "Student Art Exhibition",
      description:
        "Showcasing creative works from our talented student artists across various mediums and styles",
      image: " ",
      category: "Culture",
      date: "2024-04-05",
      location: "Art Gallery",
      photographer: "Emma Davis",
      views: 987,
      likes: 76,
      imageCount: 48,
      tags: ["art", "exhibition", "creativity", "student work"],
    },
  ];

  const categories = [
    "All",
    "Sports",
    "Culture",
    "Academics",
    "Trips",
    "Events",
  ];

  const mediaShortcuts = [
    { icon: ImageIcon, label: "Photos", link: "/gallery/photos", count: "2K+" },
    { icon: Video, label: "Videos", link: "/gallery/videos", count: "150+" },
    { icon: Music, label: "Audio", link: "/gallery/music", count: "80+" },
    { icon: Book, label: "Yearbook", link: "/gallery/yearbook", count: "12" },
    { icon: Globe, label: "Virtual Tours", link: "/gallery/tours", count: "5" },
    {
      icon: FolderOpen,
      label: "Archives",
      link: "/gallery/archives",
      count: "500+",
    },
  ];

  // Enhanced state management
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "likes" | "views">("date");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");

  // Auto-slideshow functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && selectedIndex !== null) {
      interval = setInterval(() => {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredAlbums.length
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedIndex !== null) {
        switch (e.key) {
          case "ArrowLeft":
            handlePrev();
            break;
          case "ArrowRight":
            handleNext();
            break;
          case "Escape":
            setSelectedIndex(null);
            break;
          case " ":
            e.preventDefault();
            setIsPlaying(!isPlaying);
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedIndex, isPlaying]);

  // Enhanced filtering and sorting
  const filteredAlbums = albums
    .filter(
      (album) =>
        (activeCategory === "All" || album.category === activeCategory) &&
        (album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          album.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "likes":
          return b.likes - a.likes;
        case "views":
          return b.views - a.views;
        case "date":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + filteredAlbums.length) % filteredAlbums.length
      );
    }
  }, [selectedIndex, filteredAlbums.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredAlbums.length);
    }
  }, [selectedIndex, filteredAlbums.length]);

  const toggleFavorite = (albumId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(albumId)) {
        newFavorites.delete(albumId);
      } else {
        newFavorites.add(albumId);
      }
      return newFavorites;
    });
  };

  const shareAlbum = async (album: Album) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: album.title,
          text: album.description,
          url: window.location.href + `#${album.id}`,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href + `#${album.id}`);
      alert("Link copied to clipboard!");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="font-sans text-gray-900 bg-gray-50 min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="flex items-center justify-center mb-6">
            <Camera className="h-12 w-12 mr-4 text-pink-300" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              St. Mary's Gallery
            </h1>
          </div>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-100 leading-relaxed">
            Explore our vibrant school community through thousands of captured
            moments. From academic achievements to cultural celebrations,
            discover the memories that shape our story.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-pink-200">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Award-winning moments</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Community memories</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Updated daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="bg-white py-16 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <ImageIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-gray-800 mb-2">847</h3>
            <p className="text-gray-600 font-medium">Total Photos</p>
            <p className="text-xs text-gray-400 mt-1">+127 this month</p>
          </div>
          <div className="text-center group">
            <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FolderOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-gray-800 mb-2">156</h3>
            <p className="text-gray-600 font-medium">Albums</p>
            <p className="text-xs text-gray-400 mt-1">+8 this month</p>
          </div>
          <div className="text-center group">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-gray-800 mb-2">42</h3>
            <p className="text-gray-600 font-medium">Events</p>
            <p className="text-xs text-gray-400 mt-1">+3 this month</p>
          </div>
          <div className="text-center group">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Video className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-gray-800 mb-2">189</h3>
            <p className="text-gray-600 font-medium">Videos</p>
            <p className="text-xs text-gray-400 mt-1">+12 this month</p>
          </div>
        </div>
      </section>

      {/* Enhanced Controls Section */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search albums, tags, or photographers..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-3.5 text-gray-400 h-5 w-5" />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "date" | "likes" | "views")
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="date">Latest</option>
                  <option value="likes">Most Liked</option>
                  <option value="views">Most Viewed</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center bg-white border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-purple-100 text-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "masonry"
                      ? "bg-purple-100 text-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-white border-2 border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600"
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
                {cat === "All" && (
                  <span className="ml-2 text-xs opacity-75">
                    ({albums.length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Albums Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filteredAlbums.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No albums found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "columns-1 md:columns-2 lg:columns-3 xl:columns-4"
              }`}
            >
              {filteredAlbums.map((album, index) => (
                <div
                  key={album.id}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${
                    viewMode === "masonry" ? "break-inside-avoid mb-8" : ""
                  }`}
                  onClick={() => setSelectedIndex(index)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={album.image}
                      alt={album.title}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Image Count Badge */}
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {album.imageCount} photos
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                      {album.category}
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(album.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          favorites.has(album.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/80 text-gray-700 hover:bg-red-100"
                        }`}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.has(album.id) ? "fill-current" : ""
                          }`}
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shareAlbum(album);
                        }}
                        className="p-2 rounded-full bg-white/80 text-gray-700 backdrop-blur-sm hover:bg-blue-100 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {album.description}
                    </p>

                    {/* Metadata */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-2" />
                        <span>{formatDate(album.date)}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-2" />
                        <span>{album.location}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <User className="h-3 w-3 mr-2" />
                        <span>By {album.photographer}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {album.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                      {album.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{album.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{album.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.has(album.id)
                                ? "text-red-500 fill-current"
                                : ""
                            }`}
                          />
                          <span>{album.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Floating Access Bar */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-2">
          <div className="grid grid-cols-3 gap-1">
            {mediaShortcuts.map((shortcut, index) => (
              <a
                key={index}
                href={shortcut.link}
                className="group flex flex-col items-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-200"
                title={shortcut.label}
              >
                <shortcut.icon className="h-5 w-5 text-gray-600 group-hover:text-purple-600 transition-colors mb-1" />
                <span className="text-xs font-medium text-gray-600 group-hover:text-purple-600 transition-colors">
                  {shortcut.label}
                </span>
                <span className="text-xs text-gray-400 group-hover:text-purple-400 transition-colors">
                  {shortcut.count}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Lightbox Viewer */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 backdrop-blur-sm">
          {/* Header Controls */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 z-10">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div className="flex items-center gap-4">
                <h3 className="text-white text-lg font-semibold">
                  {filteredAlbums[selectedIndex].title}
                </h3>
                <span className="text-gray-300 text-sm">
                  {selectedIndex + 1} of {filteredAlbums.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Slideshow Control */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  title={isPlaying ? "Pause slideshow" : "Start slideshow"}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </button>

                {/* Zoom Controls */}
                <button
                  onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  title="Zoom out"
                >
                  <ZoomOut className="h-5 w-5" />
                </button>
                <span className="text-white text-sm px-2">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.25))}
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  title="Zoom in"
                >
                  <ZoomIn className="h-5 w-5" />
                </button>

                {/* Thumbnails Toggle */}
                <button
                  onClick={() => setShowThumbnails(!showThumbnails)}
                  className={`p-2 rounded-full transition-colors ${
                    showThumbnails
                      ? "bg-white/30 text-white"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                  title="Toggle thumbnails"
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>

                {/* Actions */}
                <button
                  onClick={() => shareAlbum(filteredAlbums[selectedIndex])}
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  title="Share album"
                >
                  <Share2 className="h-5 w-5" />
                </button>

                {/* Close */}
                <button
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors ml-2"
                  onClick={() => {
                    setSelectedIndex(null);
                    setIsPlaying(false);
                    setZoomLevel(1);
                    setShowThumbnails(false);
                  }}
                  title="Close (Esc)"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200 hover:scale-110"
            onClick={handlePrev}
            title="Previous (←)"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200 hover:scale-110"
            onClick={handleNext}
            title="Next (→)"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Main Image */}
          <div className="flex items-center justify-center w-full h-full p-20">
            <div className="relative max-w-full max-h-full">
              <img
                src={filteredAlbums[selectedIndex].image}
                alt={filteredAlbums[selectedIndex].title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            </div>
          </div>

          {/* Bottom Info Panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-start justify-between text-white">
                <div className="max-w-2xl">
                  <p className="text-gray-300 mb-3 leading-relaxed">
                    {filteredAlbums[selectedIndex].description}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(filteredAlbums[selectedIndex].date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{filteredAlbums[selectedIndex].location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{filteredAlbums[selectedIndex].photographer}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>
                      {filteredAlbums[selectedIndex].views.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      toggleFavorite(filteredAlbums[selectedIndex].id)
                    }
                    className="flex items-center gap-1 hover:text-red-400 transition-colors"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.has(filteredAlbums[selectedIndex].id)
                          ? "text-red-500 fill-current"
                          : ""
                      }`}
                    />
                    <span>{filteredAlbums[selectedIndex].likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails Panel */}
          {showThumbnails && (
            <div className="absolute bottom-24 left-0 right-0 bg-black/80 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 overflow-x-auto max-w-6xl mx-auto">
                {filteredAlbums.map((album, index) => (
                  <button
                    key={album.id}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                      index === selectedIndex
                        ? "ring-2 ring-white scale-110"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={album.image}
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Keyboard Shortcuts Info */}
          <div className="absolute top-20 left-6 bg-black/60 rounded-lg p-3 text-white text-xs backdrop-blur-sm">
            <div className="space-y-1">
              <div>← → Navigate</div>
              <div>Space Slideshow</div>
              <div>Esc Close</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolGallery;
