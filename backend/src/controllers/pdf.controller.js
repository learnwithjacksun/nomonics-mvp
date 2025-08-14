import { deletePdfWithCover, uploadPdfWithCover } from "../libs/cloudinary.js";
import PdfModel from "../models/pdf.model.js";

export const uploadPdf = async (req, res) => {
  try {
    const { title, pdf } = req.body;
    if (!title || !pdf) {
      return res.status(400).json({
        message: "Title and PDF are required",
        success: false,
      });
    }
    const { pdfUrl, coverImageUrl, publicIdRaw, publicIdImage} = await uploadPdfWithCover(pdf);

    const pdfData = await PdfModel.create({
      title,
      pdf: {
        publicId: publicIdRaw,
        url: pdfUrl,
      },
      image: {
        publicId: publicIdImage,
        url: coverImageUrl,
      },
    });

    res.status(200).json({
      message: "PDF uploaded successfully",
      success: true,
      data: pdfData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

export const getPdfs = async (_req, res) => {
  try {
    const pdfs = await PdfModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Pdfs fetched successfully",
      success: true,
      data: pdfs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};


export const deletePdf = async (req, res) => {
  try {
    const { id } = req.params;
    const pdf = await PdfModel.findById(id);
    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
        success: false,
      });
    }
    
    const { publicIdRaw, publicIdImage } = pdf;

    await deletePdfWithCover(publicIdRaw, publicIdImage);
    await pdf.deleteOne();
    res.status(200).json({
      message: "PDF deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};
