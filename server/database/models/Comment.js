const mongoose = require("mongoose");

const modelName = "comment";
const modelSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    owner: Object,
  },
  { timestamps: true }
);

try {
  mongoose.model(modelName);
} catch {
  mongoose.model(modelName, modelSchema);
}
