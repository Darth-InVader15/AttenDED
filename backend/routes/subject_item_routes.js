// This route is responsible for handling all the opertaions

var express = require("express");
var router = express.Router();

const {
  getAllSemester,
  getSubjects,
  getSubject,
  addSubject,
} = require("../controllers/subject_item_controller");

// Get all semester numbers the user has attended
router.get("/:username/allSemesters", getAllSemester);

// Get all subjects for a current semester
router.get("/:username/semester/:semesterNumber/getAll", getSubjects);

// Get information about a subject
router.get("/:username/semester/:semesterNumber/:subjectName", getSubject);

// Add information about a subject inside a particular semester
router.post("/:username/addItem", addSubject);

module.exports = router;