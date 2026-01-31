import React, {useState} from 'react'
import Upload from './components/Upload'
import Result from './components/Result'

export default function App(){
  const [result, setResult] = useState(null)

  return (
    <div className="app">
      <header className="hero">
        <h1>Am I Sub 5? 💜</h1>
        <p className="tagline">Upload a pic. It's silly. Don't be mad. It's entertainment only.</p>
        <p className="meme">No cap — vibes only. Share at your own risk (and your friends' consent).</p>
      </header>

      <main className="card">
        <Upload onResult={setResult} />
        {result && <Result data={result} />}
      </main>

      <footer className="foot">Made for laughs — not for judging. Consent required before using others' photos.</footer>
    </div>
  )
}
