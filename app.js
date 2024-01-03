"use strict";

/** Simple demo Express app. */

const express = require("express");
const app = express();
const { findMean, findMedian, findMode } = require("./stats");
const { convertStrNums } = require("./utils");

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

// process JSON body => req.body
app.use(express.json());


/** Finds mean of nums in qs: returns {operation: "mean", result } */

app.get("/mean", function (req, res) {

  const strNums = req.query.nums
  if (strNums === undefined) {
    throw new BadRequestError(MISSING);
  }

  const nums = convertStrNums(strNums);

  const result = findMean(nums);

  return res.json({
    response: {
      operation: "mean",
      value: result
    }
  });

});

/** Finds median of nums in qs: returns {operation: "median", result } */

app.get("/median", function (req, res) {

  const strNums = req.query.nums
  if (strNums === undefined) {
    throw new BadRequestError(MISSING);
  }

  const nums = convertStrNums(strNums);

  const result = findMedian(nums);

  return res.json({
    response: {
      operation: "median",
      value: result
    }
  });

});

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {

  const strNums = req.query.nums
  if (strNums === undefined) {
    throw new BadRequestError(MISSING);
  }

  const nums = convertStrNums(strNums);

  const result = findMode(nums);

  return res.json({
    response: {
      operation: "mode",
      value: result
    }
  });

});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;