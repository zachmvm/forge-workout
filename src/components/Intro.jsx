import React from 'react'
import Button, { ArrowRight } from './Button'

const STEPS = [
  { k: '01', t: 'Split style',    s: 'How you train' },
  { k: '02', t: 'Target muscles', s: 'What to hit'   },
  { k: '03', t: 'Goal',           s: 'What to chase' },
]

export default function Intro({ onStart }) {
  return (
    <section className="flex-1 px-5 sm:px-8 py-16 sm:py-20 flex items-center">
      <div className="w-full max-w-[820px] mx-auto">
        <div className="font-mono text-[10.5px] text-lime tracking-[0.22em] uppercase mb-6">
          Forge · Workout Generator
        </div>
        <h1 className="font-display font-semibold tracking-tighter2 leading-[0.98] text-balance m-0
                       text-[clamp(40px,7vw,84px)] mb-6">
          Build a program<br />
          <span className="text-dim">in 30 seconds.</span>
        </h1>
        <p className="text-dim text-lg leading-[1.55] max-w-[480px] mb-10">
          Answer three questions about your split, your targets, and your goal.
          We'll generate a session tuned to your week.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <Button onClick={onStart} icon={<ArrowRight />}>Start building</Button>
          <span className="font-mono text-xs text-mute tracking-wider">3 questions · no signup</span>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {STEPS.map((b) => (
            <div key={b.k} className="p-5 border border-edge rounded-2xl bg-panel">
              <div className="font-mono text-[10.5px] text-lime tracking-[0.14em]">{b.k}</div>
              <div className="font-display text-lg font-semibold tracking-tightish mt-2">{b.t}</div>
              <div className="text-[13px] text-mute mt-0.5">{b.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
