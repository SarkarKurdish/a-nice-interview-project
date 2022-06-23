const { Comment } = require("../database/database");
const axios = require("axios");

exports.getComments = async (req, res) => {
  const comments = await Comment.find().sort({ createdAt: -1 });

  res.send({
    success: true,
    data: comments,
  });
};

exports.postComment = async (req, res) => {
  const { comment } = req.body;

  const { data: owner } = await axios("https://api.namefake.com/");

  const newComment = new Comment({
    comment,
    owner: {
      username: owner.name,
      image: `https://avatars.dicebear.com/api/open-peeps/${owner.name?.replace(
        /[^a-zA-Z]/g,
        ""
      )}.svg`,
    },
  });

  await newComment.save();

  res.send({
    success: true,
    data: newComment,
  });
};
