const ErrorResponse = require("../utils/errorResponse");
const Coin = require("../models/Coins");
const asyncHandler = require("../middleware/async");

//@desc     Get all coins
//@route    GET /api/v1/coin
//@access   Public
exports.getCoins = asyncHandler(async (req, res, next) => {
  const coins = await Coin.find();
  res.status(200).json({
    success: true,
    data: coins,
    counter: coins.length,
  });
});

//@desc     Get  single coin
//@route    GET /api/v1/coins/:id
//@access   Public
exports.getCoin = asyncHandler(async (req, res, next) => {
  const coin = await Coin.findById(req.params.id);

  if (!coin) {
    return next(
      new ErrorResponse(`Coin not found whit id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: true,
    data: coin,
  });
});

//@desc     Create new coin
//@route    POST /api/v1/coins
//@access   Private
exports.createCoin = asyncHandler(async (req, res, next) => {
  const coin = await Coin.create(req.body);

  res.status(201).json({
    success: true,
    data: coin,
  });
});

//@desc     Update coin
//@route    PUT /api/v1/coins/:id
//@access   Private
exports.updateCoin = asyncHandler(async (req, res, next) => {
  const coin = await Coin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!coin) {
    return next(
      new ErrorResponse(`Can't update!!!, ERROR: Coin not found whit id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: coin });
});

//@desc     Delete coin
//@route    DELETE /api/v1/coins/:id
//@access   Private
exports.deleteCoin = asyncHandler(async (req, res, next) => {
  const coin = await Coin.findByIdAndDelete(req.params.id);

  if (!coin) {
    return next(
      new ErrorResponse(`Coin not found whit id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
