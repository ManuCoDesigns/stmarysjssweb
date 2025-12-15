"use client";

import type React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Academics",
      href: "/academics",
      dropdown: [
        { name: "Curriculum", href: "/academics/curriculum" },
        { name: "Departments", href: "/academics/departments" },
        { name: "Faculty", href: "/academics/faculty" },
        { name: "Academic Calendar", href: "/academics/calendar" },
      ],
    },
    {
      name: "Admissions",
      href: "/admissions",
      dropdown: [
        { name: "How to Apply", href: "/admissions/apply" },
        { name: "Requirements", href: "/admissions/requirements" },
        { name: "Tuition & Fees", href: "/admissions/fees" },
        { name: "Financial Aid", href: "/admissions/financial-aid" },
      ],
    },
    { name: "Exam Downloads", href: "/ExamDownloads" },
    {
      name: "Student Life",
      href: "/life-at-stmarys",
      dropdown: [
        { name: "Campus Life", href: "/life-at-stmarys/campus" },
        { name: "Sports", href: "/life-at-stmarys/sports" },
        { name: "Clubs & Activities", href: "/life-at-stmarys/clubs" },
        { name: "Events", href: "/life-at-stmarys/events" },
      ],
    },
    { name: "News", href: "/news" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const isDropdownActive = (dropdown?: { href: string }[]) => {
    return dropdown?.some((item) => location.pathname.startsWith(item.href));
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-colors"
          >
            <img
              src="/images/JSS HD.png"
              alt="School Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="font-bold text-xl">St. Mary's School</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href) || isDropdownActive(item.dropdown)
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600"
                  }`}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="h-4 w-4" />}
                </Link>

                {item.dropdown && openDropdown === item.name && (
                  <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-md border border-gray-200 py-2">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          isActive(subItem.href)
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Student Portal
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => !item.dropdown && setIsMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 text-base font-medium transition-colors duration-200 ${
                      isActive(item.href) || isDropdownActive(item.dropdown)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {item.name}
                    {item.dropdown && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenDropdown(
                            openDropdown === item.name ? null : item.name
                          );
                        }}
                        className="p-1"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </Link>

                  {item.dropdown && openDropdown === item.name && (
                    <div className="pl-6 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block px-3 py-2 text-sm transition-colors duration-200 ${
                            isActive(subItem.href)
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-blue-600 bg-blue-50 mt-4"
              >
                Student Portal
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
