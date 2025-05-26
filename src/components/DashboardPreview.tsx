
import React from 'react';
import { BarChart3, Calendar, FileText, Star, TrendingUp, Users } from 'lucide-react';

const DashboardPreview = () => {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Powerful Dashboards for Every User
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tailored interfaces for colleges, teachers, and students with real-time analytics and insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* College Dashboard */}
          <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">College Dashboard</h3>
                <p className="text-gray-300 text-sm">Infrastructure & Performance</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Overall Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400" size={16} fill="currentColor" />
                    <span className="font-bold">4.7</span>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full w-4/5"></div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Faculty Score</span>
                  <span className="text-green-400 font-bold">92%</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Infrastructure</span>
                  <span className="text-blue-400 font-bold">88%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Teacher Dashboard */}
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Users className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Teacher Portal</h3>
                <p className="text-gray-300 text-sm">Qualifications & Growth</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Qualification Score</span>
                  <span className="text-purple-400 font-bold">9.2/10</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-400 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Student Rating</span>
                  <span className="text-green-400 font-bold">4.8/5</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Certifications</span>
                  <span className="text-yellow-400 font-bold">12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Student Dashboard */}
          <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-2xl p-6 border border-green-500/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-green-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Student Portal</h3>
                <p className="text-gray-300 text-sm">Progress & Analytics</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Academic Score</span>
                  <span className="text-green-400 font-bold">85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Attendance</span>
                  <span className="text-blue-400 font-bold">96%</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Assignments</span>
                  <span className="text-purple-400 font-bold">18/20</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
