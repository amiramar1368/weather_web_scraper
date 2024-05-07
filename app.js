import express from "express";
import "dotenv/config";

import path from "path";

import router from "./routes/router.js";

if (process.version.split(".")[0] !== "v20") {
  console.log("update node or Proceed as follows ... ");
  // import { fileURLToPath } from "url";
  // const __dirname = path.dirname(fileURLToPath(import.meta.url));
}
const __dirname = import.meta.dirname;
console.log(__dirname);
const port = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use("/", router);

app.listen(port, () => {
  console.log(`server in running on port ${port}`);
});
