const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "./config/config.env" });

const User = require("./models/Users");
const Album = require("./models/Albums");
const Artist = require("./models/Artists");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});


const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users/users.json`))
const albums = JSON.parse(fs.readFileSync(`${__dirname}/_data/users/albums.json`))
const artists = JSON.parse(fs.readFileSync(`${__dirname}/_data/users/artists.json`))

const importData = async () => {
  try {
    await User.create(users);
    await Album.create(albums);
    await Artist.create(artists);
    console.log("Data imported!...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Album.deleteMany();
    await Artist.deleteMany();
    console.log("Data destroyed!...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(`error: ${err}`);
  }
};

//Usage
// [delete data]:
//node seeder.js -d
// [import data]:
//node seeder.js -i

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
