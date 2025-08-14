import { Schema, model } from "mongoose";

const comicSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    coverImage: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["free", "paid"],
      default: "paid",
    },
    credit: {
      type: Number,
      default: 0,
    },
    chapters: {
      type: [Schema.Types.ObjectId],
      ref: "Chapter",
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    subscribers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
   
    format: {
      type: String,
      enum: ["pdf", "image"],
      default: "pdf",
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

const ComicModel = model("Comic", comicSchema);

export default ComicModel;
