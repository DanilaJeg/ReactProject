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
              <span className="text-xl font-semibold text-gray-800">Degrees</span>
              <p className="text-gray-500 text-sm text-center mt-2">View and manage degree programs</p>
            </Link>
            
            <Link 
              to="/module" 
              className="bg-green-50 hover:bg-green-100 p-6 rounded-lg border border-green-200 flex flex-col items-center transition-colors"
            >
              <span className="text-xl font-semibold text-gray-800">Modules</span>
              <p className="text-gray-500 text-sm text-center mt-2">Browse and manage modules</p>
            </Link>
            
            <Link 
              to="/cohort" 
              className="bg-purple-50 hover:bg-purple-100 p-6 rounded-lg border border-purple-200 flex flex-col items-center transition-colors"
            >
              <span className="text-xl font-semibold text-gray-800">Cohorts</span>
              <p className="text-gray-500 text-sm text-center mt-2">Manage student cohorts</p>
            </Link>
            
            <Link 
              to="/student" 
              className="bg-yellow-50 hover:bg-yellow-100 p-6 rounded-lg border border-yellow-200 flex flex-col items-center transition-colors"
            >
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