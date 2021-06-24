const mongoose = require("mongoose");

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const CoinsSchema = new mongoose.Schema(
  {
    coin: {
      type: String,
      unique: true,
      required: [true, "Please add a coin name"],
      maxlength: [50, "Coin name can not be more than 50 characters"],
    },
    coinUrl: {
      type: String,
    //   unique: true,
      trim: true,
      required: [true, "Please add a coin image url"],
      maxlength: [250, "Url coin image can not be more than 250 characters"],
    },
    coinChartUrl: {
      type: String,
    //   unique: true,
      trim: true,
      required: [true, "Please add a coin chart url"],
      maxlength: [250, "Chart url coin image can not be more than 250 characters"],
    }
  },
  schemaOptions
);

module.exports = mongoose.model("Coin", CoinsSchema);
