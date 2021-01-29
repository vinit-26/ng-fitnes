const Post = require("../models/post");

const createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userId,
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({
        status: 200,
        error: false,
        message: "Saved post successfully",
        data: [
          {
            id: result._id,
            title: result.title,
            content: result.content,
            imagePath: result.imagePath,
          },
        ],
        id: result._id,
      });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Creating Post Failed, Please try leter." });
    });
};

const updatePost = (req, res) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id, creator: req.userId }, post)
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({
          status: 200,
          error: false,
          message: "Updated post successfully",
          data: [],
          id: req.params.id,
        });
      } else {
        res.status(401).json({
          status: 401,
          error: true,
          message: "Not Authenticated.",
          data: [],
          id: req.params.id,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Couldn't update post." });
    });
};

const getAllPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let document;
  const postQuery = Post.find();
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((resdata) => {
      document = resdata;
      return Post.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        status: 200,
        error: false,
        message: "Fetched posts successfully",
        data: document,
        maxPosts: count,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Fetching Posts Failed." });
    });
};

const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json({
          status: 200,
          error: false,
          message: "Fetched post successfully",
          data: [post],
        });
      } else {
        res.status(404).json({
          status: 404,
          error: true,
          message: "No post found.",
          data: [],
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Fetching Post Failed." });
    });
};

const deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userId })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({
          status: 200,
          error: false,
          message: "Deleted post successfully",
          data: [],
          id: req.params.id,
        });
      } else {
        res.status(401).json({
          status: 401,
          error: true,
          message: "Not Authenticated.",
          data: [],
          id: req.params.id,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Deleting Post Failed." });
    });
};

module.exports = {
  createPost: createPost,
  updatePost: updatePost,
  getAllPosts: getAllPosts,
  getPost: getPost,
  deletePost: deletePost,
};
