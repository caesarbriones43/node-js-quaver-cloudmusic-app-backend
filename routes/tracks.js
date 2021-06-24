const express = require("express");

const {
  getTracks,
  getTrack,
  createTrack,
  updateTrack,
  deleteTrack,
} = require("../controllers/tracks");

const router = express.Router();

router.route("/").get(getTracks).post(createTrack);
router.route("/:id").get(getTrack).put(updateTrack).delete(deleteTrack);

module.exports = router;
