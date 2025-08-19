import type { AdminSettings } from '@/hooks/useSettings';

/**
 * Calculate the naira value of credits
 * @param credits - Number of credits
 * @param settings - Admin settings
 * @returns Naira value
 */
export const creditsToNaira = (credits: number, settings: AdminSettings): number => {
  // Formula: (credits / creditsPerHundredNaira) * 100
  return (credits / settings.creditsPerHundredNaira) * 100;
};

/**
 * Calculate the credit value of naira
 * @param naira - Amount in naira
 * @param settings - Admin settings
 * @returns Credit value
 */
export const nairaToCredits = (naira: number, settings: AdminSettings): number => {
  // Formula: (naira / 100) * creditsPerHundredNaira
  return (naira / 100) * settings.creditsPerHundredNaira;
};

/**
 * Calculate creator earnings for a given number of credits
 * @param credits - Number of credits
 * @param settings - Admin settings
 * @returns Creator earnings in naira
 */
export const calculateCreatorEarnings = (credits: number, settings: AdminSettings): number => {
  const nairaValue = creditsToNaira(credits, settings);
  return (nairaValue * settings.creatorEarningsPercentage) / 100;
};

/**
 * Calculate admin commission for a given number of credits
 * @param credits - Number of credits
 * @param settings - Admin settings
 * @returns Admin commission in naira
 */
export const calculateAdminCommission = (credits: number, settings: AdminSettings): number => {
  const nairaValue = creditsToNaira(credits, settings);
  return (nairaValue * settings.adminCommissionPercentage) / 100;
};

/**
 * Calculate platform fee for marketplace transactions
 * @param amount - Transaction amount in naira
 * @param settings - Admin settings
 * @returns Platform fee in naira
 */
export const calculatePlatformFee = (amount: number, settings: AdminSettings): number => {
  return (amount * settings.platformFeePercentage) / 100;
};

/**
 * Validate withdrawal amount against limits
 * @param amount - Withdrawal amount in naira
 * @param settings - Admin settings
 * @returns Validation result with isValid and message
 */
export const validateWithdrawalAmount = (amount: number, settings: AdminSettings) => {
  if (amount < settings.minimumWithdrawalAmount) {
    return {
      isValid: false,
      message: `Minimum withdrawal amount is ₦${settings.minimumWithdrawalAmount.toLocaleString()}`
    };
  }
  
  if (amount > settings.maximumWithdrawalAmount) {
    return {
      isValid: false,
      message: `Maximum withdrawal amount is ₦${settings.maximumWithdrawalAmount.toLocaleString()}`
    };
  }
  
  return {
    isValid: true,
    message: "Amount is valid"
  };
};

/**
 * Check if withdrawal should be auto-approved
 * @param amount - Withdrawal amount in naira
 * @param settings - Admin settings
 * @returns Whether withdrawal should be auto-approved
 */
export const shouldAutoApproveWithdrawal = (amount: number, settings: AdminSettings): boolean => {
  return amount <= settings.autoApproveWithdrawalLimit;
};
