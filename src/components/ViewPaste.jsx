import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams(); // get paste id from URL

  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 
                      flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border-2 border-red-200
                        animate-fadeIn">
          <div className="text-6xl mb-4 animate-bounce">⚠️</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Paste Not Found</h2>
          <p className="text-gray-600 mb-6">
            The paste you're looking for doesn't exist or has been deleted.
          </p>
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                       text-white font-semibold rounded-xl shadow-lg
                       hover:from-purple-600 hover:to-pink-600 
                       transition-all duration-300 hover:-translate-y-1"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-8 animate-slideDown">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 
                          text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 shadow-md">
            👁️ View Mode
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 
                         bg-clip-text text-transparent mb-3">
            {paste.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">📅</span>
              <span>{new Date(paste.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-2">
              <span className="text-xl">🕐</span>
              <span>{new Date(paste.createdAt).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}</span>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border-2 border-purple-100
                        hover:shadow-3xl transition-all duration-500 animate-fadeInUp">
          
          {/* Content Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-purple-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">📄</span>
              Content
            </h2>
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-purple-50 
                          px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Read-only mode
            </div>
          </div>

          {/* Content Display */}
          <div className="relative group">
            <textarea
              className="w-full p-6 min-h-[400px] rounded-xl 
                         bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50
                         text-gray-800 border-2 border-purple-200 shadow-inner
                         resize-none font-mono text-sm leading-relaxed
                         focus:outline-none cursor-default"
              value={paste.content}
              disabled
              readOnly
            />
            
            {/* Character & Line Count */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  📝 {paste.content.length} characters
                </span>
                <span className="bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                  📊 {paste.content.split('\n').length} lines
                </span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                  alert('📋 Content copied to clipboard!');
                }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white 
                         px-4 py-2 rounded-lg font-semibold text-sm
                         hover:from-blue-600 hover:to-cyan-600
                         transition-all duration-300 hover:-translate-y-0.5 shadow-md
                         active:scale-95"
              >
                📋 Copy Content
              </button>
            </div>
          </div>

        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn" 
             style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-xl p-5 shadow-md border border-purple-100
                        hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 
                            rounded-full flex items-center justify-center text-2xl shadow-lg">
                🔒
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Read-Only View</h3>
                <p className="text-xs text-gray-600">This paste cannot be edited in view mode</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-md border border-blue-100
                        hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 
                            rounded-full flex items-center justify-center text-2xl shadow-lg">
                📤
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Easy Sharing</h3>
                <p className="text-xs text-gray-600">Copy content with a single click</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <a
            href={`/?pasteId=${paste._id}`}
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
                       text-white font-bold rounded-xl shadow-lg
                       hover:from-purple-600 hover:via-pink-600 hover:to-blue-600
                       transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                       active:scale-95"
          >
            ✏️ Edit This Paste
          </a>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ViewPaste;