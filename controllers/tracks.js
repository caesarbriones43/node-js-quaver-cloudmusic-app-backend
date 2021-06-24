// const { board } = require("../config/boardFigma");
const ErrorResponse = require("../utils/errorResponse");
const Track = require("../models/Tracks");
const asyncHandler = require("../middleware/async");
const { disconnect } = require("mongoose");
const { connect } = require("../routes/tracks");
// const boardFuction = require("../config/boardFigma");

//@desc     Get all tracks
//@route    GET /api/v1/tracks
//@access   Public
exports.getTracks = asyncHandler(async (req, res, next) => {
  const tracks = await Track.find();
  res.status(200).json({
    success: true,
    data: tracks,
    counter: tracks.length,
  });
});

//@desc     Get  single track
//@route    GET /api/v1/tracks/:id
//@access   Public
exports.getTrack = asyncHandler(async (req, res, next) => {
  const track = await Track.findById(req.params.id);

  const { Board, Led } = require("johnny-five");
  const five = require("johnny-five");

  const board = new Board({
    repl: false,
    port: "COM3",
  });

  // // console.log(board);
  // board.on("ready", () => {
  //   console.log("started!");
  // });
  // const saludar = () => {
  //   console.log("saludar");
  // };
  // const despedir = () => {
  //   console.log("despedir");
  // };

  // board.on("ready", saludar);
  // board.on("ready", despedir);

  board.on("ready", () => {
    var lcd = new five.LCD({
      controller: "PCF8574",
      pins: [7, 8, 9, 10, 11, 12],
    });

    let led = new five.Led.RGB({
      pins: {
        red: 6,
        green: 5,
        blue: 3,
      },
    });

    if (track.rating === 0 || track.rating === 1) {
      led.color("#FF0000");
      console.log(track.rating, "Rojo");
    } else if (track.rating === 2 || track.rating === 3) {
      led.color("#00FF00");
      console.log(track.rating, "Verde");
    } else if (track.rating === 4 || track.rating === 5) {
      led.color("#FFFF00");
      console.log(track.rating, "Amarillo");
    }

    lcd.home().print(`${track.track}`);
    lcd.cursor(1, 0).print(`${track.artist.artistName}`);

    board.on("exit", () => {
      console.log("Exit");
    });
  });

  if (!track) {
    return next(
      new ErrorResponse(`Track not found whit id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: true,
    data: track,
  });
});

//@desc     Create new track
//@route    POST /api/v1/tracks
//@access   Private
exports.createTrack = asyncHandler(async (req, res, next) => {
  const track = await Track.create(req.body);

  res.status(201).json({
    success: true,
    data: track,
  });
});

//@desc     Update track
//@route    PUT /api/v1/tracks/:id
//@access   Private
exports.updateTrack = asyncHandler(async (req, res, next) => {
  const track = await Track.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!track) {
    return next(
      new ErrorResponse(`Track not found whit id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: track });
});

//@desc     Delete track
//@route    DELETE /api/v1/tracks/:id
//@access   Private
exports.deleteTrack = asyncHandler(async (req, res, next) => {
  const track = await Track.findByIdAndDelete(req.params.id);

  if (!track) {
    return next(
      new ErrorResponse(`Track not found whit id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
