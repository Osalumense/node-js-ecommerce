const express = require("express");
const router = express.Router();
const sellController = require("../controller/sell");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/sell");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-requests", sellController.getAllRequests);
router.post("/add-request", upload.any(), sellController.postAddRequest);
router.post("/update-request", sellController.postUpdateRequest);
router.post("/delete-request", sellController.postDeleteRequest);

module.exports = router;
