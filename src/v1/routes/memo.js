const router = require("express").Router();
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

//Routing for new memo
router.post("/", tokenHandler.verifyToken, memoController.create);

//Getting all memos of the login user.
router.get("/", tokenHandler.verifyToken, memoController.getAll);

//Getting a memo of the login user.
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);

//Updating a memo of the login user.
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);

//Deleting a memo of the login user.
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);


module.exports = router;