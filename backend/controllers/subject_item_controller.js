const UserInfo = require("../models/userinfo");
const SubjectItem = require("../models/subjectItem");

exports.getAllSemester = async (req, res) => {
  try {
    const userInfo = await UserInfo.findOne({ username: req.params.username });
    if (!userInfo) {
      return res.status(404).json({ error: "User not found" });
    }
    const semesters = userInfo.semesters;
    res.json(semesters);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const userInfo = await UserInfo.findOne({ username: req.params.username });
    if (!userInfo) {
      return res.status(404).json({ error: "User not found" });
    }
    const semesterNumber = parseInt(req.params.semesterNumber);
    const subjects = await SubjectItem.find({
      semester: semesterNumber,
      username: userInfo.username,
    });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getSubject = async (req, res) => {
  try {
    const userInfo = await UserInfo.findOne({ username: req.params.username });
    if (!userInfo) {
      return res.status(404).json({ error: "User not found" });
    }
    const semesterNumber = parseInt(req.params.semesterNumber);
    const subjectName = req.params.subjectName;

    const subject = await SubjectItem.findOne({
      name: subjectName,
      semester: semesterNumber,
      username: userInfo.username,
    });
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.addSubject = async (req, res) => {
  try {
    const userInfo = await UserInfo.findOne({ username: req.params.username });
    if (!userInfo) {
      return res.status(404).json({ error: "User not found" });
    }

    const newItem = {
      name: req.body.name,
      semester: req.body.semester,
      instituteName: userInfo.instituteName,
      daysAttended: req.body.daysAttended,
      daysMissed: req.body.daysMissed,
      username: userInfo.username,
    };

    // save the subject
    const subject = new SubjectItem(newItem);
    await subject.save();

    // push the semester number to user info
    const semesterNumber = req.body.semester;
    if (!userInfo.semesters.includes(semesterNumber)) {
      userInfo.semesters.push(semesterNumber);
      await userInfo.save();
    }

    // push the subject to userInfo
    userInfo.subjects.push(subject);
    await userInfo.save();

    res.status(201).json({ message: "Item added successfully", subject });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// Controller for incrementing the days absent
exports.incrementDaysAbsent = async (req, res) => {
  const { username, semesterNumber, subjectName } = req.params;
  try {
    const subject = await SubjectItem.findOneAndUpdate(
      { username, semester: semesterNumber, name: subjectName },
      { $inc: { daysMissed: 1 } },
      { new: true }
    );
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for incrementing the days present
exports.incrementDaysPresent = async (req, res) => {
  const { username, semesterNumber, subjectName } = req.params;
  try {
    const subject = await SubjectItem.findOneAndUpdate(
      { username, semester: semesterNumber, name: subjectName },
      { $inc: { daysAttended: 1 } },
      { new: true }
    );
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for decrementing the days absent
exports.decrementDaysAbsent = async (req, res) => {
  const { username, semesterNumber, subjectName } = req.params;
  try {
    const subject = await SubjectItem.findOneAndUpdate(
      {
        username,
        semester: semesterNumber,
        name: subjectName,
        daysMissed: { $gt: 0 },
      },
      { $inc: { daysMissed: -1 } },
      { new: true }
    );
    if (!subject) {
      return res
        .status(404)
        .json({ error: "Subject not found or days absent is already 0" });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for decrementing the days present
exports.decrementDaysPresent = async (req, res) => {
  const { username, semesterNumber, subjectName } = req.params;
  try {
    const subject = await SubjectItem.findOneAndUpdate(
      {
        username,
        semester: semesterNumber,
        name: subjectName,
        daysAttended: { $gt: 0 },
      },
      { $inc: { daysAttended: -1 } },
      { new: true }
    );
    if (!subject) {
      return res
        .status(404)
        .json({ error: "Subject not found or days present is already 0" });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
