const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Artifact Schema
const ArtifactSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  artifacts: [
    {
      type: {
        type: String // file, link, text
      },
      value: {
        type: String // filename, link, text
      },
      filePath: {
        type: String // filepath will always be different than the original name
      },
      fileType: { type: String },
      created: {
        type: Date,
        default: Date.now
      }
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Artifact = mongoose.model("artifacts", ArtifactSchema);
