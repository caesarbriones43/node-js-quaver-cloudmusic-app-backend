const ErrorResponse = require("../utils/errorResponse");
const Genre = require("../models/Genres");
const asyncHandler = require("../middleware/async");

//@desc     Get all genres
//@route    GET /api/v1/genres
//@access   Public
exports.getGenres = asyncHandler(async (req, res, next) => {
  const genres = await Genre.find();
  res.status(200).json({
    success: true,
    data: genres,
    counter: genres.length,
  });
});

//@desc     Get  single genre
//@route    GET /api/v1/genres/:id
//@access   Public
exports.getGenre = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    return next(
      new ErrorResponse(`Genre not found whit id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: true,
    data: genre,
  });
});

//@desc     Create new genre
//@route    POST /api/v1/genres
//@access   Private
exports.createGenre = asyncHandler(async (req, res, next) => {
  const genre = await Genre.create(req.body);

  res.status(201).json({
    success: true,
    data: genre,
  });
});

//@desc     Update genre
//@route    PUT /api/v1/genres/:id
//@access   Private
exports.updateGenre = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!genre) {
    return next(
      new ErrorResponse(`Genre not found whit id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: genre });
});

//@desc     Delete genre
//@route    DELETE /api/v1/genres/:id
//@access   Private
exports.deleteGenre = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) {
    return next(
      new ErrorResponse(`Genre not found whit id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
