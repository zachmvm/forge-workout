import React from 'react'

export default function Button({ children, onClick, variant = 'primary', disabled, type = 'button', icon, iconLeft, className = '' }) {
  const base = "inline-flex items-center gap-2.5 font-body font-semibold text-sm tracking-tight rounded-full border transition-all duration-150 select-none"
  const variants = {
    primary: 'bg-lime text-ink border-lime hover:brightness-110 hover:shadow-glow px-5 py-3.5',
    ghost:   'bg-transparent text-dim border-edge-2 hover:text-bone hover:border-bone/30 px-5 py-3.5',
    quiet:   'bg-transparent text-mute border-transparent hover:text-bone px-3 py-2',
  }
  const disabledCls = disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${base} ${variants[variant]} ${disabledCls} ${className}`}>
      {iconLeft}
      <span>{children}</span>
      {icon}
    </button>
  )
}

export const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
export const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M12 7H2M6 11L2 7l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
