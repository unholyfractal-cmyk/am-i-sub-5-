const express = require('express')
const multer = require('multer')
const cors = require('cors')
const { detect } = require('./detector')
const fs = require('fs')

const upload = multer({ storage: multer.memoryStorage() })
const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/analyze', upload.single('photo'), (req, res) => {
  try{
    if(!req.file) return res.status(400).json({message:'No photo uploaded'})
    const buf = req.file.buffer
    const out = detect(buf)
    res.json(out)
  }catch(err){
    console.error(err)
    res.status(500).json({message:err.message || 'Error'})
  }
})

app.get('/api/health', (req,res)=>res.json({ok:true}))

const port = process.env.PORT || 4000
app.listen(port, ()=>console.log('API listening on', port))
