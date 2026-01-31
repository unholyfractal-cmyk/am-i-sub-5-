const crypto = require('crypto')

exports.handler = async function(event) {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }

    const data = JSON.parse(event.body || '{}')
    const image = data.image
    if (!image) return { statusCode: 400, body: JSON.stringify({ message: 'No image provided' }) }

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

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(out)
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ message: err.message }) }
  }
}
