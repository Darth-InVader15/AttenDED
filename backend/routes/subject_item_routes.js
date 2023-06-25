// This route is responsible for handling all the opertaions

var express = require("express");
var router = express.Router();

const {
  getAllSemester,
  getSubjects,
  getSubject,
  addSubject,
  incrementDaysPresent,
  incrementDaysAbsent,
  decrementDaysAbsent,
  decrementDaysPresent,
} = require("../controllers/subject_item_controller");

// Get all semester numbers the user has attended
router.get("/:username/allSemesters", getAllSemester);

// Get all subjects for a current semester
router.get("/:username/semester/:semesterNumber/getAll", getSubjects);

// Get information about a subject
router.get("/:username/semester/:semesterNumber/:subjectName", getSubject);

// Add information about a subject inside a particular semester
router.post("/:username/addItem", addSubject);

// Increment the days absent
router.put(
  "/:username/semester/:semesterNumber/:subjectName/absentpp",
  incrementDaysAbsent
);

// Increment the days present
router.put(
  "/:username/semester/:semesterNumber/:subjectName/presentpp",
  incrementDaysPresent
);

// Decrement the days absent
router.put(
  "/:username/semester/:semesterNumber/:subjectName/absentmm",
  decrementDaysAbsent
);

// Increment the days present
router.put(
  "/:username/semester/:semesterNumber/:subjectName/presentmm",
  decrementDaysPresent
);

module.exports = router;
