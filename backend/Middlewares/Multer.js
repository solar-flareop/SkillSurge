import multer from "multer";

const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single("file");
//name should be 'file' whenever using

export default singleUpload;
