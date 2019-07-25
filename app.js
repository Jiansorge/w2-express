

const { NODE_ENV='development', PORT=5000 } = process.env
const express = require('express')
const app = express()

if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

// app.use((req, res, next) => {
//   console.log('In the server!')
//   next()
// })

app.get('/', (req, res, next) => {
  console.log(req.headers)
  console.log(req.query)

  res.json({
    message: 'Hello, Express!'
  })
})


app.get('/my/name/is/:name', (req, res, next) => {
  console.log(req.params)
  res.json({
    message: `Hello, ${req.params.name}!`
  })
})


app.get('/ping', (req, res, next) => {
  res.status(200);
  res.json({
    message: `pong`
  })
})

app.use((req, res, next) => {
  console.log('In the server!')
  next()
})

// POST /message?content=hello
// -> Status Code: 201
// -> Response Body: { message: 'Message received!', content: 'hello' }

app.post('/message', (req, res, next) => {
  res.status(201);
  const message = 'Message received!'
  const { content } = req.query
  console.log(req.body)
  res.json({
    message,
    content
  })
})

// DELETE /messages/4
// -> Status Code: 200
// -> Response Body: { message: 'Deleted message 4' }

app.delete('/messages/:id', (req, res, next) => {
  res.status(200);
  res.json({
    message: `Deleted message, ${req.params.id}`
  })
})

//alternatively
app.delete('/messages/:id', (req, res, next) => {
  const status = 200
  const { id } = req.params
  const message = 'Deleted message ${id}'

  res.status(status).json({message})
})


const listener = () => console.log(`Listening on Port ${PORT}`)
app.listen(PORT, listener)
