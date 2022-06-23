const mongoose = require("mongoose");

require("./models/Comment");

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(err);

    console.log("database connection established");
  }
);

// Models
const Comment = mongoose.model("comment");

module.exports = {
  Comment,
};
