const ErrorResponse = require("../utils/errorResponse");
const Artist = require("../models/Artists");
const asyncHandler = require("../middleware/async");

//@desc     Get all artists
//@route    GET /api/v1/artists
//@access   Public
exports.getArtists = asyncHandler(async (req, res, next) => {
  // const queryxd = {
  //   _id: "607a1e48eba2602d98d9f38b",
  //   genre: "60774b40bd249b3a8cde1186",
  // };
  console.log(req.query)
  const artists = await Artist.find(req.query);
  res.status(200).json({
    success: true,
    data: artists,
    counter: artists.length,
  });
});

//@desc     Get  single artist
//@route    GET /api/v1/artists/:id
//@access   Public
exports.getArtist = asyncHandler(async (req, res, next) => {
  const artist = await Artist.findById(req.params.id);

  if (!artist) {
    return next(
      new ErrorResponse(`Artist not found whit id of ${req.params.id}`, 404)
    );
  }

  // var five = require("johnny-five");
  // const song = "Fur Elise";
  // const minutes = 02;
  // const seconds = 54;
  // var board = new five.Board({
  //   port: "COM3",
  // });

  // board.on("ready", function () {
  //   var lcd = new five.LCD({
  //     controller: "PCF8574",
  //     pins: [7, 8, 9, 10, 11, 12],
  //   });
  //   console.log(`${song} - ${artist.artist}`);
  //   lcd.home().print(`${song} - ${artist.artist}`);
  //   lcd.cursor(1, 0).print(`-----[${minutes}:${seconds}]-----`);
  // });

  res.status(200).json({
    status: true,
    data: artist,
  });
});

//@desc     Create new artist
//@route    POST /api/v1/artists
//@access   Private
exports.createArtist = asyncHandler(async (req, res, next) => {
  const artist = await Artist.create(req.body);

  res.status(201).json({
    success: true,
    data: artist,
  });
});

//@desc     Update artist
//@route    PUT /api/v1/artists/:id
//@access   Private
exports.updateArtist = asyncHandler(async (req, res, next) => {
  const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!artist) {
    return next(
      new ErrorResponse(`Artist not found whit id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: artist });
});

//@desc     Delete artist
//@route    DELETE /api/v1/artists/:id
//@access   Private
exports.deleteArtist = asyncHandler(async (req, res, next) => {
  const artist = await Artist.findByIdAndDelete(req.params.id);

  if (!artist) {
    return next(
      new ErrorResponse(`Artist not found whit id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
