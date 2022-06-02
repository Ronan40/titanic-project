const { register, login } = require("../controllers/user");
const { checkUser } = require("../middleware/auth");

const router = require("express").Router();

router.post("/", checkUser);
router.post("/sign-up", register);
router.post("/sign-in", login);

module.exports = router;
