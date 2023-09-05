const path = require("path");
const fs = require("fs");

// creating path to local db
const studentDbPath = path.join(__dirname, "../db", "students.json");
let studentDb = [];

// reading local file into an empty array
studentDb = JSON.parse(fs.readFileSync(studentDbPath, "utf8"));

const getAllStudent = (req, res) => {
  res.send(studentDb);
};

const getStudentByID = (req, res) => {
  const studentID = req.params.id; // grabbing the URL parameter (i.e. student id) from the URL

  // getting the index of the student in the db where the index is equal to student id parsed in the URL parameter
  const studentIndex = studentDb.findIndex((student) => {
    return student.id === parseInt(studentID);
  });

  // handling error case where ID is not found in the db
  if (studentIndex === -1) {
    res.status(500);
    res.send("Student ID not found in database.");
  }
  res.send(studentDb[studentIndex]); // return the json object where the URL id is found in the db
};

const postNewStudent = (req, res) => {
  const newStudent = req.body;

  // dynamically adding id to student inputs
  const lastStudent = studentDb[studentDb.length - 1];
  const lastStudentId = lastStudent.id;
  newStudent.id = lastStudentId + 1;

  //pushing new student to an empty array
  studentDb.push(newStudent);
  // writing new item to local storage
  fs.writeFile(studentDbPath, JSON.stringify(studentDb), (err) => {
    if (err) {
      // handling error
      res
        .status(500)
        .send("Internal server error. Could not save student to database");
    }
    res.status(200).send("Student successfully created"); // returning success message to user
  });
};

const updateStudent = (req, res) => {
  const updateStudent = req.body;

  // getting the index of the student in the db where the index is equal to student id parsed in the URL parameter
  const updateStudentIndex = studentDb.findIndex((student) => {
    return student.id === updateStudent.id;
  });

  // update the student in the database
  studentDb[updateStudentIndex] = {
    ...studentDb[updateStudentIndex],
    ...updateStudent,
  };

  // writing new market to local storage
  fs.writeFile(studentDbPath, JSON.stringify(studentDb), (err) => {
    if (err) {
      // handling error
      res
        .status(500)
        .send("Internal server error. Could not update student in database");
    }
    res.status(200).send("Student successfully updated"); // returning success message to user
  });
};

const deleteStudent = (req, res) => {
  const parsedStudentID = req.params.id;

  const getStudentIndex = studentsDb.findIndex((student) => {
    return student.id === parseInt(parsedStudentID);
  });

  studentDb.splice(getStudentIndex, 1); // remove the student from the database using the index

  // updating the database
  fs.writeFile(studentDbPath, JSON.stringify(studentDb), (err) => {
    if (err) {
      res.status(500).send("Internal server error. Unable to delete student");
    }
    res.send("Student deleted successfully");
  });
};

module.exports = {
  getAllStudent,
  getStudentByID,
  postNewStudent,
  updateStudent,
  deleteStudent,
};
