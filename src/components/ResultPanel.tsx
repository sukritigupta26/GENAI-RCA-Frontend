import React from 'react'
import StatusBadge from './StatusBadge'

interface AnalysisResult {
  primaryCause: string
  impact: string
  severity: string
  duration: string
  recommendations: string[]
  logs: string[]
}

const ResultPanel: React.FC = () => {
  const [result, setResult] = React.useState<AnalysisResult | null>(null)

  const handlePerformAnalysis = async () => {
    // Simulate API call to get analysis result
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      const mockResult: AnalysisResult = {
        primaryCause: 'Configuration Issue',
        impact: '3 services affected',
        severity: 'Medium',
        duration: '2 hours',
        recommendations: [
          'Review configuration files for inconsistencies',
          'Implement automated configuration validation',
          'Add monitoring for configuration changes'
        ],
        logs: [
          '[2024-01-15 10:30:00] INFO: Service started successfully',
          '[2024-01-15 10:31:00] WARN: High memory usage detected',
          '[2024-01-15 10:32:00] ERROR: Configuration mismatch',
          '[2024-01-15 10:33:00] INFO: Service restarted'
        ]
      }

      setResult(mockResult)
    } catch (error) {
      console.error('Error fetching analysis result:', error)
    }
  }

  if (!result) {
    return (
      <div className="card">
        <h2 className="card-header">Analysis Results</h2>
        <div className="text-center py-8 text-gray-500">
          <p>No analysis performed yet</p>
          <button
            onClick={handlePerformAnalysis}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Perform Analysis
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="card-header">Analysis Results</h2>
      
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Primary Cause</h3>
          <p className="text-gray-700">{result.primaryCause}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Impact</h3>
            <p className="text-gray-700">{result.impact}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Severity</h3>
            <StatusBadge status={result.severity.toLowerCase() as any} />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Duration</h3>
          <p className="text-gray-700">{result.duration}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Recommendations</h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <LogViewer logs={result.logs} />
      </div>
    </div>
  )
}

export default ResultPanel