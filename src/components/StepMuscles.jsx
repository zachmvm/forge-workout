import React from 'react'
import StepHeader from './StepHeader'
import Anatomy, { MUSCLES } from './Anatomy'
import Chip from './Chip'
import OptionCard from './OptionCard'
import { WORKOUTS } from '../utils/swoldier'

const MAX_INDIVIDUAL = 3

export default function StepMuscles({ poison, muscles, setMuscles }) {
  if (poison === 'individual') {
    return <IndividualPicker muscles={muscles} setMuscles={setMuscles} />
  }
  return <DayPicker poison={poison} muscles={muscles} setMuscles={setMuscles} />
}

// ---------- A. Individual: anatomy picker (up to 3 muscles) ----------

function IndividualPicker({ muscles, setMuscles }) {
  const toggle = (id) => {
    if (muscles.includes(id)) {
      setMuscles(muscles.filter(m => m !== id))
      return
    }
    if (muscles.length >= MAX_INDIVIDUAL) return
    setMuscles([...muscles, id])
  }

  return (
    <section className="flex-1 px-5 sm:px-8 py-10 sm:py-14">
      <div className="w-full max-w-[940px] mx-auto">
        <StepHeader
          eyebrow="Step 02 \u2014 Targets"
          title="What are we training?"
          subtitle={`Tap a muscle group on the body to add it. Pick up to ${MAX_INDIVIDUAL}.`}
        />
        <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,1fr)_minmax(260px,360px)] gap-8 items-start">
          <div className="bg-panel border border-edge rounded-3xl p-5 pt-6">
            <Anatomy selected={muscles} onToggle={toggle} max={MAX_INDIVIDUAL} />
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2.5">
              <span className="font-mono text-[10.5px] text-mute tracking-[0.14em] uppercase">
                Selected · {muscles.length} / {MAX_INDIVIDUAL}
              </span>
              {muscles.length > 0 && (
                <button onClick={() => setMuscles([])}
                  className="font-mono text-[10px] tracking-[0.14em] uppercase text-mute hover:text-bone">
                  Clear
                </button>
              )}
            </div>
            <div className="min-h-[88px] p-4 rounded-2xl border border-dashed border-edge-2 flex flex-wrap gap-1.5 content-start">
              {muscles.length === 0 && (
                <p className="text-mute-2 text-[13px] leading-snug">
                  No muscles selected yet. Tap a region on the body to add it.
                </p>
              )}
              {muscles.map(id => {
                const m = MUSCLES.find(x => x.id === id)
                return <Chip key={id} onRemove={() => toggle(id)}>{m?.label}</Chip>
              })}
            </div>

            <div className="mt-7 text-[13px] text-mute leading-relaxed">
              <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-mute mb-2">Tip</p>
              The exercise picker will give you compounds first, then accessories targeting these groups.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- B. Pre-set split: pick a day ----------

const DAY_META = {
  push:      { label: 'Push',      description: 'Chest, shoulders, triceps.' },
  pull:      { label: 'Pull',      description: 'Back, biceps, rear delts.' },
  legs:      { label: 'Legs',      description: 'Quads, hamstrings, glutes, calves.' },
  upper:     { label: 'Upper',     description: 'All upper body \u2014 chest, back, shoulders, arms.' },
  lower:     { label: 'Lower',     description: 'All lower body \u2014 quads, hams, glutes, calves.' },
  chest:     { label: 'Chest',     description: 'Pecs day. Heavy press, lots of fly.' },
  back:      { label: 'Back',      description: 'Vertical + horizontal pulling.' },
  shoulders: { label: 'Shoulders', description: 'Three delt heads.' },
  arms:      { label: 'Arms',      description: 'Biceps + triceps focus.' },
  abs:       { label: 'Abs',       description: 'Core and midline.' },
}

function DayPicker({ poison, muscles, setMuscles }) {
  const days = Object.keys(WORKOUTS[poison] || {})
  const splitName = ({ bro_split: 'Push / Pull / Legs', bodybuilder_split: 'Body-part Split', upper_lower: 'Upper / Lower' })[poison] || ''
  return (
    <section className="flex-1 px-5 sm:px-8 py-10 sm:py-14">
      <div className="w-full max-w-[720px] mx-auto">
        <StepHeader
          eyebrow="Step 02 \u2014 Today's Day"
          title={`Which day of ${splitName}?`}
          subtitle="Pick the day you're training. The generator will fill in the muscles it covers."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {days.map(d => {
            const meta = DAY_META[d] || { label: d, description: '' }
            const targets = (WORKOUTS[poison][d] || []).map(m => m.replaceAll('_', ' ')).join(' · ')
            return (
              <OptionCard
                key={d}
                active={muscles[0] === d}
                title={meta.label}
                meta={targets}
                description={meta.description}
                onClick={() => setMuscles([d])}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
