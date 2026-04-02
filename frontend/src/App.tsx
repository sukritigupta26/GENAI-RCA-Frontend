import React from 'react'
import './App.css'
import RCAForm from './components/RCAForm'
import ResultPanel from './components/ResultPanel'

function App() {
  return (
    <div className="App">
      <header className="text-center p-8 bg-blue-50">
        <h1 className="text-3xl font-bold text-blue-800">GENAI RCA</h1>
        <p className="text-gray-600 mt-2">Root Cause Analysis Tool</p>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RCAForm />
          </div>
          <div className="lg:col-span-1">
            <ResultPanel />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App