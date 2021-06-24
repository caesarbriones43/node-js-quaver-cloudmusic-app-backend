const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/Users");
const asyncHandler = require("../middleware/async");

//@desc     Get all users
//@route    GET /api/v1/users
//@access   Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  console.log(req.query)
  const users = await User.find(req.query);
  res.status(200).json({
    success: true,
    data: users,
    counter: users.length,
  });
});

//@desc     Get  single user
//@route    GET /api/v1/users/:id
//@access   Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found whit id of ${req.params.id}`, 404)
    );
    
  }
  res.status(200).json({
    status: true,
    data: user,
  });

});

//@desc     Create new user
//@route    POST /api/v1/users
//@access   Private
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

//@desc     Update user
//@route    PUT /api/v1/users/:id
//@access   Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new ErrorResponse(`User not found whit id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: user });
});

//@desc     Delete user
//@route    DELETE /api/v1/users/:id
//@access   Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found whit id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
