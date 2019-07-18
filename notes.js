const fs = require('fs')
const chalk = require('chalk')


const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }

}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}



const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((eachNote) => eachNote.title !== title)
  if (notesToKeep.length === notes.length) {
    console.log(chalk.bgRed('No note found!'));
  } else {
    console.log(chalk.bgGreen('Note removed!'));
    saveNotes(notesToKeep)
  }

}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((eachNote) => eachNote.title === title)
  if (!duplicateNote) {
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

const listNotes = () => {
  let notes = loadNotes()
  console.log(chalk.yellow.inverse('Your notes:'));
  notes.forEach((eachNote) => {
    console.log(eachNote.title)
  });

}

const readNote = (title) => {
  let notes = loadNotes()
  let note = notes.find((eachNote) => eachNote.title === title)
  if (note) {
    console.log(chalk.yellow.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.bgRed('no note found!'));
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}
// now we are exporting an object with two properties, one for each function
// now we can use both of these in app.js
