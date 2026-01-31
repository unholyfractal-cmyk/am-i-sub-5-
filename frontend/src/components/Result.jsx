import React from 'react'

const messages = {
  "sub5": [
    "No cap, it's a vibe check fail — but you're still cool.",
    "Low score but high energy. That's the mood."
  ],
  "not_sub5": [
    "Glow up confirmed. Keep doing you.",
    "A solid W — wear that confidence."
  ]
}

export default function Result({data}){
  const {label, confidence, explanation} = data
  const key = label === 'sub5' ? 'sub5' : 'not_sub5'
  const pick = messages[key][Math.floor(Math.random()*messages[key].length)]

  return (
    <div className="result">
      <h3>{label === 'sub5' ? 'Sub 5 detected' : 'Not a sub 5'}</h3>
      <p className="tag">{pick}</p>
      <p className="meta">Confidence: {(confidence*100).toFixed(0)}% — <em>{explanation}</em></p>
    </div>
  )
}
