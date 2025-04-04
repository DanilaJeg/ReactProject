import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 rounded-t-lg">
          <h1 className="text-3xl font-bold text-white">Welcome to the University Portal</h1>
          <p className="text-blue-100 mt-2">Manage degrees, modules, cohorts, and students in one place</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/degree" 
              className="bg-blue-50 hover:bg-blue-100 p-6 rounded-lg border border-blue-200 flex flex-col items-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-xl font-semibold text-gray-800">Degrees</span>
              <p className="text-gray-500 text-sm text-center mt-2">View and manage degree programs</p>
            </Link>
            
            <Link 
              to="/module" 
              className="bg-green-50 hover:bg-green-100 p-6 rounded-lg border border-green-200 flex flex-col items-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-xl font-semibold text-gray-800">Modules</span>
              <p className="text-gray-500 text-sm text-center mt-2">Browse and manage modules</p>
            </Link>
            
            <Link 
              to="/cohort" 
              className="bg-purple-50 hover:bg-purple-100 p-6 rounded-lg border border-purple-200 flex flex-col items-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xl font-semibold text-gray-800">Cohorts</span>
              <p className="text-gray-500 text-sm text-center mt-2">Manage student cohorts</p>
            </Link>
            
            <Link 
              to="/student" 
              className="bg-yellow-50 hover:bg-yellow-100 p-6 rounded-lg border border-yellow-200 flex flex-col items-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xl font-semibold text-gray-800">Students</span>
              <p className="text-gray-500 text-sm text-center mt-2">View and manage students</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;