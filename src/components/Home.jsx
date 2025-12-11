import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();

  // FIXED SELECTOR
  const allpastes = useSelector((state) => state.paste.pastes);

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  // FIXED useEffect
  useEffect(() => {
    if (pasteId && allpastes.length > 0) {
      const paste = allpastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allpastes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 
                         bg-clip-text text-transparent mb-3 animate-slideDown">
            {pasteId ? "✏️ Edit Your Note" : "📝 Create New Note"}
          </h1>
          <p className="text-gray-600 text-lg">
            {pasteId ? "Update your content below" : "Start writing your content below"}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border-2 border-purple-100 
                        hover:shadow-3xl transition-all duration-500 animate-fadeInUp">
          
          {/* Title Input & Button Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch mb-8">
            <div className="flex-1 relative group">
              <input
                className="w-full p-4 pr-12 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 
                           text-gray-800 placeholder-gray-500 border-2 border-purple-200
                           focus:border-purple-400 focus:ring-4 focus:ring-purple-100 
                           focus:outline-none transition-all duration-300 shadow-sm
                           hover:border-purple-300 font-medium"
                type="text"
                placeholder="✨ Enter your title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 
                            text-purple-300 group-focus-within:text-purple-500 
                            transition-colors duration-300">
                📌
              </div>
            </div>

            <button
              onClick={createPaste}
              className="px-8 py-4 font-bold text-white rounded-xl shadow-lg
                         bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500
                         hover:from-purple-600 hover:via-pink-600 hover:to-blue-600
                         active:scale-95 transition-all duration-300 
                         hover:shadow-xl hover:-translate-y-1
                         whitespace-nowrap relative overflow-hidden group"
            >
              <span className="relative z-10">
                {pasteId ? "💾 Update Note" : "✨ Create Note"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent 
                            opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Content Textarea */}
          <div className="relative group">
            <textarea
              className="w-full p-5 min-h-[350px] rounded-xl 
                         bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50
                         text-gray-800 placeholder-gray-500
                         border-2 border-purple-200 focus:border-purple-400 
                         focus:ring-4 focus:ring-purple-100 focus:outline-none 
                         transition-all duration-300 shadow-inner
                         hover:border-purple-300 resize-none
                         font-mono text-sm leading-relaxed"
              placeholder="📄 Start typing your content here...

• Write your code
• Share your notes  
• Save your thoughts

Your content will be saved securely."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            
            {/* Character Count */}
            <div className="absolute bottom-3 right-3 text-xs text-gray-400 
                          bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full
                          border border-gray-200">
              {value.length} characters
            </div>
          </div>

          {/* Info Footer */}
          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Auto-saved locally</span>
            </div>
            <div className="text-xs text-gray-400">
              {pasteId ? "Editing existing Notes" : "Creating new Notes"}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeIn" 
             style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-xl p-4 shadow-md border border-purple-100 
                        hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-1">Quick Save</h3>
            <p className="text-xs text-gray-600">Instantly save your content with one click</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md border border-pink-100
                        hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-1">Secure Storage</h3>
            <p className="text-xs text-gray-600">Your data is stored safely in your browser</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md border border-blue-100
                        hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="text-2xl mb-2">✏️</div>
            <h3 className="font-semibold text-gray-800 mb-1">Easy Edit</h3>
            <p className="text-xs text-gray-600">Update your pastes anytime you want</p>
          </div>
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

export default Home;