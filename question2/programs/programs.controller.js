const path = require("path");
const fs = require("fs");

// creating path to local db
const programsDbPath = path.join(__dirname, "../db", "programs.json");
let programsDb = [];
// reading local file into an empty array
programsDb = JSON.parse(fs.readFileSync(programsDbPath, "utf8"));

// GET all program item
const getAllPrograms = (req, res) => {
  res.send(programsDb);
};

// GET specific program item
const getProgramByID = (req, res) => {
  const programID = req.params.id; // grabbing the URL parameter (i.e. program id) from the URL

  // getting the index of the program in the db where the index is equal to program id parsed in the parameter
  const programIndex = programsDb.findIndex((program) => {
    return program.id === parseInt(programID);
  });

  // handling error case where ID is not found in the db
  if (programIndex === -1) {
    res.status(500);
    res.send("Program ID not found in database.");
  }
  res.send(programsDb[programIndex]); // return the json object where the URL id is found in the db
};

// POST; create specific program item
const postProgram = (req, res) => {
  const newProgram = req.body;

  // dynamically adding id to program inputs
  const lastProgram = programsDb[programsDb.length - 1];
  const lastProgramId = lastProgram.id;
  newProgram.id = lastProgramId + 1;

  //pushing new program to an empty array
  programsDb.push(newProgram);
  // writing new program to local storage
  fs.writeFile(programsDbPath, JSON.stringify(programsDb), (err) => {
    if (err) {
      // handling error
      res
        .status(500)
        .send("Internal server error. Could not save program to database");
    }
    res.status(200).send("Program item successfully created"); // returning success message to user
  });
};

// PUT; update specific program item
const updateProgram = (req, res) => {
  const programUpdate = req.body;

  // getting the index of the fruit in the db where the index is equal to fruit id parsed in the parameter
  const programUpdateIndex = programsDb.findIndex((program) => {
    return program.id === programUpdate.id;
  });

  // handling error case
  if (!programUpdateIndex) {
    res.status(404).send("Error, program to update not found");
  }

  // update the fruit item in the database
  programsDb[programUpdateIndex] = {
    ...programsDb[programUpdateIndex],
    ...programUpdate,
  };

  // writing new programs to local storage
  fs.writeFile(programsDbPath, JSON.stringify(programsDb), (err) => {
    if (err) {
      // handling error
      res
        .status(500)
        .send("Internal server error. Could not update program to database");
    }
    res.status(200).send("Program successfully updated"); // returning success message to user
  });
};

// DELETE; remove specific program item
const deleteProgram = (req, res) => {
  const parsedProgramID = req.params.id;

  const getFruitIndex = programsDb.findIndex((program) => {
    return program.id === parseInt(parsedProgramID);
  });
  console.log(getFruitIndex);

  programsDb.splice(getFruitIndex, 1); // remove the fruit from the database using the index

  // updating the database
  fs.writeFile(programsDbPath, JSON.stringify(programsDb), (err) => {
    if (err) {
      res
        .status(500)
        .send("Internal server error. Unable to delete program item");
    }
    res.send("program deleted successfully");
  });
};

module.exports = {
  getAllPrograms,
  getProgramByID,
  postProgram,
  updateProgram,
  deleteProgram,
};
