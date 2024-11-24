import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const vedioSchema = new Schema ({
         vedioFile:{
            type:String,
            required:true
         },
         thumbnail:{
            type:String,
            required: true
         },
         title:{
            type:string,
            required: true,
            
         },
         discription:{
            type:string,
            required: true,

         },
         duration:{
            type:number,
            required: true,

         },
         views:{
            type:number,
            default: 0
         },
         isPublished:{
            type:Boolean,
            default: true
         },
         owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
         }



},{
    timestamps: true
})
vedioSchema.plugin(mongooseAggregatePaginate)
export const Vedio = mongoose.model("Vedio",vedioSchema)