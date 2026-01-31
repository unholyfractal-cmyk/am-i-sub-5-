const { detect } = require('../src/detector')

test('detect returns expected shape and deterministic', ()=>{
  const buf1 = Buffer.from('hello world')
  const a = detect(buf1)
  const b = detect(buf1)
  expect(a).toEqual(b)
  expect(['sub5','not_sub5']).toContain(a.label)
  expect(typeof a.confidence).toBe('number')
})
