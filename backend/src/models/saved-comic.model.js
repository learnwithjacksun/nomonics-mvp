import { Schema, model } from "mongoose";

const savedComicSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comic: {
      type: Schema.Types.ObjectId,
      ref: "Comic",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const SavedComicModel = model("SavedComic", savedComicSchema);

export default SavedComicModel;
