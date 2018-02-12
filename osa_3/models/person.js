const Secret = require('./secret')

const mongoose = require('mongoose')

const url = Secret.url
console.log(url, Secret)

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person