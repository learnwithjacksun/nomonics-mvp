import { Schema, model } from "mongoose";

const withdrawalSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bankAccount: {
      type: Schema.Types.ObjectId,
      ref: "BankAccount",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed", "cancelled"],
      default: "pending",
    },
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    processedAt: {
      type: Date,
    },
    failureReason: {
      type: String,
    },
    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const WithdrawalModel = model("Withdrawal", withdrawalSchema);

export default WithdrawalModel;
