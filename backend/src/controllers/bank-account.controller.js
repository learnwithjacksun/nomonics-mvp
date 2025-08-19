import BankAccountModel from "../models/bank-account.model.js";
import { onError } from "../utils/onError.js";
import axios from "axios";
import process from "process";


export const getSupportedBanks = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.paystack.co/bank?currency=NGN&enabled_for_verification=true",
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_BEARER_SECRET_KEY}`,
        },
      }
    );

    const banks = response.data.data;

    return res.status(200).json({
      success: true,
      message: "Supported banks fetched successfully",
      data: banks.map((bank) => ({
        name: bank.name,
        code: bank.code,
      })),
    });
  } catch (error) {
    console.error("Paystack bank fetch error:", error?.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch supported banks",
      error: error?.response?.data || error.message,
    });
  }
};

/**
 * Resolve a bank account using Paystack
 */
export const resolveBankAccount = async (req, res) => {
  try {
    const { accountNumber, bankCode, bankName } = req.body;

    const response = await axios.get(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_BEARER_SECRET_KEY}`,
        },
      }
    );

    const account = response.data.data;

    return res.status(200).json({
      success: true,
      message: "Bank account resolved successfully",
      data: {
        accountName: account.account_name,
        accountNumber: account.account_number,
        bankName,
        bankCode,
      },
    });
  } catch (error) {
    console.error("Paystack resolve error:", error?.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to resolve bank account",
      error: error?.response?.data || error.message,
    });
  }
};

/**
 * Get the user's bank account (single)
 */
export const getBankAccount = async (req, res) => {
  try {
    const {id: userId } = req.user;
    const bankAccount = await BankAccountModel.findOne({ user: userId, isActive: true });

    res.status(200).json({
      success: true,
      message: "Bank account fetched successfully",
      data: bankAccount || null,
    });
  } catch (error) {
    onError(res, error);
  }
};

/**
 * Add or update the user's bank account (only one allowed)
 */
export const addOrUpdateBankAccount = async (req, res) => {
  try {
    const {id: userId } = req.user;
    const { accountName, accountNumber, bankName, bankCode } = req.body;

    if (!accountName || !accountNumber || !bankName || !bankCode) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let bankAccount = await BankAccountModel.findOne({ user: userId });

    if (bankAccount) {
      // Update existing account
      bankAccount.accountName = accountName;
      bankAccount.accountNumber = accountNumber;
      bankAccount.bankName = bankName;
      bankAccount.bankCode = bankCode;
      bankAccount.isActive = true;

      await bankAccount.save();

      return res.status(200).json({
        success: true,
        message: "Bank account updated successfully",
        data: bankAccount,
      });
    }

    // Create new account
    bankAccount = await BankAccountModel.create({
      user: userId,
      accountName,
      accountNumber,
      bankName,
      bankCode,
    });

    res.status(201).json({
      success: true,
      message: "Bank account added successfully",
      data: bankAccount,
    });
  } catch (error) {
    onError(res, error);
  }
};

/**
 * Delete the user's bank account (soft delete)
 */
export const deleteBankAccount = async (req, res) => {
  try {
    const { userId } = req.user;

    const bankAccount = await BankAccountModel.findOne({ user: userId, isActive: true });

    if (!bankAccount) {
      return res.status(404).json({
        success: false,
        message: "Bank account not found",
      });
    }

    bankAccount.isActive = false;
    await bankAccount.save();

    res.status(200).json({
      success: true,
      message: "Bank account deleted successfully",
    });
  } catch (error) {
    onError(res, error);
  }
};
