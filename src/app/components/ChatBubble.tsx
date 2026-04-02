import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  isBot: boolean;
  timestamp: string;
}

export function ChatBubble({ message, isBot, timestamp }: ChatBubbleProps) {
  return (
    <div className={`flex gap-3 mb-4 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'
        }`}
      >
        {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>
      
      <div className={`flex-1 max-w-[70%] ${isBot ? '' : 'flex flex-col items-end'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isBot
              ? 'bg-slate-800 text-slate-100'
              : 'bg-cyan-500/20 text-slate-100 border border-cyan-500/30'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message}</p>
        </div>
        <span className="text-xs text-slate-500 mt-1">{timestamp}</span>
      </div>
    </div>
  );
}
