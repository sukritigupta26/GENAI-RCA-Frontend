import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  isBot: boolean;
  timestamp: string;
}

export function ChatBubble({ message, isBot, timestamp }: ChatBubbleProps) {
  return (
    <div className={`flex gap-2 lg:gap-3 mb-4 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div
        className={`flex-shrink-0 w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center ${
          isBot ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'
        }`}
      >
        {isBot ? <Bot className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> : <User className="w-3.5 h-3.5 lg:w-4 lg:h-4" />}
      </div>
      
      <div className={`flex-1 max-w-[85%] lg:max-w-[70%] ${isBot ? '' : 'flex flex-col items-end'}`}>
        <div
          className={`rounded-2xl px-3 py-2 lg:px-4 lg:py-3 ${
            isBot
              ? 'bg-slate-800 text-slate-100'
              : 'bg-cyan-500/20 text-slate-100 border border-cyan-500/30'
          }`}
        >
          <p className="text-xs lg:text-sm whitespace-pre-wrap">{message}</p>
        </div>
        <span className="text-xs text-slate-500 mt-1">{timestamp}</span>
      </div>
    </div>
  );
}