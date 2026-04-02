import React, { useState, useRef, useEffect } from 'react'
import { CONFIG } from '../config'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  isLoading?: boolean
}

const IncidentRCAChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '👋 Hello! I\'m Incident RCA Bot. I can help you perform Root Cause Analysis on incidents and also manage Kubernetes pods. Describe your incident issue or tell me what pod you need to restart.',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateId = () => Math.random().toString(36).substring(2, 10)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputValue.trim() || isProcessing) return
    
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsProcessing(true)

    // Add loading message
    const loadingId = generateId()
    setMessages(prev => [...prev, {
      id: loadingId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true
    }])

    try {
      // Call actual GENAI RCA Agent backend
      const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.CHAT_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue
        })
      })
      
      // Remove loading message
      setMessages(prev => prev.filter(m => m.id !== loadingId))

      if (!response.ok) {
        throw new Error('Backend agent unavailable')
      }

      const data = await response.json()
      const responseContent = data.response

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
      
    } catch (error) {
      setMessages(prev => [...prev.filter(m => m.id !== loadingId), {
        id: generateId(),
        role: 'system',
        content: '❌ Error processing request. Please try again.',
        timestamp: new Date()
      }])
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-gradient-to-b from-slate-50 to-slate-100">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm transition-all ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-md'
                  : message.role === 'system'
                  ? 'bg-red-50 border border-red-200 text-red-800'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
              }`}
            >
              {message.isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
              )}
              <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your incident or say 'restart pod [pod-name]'..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing || !inputValue.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Examples: "Payment service is down", "Restart pod payment-service-7f9d8", "High latency on API gateway"
        </p>
      </form>
    </div>
  )
}

export default IncidentRCAChat