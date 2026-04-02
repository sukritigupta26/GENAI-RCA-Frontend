// Application Configuration - All hardcoded values go here
export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  CHAT_ENDPOINT: '/api/chat',
  ANALYZE_ENDPOINT: '/analyze',
  
  // Chat UI Configuration
  CHAT_MAX_WIDTH: '85%',
  CHAT_PLACEHOLDER: 'Describe your incident or say \'restart pod [pod-name]\'...',
  
  // Bot Welcome Message
  WELCOME_MESSAGE: '👋 Hello! I\'m Incident RCA Bot. I can help you perform Root Cause Analysis on incidents and also manage Kubernetes pods. Describe your incident issue or tell me what pod you need to restart.',
  
  // Error Messages
  ERROR_MESSAGE: '❌ Error processing request. Please try again.',
  AGENT_UNAVAILABLE_MESSAGE: 'Backend agent unavailable',
  
  // Timeouts
  API_TIMEOUT: 120000, // 2 minutes
  
  // Styling Constants
  THEME: {
    PRIMARY_GRADIENT: 'from-indigo-500 to-purple-500',
    USER_BUBBLE_CLASS: 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-md',
    AGENT_BUBBLE_CLASS: 'bg-white border border-gray-200 text-gray-800 rounded-bl-md',
    SYSTEM_BUBBLE_CLASS: 'bg-red-50 border border-red-200 text-red-800'
  }
}

export default CONFIG