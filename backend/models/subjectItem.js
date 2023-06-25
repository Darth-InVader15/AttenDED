var moongoose = require('mongoose');

var subjectItem = new moongoose.Schema(
    {
        name:
        {
            type: String,
            required: true,
            maxlength:50,
            trim: true
        },
        semester:
        {
            type: Number,
            required: true,
        },
        instituteName:
        {
            type: String,
            required: true,
            trim: true
        },
        daysAttended:
        {
            type: Number,
            required: true
        },
        daysMissed:
        {
            type: Number,
            required: true
        },
        username:
        {
            type: String,
            required: true
        }
    }
);

module.exports = moongoose.model("SubjectItem", subjectItem);