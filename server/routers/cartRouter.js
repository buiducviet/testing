const express = require("express");
const router = express.Router();
const { authUser, authRoleAdmin, authRoleUser } = require("../middleware/auth");
const cartController = require("../controllers/cartController");

router.get("/:email", cartController.getById);
router.post("/:email", cartController.create);
router.put("/:email", cartController.update);
router.delete("/:email", cartController.delete);

module.exports = router;
