import React, { useState } from 'react'

interface RCAFormData {
  incidentDescription: string
  affectedServices: string[]
  severity: 'low' | 'medium' | 'high' | 'critical'
  startTime: string
  endTime: string
}

const RCAForm: React.FC = () => {
  const [formData, setFormData] = useState<RCAFormData>({
    incidentDescription: '',
    affectedServices: [],
    severity: 'medium',
    startTime: '',
    endTime: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call to perform RCA analysis
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const analysisResult = `
Root Cause Analysis Result:
- Primary Cause: ${formData.severity === 'critical' ? 'System Failure' : 'Configuration Issue'}
- Impact: ${formData.affectedServices.length} services affected
- Severity: ${formData.severity}
- Duration: ${formData.startTime} to ${formData.endTime}
      `
      
      setResult(analysisResult)
    } catch (error) {
      console.error('Error performing RCA:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddService = () => {
    setFormData(prev => ({
      ...prev,
      affectedServices: [...prev.affectedServices, '']
    }))
  }

  const handleRemoveService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      affectedServices: prev.affectedServices.filter((_, i) => i !== index)
    }))
  }

  const handleServiceChange = (index: number, value: string) => {
    setFormData(prev => {
      const services = [...prev.affectedServices]
      services[index] = value
      return { ...prev, affectedServices: services }
    })
  }

  return (
    <div className="card">
      <h2 className="card-header">Root Cause Analysis Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Incident Description
          </label>
          <textarea
            rows={4}
            value={formData.incidentDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, incidentDescription: e.target.value }))}
            className="w-full"
            placeholder="Describe the incident..."
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Affected Services
          </label>
          {formData.affectedServices.map((service, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={service}
                onChange={(e) => handleServiceChange(index, e.target.value)}
                placeholder="Service name"
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => handleRemoveService(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddService}
            className="text-blue-500 hover:text-blue-700"
          >
            + Add Service
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Severity
          </label>
          <select
            value={formData.severity}
            onChange={(e) => setFormData(prev => ({ ...prev, severity: e.target.value as any }))}
            className="w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <input
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time
            </label>
            <input
              type="datetime-local"
              value={formData.endTime}
              onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Analyzing...' : 'Perform RCA'}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-3">Analysis Result</h3>
          <pre className="bg-white p-3 rounded text-sm">{result}</pre>
        </div>
      )}
    </div>
  )
}

export default RCAForm