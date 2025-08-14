import { Schema, model } from "mongoose";

const pdfSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pdf: {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    image: {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const PdfModel = model("Pdf", pdfSchema);

export default PdfModel;
