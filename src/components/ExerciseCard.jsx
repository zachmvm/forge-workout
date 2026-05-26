import React, { useState } from 'react'

const SETS_TOTAL = 5

export default function ExerciseCard({ exercise, i }) {
  const [setsDone, setSetsDone] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const inc = () => setSetsDone((setsDone + 1) % (SETS_TOTAL + 1))

  const descParts = (exercise.description || '').split('___').filter(Boolean)
  const muscleLabel = (exercise.muscles || []).map(m => m.replaceAll('_', ' ')).join(' · ')

  return (
    <li className="bg-panel border border-edge rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-start gap-4">
        <div className="font-mono text-xs text-mute pt-1 shrink-0 w-7">
          {String(i + 1).padStart(2, '0')}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tightish capitalize leading-tight">
            {exercise.name.replaceAll('_', ' ')}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-lime/10 text-lime-2">
              {exercise.type}
            </span>
            <span className="text-mute capitalize">{muscleLabel}</span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-edge rounded-xl overflow-hidden border border-edge">
        {[
          { k: exercise.unit === 'reps' ? 'reps' : exercise.unit, v: exercise.reps },
          { k: 'rest', v: `${exercise.rest}s` },
          { k: 'tempo', v: exercise.tempo },
        ].map((s) => (
          <div key={s.k} className="bg-panel-2 px-4 py-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-mute mb-1">{s.k}</div>
            <div className="font-display text-lg font-semibold text-bone">{s.v}</div>
          </div>
        ))}
        <button onClick={inc}
          className="bg-panel-2 px-4 py-3 text-left transition-colors hover:bg-panel-3 group">
          <div className="flex items-center justify-between">
            <div className="font-mono text-[10px] uppercase tracking-wider text-mute mb-1">
              Sets done
            </div>
            {setsDone === SETS_TOTAL && (
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke="#D4FF3A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="font-display text-lg font-semibold text-lime">{setsDone}</div>
            <div className="text-mute">/ {SETS_TOTAL}</div>
            {/* progress dots */}
            <div className="ml-auto flex gap-1">
              {Array.from({ length: SETS_TOTAL }).map((_, n) => (
                <span key={n}
                  className={`block w-1.5 h-1.5 rounded-full ${n < setsDone ? 'bg-lime' : 'bg-edge-2'}`}/>
              ))}
            </div>
          </div>
        </button>
      </div>

      {/* Notes / variant info */}
      {descParts.length > 0 && (
        <div>
          <button onClick={() => setExpanded(!expanded)}
            className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-mute hover:text-bone inline-flex items-center gap-1">
            {expanded ? 'Hide' : 'How to'}
            <svg width="10" height="10" viewBox="0 0 10 10" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 160ms' }}>
              <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {expanded && (
            <div className="mt-3 flex flex-col gap-2 text-[13.5px] text-dim leading-relaxed">
              {descParts.map((p, idx) => <p key={idx}>{p}</p>)}
            </div>
          )}
        </div>
      )}
    </li>
  )
}
