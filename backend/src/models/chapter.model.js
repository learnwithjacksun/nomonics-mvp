import { Schema, model } from "mongoose";

const chapterSchema = new Schema({
    comic:{
        type: Schema.Types.ObjectId,
        ref: "Comic",
        required: true,
    },
    comicUploaded: {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    title:{
        type: String,
        required: true,
    },
    chapterNumber:{
        type: Number,
        required: true,
    },
    readTime: {
        type: Number,
        default: 0,
      },
    comments:{
        type: [Schema.Types.ObjectId],
        ref: "Comment",
    },
    
}, {timestamps: true,
    toJSON: {
        transform: function(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})

const ChapterModel = model("Chapter", chapterSchema);

export default ChapterModel;