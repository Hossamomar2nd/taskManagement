import express from "express";
import { DBconnection } from "./Database/connection.js";
import { bootstrab } from "./src/modules/index.routes.js";
////////////////////////////////////////////////////////////////////////

const app = express();
const port = 3000;
app.use(express.json());

bootstrab(app);
DBconnection();
////////////////////////////////////////////////////////////////////////
app.listen(port, () => console.log(`Server is running on port${port}`));