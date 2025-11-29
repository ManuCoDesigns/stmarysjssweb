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
  Sparkles,
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
  const albums: Album[] = [
    {
      id: "thanksgiving-day-2024",
      title: "Thanks Giving Day Celebrations for 2024 KCSE Results",
      description:
        "A joyous celebration honoring our students' outstanding achievements in the 2024 KCSE examinations. Community gathering filled with gratitude, recognition, and hope for the future.",
      image:
        "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg",
      category: "Events",
      date: "2024-11-15",
      location: "Main Hall",
      photographer: "John Smith",
      views: 2847,
      likes: 189,
      imageCount: 65,
      tags: ["celebration", "KCSE", "achievement", "community"],
    },
    {
      id: "sports-day-2024",
      title: "Annual Sports Day 2024",
      description:
        "Exciting moments from our annual sports competitions featuring track and field events, team sports, and award ceremonies showcasing athletic excellence.",
      image:
        "https://images.pexels.com/photos/2834914/pexels-photo-2834914.jpeg",
      category: "Sports",
      date: "2024-03-15",
      location: "Main Athletic Field",
      photographer: "Michael Johnson",
      views: 1247,
      likes: 89,
      imageCount: 42,
      tags: ["sports", "athletics", "competition", "students"],
    },
    {
      id: "cultural-fest-2024",
      title: "Cultural Festival 2024",
      description:
        "A vibrant celebration of music, dance, art, and diversity featuring performances from students across all grades representing various cultures.",
      image:
        "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
      category: "Culture",
      date: "2024-02-28",
      location: "Main Auditorium",
      photographer: "Sarah Chen",
      views: 2156,
      likes: 167,
      imageCount: 78,
      tags: ["culture", "performance", "music", "dance", "art"],
    },
    {
      id: "classroom-life-spring",
      title: "Spring Classroom Activities",
      description:
        "Capturing daily learning moments, collaborative projects, and interactive learning sessions that bring education to life in our vibrant classrooms.",
      image:
        "https://images.pexels.com/photos/8500347/pexels-photo-8500347.jpeg",
      category: "Academics",
      date: "2024-04-10",
      location: "Various Classrooms",
      photographer: "Emily Brown",
      views: 892,
      likes: 54,
      imageCount: 35,
      tags: ["academics", "learning", "classroom", "education"],
    },
    {
      id: "science-museum-trip",
      title: "Science Museum Field Trip",
      description:
        "An educational adventure exploring interactive exhibits and hands-on science demonstrations that sparked curiosity and wonder in young minds.",
      image:
        "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      category: "Trips",
      date: "2024-03-22",
      location: "City Science Museum",
      photographer: "David Wilson",
      views: 1543,
      likes: 112,
      imageCount: 64,
      tags: ["field trip", "science", "museum", "learning", "exploration"],
    },
    {
      id: "graduation-ceremony",
      title: "Graduation Ceremony 2024",
      description:
        "A memorable day celebrating our graduating class with inspiring speeches, prestigious awards, and cherished family moments marking this milestone.",
      image:
        "https://images.pexels.com/photos/7944126/pexels-photo-7944126.jpeg",
      category: "Events",
      date: "2024-05-18",
      location: "Main Hall",
      photographer: "Lisa Martinez",
      views: 3421,
      likes: 298,
      imageCount: 156,
      tags: ["graduation", "ceremony", "celebration", "achievement"],
    },
    {
      id: "art-exhibition",
      title: "Student Art Exhibition",
      description:
        "Showcasing creative works from our talented student artists across various mediums and styles, from paintings to sculptures and digital art.",
      image:
        "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg",
      category: "Culture",
      date: "2024-04-05",
      location: "Art Gallery",
      photographer: "Emma Davis",
      views: 987,
      likes: 76,
      imageCount: 48,
      tags: ["art", "exhibition", "creativity", "student work"],
    },
    {
      id: "choir-concert",
      title: "Spring Choir Concert",
      description:
        "Beautiful harmonies and stunning performances from our school choir, featuring classical pieces and contemporary arrangements.",
      image:
        "https://images.pexels.com/photos/7520386/pexels-photo-7520386.jpeg",
      category: "Culture",
      date: "2024-04-20",
      location: "Main Auditorium",
      photographer: "James Taylor",
      views: 1654,
      likes: 134,
      imageCount: 52,
      tags: ["music", "choir", "performance", "concert"],
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
    {
      icon: ImageIcon,
      label: "Photos",
      link: "/gallery/photos",
      count: "2.4K",
    },
    { icon: Video, label: "Videos", link: "/gallery/videos", count: "180" },
    { icon: Music, label: "Audio", link: "/gallery/music", count: "95" },
    { icon: Book, label: "Yearbook", link: "/gallery/yearbook", count: "12" },
    { icon: Globe, label: "Tours", link: "/gallery/tours", count: "8" },
    {
      icon: FolderOpen,
      label: "Archives",
      link: "/gallery/archives",
      count: "620",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "likes" | "views">("date");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");

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
            setIsPlaying(false);
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

  const filteredAlbums = albums
    .filter(
      (album) =>
        (activeCategory === "All" || album.category === activeCategory) &&
        (album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          album.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    <div className="font-sans text-gray-900 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>

        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="flex items-center justify-center mb-6 gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Camera className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">
              St. Mary's Gallery
            </h1>
          </div>

          <p className="text-xl max-w-3xl mx-auto mb-10 text-blue-50 leading-relaxed font-light">
            Explore our vibrant school community through thousands of captured
            moments. From academic achievements to cultural celebrations,
            discover the memories that shape our story.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-blue-50">Featured moments</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <Users className="h-4 w-4 text-blue-200" />
              <span className="text-blue-50">Community memories</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <Clock className="h-4 w-4 text-blue-200" />
              <span className="text-blue-50">Updated daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-100 py-12 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center group cursor-pointer">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
              <ImageIcon className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">2,847</h3>
            <p className="text-gray-600 font-medium text-sm">Photos</p>
            <p className="text-xs text-blue-500 mt-1 font-medium">
              +127 this month
            </p>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
              <FolderOpen className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">156</h3>
            <p className="text-gray-600 font-medium text-sm">Albums</p>
            <p className="text-xs text-emerald-500 mt-1 font-medium">
              +8 this month
            </p>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
              <Award className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">42</h3>
            <p className="text-gray-600 font-medium text-sm">Events</p>
            <p className="text-xs text-amber-500 mt-1 font-medium">
              +3 this month
            </p>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="bg-gradient-to-br from-rose-500 to-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
              <Video className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">189</h3>
            <p className="text-gray-600 font-medium text-sm">Videos</p>
            <p className="text-xs text-rose-500 mt-1 font-medium">
              +12 this month
            </p>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="sticky top-0 z-30 py-6 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search albums, tags, or photographers..."
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-3.5 text-gray-400 h-5 w-5" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-xl px-3 py-2 shadow-sm">
                <SortAsc className="h-4 w-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "date" | "likes" | "views")
                  }
                  className="text-sm font-medium text-gray-700 focus:outline-none bg-transparent cursor-pointer"
                >
                  <option value="date">Latest</option>
                  <option value="likes">Most Liked</option>
                  <option value="views">Most Viewed</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                  title="Grid view"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "masonry"
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                  title="Masonry view"
                >
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                    : "bg-white border-2 border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:shadow-md"
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

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredAlbums.length}
            </span>{" "}
            {filteredAlbums.length === 1 ? "album" : "albums"}
            {searchTerm && (
              <span>
                {" "}
                matching "
                <span className="font-semibold text-gray-700">
                  {searchTerm}
                </span>
                "
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {filteredAlbums.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No albums found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "columns-1 sm:columns-2 lg:columns-3 xl:columns-4"
              }`}
            >
              {filteredAlbums.map((album, index) => (
                <div
                  key={album.id}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100 ${
                    viewMode === "masonry" ? "break-inside-avoid mb-6" : ""
                  }`}
                  onClick={() => setSelectedIndex(index)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={album.image}
                      alt={album.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Image Count */}
                    <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5">
                      <ImageIcon className="h-3 w-3" />
                      {album.imageCount}
                    </div>

                    {/* Category */}
                    <div className="absolute top-3 right-3 bg-white/95 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-sm shadow-sm">
                      {album.category}
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(album.id);
                        }}
                        className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg ${
                          favorites.has(album.id)
                            ? "bg-red-500 text-white scale-110"
                            : "bg-white/90 text-gray-700 hover:bg-red-50 hover:text-red-500"
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
                        className="p-2.5 rounded-full bg-white/90 text-gray-700 backdrop-blur-md hover:bg-blue-50 hover:text-blue-600 transition-all shadow-lg"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {album.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {album.description}
                    </p>

                    {/* Metadata */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3.5 w-3.5 mr-2 text-gray-400" />
                        <span>{formatDate(album.date)}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3.5 w-3.5 mr-2 text-gray-400" />
                        <span className="truncate">{album.location}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <User className="h-3.5 w-3.5 mr-2 text-gray-400" />
                        <span>{album.photographer}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {album.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs rounded-full font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                      {album.tags.length > 3 && (
                        <span className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs rounded-full font-medium">
                          +{album.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Eye className="h-4 w-4" />
                          <span className="font-medium">
                            {album.views.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.has(album.id)
                                ? "text-red-500 fill-current"
                                : ""
                            }`}
                          />
                          <span className="font-medium">{album.likes}</span>
                        </div>
                      </div>
                      <div className="text-xs text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                        View →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating Media Shortcuts */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-1">
            {mediaShortcuts.map((shortcut, index) => (
              <a
                key={index}
                href={shortcut.link}
                className="group flex flex-col items-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition-all duration-200"
                title={shortcut.label}
              >
                <shortcut.icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors mb-1" />
                <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-600 transition-colors text-center">
                  {shortcut.label}
                </span>
                <span className="text-xs text-gray-400 group-hover:text-blue-400 transition-colors font-medium mt-0.5">
                  {shortcut.count}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Viewer */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/96 flex items-center justify-center z-50 backdrop-blur-sm">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-6 z-10">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <h3 className="text-white text-lg font-bold truncate">
                  {filteredAlbums[selectedIndex].title}
                </h3>
                <span className="text-gray-300 text-sm whitespace-nowrap bg-white/10 px-3 py-1 rounded-full">
                  {selectedIndex + 1} / {filteredAlbums.length}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Slideshow */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                  title={isPlaying ? "Pause slideshow" : "Start slideshow"}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </button>

                {/* Zoom */}
                <button
                  onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
                  className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                  title="Zoom out"
                >
                  <ZoomOut className="h-5 w-5" />
                </button>
                <span className="text-white text-sm px-2 font-medium">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.25))}
                  className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                  title="Zoom in"
                >
                  <ZoomIn className="h-5 w-5" />
                </button>

                {/* Thumbnails */}
                <button
                  onClick={() => setShowThumbnails(!showThumbnails)}
                  className={`p-2.5 rounded-xl transition-all backdrop-blur-sm ${
                    showThumbnails
                      ? "bg-blue-500 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  title="Toggle thumbnails"
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>

                {/* Share */}
                <button
                  onClick={() => shareAlbum(filteredAlbums[selectedIndex])}
                  className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                  title="Share album"
                >
                  <Share2 className="h-5 w-5" />
                </button>

                {/* Close */}
                <button
                  className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-red-500 hover:bg-opacity-100 transition-all ml-2 backdrop-blur-sm"
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

          {/* Navigation */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-4 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all duration-200 hover:scale-110 backdrop-blur-sm group"
            onClick={handlePrev}
            title="Previous (←)"
          >
            <ChevronLeft className="h-8 w-8 group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-4 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all duration-200 hover:scale-110 backdrop-blur-sm group"
            onClick={handleNext}
            title="Next (→)"
          >
            <ChevronRight className="h-8 w-8 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Main Image */}
          <div className="flex items-center justify-center w-full h-full p-24">
            <div className="relative max-w-full max-h-full">
              <img
                src={filteredAlbums[selectedIndex].image}
                alt={filteredAlbums[selectedIndex].title}
                className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-start justify-between text-white">
                <div className="max-w-2xl flex-1">
                  <p className="text-gray-200 mb-3 leading-relaxed">
                    {filteredAlbums[selectedIndex].description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(filteredAlbums[selectedIndex].date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{filteredAlbums[selectedIndex].location}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                      <User className="h-4 w-4" />
                      <span>{filteredAlbums[selectedIndex].photographer}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm ml-6">
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                    <Eye className="h-4 w-4" />
                    <span className="font-semibold">
                      {filteredAlbums[selectedIndex].views.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      toggleFavorite(filteredAlbums[selectedIndex].id)
                    }
                    className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm hover:bg-red-500/20 transition-colors"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.has(filteredAlbums[selectedIndex].id)
                          ? "text-red-400 fill-current"
                          : ""
                      }`}
                    />
                    <span className="font-semibold">
                      {filteredAlbums[selectedIndex].likes}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails Strip */}
          {showThumbnails && (
            <div className="absolute bottom-28 left-0 right-0 bg-black/80 backdrop-blur-md p-4 border-t border-white/10">
              <div className="flex items-center gap-3 overflow-x-auto max-w-6xl mx-auto pb-2 scrollbar-hide">
                {filteredAlbums.map((album, index) => (
                  <button
                    key={album.id}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                      index === selectedIndex
                        ? "ring-4 ring-blue-500 scale-110 shadow-lg"
                        : "opacity-60 hover:opacity-100 hover:scale-105"
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

          {/* Keyboard Shortcuts */}
          <div className="absolute top-24 left-6 bg-black/70 rounded-xl p-3 text-white text-xs backdrop-blur-sm border border-white/10">
            <div className="space-y-1.5 font-medium">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/10 rounded">←</kbd>
                <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd>
                <span className="text-gray-300">Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/10 rounded">Space</kbd>
                <span className="text-gray-300">Slideshow</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white/10 rounded">Esc</kbd>
                <span className="text-gray-300">Close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolGallery;
