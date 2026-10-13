import { useEffect, useRef, useState } from 'react'

const QUERY = 'who is alvi?'

// Retrieved "documents" with similarity scores — shown as hits, then kept as citations.
const SOURCES = [
  { name: 'HPE', score: 0.96 },
  { name: 'MRF', score: 0.91 },
  { name: 'PwC', score: 0.88 },
  { name: 'Visual IQ', score: 0.83 },
  { name: 'Mu Sigma', score: 0.79 },
]

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// A short staged "model run": the query types in, a vector search lights up its
// sources one by one, then the answer streams in with those sources as citations.
export default function AskPanel({ answer }) {
  const tokens = answer.split(/(\s+)/)
  const [run, setRun] = useState(0)
  const [phase, setPhase] = useState('typing') // typing → retrieving → streaming → done
  const [typed, setTyped] = useState(0)
  const [hits, setHits] = useState(0)
  const [count, setCount] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(0)

  useEffect(() => {
    if (reducedMotion()) {
      setTyped(QUERY.length)
      setHits(SOURCES.length)
      setCount(tokens.length)
      setPhase('done')
      setElapsed(1.4)
      return
    }

    const timers = []
    const at = (ms, fn) => timers.push(setTimeout(fn, ms))
    let t = run === 0 ? 450 : 150

    setPhase('typing')
    setTyped(0)
    setHits(0)
    setCount(0)

    for (let i = 1; i <= QUERY.length; i++) {
      t += 28 + Math.random() * 24
      const n = i
      at(t, () => setTyped(n))
    }

    t += 140
    at(t, () => {
      startRef.current = performance.now()
      setPhase('retrieving')
    })
    for (let i = 1; i <= SOURCES.length; i++) {
      t += 130
      const n = i
      at(t, () => setHits(n))
    }

    t += 220
    at(t, () => setPhase('streaming'))
    for (let i = 1; i <= tokens.length; i++) {
      t += 22 + Math.random() * 18
      const n = i
      at(t, () => setCount(n))
    }

    at(t + 120, () => {
      setElapsed((performance.now() - startRef.current) / 1000)
      setPhase('done')
    })

    return () => timers.forEach(clearTimeout)
  }, [run])

  // Replay 5 seconds after each answer finishes, while the tab is visible.
  useEffect(() => {
    if (phase !== 'done' || reducedMotion()) return
    let id = setTimeout(function next() {
      if (document.visibilityState === 'visible') setRun((r) => r + 1)
      else id = setTimeout(next, 1000)
    }, 5000)
    return () => clearTimeout(id)
  }, [phase])

  const showAnswer = phase === 'streaming' || phase === 'done'

  return (
    <div className={`ask ask--${phase}`} aria-label={`${QUERY} — ${answer}`}>
      <div className="ask__border" aria-hidden="true" />
      <div className="ask__inner" aria-hidden="true">
        <div className="ask__beam" />

        <div className="ask__bar">
          <span className="ask__query">
            <span className="ask__key">query</span>
            <span className="ask__chev">›</span>
            {QUERY.slice(0, typed)}
            {phase === 'typing' && <span className="ask__cursor" />}
          </span>
          <span className="ask__status">
            {phase === 'retrieving' && (
              <>
                <span className="ask__orb" />
                <span className="ask__shimmer">retrieving</span>
              </>
            )}
            {phase === 'streaming' && (
              <>
                <span className="ask__orb" />
                <span className="ask__shimmer">generating</span>
              </>
            )}
            {phase === 'done' && (
              <>
                <span className="ask__ok">●</span>
                {`grounded · ${elapsed.toFixed(1)}s`}
                <button
                  type="button"
                  className="ask__replay"
                  onClick={() => setRun((r) => r + 1)}
                  aria-label="Regenerate answer"
                  title="Regenerate"
                >
                  <svg viewBox="0 0 24 24" width="13" height="13">
                    <path
                      d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}
          </span>
        </div>

        <div className="ask__body">
          {showAnswer ? (
            <p className="hero__headline">
              {tokens.slice(0, count).map((tok, i) => (
                <span className="stream__tok" key={`${run}-${i}`}>
                  {tok}
                </span>
              ))}
              <span className={`stream__caret ${phase === 'done' ? 'stream__caret--done' : ''}`} />
            </p>
          ) : (
            <div className="ask__skeleton">
              <span />
              <span />
            </div>
          )}
        </div>

        <ul className="ask__sources">
          {SOURCES.map((s, i) => {
            const hit = i < hits
            return (
              <li className={`src ${hit ? 'src--hit' : ''}`} key={s.name}>
                <span className="src__top">
                  <span className="src__name">
                    <sup>{i + 1}</sup>
                    {s.name}
                  </span>
                  <span className="src__score">{hit ? s.score.toFixed(2) : '—'}</span>
                </span>
                <span className="src__bar">
                  <span style={{ transform: `scaleX(${hit ? s.score : 0})` }} />
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
