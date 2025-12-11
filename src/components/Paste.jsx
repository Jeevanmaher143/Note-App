import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { useNavigate } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete paste
  function handleDelete(id) {
    dispatch(removeFromPastes(id));
  }

  // Copy content
  function handleCopy(content) {
    navigator.clipboard.writeText(content);
    alert("Copied to clipboard!");
  }

  // Share link (dummy alert)
  function handleShare(id) {
    alert(`Share link copied: /paste/${id}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4 sm:px-6 lg:px-10 py-8">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
          📝 My Pastes
        </h1>
        
        {/* Search Bar */}
        <input
          type="search"
          placeholder="🔍 Search pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-2xl mx-auto block p-4 rounded-2xl border-2 border-purple-200
                     bg-white shadow-md outline-none
                     transition-all duration-300 focus:border-purple-400 focus:shadow-lg
                     text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Pastes List */}
      <div className="max-w-5xl mx-auto space-y-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl 
                         transition-all duration-300 overflow-hidden border border-purple-100
                         hover:border-purple-300"
            >
              {/* Header with Title and Buttons */}
              <div className="px-6 py-4 flex justify-between items-center flex-wrap gap-3 border-b-2 border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 flex-1 min-w-0 truncate">
                  {paste.title}
                </h2>
                
                {/* Action Buttons */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => navigate(`/?pasteId=${paste._id}`)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center
                             transition-all duration-200 border border-gray-200 hover:border-gray-300"
                    title="Edit"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => navigate(`/view-paste/${paste._id}`)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center
                             transition-all duration-200 border border-gray-200 hover:border-gray-300"
                    title="View"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleCopy(paste.content)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center
                             transition-all duration-200 border border-gray-200 hover:border-gray-300"
                    title="Copy"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="w-10 h-10 bg-gray-100 hover:bg-red-50 rounded-lg flex items-center justify-center
                             transition-all duration-200 border border-gray-200 hover:border-red-300"
                    title="Delete"
                  >
                    <svg className="w-5 h-5 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl 
                              text-gray-700 text-sm leading-relaxed max-h-32 overflow-y-auto
                              border border-purple-100">
                  {paste.content}
                </div>
                
                {/* Date */}
                <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                  <span>🕒</span>
                  {new Date(paste.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 text-xl font-medium">No pastes found</p>
            <p className="text-gray-400 text-sm mt-2">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;