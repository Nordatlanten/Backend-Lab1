/*eslint-disable no-undef*/
/*eslint-disable sort-keys*/

document.addEventListener('DOMContentLoaded', () => {
  const socket = io.connect('http://localhost:3000')

  let allmaField = document.getElementById('allmaField')
  let speciField = document.getElementById('speciField')
  let sarskField = document.getElementById('sarskField')
  let otherField = document.getElementById('otherField')
  let invalidField = document.getElementById('invalidField')
  let submitButton = document.getElementById('submitData')
  let resetButton = document.getElementById('resetData')

  resetButton.addEventListener('click', () => {
    allmaField.value = 0
    speciField.value = 0
    sarskField.value = 0
    otherField.value = 0
    invalidField.value = 0
  })


  submitButton.addEventListener('click', () => {
    console.log(typeof allmaField.value, speciField.value, sarskField.value, otherField.value, invalidField.value)


    let newVotes = {
      allmaVotes: Number(allmaField.value),
      speciVotes: Number(speciField.value),
      sarskVotes: Number(sarskField.value),
      otherVotes: Number(otherField.value),
      invalidVotes: Number(invalidField.value)
    }

    console.log(typeof newVotes.allmavotes)

    socket.emit('new votes', newVotes)
    
    console.log(newVotes)
  })

})
