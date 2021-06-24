const express = require("express");

const {
  getArtists,
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist,
} = require("../controllers/artists");

const router = express.Router();

router.route("/").get(getArtists).post(createArtist);
router.route("/:id").get(getArtist).put(updateArtist).delete(deleteArtist);

module.exports = router;
