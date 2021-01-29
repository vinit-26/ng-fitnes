const router = require("express").Router();

const isAuth = require("../middleware/checkAuth");
const postsController = require("../controllers/postsController");
const extractFile = require("../middleware/file");

router.post("", isAuth, extractFile, postsController.createPost);

router.patch("/:id", isAuth, postsController.updatePost);

router.get("", postsController.getAllPosts);

router.get("/:id", postsController.getPost);

router.delete("/:id", isAuth, postsController.deletePost);

module.exports = router;
