import React from 'react'
import StepHeader from './StepHeader'
import OptionCard from './OptionCard'

const GOALS = [
  { id: 'strength_power',          title: 'Strength',    meta: 'Heavy · 3\u20138 reps',   description: 'Big lifts, long rests. Build pure force output.' },
  { id: 'growth_hypertrophy',      title: 'Hypertrophy', meta: 'Volume · 8\u201315 reps', description: 'Build muscle size. Moderate weight in the burn zone.' },
  { id: 'cardiovascular_endurance',title: 'Endurance',   meta: 'Light · 12\u201330 reps', description: 'Stamina and capacity. Shorter rests, higher reps.' },
]

export default function StepGoal({ goal, setGoal }) {
  return (
    <section className="flex-1 px-5 sm:px-8 py-10 sm:py-14">
      <div className="w-full max-w-[720px] mx-auto">
        <StepHeader
          eyebrow="Step 03 \u2014 Goal"
          title="What's the goal?"
          subtitle="This sets the rep ranges, rest times, and exercise selection."
        />
        <div className="grid grid-cols-1 gap-2.5">
          {GOALS.map(o => (
            <OptionCard
              key={o.id}
              active={goal === o.id}
              title={o.title}
              meta={o.meta}
              description={o.description}
              onClick={() => setGoal(o.id)}
            />
          ))}
        </div>

        <div className="mt-10 p-5 rounded-2xl border border-edge bg-panel">
          <div className="font-mono text-[10.5px] text-mute tracking-[0.14em] uppercase mb-3">
            What this changes
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            {[
              { k: 'Rep range', v: ({ strength_power: '3\u20138', growth_hypertrophy: '8\u201315', cardiovascular_endurance: '12\u201330' })[goal] },
              { k: 'Rest',      v: ({ strength_power: '2 min',  growth_hypertrophy: '90 s',   cardiovascular_endurance: '60 s'    })[goal] },
              { k: 'Mix',       v: ({ strength_power: '3:2',    growth_hypertrophy: '2:3',    cardiovascular_endurance: '2:4'     })[goal] },
            ].map(it => (
              <div key={it.k}>
                <div className="text-mute text-[11px] uppercase tracking-wider mb-1">{it.k}</div>
                <div className="font-display text-lg font-semibold text-bone">{it.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
