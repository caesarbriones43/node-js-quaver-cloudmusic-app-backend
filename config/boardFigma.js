const { Board, Led } = require("johnny-five");
const five = require("johnny-five");

const board = new Board({
  port: "COM3",
});

module.exports = {
  board,
  Board,
  five
};
