const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


morgan.token('data', (req) => {
  return JSON.stringify(req.body)
})
app.use(cors())
app.use(express.static('build'))
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json())


app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      response.json(person)
    })
})

app.get('/info', (request, response) => {
  Person.count({})
    .then(n => {
      response.send('<p>puhelinluettelossa ' + n + ' henkilön tiedot.</p><p>' + new Date() + '</p>')
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndRemove({ _id: id })
    .then(response.send('deleted.'))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'Name or number missing' })
  }

  Person.count({ name: body.name })
    .then(result => {
      if (result > 0) {
        return response.status(418).json({ error: 'name must be unique' })
      } else {
        const person = new Person({
          name: body.name,
          number: body.number,
        })
        person.save()
          .then(pers => {
            response.json(pers)
          })
      }
    })



})

app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndUpdate({ _id: id }, { number: request.body.number })
    .then(response.send('updated'))
})


app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(result => {
      res.json(result)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})