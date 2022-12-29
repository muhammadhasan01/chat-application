import {Response} from "express";

const express = require("express");
const router = express.Router();

router.get("/", (_, res: Response) => {
  res.send("Server is up and running")
})

module.exports = router;

