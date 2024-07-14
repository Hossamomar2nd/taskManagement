import mongoose from "mongoose"
/////////////////////////////////////////////////////////

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: [4, "too short title :("]
    },

    type: {
        type: String,
        required: true,
        enum: ['text', 'list']
    },
    body: {
        type: String
    },
    listItems: [{ type: String }],
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "categoryModel"
    }
    ,
    shared: {
        type: Boolean,
        default: false
    }
});
//////////////////////////////////////////////////////////

const taskModel = mongoose.model("taskModel", taskSchema);
export default taskModel;