import ComicModel from "../models/comic.model.js";
import SavedComicModel from "../models/saved-comic.model.js";
import UserModel from "../models/user.model.js";
import { onError } from "../utils/onError.js";
import { uploadImage } from "../libs/cloudinary.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({
      role: { $in: ["reader", "creator"] },
    }).sort({ createdAt: -1 });
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

export const updateProfile = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { name, email, phone, address, city, state, dob, gender, image } = req.body;

    const updateData = {
      name,
      email,
      phone,
      address,
      city,
      state,
      dob,
      gender,
      image,
    };

    // Handle image upload if provided
    if (image) {
      const imageData = await uploadImage(image);
      updateData.image = imageData.url;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const toggleAdminStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id: currentUserId } = req.user;

    // Prevent admin from removing their own admin status
    if (userId === currentUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot modify your own admin status",
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Toggle admin status
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAdmin: !user.isAdmin },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: `User ${updatedUser.isAdmin ? 'promoted to' : 'removed from'} admin successfully`,
      data: updatedUser,
    });
  } catch (error) {
    onError(res, error);
  }
};
