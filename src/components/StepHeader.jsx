import React from 'react'

export default function StepHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-9">
      <div className="font-mono text-[10.5px] text-lime tracking-[0.2em] uppercase mb-3.5">
        {eyebrow}
      </div>
      <h1 className="font-display font-semibold tracking-tightish text-[clamp(28px,4.4vw,44px)] leading-[1.05] text-balance m-0 mb-3">
        {title}
      </h1>
      {subtitle && (
        <p className="text-dim text-base leading-relaxed max-w-[540px] text-pretty">{subtitle}</p>
      )}
    </div>
  )
}
