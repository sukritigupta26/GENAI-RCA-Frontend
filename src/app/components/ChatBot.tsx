import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { ChatBubble } from './ChatBubble';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your RCA Bot assistant. I can help you with:\n\n• System status checks\n• Kubernetes cluster operations\n• Ansible Tower tasks\n• Jenkins job management\n• Root cause analysis\n\nHow can I assist you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // System status checks
    if (lowerMessage.includes('status') || lowerMessage.includes('health')) {
      return `✅ System Status Report:\n\n• Kubernetes Clusters: 3 active, all healthy\n• CPU Usage: 45% average\n• Memory Usage: 62% average\n• Ansible Tower: Operational\n• Jenkins Workers: 5/5 online\n\nAll systems are running optimally.`;
    }

    // Kubernetes related
    if (lowerMessage.includes('kubernetes') || lowerMessage.includes('k8s') || lowerMessage.includes('pod')) {
      return `🔵 Kubernetes Cluster Analysis:\n\n• Production cluster: 48 pods running\n• Staging cluster: 22 pods running\n• Dev cluster: 15 pods running\n\nRecent activity:\n- Deployment scaled in prod-namespace (2 mins ago)\n- Pod restart in staging-app (5 mins ago)\n\nWould you like me to investigate any specific namespace or pod?`;
    }

    // Ansible related
    if (lowerMessage.includes('ansible') || lowerMessage.includes('playbook')) {
      return `🟠 Ansible Tower Status:\n\n• Active Jobs: 2\n• Completed Today: 18\n• Failed Jobs: 0\n\nLast playbook executed:\n- Name: deploy-monitoring-stack\n- Status: Success\n- Duration: 3m 42s\n\nReady to execute any playbook operations.`;
    }

    // Jenkins related
    if (lowerMessage.includes('jenkins') || lowerMessage.includes('build') || lowerMessage.includes('pipeline')) {
      return `🟢 Jenkins Status:\n\n• Active Pipelines: 4\n• Build Queue: Empty\n• Worker Nodes: 5/5 online\n\nRecent builds:\n1. backend-api-deploy: ✅ Success (3m ago)\n2. frontend-build: ✅ Success (15m ago)\n3. integration-tests: ✅ Success (22m ago)\n\nAll pipelines are healthy.`;
    }

    // Error or incident related
    if (lowerMessage.includes('error') || lowerMessage.includes('incident') || lowerMessage.includes('issue') || lowerMessage.includes('problem')) {
      return `🔍 Root Cause Analysis:\n\nAnalyzing recent incidents...\n\n⚠️ Detected Issues:\n1. Elevated response time in prod-api (2 hours ago)\n   - Root cause: Database connection pool exhaustion\n   - Resolution: Scaled connection pool, issue resolved\n\n2. Memory spike in staging environment (6 hours ago)\n   - Root cause: Memory leak in cache service\n   - Resolution: Service restarted, monitoring increased\n\nNo critical issues currently active.`;
    }

    // Default response
    return `I can help you with that! I can:\n\n• Check system status and health metrics\n• Monitor Kubernetes clusters\n• Manage Ansible Tower operations\n• Track Jenkins builds and pipelines\n• Perform root cause analysis\n\nPlease specify what operation you'd like me to perform or what information you need.`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(input),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 lg:inset-auto lg:bottom-6 lg:right-6 lg:w-[480px] lg:h-[600px] bg-slate-900 lg:rounded-2xl shadow-2xl border-0 lg:border border-slate-800 flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-slate-800 px-4 lg:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
            <span className="text-cyan-400 text-lg">🤖</span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">RCA Bot</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-400">Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-slate-950">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            isBot={message.isBot}
            timestamp={message.timestamp}
          />
        ))}
        {isTyping && (
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-800 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-800 p-3 lg:p-4 bg-slate-900">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about system status, K8s, Ansible, Jenkins..."
            className="flex-1 bg-slate-800 text-slate-100 rounded-lg px-3 lg:px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 placeholder:text-slate-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg px-4 py-3 transition-colors flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}