import multer from "multer"
import path from "path"
import fs from "fs"
import { v2 as cloudinary } from 'cloudinary';
  // Configuration
  cloudinary.config({ 
    cloud_name: 'dpuortjah', 
    api_key: '936846526666599', 
    api_secret: 'qtRpOHG1umf2XZwis67NLrJzkfo' // Click 'View API Keys' above to copy your API secret
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(),"uploads" ))
    },
    filename: function (req, file, cb) {
    
      cb(null, file.originalname)
    }
  })
  const upload = multer({ storage: storage });

const uploadToCloudinary =async (file:any)=>{
    try {
        return await cloudinary.uploader
       .upload(
        file.path, {
            public_id:file.filename,
          }
        )
         .then((result) => {
            console.log(result);
            fs.unlinkSync(file.path);
            return result;
          })
         .catch((error) => {
            console.log(error);
            fs.unlinkSync(file.path);
            throw error;
          });

    } catch (error) {
      console.log(error);
    }
  }

  export  const fileUploder ={
upload,
uploadToCloudinary
  }