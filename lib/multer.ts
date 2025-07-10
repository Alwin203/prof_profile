import multer from "multer";
import { Request } from "express";
import { FileFilterCallback } from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "")
    }, 

    filename: function (req, file, cb) {
        const unique_suffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname+'-'+unique_suffix)
    }
})



function fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
): void {
    const allowedTypes: string[] = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/jpg",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed."));
    }
}


const upload = multer({
    storage: storage, 
    fileFilter: fileFilter, 
})

export default upload