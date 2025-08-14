import ChapterModel from "../models/chapter.model.js";
import ComicModel from "../models/comic.model.js";
import { onError } from "../utils/onError.js";
import { deleteFile } from "../utils/deletePdf.js"; 
import TransactionModel from "../models/transaction.model.js";

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
