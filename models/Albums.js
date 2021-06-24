const mongoose = require("mongoose");

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const AlbumsSchema = new mongoose.Schema(
  {
    album: {
      type: String,
      unique: true,
      required: [true, "Please add a album name"],
      maxlength: [50, "album name can not be more than 50 characters"],
    },
    albumUrl: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please add a album url"],
      maxlength: [250, "Url album can not be more than 250 characters"],
    },
    artist: {
      artistId: {
        type: mongoose.Schema.ObjectId,
        ref: "Artists",
        required: true,
      },
      artistName: {
        type: String,
        required: [true, "Please add a artist name"],
        maxlength: [50, "Name artist can not be more than 50 characters"],
      },
      artistUrl: {
        type: String,
        trim: true,
        maxlength: [250, "Avatar can not be more than 250 characters"],
        default:
          "https://res.cloudinary.com/dslc2vjcz/image/upload/v1618678832/user-male_ezfitl.png",
      },
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
      genreUrl: {
        type: String,
        trim: true,
        maxlength: [250, "Avatar can not be more than 250 characters"],
        default:
          "https://res.cloudinary.com/dslc2vjcz/image/upload/v1618678832/user-male_ezfitl.png",
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("Album", AlbumsSchema);
