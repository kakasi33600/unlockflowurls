'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RedirectPage({ 
  params 
}: { 
  params: { shortCode: string; step: string } 
}) {
  const router = useRouter()
  const [count, setCount] = useState(10)
  const [ready, setReady] = useState(false)
  const currentStep = parseInt(params.step)
  const totalSteps = 4

  useEffect(() => {
    if (count <= 0) {
      setReady(true)
      return
    }
    const timer = setInterval(() => setCount((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [count])

  const proceedToNext = () => {
    if (currentStep < totalSteps) {
      router.push(`/redirect/${params.shortCode}/${currentStep + 1}`)
      return
    }
    window.location.href = `/api/redirect/${params.shortCode}`
  }

  const progress = ((10 - count) / 10) * 100

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="max-w-lg w-full mx-4">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl text-center">
          <div className="text-6xl mb-6 animate-pulse">⏳</div>
          
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--gray-800)' }}>Please Wait</h1>
          <p className="text-gray-600 mb-6">Step {currentStep} of {totalSteps}</p>

          <div className="text-8xl font-black mb-6" style={{ 
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {count}
          </div>

          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-6">
            <div 
              className="h-3 rounded-full transition-all duration-1000"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))'
              }}
            />
          </div>

          <p className="text-gray-600 text-sm mb-6">
            {count > 0 ? `Please wait ${count} seconds...` : 'Ready to continue'}
          </p>

          <button
            type="button"
            onClick={proceedToNext}
            disabled={!ready}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-[var(--primary-color)] disabled:opacity-40"
          >
            Get Your Link
          </button>
        </div>
      </div>
    </div>
  )
}
