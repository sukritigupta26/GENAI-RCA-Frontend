import React, { useState } from 'react'
import './App.css'
import IncidentRCAChat from './components/IncidentRCAChat'
import ResultPanel from './components/ResultPanel'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="App min-h-screen bg-slate-50">
      {/* Main Dashboard */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Incident RCA Dashboard</h1>
            <p className="text-indigo-200 mt-1">Root Cause Analysis Platform</p>
          </div>
          
          {/* Incident Report Chat Toggle Button */}
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl ${
              isChatOpen 
                ? 'bg-white text-indigo-600 scale-105' 
                : 'bg-indigo-500 text-white hover:bg-indigo-400'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span>Incident RCA Bot</span>
            {isChatOpen && <span className="bg-white text-indigo-600 text-xs px-2 py-1 rounded-full">● LIVE</span>}
          </button>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">System Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">Healthy Services</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-yellow-600">3</div>
                  <div className="text-sm text-gray-600">Warning</div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-red-600">1</div>
                  <div className="text-sm text-gray-600">Critical</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-600">47</div>
                  <div className="text-sm text-gray-600">Active Pods</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Incidents</h2>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-red-500 animate-pulse' : i === 2 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">Payment Service Latency Issue #{i}</div>
                      <div className="text-sm text-gray-500">Occurred {i * 15} minutes ago</div>
                    </div>
                    <div className="text-xs font-medium px-3 py-1 rounded-full bg-gray-200 text-gray-700">
                      {i === 1 ? 'Investigating' : i === 2 ? 'Resolving' : 'Resolved'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <ResultPanel />
          </div>
        </div>
      </main>

      {/* Floating Chat Panel - Right Side */}
      <div className={`fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
        isChatOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">Incident RCA Bot</h3>
              <div className="text-xs text-indigo-200 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online & Ready
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsChatOpen(false)}
            className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Chat Content */}
        <div className="flex-1 overflow-hidden">
          <IncidentRCAChat />
        </div>
      </div>
      
      {/* Overlay when chat is open */}
      {isChatOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsChatOpen(false)}
        />
      )}
    </div>
  )
}

export default App
