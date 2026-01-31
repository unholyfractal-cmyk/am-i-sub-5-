const crypto = require('crypto')

exports.handler = async function(event) {
  try {
    // Simple CORS support
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    }

    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 204, headers }
    }

    if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ message: 'Method Not Allowed' }) }

    const data = JSON.parse(event.body || '{}')
    const image = data.image
    if (!image) return { statusCode: 400, headers, body: JSON.stringify({ message: 'No image provided' }) }

    // image can be a Data URL like: data:image/png;base64,AAA...
    const base64 = image.includes(',') ? image.split(',')[1] : image
    const buffer = Buffer.from(base64, 'base64')

    // Deterministic mock detector (same logic as backend detector)
    const hash = crypto.createHash('sha256').update(buffer).digest('hex')
    const n = parseInt(hash.slice(0,8), 16)
    const score = (n % 101) / 100
    const threshold = 0.5
    const out = {
      label: score < threshold ? 'sub5' : 'not_sub5',
      confidence: score,
      explanation: 'Netlify Function mock detector (entertainment only)'
    }

    console.log('analyze function invoked — label=', out.label, 'conf=', out.confidence.toFixed(2))

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(out)
    }
  } catch (err) {
    console.error('analyze error:', err)
    return { statusCode: 500, body: JSON.stringify({ message: err.message }) }
  }
}
