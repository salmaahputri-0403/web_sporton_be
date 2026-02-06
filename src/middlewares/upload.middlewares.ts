import multer from "multer";
import path from "path";
import fs from 'fs';


//  upload image
const uploadDir = "uploads";
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}


//  storage image
const storage = multer.diskStorage({
    destination:(reg,file, cb)=>{
        cb(null, uploadDir);
    },
    filename:(req, file, cb)=>{
        const uniqueSuffix= Date.now() + "-" + Math.round(Math.random()*1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname))
    },
})

// filter
const fileFilter = (req:any, file:Express.Multer.File, cb: multer.FileFilterCallback)=>{
    if(file.mimetype.startsWith("image/")){
        cb(null, true);
    }else{
        cb(new Error("only image are allowed"))
    }
}


// fungsi upload
export const upload = multer({
    storage:storage,
    fileFilter: fileFilter,
    limits:{fileSize: 5 * 1024 * 1024},
});
