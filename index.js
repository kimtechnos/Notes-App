import fs, { read } from "fs";
import { Command } from "commander";
import chalk from "chalk";
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
    const noteExists = notes.find((currentNote) => currentNote.title === title);
    if (noteExists) {
      console.log(chalk.bgRed(`Note with  title '${title}' already exists.`));
      return;
    }

    notes.push(newNote);
    fs.writeFileSync("./data/notes.json", JSON.stringify(notes));
    console.log(chalk.bgGreen(`NEW NOTE ADDED Successfully!!`));
  });
//read the notes we currently have
program
  .command("read")
  .description("Display all the notes")
  .action(function () {
    const loadedNotes = fs.readFileSync("./data/notes.json", "utf8");
    const notes = JSON.parse(loadedNotes);
    if (notes.length === 0) {
      console.log(chalk.bgYellow("you do not have any notes yet"));
      return;
    }
    notes.forEach((currentNote) => {
      console.log(chalk.bgBlue("======"));
      console.log(currentNote.title);
      console.log("------");
      console.log(currentNote.body);
      console.log(chalk.bgBlue("======\n"));
    });
  });

program.parse(process.argv);

//push the new notes to the array returned
// write the updated arrya to the file
