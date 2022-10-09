import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
mongoose.plugin(slug);

const postSchema = mongoose.Schema(
  {
    title: { type: String },
    slug: { type: String, slug: "title" },
    type: { type: String },
    imgTitle: { type: String },
    imgDesc: [{ type: String }],
    desc: { type: String },
    price: { type: String },
    rating: { type: Number },
    duration: {
      day: { type: Number },
      night: { type: Number },
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
