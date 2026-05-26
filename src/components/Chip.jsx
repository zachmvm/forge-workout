import React from 'react'

export default function Chip({ children, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full border border-lime/40 bg-lime/10 text-lime text-xs font-medium capitalize">
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label="remove"
          className="inline-flex items-center justify-center p-0.5 hover:bg-lime/20 rounded-full"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
            <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </span>
  )
}
