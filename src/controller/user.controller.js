import {asyncHandler} from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import {User} from "../models/user.model.js"
import {uploadCloudinary} from "../utils/cloudinary.js"
import { apiResponce } from "../utils/apiResponce.js"

const registerUser = asyncHandler(async (req,res) => {
   const {fullName,email,username,password} =req.body

   if ([fullName,email,username,password].some((field)=> field?.trim() === "")) {
       throw new apiError(400,"All feilds are required");
   }
   

   const existedUser =await User.findOne({
    $or :[{username},{email}]
   })

   if (existedUser) {
       throw new apiError(409,"User with email or username already exists");
   }
console.log(req.file)
   const avatarLocalPath =req.file?.avatar[0]?.path;
   const coverImageLocalPath =req.file?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw new apiError(400,"Avatar file is required"); 
   }

   const avatar = await uploadCloudinary(avatarLocalPath)
   const coverImage = await uploadCloudinary(coverImageLocalPath)

   if (!avatar) {
    throw new apiError(400,"Avatar file is required");
   }

   const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })

   const createdUser =await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if (!createdUser) {
    throw new apiError(500,"Somthing went to wrong while registering the user ");
    
   }

   return res.status(201).json(
    new apiResponce(201, createdUser,"User register successfully")
   )
})

export {registerUser}