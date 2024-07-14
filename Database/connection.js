import mongoose from "mongoose";
/////////////////////////////////////////////////////////////////////////////

export const DBconnection = () => {
    mongoose
        .connect("mongodb://localhost:27017/taskManagement")
        .then(() => { console.log("MongoDB is connected successfully <3") })
        .catch((error) => { console.log("database error", error.message); });
}
