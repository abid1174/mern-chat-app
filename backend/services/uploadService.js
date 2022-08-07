const { cloudinary } = require("../utils/cloudinary");

const uploadProfileImage = async (fileStr) => {
  try {
    const { url } = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "chat_profile",
    });
    return url;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadProfileImage };
