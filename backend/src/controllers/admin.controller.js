import ChapterModel from "../models/chapter.model.js";
import ComicModel from "../models/comic.model.js";
import { onError } from "../utils/onError.js";
import { deleteFile } from "../utils/deletePdf.js"; 
import TransactionModel from "../models/transaction.model.js";
import WithdrawalModel from "../models/withdrawal.model.js";
import DefaultAdminSettingsModel from "../models/default-admin-settings.model.js";
import { calculateAdminCommission } from "../utils/creditCalculations.js";
import axios from "axios";
import process from "process";

export const checkBalance = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.paystack.co/balance`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_BEARER_SECRET_KEY}`,
        },
      }
    );

    const balance = response.data.data[0]?.balance || 0; // safely get balance

    res.status(200).json({
      success: true,
      message: "Balance fetched successfully",
      data: balance, // return only the raw balance number
    });
  } catch (error) {
    onError(res, error);
  }
};


export const updateComicCredit = async (req, res) => {
    const {id} = req.params;
    const {credit} = req.body;
    try {
        const comic = await ComicModel.findByIdAndUpdate(id, {credit}, {new: true});
        res.status(200).json({
            success: true,
            message: "Comic credit updated successfully",
            data: comic
        });
    } catch (error) {
        onError(res, error);
    }
}

export const updateComicStatus = async (req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    try {
        const comic = await ComicModel.findByIdAndUpdate({_id: id}, {status}, {new: true});
        res.status(200).json({
            success: true,
            message: "Comic status updated successfully",
            data: comic
        });
    } catch (error) {
        onError(res, error);
    }
}




export const deleteComic = async (req, res) => {
  const { id } = req.params;

  try {
    const comic = await ComicModel.findById(id).populate("chapters");
    if (!comic) {
      return res.status(404).json({ success: false, message: "Comic not found" });
    }

    const chapterPdfIds = (comic.chapters || [])
      .map((ch) => ch?.comicUploaded?.publicId)
      .filter(Boolean);

    const coverImageId = comic.coverImage?.publicId;

    const deleteJobs = [
      ...chapterPdfIds.map((pid) => deleteFile(pid, "raw")), // PDFs
    ];
    if (coverImageId) deleteJobs.push(deleteFile(coverImageId, "image"));

    await Promise.all(deleteJobs);

    const session = await ComicModel.startSession();
    session.startTransaction();
    try {
      await ChapterModel.deleteMany({ comic: id }, { session });
      await ComicModel.findByIdAndDelete(id, { session });
      await session.commitTransaction();
      session.endSession();
    } catch (dbErr) {
      await session.abortTransaction();
      session.endSession();
      throw dbErr;
    }

    return res.status(200).json({
      success: true,
      message: "Comic, its chapters and related files were deleted",
    });
  } catch (error) {
    return onError(res, error);
  }
};

export const getTransactions = async (req, res) => {
  try {
      const transactions = await TransactionModel.find().populate("user").sort({createdAt: -1});
      res.status(200).json({
          success: true,
          message: "Transactions fetched successfully",
          data: transactions,
      });
  } catch (error) {
      onError(res, error);
  }
}

// Get admin commission
export const getAdminCommission = async (req, res) => {
  try {
    const settings = await DefaultAdminSettingsModel.getSettings();
    const transactions = await TransactionModel.find({
      type: 'credit',
      status: 'success'
    }).sort({createdAt: -1});

    // Calculate total commission from all credit transactions
    let totalCommission = 0;
    for (const transaction of transactions) {
      if (transaction.credit > 0) {
        const commission = await calculateAdminCommission(transaction.credit, settings);
        totalCommission += commission;
      }
    }

    res.status(200).json({
      success: true,
      message: "Admin commission calculated successfully",
      data: {
        totalCommission,
        transactionCount: transactions.length
      },
    });
  } catch (error) {
    onError(res, error);
  }
}

// Get all withdrawals for admin
export const getWithdrawals = async (req, res) => {
  try {
    const withdrawals = await WithdrawalModel.find()
      .populate("user")
      .populate("bankAccount")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Withdrawals fetched successfully",
      data: withdrawals,
    });
  } catch (error) {
    onError(res, error);
  }
};

// Update withdrawal status
export const updateWithdrawalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const withdrawal = await WithdrawalModel.findById(id);
    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: "Withdrawal not found",
      });
    }

    // Update withdrawal status
    const updateData = { status };
    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }
    
    if (status === "completed") {
      updateData.processedAt = new Date();
    }

    const updatedWithdrawal = await WithdrawalModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate("user").populate("bankAccount");

    // Update transaction status if withdrawal is completed or failed
    if (status === "completed" || status === "failed") {
      await TransactionModel.findOneAndUpdate(
        { reference: withdrawal.reference },
        { status: status === "completed" ? "success" : "failed" }
      );
    }

    res.status(200).json({
      success: true,
      message: "Withdrawal status updated successfully",
      data: updatedWithdrawal,
    });
  } catch (error) {
    onError(res, error);
  }
};

// Get default admin settings
export const getDefaultSettings = async (req, res) => {
  try {
    const settings = await DefaultAdminSettingsModel.getSettings();
    res.status(200).json({
      success: true,
      message: "Settings fetched successfully",
      data: settings,
    });
  } catch (error) {
    onError(res, error);
  }
};

// Update default admin settings
export const updateDefaultSettings = async (req, res) => {
  try {
    const {
      creditsPerPaidComic,
      creditsPerHundredNaira,
      creatorEarningsPercentage,
      adminCommissionPercentage,
      minimumWithdrawalAmount,
      maximumWithdrawalAmount,
      platformFeePercentage,
      autoApproveWithdrawalLimit
    } = req.body;

    // Validate that creator and admin percentages add up to 100
    if (creatorEarningsPercentage + adminCommissionPercentage !== 100) {
      return res.status(400).json({
        success: false,
        message: "Creator earnings and admin commission percentages must add up to 100%",
      });
    }

    const settings = await DefaultAdminSettingsModel.getSettings();
    
    const updatedSettings = await DefaultAdminSettingsModel.findByIdAndUpdate(
      settings._id,
      {
        creditsPerPaidComic,
        creditsPerHundredNaira,
        creatorEarningsPercentage,
        adminCommissionPercentage,
        minimumWithdrawalAmount,
        maximumWithdrawalAmount,
        platformFeePercentage,
        autoApproveWithdrawalLimit
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: updatedSettings,
    });
  } catch (error) {
    onError(res, error);
  }
};


