import { useState } from 'react'
import Topbar from './components/Topbar'
import BottomBar from './components/BottomBar'
import Intro from './components/Intro'
import StepSplit from './components/StepSplit'
import StepMuscles from './components/StepMuscles'
import StepGoal from './components/StepGoal'
import Result from './components/Result'
import { generateWorkout } from './utils/functions'

const TOTAL_STEPS = 3

function App() {
  const [step, setStep] = useState(0)
  const [poison, setPoison] = useState('individual')
  const [muscles, setMuscles] = useState([])
  const [goal, setGoal] = useState('growth_hypertrophy')
  const [workout, setWorkout] = useState(null)

  const inWizard = step >= 1 && step <= TOTAL_STEPS
  const isResult = step === 4

  const canAdvance = (
    step === 1 ? !!poison :
    step === 2 ? muscles.length > 0 :
    step === 3 ? !!goal :
    true
  )

  const goHome = () => {
    setStep(0)
    setWorkout(null)
  }

  const next = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1)
      return
    }
    // Step 3 -> generate workout
    if (muscles.length < 1) return
    const w = generateWorkout({ poison, muscles, goal })
    setWorkout(w)
    setStep(4)
  }

  const back = () => {
    if (step > 0) setStep(step - 1)
  }

  return (
    <main className="min-h-screen flex flex-col bg-ink text-bone">
      <Topbar
        step={step}
        totalSteps={TOTAL_STEPS}
        onCancel={goHome}
        isResult={isResult}
      />

      {step === 0 && <Intro onStart={() => setStep(1)} />}
      {step === 1 && (
        <StepSplit
          poison={poison}
          setPoison={setPoison}
          setMuscles={setMuscles}
        />
      )}
      {step === 2 && (
        <StepMuscles
          poison={poison}
          muscles={muscles}
          setMuscles={setMuscles}
        />
      )}
      {step === 3 && (
        <StepGoal
          goal={goal}
          setGoal={setGoal}
        />
      )}
      {step === 4 && workout && (
        <Result
          workout={workout}
          poison={poison}
          goal={goal}
          muscles={muscles}
          onRestart={() => { setWorkout(null); setStep(1) }}
          onBack={() => setStep(3)}
        />
      )}

      {inWizard && (
        <BottomBar
          onBack={back}
          onNext={next}
          canAdvance={canAdvance}
          nextLabel={step === TOTAL_STEPS ? 'Generate workout' : 'Continue'}
        />
      )}
    </main>
  )
}

export default App
