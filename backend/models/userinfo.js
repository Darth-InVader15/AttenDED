var mongoose = require("mongoose");
const SubjectItem = require("./subjectItem");

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  instituteName: {
    type: String,
    required: true,
    trim: true,
  },
  semesters: {
    type: [Number],
    default: [],
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubjectItem",
    },
  ],
});

module.exports = mongoose.model("UserInfo", userSchema);
