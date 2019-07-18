const fs = require('fs')
const chalk = require('chalk')

function getNotes() {
  return "Your notes..."
}




const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }

}

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}



const removeNote = function (title) {
  const notes = loadNotes()
  const notesToKeep = notes.filter(function (eachNote) {
    return eachNote.title !== title
  })
  if (notesToKeep.length === notes.length) {
    console.log(chalk.bgRed('No note found!'));
  } else {
    console.log(chalk.bgGreen('Note removed!'));
    saveNotes(notesToKeep)
  }

}

const addNote = function (title, body) {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(function (eachNote) {
    return eachNote.title === title
  })

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.bgGreen('new note added'))
  } else {
    console.log(chalk.bgRed('note title already taken'));
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
}
// now we are exporting an object with two properties, one for each function
// now we can use both of these in app.js
