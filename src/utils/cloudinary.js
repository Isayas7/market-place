const cloudinary = require("cloudinary").v2;
const toStream = require("buffer-to-stream");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
  secure: true,
});

// async function uploadImage(file) {
//   return new Promise((resolve, reject) => {
//     const options = {
//       folder: "marketplace",
//       transformation: [],
//     };

//     const upload = cloudinary.uploader.upload_stream(
//       options,
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       }
//     );

//     toStream(file.buffer).pipe(upload);
//   });
// }

// module.exports = { uploadImage };

export const uploadImage = async (file, folder) => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise(async (resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },

        async (err, result) => {
          if (err) {
            return reject(err.message);
          }
          return resolve(result);
        }
      )
      .end(bytes);
  });
};
