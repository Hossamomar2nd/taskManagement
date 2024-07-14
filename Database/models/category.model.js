import mongoose from "mongoose";
import taskModel from "./task.model.js"
///////////////////////////////////////////////////////////////////////

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: [2, "too short category name"]
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    image: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "userModel"
    },
    tasks: [{ type: mongoose.Types.ObjectId, ref: 'taskModel' }]
}, { timestamps: true });

categorySchema.post('init', function (doc) {
    doc.image = "http://localhost:3000/" + "uploads/" + doc.image
})
//////////////////////////////////////////////////////////////////////

const categoryModel = mongoose.model("categoryModel", categorySchema);
export default categoryModel;