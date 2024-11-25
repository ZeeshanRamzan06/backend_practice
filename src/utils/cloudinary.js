import { v2 as cloudinary } from "cloudinary";
import fs from "fs";



const uploadCloudinary = async (localFilePath)=>{
   try {
       if (!localFilePath) return null
       const responce = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto"
       })

       // file uploaded succesfully
       console.log("file has been uploaded on cloudinary",responce.url)
       
   } catch (error) {
      fs.unlink(localFilePath)   //for removing locally save file as the upload opration got failed
      return null 
   }
}

 export {uploadCloudinary}