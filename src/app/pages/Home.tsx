import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatBot } from '../components/ChatBot';

export function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <div className="mb-8 inline-block">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center border border-cyan-500/30">
            <span className="text-5xl">🤖</span>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          RCA Bot
        </h1>
        
        <p className="text-xl text-slate-300 mb-8">
          Your Intelligent DevOps & SRE Assistant
        </p>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-2 gap-6 text-left">
            <div>
              <div className="text-cyan-400 font-semibold mb-2">🔍 Proactive Monitoring</div>
              <p className="text-sm text-slate-400">
                Detect and debug issues before they impact your systems
              </p>
            </div>
            <div>
              <div className="text-purple-400 font-semibold mb-2">🔧 Root Cause Analysis</div>
              <p className="text-sm text-slate-400">
                AI-powered analysis to identify the source of incidents
              </p>
            </div>
            <div>
              <div className="text-green-400 font-semibold mb-2">⚙️ Multi-Platform Control</div>
              <p className="text-sm text-slate-400">
                Manage Kubernetes, Ansible Tower, and Jenkins operations
              </p>
            </div>
            <div>
              <div className="text-orange-400 font-semibold mb-2">📊 Real-time Metrics</div>
              <p className="text-sm text-slate-400">
                Monitor cluster health and system performance live
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsChatOpen(true)}
          className="group relative bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 flex items-center gap-3 mx-auto"
        >
          <MessageSquare className="w-6 h-6" />
          <span>Start Conversation</span>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
        </button>

        <p className="text-sm text-slate-500 mt-4">
          Click to chat with your DevOps assistant
        </p>
      </div>

      {/* Chat Bot */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
