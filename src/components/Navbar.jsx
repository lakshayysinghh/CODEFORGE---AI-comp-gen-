import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { HiSun, HiMoon } from 'react-icons/hi'
import { RiSettings3Fill } from 'react-icons/ri'
import { IoSparkles } from 'react-icons/io5'
import { toast } from 'react-toastify'

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showQuickInfo, setShowQuickInfo] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    toast.success(isDarkMode ? 'Light mode activated' : 'Dark mode activated', {
      autoClose: 1500,
      hideProgressBar: true,
    });
  };

  const handleUserClick = () => {
    toast.info('User profile coming soon!', {
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const handleSettingsClick = () => {
    toast.info('Settings panel coming soon!', {
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const toggleQuickInfo = () => {
    setShowQuickInfo(!showQuickInfo);
  };

  return (
    <>
      <div className="nav flex items-center justify-between px-6 lg:px-32 h-20 border-b border-zinc-900 bg-black sticky top-0 z-50">
        {/* Logo */}
        <div className="logo flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-md bg-white flex items-center justify-center">
            <span className="text-black text-base font-bold">C</span>
          </div>
          <div className="flex flex-col">
            <h3 className='text-xl font-semibold text-white tracking-tight leading-none'>CodeForge</h3>
            <span className="text-[11px] text-gray-500 font-normal tracking-wide">AI Component Studio</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Quick Info Badge */}
          <div className="relative hidden md:block">
            <button
              onClick={toggleQuickInfo}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-400 hover:border-purple-500/40 transition-all duration-200 group"
            >
              <IoSparkles className="text-xs group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-medium">AI Powered</span>
            </button>

            {/* Tooltip */}
            {showQuickInfo && (
              <div className="absolute top-full right-0 mt-2 w-64 p-3 rounded-lg bg-zinc-900 border border-zinc-800 shadow-xl">
                <div className="flex items-start gap-2">
                  <IoSparkles className="text-purple-400 text-sm mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-white mb-1">Powered by Gemini AI</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Generate production-ready UI components using advanced AI technology. Supports multiple frameworks and instant code generation.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowQuickInfo(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-zinc-800"></div>

          {/* Icons */}
          <div className="icons flex items-center gap-1">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="w-9 h-9 rounded-md flex items-center justify-center text-gray-400 hover:text-white hover:bg-zinc-900 transition-all duration-200 group relative"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <HiSun className="text-base group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <HiMoon className="text-base group-hover:rotate-12 transition-transform duration-300" />
              )}
              {/* Glow effect on hover */}
              <span className="absolute inset-0 rounded-md bg-yellow-500/0 group-hover:bg-yellow-500/5 transition-colors duration-200"></span>
            </button>

            {/* User */}
            <button 
              onClick={handleUserClick}
              className="w-9 h-9 rounded-md flex items-center justify-center text-gray-400 hover:text-white hover:bg-zinc-900 transition-all duration-200 group relative"
              title="User profile"
            >
              <FaUser className="text-sm group-hover:scale-110 transition-transform" />
              <span className="absolute inset-0 rounded-md bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-200"></span>
            </button>

            {/* Settings */}
            <button 
              onClick={handleSettingsClick}
              className="w-9 h-9 rounded-md flex items-center justify-center text-gray-400 hover:text-white hover:bg-zinc-900 transition-all duration-200 group relative"
              title="Settings"
            >
              <RiSettings3Fill className="text-base group-hover:rotate-90 transition-transform duration-300" />
              <span className="absolute inset-0 rounded-md bg-purple-500/0 group-hover:bg-purple-500/5 transition-colors duration-200"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close tooltip */}
      {showQuickInfo && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowQuickInfo(false)}
        ></div>
      )}
    </>
  )
}

export default Navbar