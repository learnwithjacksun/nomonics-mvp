import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    chapter: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    replies: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const CommentModel = model("Comment", commentSchema);

export default CommentModel;
