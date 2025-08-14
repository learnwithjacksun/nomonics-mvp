import TransactionModel from "../models/transaction.model.js";
import UserModel from "../models/user.model.js";
import { onError } from "../utils/onError.js";

export const buyCredit = async (req, res) => {
  const { userId, amount, credit, status, reference } = req.body;
  try {
    const transaction = await TransactionModel.create({
      user: userId,
      amount,
      title: "Credit Purchase",
      description:
        status === "success"
          ? ` A credit token of ${credit} was purchased successfully`
          : "Credit purchase failed",
      status,
      type: "credit",
      reference,
    });
    const user = await UserModel.findByIdAndUpdate(userId, {
      $inc: {
        credits: credit,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "Credit Purchase successful",
      data: transaction,
    });
  } catch (error) {
    onError(res, error);
  }
};


export const getTransactions = async (req, res) => {
    try {
        const {userId} = req.user;
        const transactions = await TransactionModel.find({user: userId}).populate("user").sort({createdAt: -1});
        res.status(200).json({
            success: true,
            message: "Transactions fetched successfully",
            data: transactions,
        });
    } catch (error) {
        onError(res, error);
    }
}
