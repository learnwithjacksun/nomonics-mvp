import ComicModel from "../models/comic.model.js";
import SavedComicModel from "../models/saved-comic.model.js";
import UserModel from "../models/user.model.js";
import { onError } from "../utils/onError.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({
      role: { $in: ["reader", "creator"] },
    });
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalCreators,
      totalReaders,
      totalComics,
      totalPendingComics,
    ] = await Promise.all([
      UserModel.countDocuments({
        role: { $regex: /^(reader|creator)$/i },
      }),
      UserModel.countDocuments({
        role: { $regex: /^creator$/i },
      }),
      UserModel.countDocuments({
        role: { $regex: /^reader$/i },
      }),
      ComicModel.countDocuments(),
      ComicModel.countDocuments({
        status: { $regex: /^pending$/i },
      }),
    ]);

    res.status(200).json({
      success: true,
      message: "Admin stats fetched successfully",
      data: {
        totalUsers,
        totalCreators,
        totalReaders,
        totalComics,
        totalPendingComics,
      },
    });
  } catch (error) {
    onError(res, error);
  }
};

export const saveComic = async (req, res) => {
  try {
    const { comicId } = req.params;
    const { id: userId } = req.user;
    if (!comicId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Comic ID and user ID are required",
      });
    }
    const comic = await ComicModel.findById(comicId);
    if (!comic) {
      return res.status(404).json({
        success: false,
        message: "Comic not found",
      });
    }
    const isSaved = await SavedComicModel.findOne({
      user: userId,
      comic: comicId,
    });
    if (isSaved) {
      return res.status(400).json({
        success: false,
        message: "Comic already saved",
      });
    }
    const savedComic = await SavedComicModel.create({
      user: userId,
      comic: comicId,
    });
    res.status(201).json({
      success: true,
      message: "Comic saved successfully",
      data: savedComic,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getSavedComics = async (req, res) => {
  try {
    const { id: userId } = req.user;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const savedComics = await SavedComicModel.find({ user: userId })
      .populate({
        path: "comic",
        populate: [
          { path: "creator" },
          { path: "subscribers" },
          { path: "chapters" },
        ],
      })
      .sort({ createdAt: -1 }).limit(10);

      const validSavedComics = savedComics.filter((comic) => comic.comic !== null);
      const validSavedComicsData = validSavedComics.map((comic) => comic.comic);

    res.status(200).json({
      success: true,
      message: "Saved comics fetched successfully",
      data: validSavedComicsData
    });
  } catch (error) {
    onError(res, error);
  }
};
