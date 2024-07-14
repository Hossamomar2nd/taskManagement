import slugify from "slugify";
import { ApiFeature } from "../../utils/apifeature.js";
import { catchError } from "../../midlleware/catchError.js";
import categoryModel from "../../../Database/models/category.model.js";
import userModel from "../../../Database/models/user.model.js";



const addCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    req.body.image = req.file.filename;
    let user = await userModel.findById(req.user._id);
    let category = await categoryModel.create({ ...req.body, createdBy: req.user._id });
    user.categories.push(category._id);
    res.json({ success: true, message: category });
}
)

const getallcategories = catchError(async (req, res, next) => {
    let ApiFeatures = new ApiFeature(categoryModel.find(), req.query).filter().search().pagination().sort();
    let category = await ApiFeatures.mongooseQuery
    res.json({ success: true, page: ApiFeatures.pageNumber, message: category });
}
)

const getsinglecategory = catchError(async (req, res, next) => {
    let Category = await categoryModel.findById(req.params.id);

    res.json({ success: true, message: Category });
})

const updatecategory = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name);
    if (req.file) req.body.image = req.file.filename
    let Category = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    !Category && res.satatus(404).json({ message: "category not found" });

    Category && res.json({ success: true, message: Category });
})

const deletecategory = catchError(async (req, res, next) => {

    let category = await categoryModel.findByIdAndDelete(req.params.id);
    !category && res.status(404).json({ message: "category not found" });
    category && res.json({ success: true, message: "category deleted successfully" });
})

export { addCategory, getallcategories, getsinglecategory, updatecategory, deletecategory };

