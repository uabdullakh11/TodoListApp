import multer from "multer";

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
    const fileName = `${req.userId}__${file.originalname}`;
    cb(null, fileName);
  },
});

export const imgUploader = multer({storage: imgStorage, fileFilter: imgFilter}).single('avatar')