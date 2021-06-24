const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/Users");

//@desc     Register user
//@route    POST /api/v1/auth/register
//@access   Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, avatar, username, email, password, active, admin } = req.body;

  //Crete User
  const user = await User.create({
    name,
    avatar,
    username,
    email,
    password,
    active,
    admin,
  });

  //Create Token
  const token = user.getSingedJwtToken();

  res.status(200).json({ success: true, token: token });
});

//@desc     Login user
//@route    POST /api/v1/auth/login
//@access   Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Not a valid email and password", 400));
  }

  //Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  //Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  //Get the role (if it's admin or nots)
  const roleUser = await user.getRole();

  //Create Token
  const token = user.getSingedJwtToken();

  res.status(200).json({ success: true, token: token, admin: roleUser });
});
