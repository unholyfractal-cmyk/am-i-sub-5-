import React, {useState} from 'react'
import axios from 'axios'

export default function Upload({onResult}){
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [consent, setConsent] = useState(false)

  async function submit(e){
    e.preventDefault()
    if(!file) return setError('Pick an image first')
    if(!consent) return setError('Please confirm you have consent to upload this photo')
    setError(null)
    setLoading(true)

    // Read file as data URL (base64) and send JSON to serverless function
    const reader = new FileReader()
    reader.onload = async function(){
      try{
        const dataUrl = reader.result
        const res = await axios.post('/api/analyze', { image: dataUrl })
        onResult(res.data)
      }catch(err){
        setError(err?.response?.data?.message || err.message)
      }finally{setLoading(false)}
    }
    reader.onerror = function(){
      setError('Failed to read file')
      setLoading(false)
    }
    reader.readAsDataURL(file)
  }

  return (
    <form className="upload" onSubmit={submit}>
      <label className="drop">
        <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])} />
        <div className="drop-inner">
          <strong>{file ? file.name : 'Drag or click to upload a pic'}</strong>
          <small>Make sure it's not private info. This is for laughs only.</small>
        </div>
      </label>

      <label style={{display:'flex',alignItems:'center',gap:8}}>
        <input type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} />
        <small>I confirm I have consent to upload this photo</small>
      </label>

      <div className="controls">
        <button type="submit" className="btn" disabled={loading}>{loading ? 'Scanning...' : 'Check if sub 5'}</button>
        {error && <div className="error">{error}</div>}
      </div>
    </form>
  )
}
