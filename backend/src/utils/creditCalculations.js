import DefaultAdminSettingsModel from "../models/default-admin-settings.model.js";

/**
 * Get the current admin settings
 * @returns {Promise<Object>} The current admin settings
 */
export const getCurrentSettings = async () => {
  return await DefaultAdminSettingsModel.getSettings();
};

/**
 * Calculate the naira value of credits
 * @param {number} credits - Number of credits
 * @param {Object} settings - Admin settings (optional, will fetch if not provided)
 * @returns {Promise<number>} Naira value
 */
export const creditsToNaira = async (credits, settings = null) => {
  if (!settings) {
    settings = await getCurrentSettings();
  }

  // Formula: (credits / creditsPerHundredNaira) * 100
  return (credits / settings.creditsPerHundredNaira) * 100;
};

/**
 * Calculate the credit value of naira
 * @param {number} naira - Amount in naira
 * @param {Object} settings - Admin settings (optional, will fetch if not provided)
 * @returns {Promise<number>} Credit value
 */
export const nairaToCredits = async (naira, settings = null) => {
  if (!settings) {
    settings = await getCurrentSettings();
  }

  // Formula: (naira / 100) * creditsPerHundredNaira
  return (naira / 100) * settings.creditsPerHundredNaira;
};

/**
 * Calculate creator earnings for a given number of credits
 * @param {number} credits - Number of credits
 * @param {Object} settings - Admin settings (optional, will fetch if not provided)
 * @returns {Promise<number>} Creator earnings in naira
 */
export const calculateCreatorEarnings = async (credits, settings = null) => {
  if (!settings) {
    settings = await getCurrentSettings();
  }

  const nairaValue = await creditsToNaira(credits, settings);
  return (nairaValue * settings.creatorEarningsPercentage) / 100;
};

/**
 * Calculate admin commission for a given number of credits
 * @param {number} credits - Number of credits
 * @param {Object} settings - Admin settings (optional, will fetch if not provided)
 * @returns {Promise<number>} Admin commission in naira
 */
export const calculateAdminCommission = async (credits, settings = null) => {
  if (!settings) {
    settings = await getCurrentSettings();
  }

  const nairaValue = await creditsToNaira(credits, settings);
  return (nairaValue * settings.adminCommissionPercentage) / 100;
};

/**
 * Calculate platform fee for marketplace transactions
 * @param {number} amount - Transaction amount in naira
 * @param {Object} settings - Admin settings (optional, will fetch if not provided)
 * @returns {Promise<number>} Platform fee in naira
 */
export const calculatePlatformFee = async (amount, settings = null) => {
  if (!settings) {
    settings = await getCurrentSettings();
  }

  return (amount * settings.platformFeePercentage) / 100;
};

/**
 * Validate withdrawal amount against limits
 * @param {number} amount - Withdrawal amount in naira
 * @param {Object} settings - Admin settings (optional, will fetch if not provided)
 * @returns {Promise<Object>} Validation result with isValid and message
 */
export const validateWithdrawalAmount = async (amount, settings = null) => {
  if (!settings) {
    settings = await getCurrentSettings();
  }

  if (amount < settings.minimumWithdrawalAmount) {
    return {
      isValid: false,
      message: `Minimum withdrawal amount is ₦${settings.minimumWithdrawalAmount.toLocaleString()}`,
    };
  }

  if (amount > settings.maximumWithdrawalAmount) {
    return {
      isValid: false,
      message: `Maximum withdrawal amount is ₦${settings.maximumWithdrawalAmount.toLocaleString()}`,
    };
  }

  return {
    isValid: true,
    message: "Amount is valid",
  };
};

/**
 * Check if withdrawal should be auto-approved
 * @param {number} amount - Withdrawal amount in naira
 * @param {Object} settings - Admin settings (optional, will fetch if not provided)
 * @returns {Promise<boolean>} Whether withdrawal should be auto-approved
 */
export const shouldAutoApproveWithdrawal = async (amount, settings = null) => {
  if (!settings) {
    settings = await getCurrentSettings();
  }

  return amount <= settings.autoApproveWithdrawalLimit;
};
