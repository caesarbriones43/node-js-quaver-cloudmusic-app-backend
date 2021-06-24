const mongoose = require("mongoose");

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const ArtistsSchema = new mongoose.Schema(
  {
    artist: {
      type: String,
      unique: true,
      required: [true, "Please add a artist name"],
      maxlength: [50, "Name artist can not be more than 50 characters"],
    },
    artistUrl: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please add a url avatar of artist"],
      maxlength: [250, "Url avatar can not be more than 250 characters"],
    },
    genre: {
      idGenre: {
        type: mongoose.Schema.ObjectId,
        ref: "Genres",
        required: true,
      },
      nameGenre: {
        type: String,
        required: [true, "Please add a genre"],
        maxlength: [50, "Genre can not be more than 50 characters"],
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("Artist", ArtistsSchema);
