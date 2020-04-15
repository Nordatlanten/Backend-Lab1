/*eslint-disable no-undef*/
/*eslint-disable sort-keys*/


document.addEventListener('DOMContentLoaded', () => {
  const socket = io.connect('http://localhost:3000')

  const allmaVotes = document.getElementById('allmaVotes')
  const speciVotes = document.getElementById('speciVotes')
  const sarskVotes = document.getElementById('sarskVotes')
  const otherVotes = document.getElementById('otherVotes')
  const invalidVotes = document.getElementById('invalidVotes')




  socket.on('read votes', (data) => {
    console.log(data)
    allmaVotes.innerText = data.allmaVotes
    speciVotes.innerText = data.speciVotes
    sarskVotes.innerText = data.sarskVotes
    otherVotes.innerText = data.otherVotes
    invalidVotes.innerText = data.invalidVotes
  })

  socket.on('new votes', (data) => {
    allmaVotes.innerText = data.allmaVotes
    speciVotes.innerText = data.speciVotes
    sarskVotes.innerText = data.sarskVotes
    otherVotes.innerText = data.otherVotes
    invalidVotes.innerText = data.invalidVotes
  })
})
