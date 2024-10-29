import fs from "fs";
import { Command } from "commander";
const program = new Command();

program
  .name("NotesApp")
  .description("A CLI utility to help you manage your notes")
  .version("1.0.0");

// Array to store notes
const notesArray = [];

// Add notes
program
  .command("new")
  .description("Adds a new note")
  .option("-t, --title <value>", "title of the new note to be added")
  .option("-b, --body <value>", "the body of the new note")
  .action((options) => {
    const title = options.title;
    const body = options.body;
    console.log("Adding a new note");

    // Creating the new
    const newNote = {
      title: title,
      body: body,
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
    };
    const loadedNotes = fs.readFileSync("./data/notes.json", "utf-8"); //in json string

    let notes;
    if (!loadedNotes) {
      notes = [];
    }
    notes = JSON.parse(loadedNotes);

    notes.push(newNote);
    fs.writeFileSync("./data/notes.json", JSON.stringify(notes));

    // Adding the new note to the notes array
    // notesArray.push(newNote);
    // fs.writeFileSync("./data/notes.json", JSON.stringify(notesArray));

    // console.log(notesArray);
  });

program.parse(process.argv);
//read the notes we currently have

//push the new notes to the array returned
// write the updated arrya to the file
