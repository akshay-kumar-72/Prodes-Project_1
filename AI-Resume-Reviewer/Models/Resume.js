const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    filename: String,         // name of uploaded file
    feedback: String,         // AI feedback
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resume", resumeSchema);

