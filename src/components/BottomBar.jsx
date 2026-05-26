import React from 'react'
import Button, { ArrowLeft, ArrowRight } from './Button'

export default function BottomBar({ onBack, onNext, canAdvance, nextLabel = 'Continue', backLabel = 'Back', showBack = true }) {
  return (
    <div className="sticky bottom-0 z-10 px-5 sm:px-8 py-4 sm:py-5 border-t border-edge bg-gradient-to-t from-ink via-ink to-ink/0">
      <div className="flex items-center justify-between gap-3 max-w-[820px] mx-auto">
        {showBack ? (
          <Button variant="ghost" onClick={onBack} iconLeft={<ArrowLeft />}>
            {backLabel}
          </Button>
        ) : <span />}
        <Button variant="primary" onClick={onNext} disabled={!canAdvance} icon={<ArrowRight />}>
          {nextLabel}
        </Button>
      </div>
    </div>
  )
}
