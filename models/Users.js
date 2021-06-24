const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    avatar: {
      type: String,
      trim: true,
      maxlength: [250, "avatar can not be more than 250 characters"],
      default:
        "https://res.cloudinary.com/dslc2vjcz/image/upload/v1618678832/user-male_ezfitl.png",
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please add a username"],
      maxlength: [25, "username can not be more than 25 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please add a email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add a valid e-mail",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      maxlength: [15, "password can not be more than 50 characters"],
      minlength: 6,
      select: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  schemaOptions
);
//Encryptpassword (bcrypt)
UsersSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Sign JWT & return
UsersSchema.methods.getSingedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Match user entered password to hashed password in the database
UsersSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Get the role from the user schema
UsersSchema.methods.getRole = async function () {
  return this.admin;
};

module.exports = mongoose.model("User", UsersSchema);
