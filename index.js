/*eslint-disable sort-keys*/

/* Hämta express */
const express = require('express')
const app = express()

/* Skapa variabler för server & filhantering */
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const fs = require('fs')

/* Variabel votes hämtar en JSON-fil */
let votes = require('./votes.json')


/* Servar statiska mappen Public*/
app.use(express.static('public'))

/* Visar olika HTML-sidor för olika adresser */
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/admin', (req, res) => {
  if (req.query.user == 'admin' && req.query.pass == 'secret') {
    res.sendFile(__dirname + '/public/logging.html')
  } else {
    res.status(401)
    res.send('access denied')
  }
})

/* Socket */

io.on('connection', (socket) => {
  socket.emit('read votes', {
    allmaVotes: votes.allmaVotes,
    speciVotes: votes.speciVotes,
    sarskVotes: votes.sarskVotes,
    otherVotes: votes.otherVotes,
    invalidVotes: votes.invalidVotes
  })

  socket.on('new votes', (data) => {
    
    let newVotes = {}
    newVotes.allmaVotes = Number(data.allmaVotes + votes.allmaVotes)
    newVotes.speciVotes = Number(data.speciVotes + votes.speciVotes) 
    newVotes.sarskVotes = Number(data.sarskVotes + votes.sarskVotes) 
    newVotes.otherVotes = Number(data.otherVotes + votes.otherVotes) 
    newVotes.invalidVotes = Number(data.invalidVotes + votes.invalidVotes)

    votes = newVotes
    
    console.log(votes)

    fs.writeFile('./votes.json', JSON.stringify(votes), (err) => {
      if (err) throw err
      console.log('The file was saved!')
    })

    socket.broadcast.emit('new votes', {
      allmaVotes: votes.allmaVotes,
      speciVotes: votes.speciVotes,
      sarskVotes: votes.sarskVotes,
      otherVotes: votes.otherVotes,
      invalidVotes: votes.invalidVotes
    })

  })
})

/* Lyssnar på port 3000 */

server.listen('3000', () => {
  console.log('Server uppe på port nummer 3000 ............... ')
})
