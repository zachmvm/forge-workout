import React from 'react'
import StepHeader from './StepHeader'
import OptionCard from './OptionCard'

// Keyed to WORKOUTS in swoldier.js
const SPLITS = [
  { id: 'individual',        title: 'Single Session',  meta: 'One-off',        description: "Just pick what you want to train today. No schedule \u2014 you choose up to 3 muscle groups." },
  { id: 'upper_lower',       title: 'Upper / Lower',    meta: '4 days / week',  description: 'Two upper, two lower. Balanced volume and recovery.', badge: 'Balanced' },
  { id: 'bro_split',         title: 'Push / Pull / Legs', meta: '3\u20136 days / week', description: 'Classic high-frequency split. Pushing muscles, pulling muscles, legs.' },
  { id: 'bodybuilder_split', title: 'Body-part Split',  meta: '5\u20136 days / week', description: 'One muscle group per day. Maximum focus and pump.' },
]

export default function StepSplit({ poison, setPoison, setMuscles }) {
  return (
    <section className="flex-1 px-5 sm:px-8 py-10 sm:py-14">
      <div className="w-full max-w-[720px] mx-auto">
        <StepHeader
          eyebrow="Step 01 \u2014 Split"
          title="How do you train?"
          subtitle="Pick the structure that fits your week. You can change this any time."
        />
        <div className="grid grid-cols-1 gap-2.5">
          {SPLITS.map(o => (
            <OptionCard
              key={o.id}
              active={poison === o.id}
              title={o.title}
              meta={o.meta}
              description={o.description}
              badge={o.badge}
              onClick={() => {
                setPoison(o.id)
                setMuscles([]) // reset muscle selection when split changes
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
