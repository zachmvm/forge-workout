import React, { useState } from 'react'

// Muscle groups mapped 1:1 with backend keys in swoldier.js
export const MUSCLES = [
  { id: 'chest',      label: 'Chest' },
  { id: 'shoulders',  label: 'Shoulders' },
  { id: 'biceps',     label: 'Biceps' },
  { id: 'triceps',    label: 'Triceps' },
  { id: 'back',       label: 'Back' },
  { id: 'abs',        label: 'Core' },
  { id: 'quads',      label: 'Quads' },
  { id: 'hamstrings', label: 'Hamstrings' },
  { id: 'glutes',     label: 'Glutes' },
  { id: 'calves',     label: 'Calves' },
]

function BodyOutline({ x }) {
  const head = `M ${x} 30 a 20 22 0 1 1 0.01 0 z`
  const body = `
    M ${x-6} 50 L ${x+6} 50 L ${x+8} 60
    L ${x+38} 75 L ${x+42} 100 L ${x+44} 150
    L ${x+38} 175 L ${x+32} 180 L ${x+22} 165
    L ${x+18} 145 L ${x+22} 175
    L ${x+22} 220 L ${x+30} 320 L ${x+24} 420
    L ${x+8} 425 L ${x+6} 420 L ${x+4} 320
    L ${x} 240 L ${x-4} 320 L ${x-6} 420
    L ${x-8} 425 L ${x-24} 420 L ${x-30} 320
    L ${x-22} 220 L ${x-22} 175 L ${x-18} 145
    L ${x-22} 165 L ${x-32} 180 L ${x-38} 175
    L ${x-44} 150 L ${x-42} 100 L ${x-38} 75
    L ${x-8} 60 Z`
  return (
    <g style={{ pointerEvents: 'none' }}>
      <path d={head} fill="none" stroke="rgba(232,226,212,0.22)" strokeWidth="1" />
      <path d={body} fill="none" stroke="rgba(232,226,212,0.22)" strokeWidth="1" />
    </g>
  )
}

function frontRegions(cx) {
  return [
    { id: 'shoulders', d: `M ${cx-38} 78 q -8 6 -4 22 q 8 -2 14 -6 q 4 -10 -2 -18 Z` },
    { id: 'shoulders', d: `M ${cx+38} 78 q 8 6 4 22 q -8 -2 -14 -6 q -4 -10 2 -18 Z` },
    { id: 'chest',     d: `M ${cx-2} 86 q -22 0 -28 18 q 0 18 12 24 q 8 -2 16 -10 Z` },
    { id: 'chest',     d: `M ${cx+2} 86 q 22 0 28 18 q 0 18 -12 24 q -8 -2 -16 -10 Z` },
    { id: 'biceps',    d: `M ${cx-36} 102 q -8 4 -8 22 q 0 8 6 14 q 8 -2 10 -10 q 2 -12 -2 -24 Z` },
    { id: 'biceps',    d: `M ${cx+36} 102 q 8 4 8 22 q 0 8 -6 14 q -8 -2 -10 -10 q -2 -12 2 -24 Z` },
    { id: 'abs',       d: `M ${cx-12} 130 h 24 v 50 q -12 6 -24 0 Z` },
    { id: 'quads',     d: `M ${cx-22} 220 q -4 30 -2 70 q 10 6 18 0 q 4 -34 2 -70 Z` },
    { id: 'quads',     d: `M ${cx+22} 220 q 4 30 2 70 q -10 6 -18 0 q -4 -34 -2 -70 Z` },
  ]
}

function backRegions(cx) {
  return [
    // Back (traps + lats area, single region)
    { id: 'back', d: `
        M ${cx-22} 62 q 22 -8 44 0 q -4 16 -22 18 q -18 -2 -22 -18 Z
        M ${cx-32} 86 q -2 30 8 56 q 16 -4 24 -16 q 0 -26 -4 -42 q -14 -2 -28 2 Z
        M ${cx+32} 86 q 2 30 -8 56 q -16 -4 -24 -16 q 0 -26 4 -42 q 14 -2 28 2 Z` },
    { id: 'triceps',    d: `M ${cx-36} 100 q -8 4 -8 22 q 0 8 6 14 q 8 -2 10 -10 q 2 -12 -2 -24 Z` },
    { id: 'triceps',    d: `M ${cx+36} 100 q 8 4 8 22 q 0 8 -6 14 q -8 -2 -10 -10 q -2 -12 2 -24 Z` },
    { id: 'glutes',     d: `M ${cx-22} 195 q -2 18 6 32 q 14 0 16 -10 q 0 -16 -4 -24 Z` },
    { id: 'glutes',     d: `M ${cx+22} 195 q 2 18 -6 32 q -14 0 -16 -10 q 0 -16 4 -24 Z` },
    { id: 'hamstrings', d: `M ${cx-22} 230 q -4 26 -2 56 q 10 6 18 0 q 4 -30 2 -56 Z` },
    { id: 'hamstrings', d: `M ${cx+22} 230 q 4 26 2 56 q -10 6 -18 0 q -4 -30 -2 -56 Z` },
    { id: 'calves',     d: `M ${cx-22} 310 q -6 28 -2 60 q 10 6 16 0 q 4 -28 0 -60 Z` },
    { id: 'calves',     d: `M ${cx+22} 310 q 6 28 2 60 q -10 6 -16 0 q -4 -28 0 -60 Z` },
  ]
}

function Region({ d, id, selected, hovered, disabled, onToggle, onEnter, onLeave }) {
  const fill = selected
    ? 'rgba(212, 255, 58, 0.85)'
    : hovered
      ? 'rgba(212, 255, 58, 0.18)'
      : 'rgba(232, 226, 212, 0.06)'
  const stroke = selected ? '#D4FF3A' : 'rgba(232, 226, 212, 0.28)'
  return (
    <path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={selected ? 1.2 : 0.8}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'fill 160ms ease, stroke 160ms ease',
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={(e) => { e.stopPropagation(); if (!disabled) onToggle(id) }}
      onMouseEnter={() => onEnter(id)}
      onMouseLeave={() => onLeave(id)}
    />
  )
}

export default function Anatomy({ selected, onToggle, max }) {
  const [hover, setHover] = useState(null)
  const front = frontRegions(100)
  const back = backRegions(300)
  const atCap = max != null && selected.length >= max

  const renderRegion = (r, i) => {
    const isSelected = selected.includes(r.id)
    const disabled = !isSelected && atCap
    return (
      <Region
        key={`${r.id}-${i}`}
        d={r.d}
        id={r.id}
        selected={isSelected}
        hovered={hover === r.id}
        disabled={disabled}
        onToggle={onToggle}
        onEnter={setHover}
        onLeave={() => setHover(null)}
      />
    )
  }

  const hoverLabel = hover ? MUSCLES.find(m => m.id === hover)?.label : null

  return (
    <svg viewBox="0 0 400 440" className="w-full max-w-[460px] h-auto block mx-auto" role="img" aria-label="Muscle group selector">
      <text x="100" y="16" textAnchor="middle"
        fill="rgba(232,226,212,0.55)" fontFamily="JetBrains Mono, monospace"
        fontSize="9" letterSpacing="1.8">FRONT</text>
      <text x="300" y="16" textAnchor="middle"
        fill="rgba(232,226,212,0.55)" fontFamily="JetBrains Mono, monospace"
        fontSize="9" letterSpacing="1.8">BACK</text>

      <BodyOutline x={100} />
      <BodyOutline x={300} />

      {front.map(renderRegion)}
      {back.map(renderRegion)}

      {hoverLabel && (
        <g style={{ pointerEvents: 'none' }}>
          <text x="200" y="430" textAnchor="middle"
            fill="#D4FF3A" fontFamily="'Inter Tight', sans-serif"
            fontSize="14" fontWeight="600" letterSpacing="0.5">
            {hoverLabel}
          </text>
        </g>
      )}
    </svg>
  )
}
