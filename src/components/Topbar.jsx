import React from 'react'

export function Logo() {
  return (
    <div className="flex items-center gap-2.5 font-display font-bold text-base tracking-wide text-bone">
      <span className="w-2.5 h-2.5 bg-lime rotate-45 rounded-[2px]" />
      <span>FORGE</span>
    </div>
  )
}

export function ProgressTrack({ step, total }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10.5px] text-mute tracking-[0.18em]">
        STEP {String(step).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i}
            className={`block h-[3px] w-5 rounded-full transition-colors duration-200 ${i < step ? 'bg-lime' : 'bg-edge-2'}`}/>
        ))}
      </div>
    </div>
  )
}

export default function Topbar({ step, totalSteps, onCancel, isResult }) {
  const inWizard = step >= 1 && step <= totalSteps
  return (
    <header className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-edge bg-ink/80 backdrop-blur-sm sticky top-0 z-20">
      <Logo />
      <div className="hidden sm:block">
        {inWizard ? (
          <ProgressTrack step={step} total={totalSteps} />
        ) : (
          <span className="font-mono text-[10.5px] text-mute tracking-[0.18em]">FORGE · v2 · 2026</span>
        )}
      </div>
      <div className="w-20 text-right">
        {(step > 0) && (
          <button onClick={onCancel}
            className="font-mono text-[10.5px] tracking-[0.18em] text-mute hover:text-bone uppercase">
            {isResult ? 'Home' : 'Cancel'}
          </button>
        )}
      </div>
    </header>
  )
}
