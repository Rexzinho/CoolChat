const express = require("express");
const RoomController = require("../controllers/roomController");
const router = express.Router();
const checkToken = require("../middlewares/checkToken");

router.get("/", RoomController.list);
router.post("/create", RoomController.create);
router.post("/message", checkToken, RoomController.sendMessage);

module.exports = router;