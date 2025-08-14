import { v2 as cloudinary } from "cloudinary";
import envFile from "../config/env.js";
import { deleteFile } from "../utils/deletePdf.js";

cloudinary.config({
  cloud_name: envFile.CLOUDINARY_CLOUD_NAME,
  api_key: envFile.CLOUDINARY_API_KEY,
  api_secret: envFile.CLOUDINARY_API_SECRET,
});


const uploadPdfRaw = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "raw",
      folder: "pdfs",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    return {
      pdfUrl: result.secure_url,
      publicIdPdf: result.public_id,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const uploadPdfThumbnail = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      folder: "pdf-thumbnails",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      format: "jpg",
      pages: true,
      transformation: [{ page: 1, width: 600, crop: "scale" }],
    });

    return {
      coverImageUrl: result.secure_url,
      publicIdImage: result.public_id,
    };
  } catch (error) {
    throw new Error(error.message || "Cloudinary thumbnail upload failed");
  }
};


const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      folder: "images",
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    throw new Error(error);
  }
}


const uploadPdfWithCover = async (file) => {
  const rawUpload = await uploadPdfRaw(file);
  const imageUpload = await uploadPdfThumbnail(file);

  return {
    pdfUrl: rawUpload.pdfUrl,
    coverImageUrl: imageUpload.coverImageUrl,
    publicIdPdf: rawUpload.publicIdPdf,
    publicIdImage: imageUpload.publicIdImage,
  };
};

const deletePdfWithCover = async (publicIdRaw, publicIdImage) => {
  const pdfDelete = await deleteFile(publicIdRaw, "raw");
  const imageDelete = await deleteFile(publicIdImage, "image");

  return {
    pdfDelete,
    imageDelete,
  };
};


  export { uploadPdfWithCover, deletePdfWithCover ,uploadPdfRaw, uploadPdfThumbnail, uploadImage};
