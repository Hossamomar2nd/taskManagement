import mongoose from "mongoose";
import bcryptjs from "bcryptjs"
////////////////////////////////////////////////////////////////////////////

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            minlength: [2, "too short name"]
        },
        email: {
            type: String,
            unique: [true, "email is already exist"],
            trim: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        categories: [{ type: mongoose.Types.ObjectId, ref: 'categoryModel' }],
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }

    }, { timestamps: true }
);
userSchema.pre("save", function () {
    if (this.password) this.password = bcryptjs.hashSync(this.password, 10);
});
userSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcryptjs.hashSync(this._update.password, 10);
});
/////////////////////////////////////////////////////////////////////////////

const userModel = mongoose.model("userModel", userSchema);
export default userModel;