import React from 'react'

export default function OptionCard({ active, title, meta, description, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={[
        'group text-left w-full p-5 rounded-2xl border transition-all duration-150 relative',
        'flex flex-col gap-1.5',
        active
          ? 'bg-panel-3 border-lime'
          : 'bg-panel border-edge hover:border-edge-2 hover:bg-panel-2',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="font-display font-semibold text-lg tracking-tightish">{title}</div>
        <span className={[
          'mt-1 inline-flex items-center justify-center w-[18px] h-[18px] rounded-full border shrink-0',
          active ? 'bg-lime border-lime' : 'bg-transparent border-edge-2 group-hover:border-bone/40',
        ].join(' ')}>
          {active && (
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
              <path d="M1 5l3 3 5-6" stroke="#0B0E0C" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
      </div>
      {meta && (
        <div className="font-mono text-[10.5px] text-mute tracking-[0.14em] uppercase">{meta}</div>
      )}
      {description && (
        <div className="text-[13.5px] text-dim leading-snug mt-1">{description}</div>
      )}
      {badge && (
        <span className="absolute top-4 right-12 font-mono text-[10px] text-lime tracking-[0.14em] uppercase">
          {badge}
        </span>
      )}
    </button>
  )
}
