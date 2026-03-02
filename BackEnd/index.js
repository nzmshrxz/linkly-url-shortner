const express = require('express')
const cors = require("cors")
const { handleConnection } = require('./connection/connect')
const urlRouter = require('./routes/url')
const authRouter = require('./routes/auth')
const URL = require('./models/url')
const { handleRedirect } = require('./controllers/url')
const app = express()
app.use(cors())
const PORT = 8001


handleConnection('mongodb://localhost:27017/shorturl')
app.use(express.json())
app.use('/api/shorten', urlRouter)
app.use('/api/auth', authRouter)   // 👈 all auth routes will start with /api/auth

app.get('/:shortid', handleRedirect)
app.get('/', (req, res) => {
  res.send("Server is running babygirl")
})

app.listen(PORT, () => console.log(`Server is live at ${PORT}`))