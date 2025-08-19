import {
  uploadPdfRaw,
  uploadPdfWithCover,
  uploadImage,
} from "../libs/cloudinary.js";
import ComicModel from "../models/comic.model.js";
import ChapterModel from "../models/chapter.model.js";
import getRandom2DigitNumber from "../utils/generateRandom2DigitNumber.js";
import { onError } from "../utils/onError.js";
import UserModel from "../models/user.model.js";
import {
  getCurrentSettings,
  calculateCreatorEarnings,
} from "../utils/creditCalculations.js";

export const createNewComic = async (req, res) => {
  try {
    const { title, synopsis, genre, coverImage, comicFile, type, format } =
      req.body;
    const { id: creator } = req.user;

    if (!comicFile) {
      return res.status(400).json({
        success: false,
        message: "Chapter 1 file is required",
      });
    }

    let coverImageData, chapter1FileData;
    const readTime = getRandom2DigitNumber();

    if (format === "pdf") {
      if (!coverImage) {
        const { pdfUrl, coverImageUrl, publicIdPdf, publicIdImage } =
          await uploadPdfWithCover(comicFile);

        chapter1FileData = { url: pdfUrl, publicId: publicIdPdf };
        coverImageData = { url: coverImageUrl, publicId: publicIdImage };
      } else {
        const [pdf, image] = await Promise.all([
          uploadPdfRaw(comicFile),
          uploadImage(coverImage),
        ]);

        chapter1FileData = { url: pdf.pdfUrl, publicId: pdf.publicIdPdf };
        coverImageData = { url: image.url, publicId: image.publicId };
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Only PDF format is supported at the moment",
      });
    }

    // Get default settings for credit assignment
    const settings = await getCurrentSettings();

    const comic = await ComicModel.create({
      creator,
      title,
      synopsis,
      genre,
      coverImage: coverImageData,
      type,
      credit: type === "paid" ? settings.creditsPerPaidComic : 0,
      format,
      likes: [creator],
    });

    const chapter1 = await ChapterModel.create({
      comic: comic.id,
      comicUploaded: chapter1FileData,
      title: `${title} - Chapter 1`,
      chapterNumber: 1,
      readTime,
    });

    comic.chapters.push(chapter1.id);
    await comic.save();

    return res.status(201).json({
      success: true,
      message: "Comic and Chapter 1 created successfully",
      data: {
        comic,
        chapter1,
      },
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getApprovedComics = async (req, res) => {
  try {
    const comics = await ComicModel.find({
      status: "approved",
    })
      .populate("chapters")
      .populate("creator")
      .populate("subscribers")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Comics fetched successfully",
      success: true,
      data: comics,
    });
  } catch (error) {
    onError(res, error);
  }
};
export const getAllComics = async (req, res) => {
  try {
    const comics = await ComicModel.find()
      .populate("chapters")
      .populate("creator")
      .populate("subscribers")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Comics fetched successfully",
      success: true,
      data: comics,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getCreatorComics = async (req, res) => {
  try {
    const { id: creator } = req.user;
    const comics = await ComicModel.find({ creator })
      .populate("chapters")
      .populate("creator")
      .populate("subscribers")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: comics,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getNewReleaseComics = async (req, res) => {
  try {
    const comics = await ComicModel.find({
      status: "approved",
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("creator")
      .populate("subscribers");

    res.status(200).json({
      success: true,
      data: comics,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getFreeComics = async (req, res) => {
  try {
    const comics = await ComicModel.find({ type: "free", status: "approved" })
      .populate("chapters")
      .populate("creator")
      .populate("subscribers")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: comics,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getTrendingComics = async (req, res) => {
  try {
    const comics = await ComicModel.find({ status: "approved" })
      .populate("creator")
      .populate("subscribers");

    const comicsWithLikes = comics.map((comic) => ({
      ...comic.toJSON(),
      likesCount: comic.likes ? comic.likes.length : 0,
    }));

    comicsWithLikes.sort((a, b) => b.likesCount - a.likesCount);

    const topComics = comicsWithLikes.slice(0, 10);

    res.status(200).json({
      success: true,
      data: topComics,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const addNewChapter = async (req, res) => {
  try {
    const { id: comicId } = req.params;
    const { title, chapterNumber, comicFile, format } = req.body;

    if (!comicFile) {
      return res.status(400).json({
        success: false,
        message: "Chapter file is required",
      });
    }

    let chapterFileData;

    const readTime = getRandom2DigitNumber();

    if (format === "pdf") {
      const { pdfUrl, publicIdPdf } = await uploadPdfRaw(comicFile);
      chapterFileData = { url: pdfUrl, publicId: publicIdPdf };
    } else {
      return res.status(400).json({
        success: false,
        message: "Only PDF format is supported at the moment",
      });
    }

    const chapter = await ChapterModel.create({
      comic: comicId,
      comicUploaded: chapterFileData,
      title,
      chapterNumber,
      readTime,
    });

    const comic = await ComicModel.findByIdAndUpdate(comicId, {
      $push: { chapters: chapter.id },
    });

    res.status(201).json({
      success: true,
      message: "Chapter added successfully",
      data: {
        comic,
        chapter,
      },
    });
  } catch (error) {
    onError(res, error);
  }
};

export const likeComic = async (req, res) => {
  try {
    const { id: comicId } = req.params;
    const userId = req.user.id;

    const comic = await ComicModel.findById(comicId);
    if (!comic) {
      return res.status(404).json({
        success: false,
        message: "Comic not found",
      });
    }

    let updatedComic;
    let message;

    if (comic.likes.includes(userId)) {
      updatedComic = await ComicModel.findByIdAndUpdate(
        comicId,
        { $pull: { likes: userId } },
        { new: true }
      );
      message = "You unliked this comic";
    } else {
      updatedComic = await ComicModel.findByIdAndUpdate(
        comicId,
        { $push: { likes: userId } },
        { new: true }
      );
      message = "You liked this comic";
    }

    res.status(200).json({
      success: true,
      message,
      data: updatedComic,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const unlockComic = async (req, res) => {
  try {
    const { id: comicId } = req.params;
    const userId = req.user.id;

    const comic = await ComicModel.findById(comicId);
    if (!comic) {
      return res.status(404).json({
        success: false,
        message: "Comic not found",
      });
    }

    // Check if comic is free
    if (comic.type === "free" || comic.credit === 0) {
      return res.status(400).json({
        success: false,
        message: "This comic is free and doesn't need to be unlocked",
      });
    }

    // Check if user is already a subscriber
    if (comic.subscribers.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have already unlocked this comic",
      });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user has enough credits
    if (user.credits < comic.credit) {
      return res.status(400).json({
        success: false,
        message: "Insufficient credits to unlock this comic",
      });
    }

    // Deduct credits from user
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $inc: { credits: -comic.credit } },
      { new: true }
    );

    const creator = await UserModel.findById(comic.creator);
    if (!creator) {
      return res.status(404).json({
        success: false,
        message: "Creator not found",
      });
    }

    const settings = await getCurrentSettings();

    creator.earnings += await calculateCreatorEarnings(comic.credit, settings);
    await creator.save();

    // Add user to comic subscribers
    const updatedComic = await ComicModel.findByIdAndUpdate(
      comicId,
      { $push: { subscribers: userId } },
      { new: true }
    ).populate("subscribers");

    res.status(200).json({
      success: true,
      message: "Comic unlocked successfully",
      data: {
        comic: updatedComic,
        user: {
          id: updatedUser.id,
          credits: updatedUser.credits,
        },
      },
    });
  } catch (error) {
    onError(res, error);
  }
};
