import {v2 as cloudinary} from "cloudinary";


export const deleteFile = async (publicId, resourceType = "raw") => {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType, 
        invalidate: true, 
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  