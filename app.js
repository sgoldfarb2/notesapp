const chalk = require('chalk')
const yargs = require('yargs')
const note = require('./notes')

const command = process.argv[2]

// customize yargs version
yargs.version('1.1.0')

//add, remove, read, list

//create add command
yargs.command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'

    },
    body: {
      describe: 'note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    note.addNote(argv.title, argv.body)
    // this sends the args we put in the terminal into our addNote function in our notes.js file
  }
})


//create remove command
yargs.command({
  command: 'remove',
  describe: 'remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    note.removeNote(argv.title)
  }
})

//create read command
yargs.command({
  command: 'read',
  describe: 'read a note',
  builder: {
    title: {
      describe: 'note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    note.readNote(argv.title)
  }
})

//create list command
yargs.command({
  command: 'list',
  describe: 'listing notes',
  handler() {
    note.listNotes()
  }
})

yargs.parse()
// this gets our yargs to run, we need this to see output in our terminal

