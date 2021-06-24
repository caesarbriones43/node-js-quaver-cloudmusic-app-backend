//Librerias
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
var cors = require("cors");

//Route datebase
const connectDB = require("./config/db");

//Board
// const boardFigma = require("./config/boardFigma");

//ENV Variables
dotenv.config({ path: "./config/config.env" });

//Middleware
const errorHandler = require("./middleware/error");
const logger = require("./middleware/logger");

//Routers
const users = require("./routes/users");
const artists = require("./routes/artists");
const albums = require("./routes/albums");
const tracks = require("./routes/tracks");
const genres = require("./routes/genres");
const auth = require("./routes/auth");
const coins = require("./routes/coins");

//Connect to database
connectDB();

//Connect to board
// boardFigma();

const app = express();

app.use(cors());

app.use(express.json());

app.use(logger);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/users", users);
app.use("/api/v1/artists", artists);
app.use("/api/v1/albums", albums);
app.use("/api/v1/tracks", tracks);
app.use("/api/v1/genres", genres);
app.use("/api/v1/auth", auth);
app.use("/api/v1/coins", coins);

app.use(errorHandler);

//PORT
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Running in ${process.env.NODE_ENV} on port ${PORT}...`.yellow.bold
  )
);

process.on("unhandleRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
