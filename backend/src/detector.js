const crypto = require('crypto')

// Deterministic mock detector: hash image and map to 0..1 score
// Returns { label: 'sub5'|'not_sub5', confidence: 0..1, explanation }
function detect(buffer){
  if(!buffer || buffer.length === 0) throw new Error('No image buffer')
  const hash = crypto.createHash('sha256').update(buffer).digest('hex')
  // Use first 8 hex chars to make a number
  const n = parseInt(hash.slice(0,8), 16)
  const score = (n % 101) / 100 // 0.00 - 1.00
  const threshold = 0.5
  return {
    label: score < threshold ? 'sub5' : 'not_sub5',
    confidence: score,
    explanation: 'Deterministic mock classifier (for entertainment). Replace with a real ML model if desired.'
  }
}

module.exports = { detect }
