const mongoose = require("mongoose");

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const TracksSchema = new mongoose.Schema(
  {
    track: {
      type: String,
      maxlength: [50, "Track can not be more than 50 characters"],
      required: [true, "Please add a track name"],
    },
    rating: {
      type: Number,
      required: true,
    },
    trackUrl: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please add a url of track"],
      maxlength: [250, "Url track can not be more than 250 characters"],
    },
    album: {
      idAlbum: {
        type: mongoose.Schema.ObjectId,
        ref: "Albums",
        required: true,
      },
      nameAlbum: {
        type: String,
        required: [true, "Please add a album name"],
        maxlength: [50, "album name can not be more than 50 characters"],
      },
      albumUrl: {
        type: String,
        trim: true,
        required: [true, "Please add a album url"],
        maxlength: [250, "Url album can not be more than 250 characters"],
        default:
          "https://res.cloudinary.com/dslc2vjcz/image/upload/v1621998167/album_default_eiaxi9.webp",
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
      genreAvatar: {
        type: String,
        trim: true,
        maxlength: [250, "avatar can not be more than 250 characters"],
        default:
          "https://res.cloudinary.com/dslc2vjcz/image/upload/v1618678832/user-male_ezfitl.png",
      },
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
        maxlength: [250, "Url avatar can not be more than 250 characters"],
        default:
          "https://res.cloudinary.com/dslc2vjcz/image/upload/v1621998301/unknow_at6xbk.jpg",
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("Track", TracksSchema);
