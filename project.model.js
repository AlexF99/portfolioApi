const mongoose = require("mongoose");

/**
 *Project Schema
 * @private
 */
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  stack: [
    {
      type: String,
    },
  ],
});

/**
 * @typedef Project
 */
const ProjectSchema = mongoose.model("Project", projectSchema);
module.exports = ProjectSchema;
