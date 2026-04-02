import React from 'react'

interface StatusBadgeProps {
  status: 'success' | 'error' | 'warning' | 'info'
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-600 text-white'
      case 'error':
        return 'bg-red-600 text-white'
      case 'warning':
        return 'bg-yellow-600 text-white'
      case 'info':
        return 'bg-blue-600 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  return (
    <span className={`status-badge inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(status)}`}>
      {status.toUpperCase()}
    </span>
  )
}

export default StatusBadge