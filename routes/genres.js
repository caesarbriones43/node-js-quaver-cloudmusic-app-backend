const express = require("express");

const {
  getGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genres");

const router = express.Router();

router.route("/").get(getGenres).post(createGenre);
router.route("/:id").get(getGenre).put(updateGenre).delete(deleteGenre);

module.exports = router;
