import fs from "fs";

function loadNotes(path) {
  try {
    const loadNotes = fs.readFileSync(path, "utf8");
    return JSON.parse(loadNotes);
  } catch (error) {
    console.error("Error loading notes:", error.message);
    return [];
  }
}

console.log(loadNotes("../data/dummy.json"));
export default loadNotes;
