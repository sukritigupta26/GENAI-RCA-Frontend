import React from 'react'

interface LogEntry {
  timestamp: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' | 'SUCCESS'
  message: string
}

interface LogViewerProps {
  logs: string[]
}

const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
  const parseLogEntry = (log: string): LogEntry => {
    const regex = /^\[(.*?)\]\s(.*?):\s(.*)$/
    const match = log.match(regex)
    if (match) {
      return {
        timestamp: match[1],
        level: match[2] as LogEntry['level'],
        message: match[3]
      }
    }
    return {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message: log
    }
  }

  return (
    <div className="card">
      <h3 className="card-header">Log Viewer</h3>
      <div className="max-h-64 overflow-y-auto">
        {logs.map((log, index) => {
          const entry = parseLogEntry(log)
          const logClass = `log-entry ${entry.level.toLowerCase()}`
          
          return (
            <div key={index} className={logClass}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{entry.timestamp}</span>
                  <span className="font-bold">{entry.level}</span>
                </div>
                <p className="text-sm text-gray-700">{entry.message}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LogViewer