const mongoose = require("mongoose");

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const GenresSchema = new mongoose.Schema(
  {
    genre: {
      type: String,
      unique: true,
      required: [true, "Please add a genre"],
      maxlength: [50, "Genre can not be more than 50 characters"],
    },
    genreUrl: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please add a url of genre"],
      maxlength: [250, "Url genre can not be more than 250 characters"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("Genre", GenresSchema);
