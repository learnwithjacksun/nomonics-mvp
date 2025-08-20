import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["reader", "creator"],
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      default: "",
    },
    credits: {
      type: Number,
      default: 0,
    },
    earnings: {
      type: Number,
      default: 0,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  
    otp: { type: String, default: null },
    otpExpiresAt: { type: Date, default: null },
    preferences: {
      sendEmail: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.otp;
        delete ret.otpExpiresAt;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  if (!this.image) {
    const seed = encodeURIComponent(this.name?.trim() || "DefaultUser");
    this.image = `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`;
  }
  next();
});

const UserModel = model("User", userSchema);

export default UserModel;
