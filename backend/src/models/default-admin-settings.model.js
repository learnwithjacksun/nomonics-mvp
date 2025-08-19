import mongoose from "mongoose";

const defaultAdminSettingsSchema = new mongoose.Schema(
  {
    // Credit settings
    creditsPerPaidComic: {
      type: Number,
      default: 3,
      required: true,
      min: 1,
      max: 100
    },
    
    // Money exchange rate (how many credits = 100 naira)
    creditsPerHundredNaira: {
      type: Number,
      default: 10,
      required: true,
      min: 1,
      max: 1000
    },
    
    // Creator earnings percentage (what percentage of credit value goes to creator)
    creatorEarningsPercentage: {
      type: Number,
      default: 70,
      required: true,
      min: 1,
      max: 100
    },
    
    // Admin commission percentage (what percentage admin keeps)
    adminCommissionPercentage: {
      type: Number,
      default: 30,
      required: true,
      min: 1,
      max: 100
    },
    
    // Minimum withdrawal amount in naira
    minimumWithdrawalAmount: {
      type: Number,
      default: 1000,
      required: true,
      min: 100
    },
    
    // Maximum withdrawal amount in naira
    maximumWithdrawalAmount: {
      type: Number,
      default: 100000,
      required: true,
      min: 1000
    },
    
    // Platform fee percentage for marketplace transactions
    platformFeePercentage: {
      type: Number,
      default: 5,
      required: true,
      min: 0,
      max: 50
    },
    
    // Auto-approve withdrawals below this amount (in naira)
    autoApproveWithdrawalLimit: {
      type: Number,
      default: 5000,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

// Ensure only one settings document exists
defaultAdminSettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const DefaultAdminSettingsModel = mongoose.model("DefaultAdminSettings", defaultAdminSettingsSchema);

export default DefaultAdminSettingsModel;
