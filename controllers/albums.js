const ErrorResponse = require("../utils/errorResponse");
const Album = require("../models/Albums");
const asyncHandler = require("../middleware/async");

//@desc     Get all albums
//@route    GET /api/v1/albums
//@access   Public
exports.getAlbums = asyncHandler(async (req, res, next) => {
  const albums = await Album.find();
  res.status(200).json({
    success: true,
    data: albums,
    counter: albums.length,
  });
});

//@desc     Get  single album
//@route    GET /api/v1/albums/:id
//@access   Public
exports.getAlbum = asyncHandler(async (req, res, next) => {
  const album = await Album.findById(req.params.id);

  if (!album) {
    return next(
      new ErrorResponse(`Album not found whit id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: true,
    data: album,
  });
});

//@desc     Create new album
//@route    POST /api/v1/albums
//@access   Private
exports.createAlbum = asyncHandler(async (req, res, next) => {
  const album = await Album.create(req.body);

  res.status(201).json({
    success: true,
    data: album,
  });
});

//@desc     Update album
//@route    PUT /api/v1/albums/:id
//@access   Private
exports.updateAlbum = asyncHandler(async (req, res, next) => {
  const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!album) {
    return next(
      new ErrorResponse(`Album not found whit id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: album });
});

//@desc     Delete album
//@route    DELETE /api/v1/albums/:id
//@access   Private
exports.deleteAlbum = asyncHandler(async (req, res, next) => {
  const album = await Album.findByIdAndDelete(req.params.id);

  if (!album) {
    return next(
      new ErrorResponse(`Album not found whit id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
