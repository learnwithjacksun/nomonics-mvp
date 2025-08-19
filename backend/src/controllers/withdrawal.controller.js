import axios from "axios";
import process from "process";
import TransactionModel from "../models/transaction.model.js";
import crypto from "crypto";

const createTransferRecipient = async (accountName, accountNumber, bankCode) => {
  try {
    const response = await axios.post(
      "https://api.paystack.co/transferrecipient",
      {
        type: "nuban",            // for Nigerian bank accounts
        name: accountName,        // account holder’s name
        account_number: accountNumber,
        bank_code: bankCode,
        currency: "NGN",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_BEARER_SECRET_KEY}`,
        },
      }
    );

    return response.data.data.recipient_code;
  } catch (error) {
    const errMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to create transfer recipient";
    console.error("Paystack recipient error:", errMsg);
    throw new Error(errMsg);
  }
};

export const createWithdrawal = async (req, res) => {
  const { amount, accountName, accountNumber, bankCode } = req.body;
  const { id: userId } = req.user;

  try {
    // 1. Create Paystack recipient
    const recipientCode = await createTransferRecipient(
      accountName,
      accountNumber,
      bankCode
    );

    // 2. Make transfer
    const response = await axios.post(
      "https://api.paystack.co/transfer",
      {
        source: "balance",
        amount: amount * 100, // convert to kobo
        recipient: recipientCode,
        reference: crypto.randomUUID(),
        reason: "Payout",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_BEARER_SECRET_KEY}`,
        },
      }
    );

    if (response.data.status === true) {
      // 3. Log transaction
      await TransactionModel.create({
        user: userId,
        amount,
        title: "Withdrawal",
        description: `A withdrawal of ₦${amount} was successful`,
        status: "success",
        type: "debit",
        reference: response.data.data.reference,
      });

      return res.status(200).json({
        success: true,
        message: "Withdrawal created successfully",
        data: response.data.data,
      });
    } else {
      throw new Error(response.data.message || "Withdrawal failed");
    }
  } catch (error) {
    const errMsg =
      error.response?.data?.message || error.message || "Withdrawal failed";
    console.error("Paystack withdrawal error:", errMsg);

    return res.status(500).json({
      success: false,
      message: errMsg,
    });
  }
};
