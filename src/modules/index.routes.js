import authRouter from "./auth/auth.router.js"
import { globalError } from "../midlleware/globalError.js"
import userRouter from "./user/user.router.js"
import categoryRouter from "./category/category.router.js"
import taskRouter from "./task/task.router.js"
export const bootstrab = (app) => {

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.use("/api/auth", authRouter);
    app.use("/api/user", userRouter);
    app.use("/api/category", categoryRouter);
    app.use("/api/task", taskRouter);

    app.use(globalError);
}