"use strict";

const { BadRequestError } = require("./expressError");

/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route

  const nums = (strNums).split(",").map(
    numText => {
      if (isNaN(numText)) {
        throw new BadRequestError(`${numText} is not a number`);
      }
      else {
        return Number(numText);
      }
    }
  );

  return nums
}


module.exports = { convertStrNums };