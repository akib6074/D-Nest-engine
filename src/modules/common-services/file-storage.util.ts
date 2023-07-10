import { ForbiddenException } from "@nestjs/common";
import * as multer from "multer";

export const originalFileName = (req, file, callback) => {
    const originalName = file.originalname;
    callback(null, `${originalName}`);
  };

  export const storageforRunnerRequired = multer.diskStorage({
    destination: "./uploads/issue-files",
    filename: originalFileName,
  });

  export const fileFilter = (req, file, callback) => {
    if (
      !(
        /\.(jpg|jpeg|JPG|JPEG|png|PNG|gif|GIF|pdf|PDF|doc|DOC|docx|DOCX|xlsx|xlsm|xlsb|xltx|jfif|pjpeg|pjp|webp|svg|tif|tiff|bmp|ico|cur|avif|apng)$/
      ).test(file.originalname)
    ) {
      return callback(
        new ForbiddenException({
          message: "Only pdf, doc or xl files are allowed!",
        }),
        false
      );
    }
    callback(null, true);
  };