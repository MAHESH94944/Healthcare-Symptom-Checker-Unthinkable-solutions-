const express = require("express");
const router = express.Router();
const {
  symptomCheckService,
} = require("../controllers/symptomCheckController");

// POST /api/symptoms/check
router.post("/symptoms/check", symptomCheckService);

module.exports = router;
