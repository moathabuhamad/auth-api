"use strict";

const express = require("express");
const router = express.Router();
const models = require("../auth/models/index");

router.param("model", (req, res, next) => {
  if (models[req.params.model]) {
    req.model = models[req.params.model];
    next();
  } else {
    next("model not found");
  }
});

router.post("/:model", async (req, res) => {
  let body = req.body;
  let newModels = await req.model.dataCreate(body);
  res.status(201).send(newModels);
});

router.get("/:model", async (req, res) => {
  let { id } = req.params;
  res.status(200).json(await req.model.getData(id));
});

router.get("/:model/:id", async (req, res) => {
  let { id } = req.params;
  res.status(200).json(await req.model.getData(id));
});

router.put("/:model/:id", async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let renewedModels = await req.model.dataUpdate(id, body);
  res.status(200).send(await req.model.getData(id));
});

router.delete("/:model/:id", async (req, res) => {
  let { id } = req.params;
  await req.model.dataDelete(id);
  res.status(200).send(`removed${req.params.model}`);
});

module.exports = router;
