import CommentModel from "../models/comments.model.js";
import ChapterModel from "../models/chapter.model.js";
import { onError } from "../utils/onError.js";

export const addComment = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const { comment } = req.body;
    const { id: userId } = req.user;

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    // Check if chapter exists
    const chapter = await ChapterModel.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    // Create the comment
    const newComment = await CommentModel.create({
      chapter: chapterId,
      user: userId,
      comment: comment.trim(),
    });

    // Populate user details
    await newComment.populate("user", "name email image");

    // Add comment to chapter
    await ChapterModel.findByIdAndUpdate(chapterId, {
      $push: { comments: newComment.id },
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getChapterComments = async (req, res) => {
  try {
    const { chapterId } = req.params;

    const comments = await CommentModel.find({ chapter: chapterId })
      .populate("user", "name email image")
      .populate("likes", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { id: userId } = req.user;

    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    let updatedComment;
    let message;

    if (comment.likes.includes(userId)) {
      updatedComment = await CommentModel.findByIdAndUpdate(
        commentId,
        { $pull: { likes: userId } },
        { new: true }
      ).populate("user", "name email image");
      message = "Comment unliked";
    } else {
      updatedComment = await CommentModel.findByIdAndUpdate(
        commentId,
        { $push: { likes: userId } },
        { new: true }
      ).populate("user", "name email image");
      message = "Comment liked";
    }

    res.status(200).json({
      success: true,
      message,
      data: updatedComment,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { id: userId } = req.user;

    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Check if user owns the comment or is admin
    if (comment.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own comments",
      });
    }

    // Remove comment from chapter
    await ChapterModel.findByIdAndUpdate(comment.chapter, {
      $pull: { comments: commentId },
    });

    // Delete the comment
    await CommentModel.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    onError(res, error);
  }
};
