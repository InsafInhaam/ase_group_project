import multer from "multer";

export const passengerProfileUpload = multer({
  storage: multer.memoryStorage(),
}).single("profile");


