import multer from "multer";
import path from 'path';

const imgAllowed = /image\/jpeg|image\/jpg|image\/png|image\/svg/i;

const imgFilter = (req, file, cb) => {
  if (imgAllowed.test(file.mimetype)) {
    cb(null, true);
  }
  else cb(new Error("Not allowed type"), false);
};

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/static/avatars");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const fileName = `${req.userId}__${file.originalname}`;
    const fullpath = `./src/static/avatars/${fileName}`;
    // try {
    //   if (fs.existsSync(fullpath)) {
    //     cb("File already exists");
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
    cb(null, fileName);
  },
});

export const imgUploader = multer({storage: imgStorage, fileFilter: imgFilter}).single('avatar')