import React from 'react'
import ExerciseCard from './ExerciseCard'
import Button, { ArrowRight } from './Button'
import { WORKOUTS } from '../utils/swoldier'

const SPLIT_NAMES = {
  individual:        'Single Session',
  upper_lower:       'Upper / Lower',
  bro_split:         'Push / Pull / Legs',
  bodybuilder_split: 'Body-part Split',
}
const GOAL_NAMES = {
  strength_power:           'Strength',
  growth_hypertrophy:       'Hypertrophy',
  cardiovascular_endurance: 'Endurance',
}

export default function Result({ workout, poison, goal, muscles, onRestart, onBack }) {
  const totalSets = workout.length
  const muscleSummary = poison === 'individual'
    ? muscles.map(m => m.replaceAll('_', ' ')).join(' · ')
    : (WORKOUTS[poison]?.[muscles[0]] || []).map(m => m.replaceAll('_', ' ')).join(' · ')

  // Estimated time: ~ (rest seconds + 30s work) * sets
  const estMin = workout.reduce((acc, e) => acc + ((Number(e.rest) || 60) + 30), 0) / 60
  const estLabel = `${Math.round(estMin)} min`

  return (
    <section id="workout" className="flex-1 px-5 sm:px-8 py-10 sm:py-14">
      <div className="w-full max-w-[820px] mx-auto">
        <div className="font-mono text-[10.5px] text-lime tracking-[0.22em] uppercase mb-3.5">
          Your session · Ready
        </div>
        <h1 className="font-display font-semibold tracking-tightish leading-[1.02] text-balance
                       text-[clamp(32px,5vw,52px)] m-0 mb-2">
          {SPLIT_NAMES[poison]} <span className="text-mute">·</span>{' '}
          <span className="text-lime">{GOAL_NAMES[goal]}</span>
        </h1>
        <p className="text-dim capitalize mb-8">{muscleSummary}</p>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-edge rounded-2xl overflow-hidden border border-edge mb-8">
          {[
            { k: 'Exercises', v: workout.length },
            { k: 'Total sets', v: totalSets },
            { k: 'Est. time',  v: estLabel },
          ].map((it, i) => (
            <div key={i} className="bg-panel px-5 py-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute mb-1.5">{it.k}</div>
              <div className="font-display text-2xl font-semibold tracking-tightish">{it.v}</div>
            </div>
          ))}
        </div>

        <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-mute mb-3">
          The work
        </div>

        <ol className="list-none p-0 m-0 flex flex-col gap-2.5">
          {workout.map((e, i) => <ExerciseCard key={i} i={i} exercise={e} />)}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button onClick={onRestart} icon={<ArrowRight />}>Generate another</Button>
          <Button variant="ghost" onClick={onBack}>Edit answers</Button>
        </div>
      </div>
    </section>
  )
}
